const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const odbc = require('odbc');
const dbConfig = require('./db-config');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Variable pour stocker la connexion ODBC
let dbConnection = null;

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    try {
        if (!dbConnection) {
            console.log('Tentative de connexion à MS Access...');
            dbConnection = await odbc.connect(dbConfig.connectionString);
            console.log('✓ Connexion réussie à MS Access');
        }
        return dbConnection;
    } catch (error) {
        console.error('✗ Erreur de connexion à MS Access:', error.message);
        throw error;
    }
}

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend fonctionne correctement', status: 'OK' });
});

// Route pour sauvegarder les données du formulaire
app.post('/api/save-form', async (req, res) => {
    try {
        const formData = req.body;
        
        console.log('Données reçues:', formData);
        
        // Connexion à la base de données
        const connection = await connectToDatabase();
        
        // Vérifier si la table existe, sinon la créer
        await createTableIfNotExists(connection);
        
        // Préparer la requête SQL INSERT
        const sql = `
            INSERT INTO DemandesInterim (
                date_demande, region, supervision, agence,
                gestionnaire_entrant, gestionnaire_sortant,
                agence_interimaire, caisse_agent, classe_pv,
                motif, piece_jointe,
                statut_traitement, date_debut_interim, date_fin_interim,
                jours_ouvres, observation, date_creation
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        
        const params = [
            formData.dateDemande || null,
            formData.region || null,
            formData.supervision || null,
            formData.agence || null,
            formData.gestionnaireEntrant || null,
            formData.gestionnaireSortant || null,
            formData.agenceInterimaire || null,
            formData.caisseAgent || null,
            formData.classePV || null,
            formData.motif || null,
            formData.pieceJointe || null,
            formData.statutTraitement || null,
            formData.dateDebutInterim || null,
            formData.dateTraitement || null,
            formData.joursOuvres || null,
            formData.observation || null
        ];
        
        // Exécuter la requête
        await connection.query(sql, params);
        
        console.log('✓ Données sauvegardées avec succès');
        
        res.json({ 
            success: true, 
            message: 'Données sauvegardées avec succès dans MS Access' 
        });
        
    } catch (error) {
        console.error('✗ Erreur lors de la sauvegarde:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la sauvegarde: ' + error.message 
        });
    }
});

// Route pour exporter les données vers MS Access
app.post('/api/export-access', async (req, res) => {
    try {
        const formData = req.body;
        
        console.log('Données à exporter:', formData);
        
        // Connexion à la base de données
        const connection = await connectToDatabase();
        
        // Vérifier si la table existe, sinon la créer
        await createTableIfNotExists(connection);
        
        // Préparer la requête SQL INSERT
        const sql = `
            INSERT INTO DemandesInterim (
                date_demande, region, supervision, agence,
                gestionnaire_entrant, gestionnaire_sortant,
                agence_interimaire, caisse_agent, classe_pv,
                motif, piece_jointe,
                statut_traitement, date_debut_interim, date_fin_interim,
                jours_ouvres, observation, date_creation
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        
        const params = [
            formData.dateDemande || null,
            formData.region || null,
            formData.supervision || null,
            formData.agence || null,
            formData.gestionnaireEntrant || null,
            formData.gestionnaireSortant || null,
            formData.agenceInterimaire || null,
            formData.caisseAgent || null,
            formData.classePV || null,
            formData.motif || null,
            formData.pieceJointe || null,
            formData.statutTraitement || null,
            formData.dateDebutInterim || null,
            formData.dateTraitement || null,
            formData.joursOuvres || null,
            formData.observation || null
        ];
        
        // Exécuter la requête
        await connection.query(sql, params);
        
        console.log('✓ Données exportées avec succès vers MS Access');
        
        res.json({ 
            success: true, 
            message: 'Données exportées avec succès vers MS Access' 
        });
        
    } catch (error) {
        console.error('✗ Erreur lors de l\'export:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de l\'export: ' + error.message 
        });
    }
});

