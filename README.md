[README_INTRANET.md](https://github.com/user-attachments/files/30463920/README_INTRANET.md)
# Page Web Intranet - Formulaire de Gestion

## 📋 Description

Page web intranet complète avec formulaire de gestion incluant des cascades, gestionnaires importables depuis Excel, et envoi par email.

## 🎯 Fonctionnalités

### ✅ Fonctionnalités Implémentées

1. **Cascades en 3 niveaux**
   - Région → Supervision → Agences
   - Activation automatique des listes dépendantes
   - Données préchargées pour 5 régions

2. **Gestionnaires**
   - Liste par défaut avec 8 gestionnaires
   - Import depuis Excel (.xlsx, .xls, .csv)
   - Deux champs: Gestionnaire Entrant et Sortant

3. **Champs Intérimaire**
   - Agence Intérimaire (texte)
   - Caisse Agent (1-11)
   - Classe PV (C1, C2, C3, C4)

4. **Motifs**
   - Maladie, Congé, Bon Sortie, Formation
   - Mission, Mutation, Départ Retraite
   - Démission, Rupture Contrat, Absence

5. **Contact**
   - Email (avec validation)
   - Téléphone
   - Agence Contact

6. **Statut de Traitement**
   - 3 boutons radio colorés:
     - 🟢 Oui (vert)
     - 🔴 Non (rouge)
     - 🟡 En Cours (orange)

7. **Traitement**
   - Date de Traitement
   - Observation (zone de texte)

8. **Actions**
   - 📧 Envoyer par Email (EmailJS)
   - 📊 Exporter Excel (XLSX)
   - 🔄 Réinitialiser le formulaire

## 🚀 Installation

### 1. Prérequis
- Navigateur web moderne (Chrome, Firefox, Edge)
- Connexion internet (pour EmailJS)

### 2. Configuration EmailJS

Le formulaire utilise EmailJS pour l'envoi d'emails. Configuration actuelle:
- **Service ID**: `service_upuge9d`
- **Template ID**: `template_upuge9d`
- **Public Key**: `nheWjZ1-MBf7R-96SEY`
- **Email de destination**: `ssarhir@fbpmc.ma`

Pour modifier la configuration, éditez le fichier `intranet-formulaire.html` et modifiez la constante `EMAIL_CONFIG` dans la section JavaScript.

### 3. Déploiement

#### Option 1: Serveur local
```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx http-server
```

#### Option 2: Hébergement web
- Uploader le fichier `intranet-formulaire.html` sur votre serveur
- Accéder via l'URL de votre site

## 📖 Utilisation

### 1. Remplir le formulaire

#### Étape 1: Informations Générales
- Sélectionner la **Date Demande** (pré-remplie avec la date du jour)
- Choisir une **Région**
- La liste des **Supervisions** s'active automatiquement
- Choisir une **Supervision**
- La liste des **Agences** s'active automatiquement
- Choisir une **Agence**

#### Étape 2: Gestionnaires
- Sélectionner un **Gestionnaire Entrant**
- Sélectionner un **Gestionnaire Sortant**
- (Optionnel) Importer des gestionnaires depuis Excel:
  - Cliquer sur "Importer gestionnaires depuis Excel"
  - Sélectionner un fichier Excel
  - Les gestionnaires s'ajoutent automatiquement

#### Étape 3: Détails Intérimaire
- Saisir l'**Agence Intérimaire**
- Choisir la **Caisse Agent** (1-11)
- Choisir la **Classe PV** (C1-C4)

#### Étape 4: Motifs
- Sélectionner un **Motif** dans la liste déroulante

#### Étape 5: Contact
- Saisir l'**Email** (format validé)
- Saisir le **Téléphone**
- Saisir l'**Agence Contact** (optionnel)

#### Étape 6: Statut de Traitement
- Cliquer sur le bouton correspondant:
  - 🟢 **Oui** si traité
  - 🔴 **Non** si non traité
  - 🟡 **En Cours** si en cours de traitement

#### Étape 7: Traitement
- Saisir la **Date de Traitement** (optionnel)
- Ajouter des **Observations** (optionnel)

### 2. Actions Disponibles

#### Envoyer par Email
- Cliquer sur le bouton "Envoyer par Email"
- Un spinner de chargement apparaît
- L'email est envoyé à `ssarhir@fbpmc.ma`
- Un message de succès apparaît
- Les données sont sauvegardées dans le localStorage
- Le formulaire est réinitialisé

#### Exporter Excel
- Cliquer sur le bouton "Exporter Excel"
- Le fichier Excel est téléchargé automatiquement
- Nom du fichier: `demande_intranet_YYYY-MM-DD.xlsx`
- Contient toutes les données du formulaire

#### Réinitialiser
- Cliquer sur le bouton "Réinitialiser"
- Tous les champs sont vidés
- La date du jour est réinitialisée
- Les cascades sont réinitialisées

## 📊 Structure des Données

### Cascades (Région → Supervision → Agence)

#### Régions (5)
1. Région Nord
2. Région Sud
3. Région Est
4. Région Ouest
5. Région Centre

#### Supervisions (12)
- Nord: Tanger, Tétouan, Al Hoceima
- Sud: Agadir, Marrakech, Ouarzazate
- Est: Oujda, Nador
- Ouest: Casablanca, Rabat
- Centre: Fès, Meknès

#### Agences (18)
- Chaque supervision a 1-2 agences

### Gestionnaires Par Défaut
1. SARHIR SAMI
2. EL FERDAOUS MARWA
3. LAMHNNAD MADIHA
4. AHMED MOHAMED
5. FATIMA ZAHRA
6. ABDELKARIM HASSAN
7. NADIA BENALI
8. KARIM TAZI

### Motifs Disponibles
- Maladie
- Congé
- Bon Sortie
- Formation
- Mission
- Mutation
- Départ Retraite
- Démission
- Rupture Contrat
- Absence

## 🎨 Personnalisation

### Modifier les Cascades

Pour modifier les données des cascades, éditez la constante `CASCADE_DATA` dans le fichier HTML:

```javascript
const CASCADE_DATA = {
    regions: [
        { id: 1, nom: 'Votre Région' },
        // Ajouter d'autres régions
    ],
    supervisions: {
        1: [
            { id: 1, nom: 'Votre Supervision' },
            // Ajouter d'autres supervisions
        ],
        // Ajouter d'autres régions
    },
    agences: {
        1: [
            { id: 1, nom: 'Votre Agence' },
            // Ajouter d'autres agences
        ],
        // Ajouter d'autres supervisions
    }
};
```

### Modifier les Gestionnaires

Pour modifier les gestionnaires par défaut, éditez la constante `DEFAULT_GESTIONNAIRES`:

```javascript
const DEFAULT_GESTIONNAIRES = [
    'VOTRE GESTIONNAIRE 1',
    'VOTRE GESTIONNAIRE 2',
    // Ajouter d'autres gestionnaires
];
```

### Modifier l'Email de Destination

Pour modifier l'email de destination, éditez la constante `EMAIL_CONFIG`:

```javascript
const EMAIL_CONFIG = {
    SERVICE_ID: 'votre_service_id',
    TEMPLATE_ID: 'votre_template_id',
    PUBLIC_KEY: 'votre_public_key',
    RECIPIENT_EMAIL: 'votre@email.com'
};
```

### Modifier les Couleurs

Pour modifier les couleurs des boutons radio, éditez le CSS:

```css
.radio-oui input[type="radio"]:checked + label {
    background: #10b981; /* Vert */
    color: white;
    border-color: #059669;
}

.radio-non input[type="radio"]:checked + label {
    background: #ef4444; /* Rouge */
    color: white;
    border-color: #dc2626;
}

.radio-encours input[type="radio"]:checked + label {
    background: #f59e0b; /* Orange */
    color: white;
    border-color: #d97706;
}
```

## 🔧 Dépannage

### Problème: Les cascades ne fonctionnent pas
**Solution**: Vérifiez que les données dans `CASCADE_DATA` sont correctement structurées avec les bons IDs.

### Problème: L'import Excel ne fonctionne pas
**Solution**: Assurez-vous que le fichier Excel est au format .xlsx, .xls ou .csv et contient des données dans la première colonne.

### Problème: L'envoi d'email échoue
**Solution**: Vérifiez votre configuration EmailJS et votre connexion internet. Assurez-vous que les clés API sont correctes.

### Problème: L'export Excel ne fonctionne pas
**Solution**: Vérifiez que la bibliothèque XLSX est correctement chargée depuis le CDN.

## 📱 Compatibilité

### Navigateurs Supportés
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

### Résolutions
- Desktop: 1024x768 minimum
- Tablet: 768x1024 minimum
- Mobile: 375x667 minimum (responsive)

## 🔒 Sécurité

### Données
- Les données sont stockées localement dans le localStorage
- Aucune donnée n'est envoyée à des serveurs tiers (sauf EmailJS)
- Les emails sont envoyés via EmailJS sécurisé

### Recommandations
- Utiliser HTTPS en production
- Valider les données côté serveur
- Implémenter une authentification pour l'accès

## 📞 Support

Pour toute question ou problème, contactez l'administrateur système.

## 📝 Changelog

### Version 1.0 (2026-06-30)
- Création initiale du formulaire
- Implémentation des cascades
- Import Excel des gestionnaires
- Envoi par EmailJS
- Export Excel
- Boutons radio colorés
- Interface responsive avec Tailwind CSS
