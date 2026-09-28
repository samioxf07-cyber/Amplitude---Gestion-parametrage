# Configuration EmailJS - Envoi d'Emails

Ce guide explique comment configurer la fonctionnalité d'envoi d'emails pour le formulaire de gestion interim.

## 📧 Étape 1: Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre adresse email

## 🔧 Étape 2: Configurer le Service Email

1. Connectez-vous à votre dashboard EmailJS
2. Cliquez sur **"Email Services"** dans le menu
3. Cliquez sur **"Add New Service"**
4. Choisissez votre service email (Gmail, Outlook, etc.)
5. Suivez les instructions pour connecter votre compte email
6. Notez votre **Service ID** (ex: `service_abc123`)

## 📝 Étape 3: Créer un Template d'Email

1. Cliquez sur **"Email Templates"** dans le menu
2. Cliquez sur **"Create New Template"**
3. Donnez un nom à votre template (ex: `gestion-interim-form`)
4. Utilisez ce contenu HTML pour le template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{subject}}</title>
</head>
<body>
    {{{html_content}}}
</body>
</html>
```

5. Dans la section **"To Email"**, mettez: `{{to_email}}`
6. Dans la section **"Subject"**, mettez: `{{subject}}`
7. Notez votre **Template ID** (ex: `template_xyz789`)

## 🔑 Étape 4: Obtenir votre Clé Publique

1. Cliquez sur **"Account"** → **"API Keys"**
2. Copiez votre **Public Key**
3. Gardez-la en sécurité

## ⚙️ Étape 5: Configurer le Formulaire

Ouvrez le fichier `script.js` et remplacez les valeurs dans la configuration:

```javascript
// Remplacer ces lignes (lignes 570-578)
(function() {
    emailjs.init("VOTRE_CLÉ_PUBLIQUE_ICI"); // Étape 4
})();

const EMAIL_CONFIG = {
    SERVICE_ID: 'VOTRE_SERVICE_ID_ICI',    // Étape 2
    TEMPLATE_ID: 'VOTRE_TEMPLATE_ID_ICI',  // Étape 3
    RECIPIENT_EMAIL: 'votre-email@exemple.com' // Email de destination
};
```

## 🧪 Étape 6: Tester

1. Ouvrez `index.html` dans votre navigateur
2. Remplissez le formulaire
3. Cliquez sur "Enregistrer"
4. Le bouton "Envoyer par Email" apparaîtra
5. Cliquez dessus pour tester l'envoi

## 📋 Contenu de l'Email

L'email envoyé contient:

### 📋 Structure
- **En-tête** avec titre et date
- **Section Incident** (date, type, statut, observations)
- **Section Localisation** (région, supervision, branche)
- **Section Champs Additionnels** (si présents)
- **Pied de page** avec informations

### 🎨 Design
- Design responsive moderne
- Couleurs par section (rouge pour incident, bleu pour localisation, vert pour additionnels)
- Badges de statut visuels
- Tableaux structurés

## 🔍 Dépannage

### Problèmes courants:

**"Email non envoyé"**
- Vérifiez votre connexion internet
- Vérifiez que vos IDs sont corrects
- Regardez la console du navigateur (F12) pour les erreurs

**"Template non trouvé"**
- Vérifiez que le Template ID est correct
- Assurez-vous que le template est publié

**"Service non autorisé"**
- Vérifiez que le service email est correctement configuré
- Essayez de reconnecter votre service email

### Aide supplémentaire:
- Documentation EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

## 📊 Limitations du Plan Gratuit

- **200 emails/mois** maximum
- **1 service email** maximum
- **10 templates** maximum
- **Pas de pièces jointes** (nécessite plan payant)

Pour une utilisation professionnelle, envisagez le plan payant EmailJS.

## 🔒 Sécurité

- Votre clé publique est visible dans le code source
- Ne mettez jamais de clés privées dans le code
- Le service EmailJS protège votre email personnel
- Les templates sont sécurisés côté serveur
