# Backend Node.js - Connexion MS Access

Ce backend permet de sauvegarder les données du formulaire intranet dans une base de données Microsoft Access via ODBC.

## Prérequis

1. **Node.js** (version 14 ou supérieure)
   - Télécharger: https://nodejs.org/
   
2. **Microsoft Access** (version 2010 ou supérieure)
   
3. **Pilote ODBC Microsoft Access**
   - Pour Windows 64-bit: Télécharger "Microsoft Access Database Engine 2016 Redistributable"
   - Lien: https://www.microsoft.com/en-us/download/details.aspx?id=54920
   - Important: Choisir la version qui correspond à votre architecture Windows (32-bit ou 64-bit)

## Installation

1. **Naviguer vers le dossier backend**
   ```bash
   cd backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

## Configuration de la base de données

### Option 1: Utiliser un fichier Access direct

1. Créer un dossier `database` dans le dossier du projet
2. Créer ou placer votre fichier Access (.accdb ou .mdb) dans ce dossier
3. Modifier le fichier `db-config.js` avec le chemin absolu de votre fichier:

```javascript
module.exports = {
    connectionString: 'Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:/CHEIN/ABSOLU/votre_fichier.accdb;',
};
```

### Option 2: Utiliser un DSN système (recommandé)

1. Ouvrir "ODBC Data Source Administrator" (64-bit)
   - Presser Win+R, taper `odbcad32`
   
2. Aller dans l'onglet "User DSN" ou "System DSN"

3. Cliquer sur "Add" et sélectionner "Microsoft Access Driver (*.mdb, *.accdb)"

4. Configurer le DSN:
   - Data Source Name: `gestion_interim_dsn`
   - Description: Base de données gestion intérim
   - Sélectionner votre fichier Access via "Database..."

5. Modifier `db-config.js` pour utiliser le DSN:
```javascript
module.exports = {
    dsn: 'gestion_interim_dsn',
    connectionString: '' // Laisser vide si vous utilisez DSN
};
```

## Structure de la table Access

Le backend créera automatiquement la table `DemandesInterim` si elle n'existe pas. La structure est:

| Champ | Type | Description |
|-------|------|-------------|
| id | AUTOINCREMENT | Clé primaire |
| date_demande | DATE | Date de la demande |
| region | TEXT(255) | Région |
| supervision | TEXT(255) | Supervision |
| agence | TEXT(255) | Agence |
| gestionnaire_entrant | TEXT(255) | Gestionnaire entrant |
| gestionnaire_sortant | TEXT(255) | Gestionnaire sortant |
| agence_interimaire | TEXT(255) | Agence intérimaire |
| caisse_agent | INTEGER | Caisse agent (1-11) |
| classe_pv | TEXT(10) | Classe PV (C1-C4) |
| motif | TEXT(255) | Motif de la demande |
| piece_jointe | TEXT(255) | Nom du fichier pièce jointe |
| email | TEXT(255) | Email de contact |
| telephone | TEXT(50) | Téléphone |
| agence_contact | TEXT(255) | Agence de contact |
| statut_traitement | TEXT(50) | Statut (oui/non/encours) |
| date_debut_interim | DATE | Date début intérim |
| date_fin_interim | DATE | Date fin intérim |
| jours_ouvres | INTEGER | Jours ouvrés |
| observation | MEMO | Observations |
| date_creation | DATETIME | Date de création (auto) |

## Démarrage du serveur

### Mode développement (avec auto-restart)
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur démarrera sur `http://localhost:3000`

## API Endpoints

### Test de connexion
```
GET /api/test
```
Réponse: `{ message: "Backend fonctionne correctement", status: "OK" }`

### Sauvegarder les données du formulaire
```
POST /api/save-form
Content-Type: application/json

Body:
{
  "dateDemande": "2026-08-05",
  "region": "Région Nord",
  "supervision": "Supervision Tanger",
  "agence": "Agence Tanger Beni Makada",
  "gestionnaireEntrant": "SARHIR SAMI",
  "gestionnaireSortant": "EL FERDAOUS MARWA",
  "agenceInterimaire": "Manpower",
  "caisseAgent": "1",
  "classePV": "C1",
  "motif": "Maladie",
  "pieceJointe": "demande.pdf",
  "email": "email@example.com",
  "telephone": "+212 600 000 000",
  "agenceContact": "Agence Tanger",
  "statutTraitement": "encours",
  "dateDebutInterim": "2026-08-10",
  "dateTraitement": "2026-08-20",
  "joursOuvres": "8",
  "observation": "Observation texte"
}
```

Réponse: 
```json
{
  "success": true,
  "message": "Données sauvegardées avec succès dans MS Access"
}
```

### Récupérer toutes les demandes
```
GET /api/demandes
```

### Fermer la connexion DB
```
POST /api/disconnect
```

## Intégration avec le formulaire

Le fichier `intranet-formulaire.html` a été modifié pour envoyer les données au backend:

1. Le bouton "Sauvegarder" appelle maintenant `handleSave()`
2. Les données sont envoyées via POST à `http://localhost:3000/api/save-form`
3. En cas de succès, les données sont sauvegardées dans MS Access
4. En cas d'erreur, les données sont sauvegardées localement (localStorage) comme backup

## Dépannage

### Erreur: "Data source name not found"
- Vérifiez que le pilote ODBC Access est installé
- Vérifiez que le chemin du fichier Access est correct
- Essayez d'utiliser un DSN système au lieu du chemin direct

### Erreur: "Could not connect to the database"
- Vérifiez que le fichier Access n'est pas ouvert par un autre programme
- Vérifiez les permissions sur le fichier Access
- Assurez-vous que le pilote ODBC correspond à l'architecture de Node.js (32-bit vs 64-bit)

### Erreur: "Table does not exist"
- Le backend créera automatiquement la table si elle n'existe pas
- Si l'erreur persiste, vérifiez les permissions d'écriture sur le fichier Access

### Le serveur ne démarre pas
- Vérifiez que le port 3000 n'est pas utilisé par une autre application
- Vérifiez que Node.js est correctement installé: `node --version`
- Réinstallez les dépendances: `rm -rf node_modules && npm install`

## Sécurité

- Ce backend est destiné à un usage intranet local
- Pour un usage en production, ajoutez:
  - Authentification
  - HTTPS
  - Validation des entrées plus stricte
  - Rate limiting
  - Logs d'audit

## Support

En cas de problème:
1. Vérifiez les logs du serveur dans la console
2. Vérifiez les logs du navigateur (F12 > Console)
3. Consultez la section Dépannage ci-dessus