// Route pour sauvegarder le fichier Excel sur le partage réseau
app.post('/api/save-excel-network', async (req, res) => {
    try {
        const { data, filename } = req.body;
        
        // Chemin du partage réseau (utilise le lecteur Z: mappé)
        const networkPath = 'Z:\\'; // Lecteur Z: mappé sur \\172.16.0.99\Service Paramétrages
        
        // Chemin de fallback local
        const localPath = path.join(__dirname, '../exports');
        
        // Créer le dossier local s'il n'existe pas
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath, { recursive: true });
        }
        
        // Générer le nom de fichier avec timestamp
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
        const fullFilename = `${timestamp}_${safeFilename}`;
        
        // Convertir les données en format CSV
        const headers = Object.keys(data[0] || {}).join(',');
        const rows = data.map(row => 
            Object.values(row).map(value => 
                `"${String(value || '').replace(/"/g, '""')}"`
            ).join(',')
        );
        const csvContent = [headers, ...rows].join('\n');
        
        let filePath;
        let savedLocation;
        
        // Essayer d'abord le partage réseau Z:
        if (fs.existsSync(networkPath)) {
            try {
                filePath = path.join(networkPath, fullFilename);
                fs.writeFileSync(filePath, csvContent, 'utf8');
                savedLocation = 'réseau Z:';
                console.log('✓ Fichier sauvegardé sur le partage réseau Z:', filePath);
            } catch (networkError) {
                console.warn('⚠ Erreur accès réseau Z:, utilisation du dossier local:', networkError.message);
                filePath = path.join(localPath, fullFilename);
                fs.writeFileSync(filePath, csvContent, 'utf8');
                savedLocation = 'dossier local (fallback)';
                console.log('✓ Fichier sauvegardé localement:', filePath);
            }
        } else {
            console.warn('⚠ Partage réseau Z: non accessible, utilisation du dossier local');
            filePath = path.join(localPath, fullFilename);
            fs.writeFileSync(filePath, csvContent, 'utf8');
            savedLocation = 'dossier local (fallback)';
            console.log('✓ Fichier sauvegardé localement:', filePath);
        }
        
        res.json({ 
            success: true, 
            message: `Fichier sauvegardé avec succès sur ${savedLocation}`,
            path: filePath,
            location: savedLocation
        });
        
    } catch (error) {
        console.error('✗ Erreur lors de la sauvegarde:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la sauvegarde: ' + error.message 
        });
    }
});

// Fonction pour créer la table si elle n'existe pas
async function createTableIfNotExists(connection) {
    const createTableSQL = `
        IF NOT EXISTS (SELECT * FROM MSysObjects WHERE Name='DemandesInterim' AND Type=1)
        CREATE TABLE DemandesInterim (
            id AUTOINCREMENT PRIMARY KEY,
            date_demande DATE,
            region TEXT(255),
            supervision TEXT(255),
            agence TEXT(255),
            gestionnaire_entrant TEXT(255),
            gestionnaire_sortant TEXT(255),
            agence_interimaire TEXT(255),
            caisse_agent INTEGER,
            classe_pv TEXT(10),
            motif TEXT(255),
            piece_jointe TEXT(255),
            email TEXT(255),
            telephone TEXT(50),
            agence_contact TEXT(255),
            statut_traitement TEXT(50),
            date_debut_interim DATE,
            date_fin_interim DATE,
            jours_ouvres INTEGER,
            observation MEMO,
            date_creation DATETIME
        )
    `;
    
    try {
        await connection.query(createTableSQL);
        console.log('✓ Table DemandesInterim vérifiée/créée');
    } catch (error) {
        // Si la table existe déjà, l'erreur peut être ignorée
        if (!error.message.includes('already exists')) {
            console.error('Erreur lors de la création de la table:', error.message);
        }
    }
}

// Route pour récupérer toutes les demandes
app.get('/api/demandes', async (req, res) => {
    try {
        const connection = await connectToDatabase();
        const sql = 'SELECT * FROM DemandesInterim ORDER BY date_creation DESC';
        const results = await connection.query(sql);
        
        res.json({ success: true, data: results });
    } catch (error) {
        console.error('Erreur lors de la récupération:', error.message);
        res.status(500).json({ 
            success: false, 
            message: 'Erreur lors de la récupération: ' + error.message 
        });
    }
});

// Route pour fermer la connexion (utile pour le redémarrage du serveur)
app.post('/api/disconnect', async (req, res) => {
    try {
        if (dbConnection) {
            await dbConnection.close();
            dbConnection = null;
            console.log('✓ Connexion fermée');
        }
        res.json({ success: true, message: 'Connexion fermée' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log('=================================');
    console.log('Routes disponibles:');
    console.log(`  GET  /api/test - Test de connexion`);
    console.log(`  POST /api/save-form - Sauvegarder formulaire`);
    console.log(`  POST /api/export-access - Exporter vers MS Access`);
    console.log(`  GET  /api/demandes - Récupérer toutes les demandes`);
    console.log(`  POST /api/disconnect - Fermer connexion DB`);
    console.log('=================================');
});

// Fermeture propre de la connexion lors de l'arrêt du serveur
process.on('SIGINT', async () => {
    console.log('\nArrêt du serveur...');
    if (dbConnection) {
        await dbConnection.close();
        console.log('✓ Connexion DB fermée');
    }
    process.exit(0);
});
