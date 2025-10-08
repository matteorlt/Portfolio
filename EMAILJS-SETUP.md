# Configuration EmailJS pour le formulaire de devis

## 📧 Configuration requise

Pour que le formulaire de devis fonctionne, vous devez configurer EmailJS :

### 1. Créer un compte EmailJS
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Créez un compte gratuit
- Connectez votre service email (Gmail, Outlook, etc.)

### 2. Créer un service email
- Dans EmailJS, allez dans "Email Services"
- Ajoutez votre service email (Gmail recommandé)
- Notez le **Service ID**

### 3. Créer un template email
- Allez dans "Email Templates"
- Créez un nouveau template avec ces variables :
  - `{{from_name}}` - Nom du client
  - `{{from_email}}` - Email du client
  - `{{phone}}` - Téléphone
  - `{{company}}` - Entreprise
  - `{{message}}` - Message
  - `{{package_title}}` - Formule sélectionnée
  - `{{package_price}}` - Prix de la formule
  - `{{package_period}}` - Période de livraison
  - `{{package_features}}` - Fonctionnalités
  - `{{timestamp}}` - Date/heure

### 4. Obtenir la clé publique
- Allez dans "Account" > "General"
- Copiez votre **Public Key**

### 5. Configurer le fichier
Modifiez `client/src/config/emailjs.js` :

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_xxxxxxxxx', // Votre Service ID
  templateId: 'template_xxxxxxxxx', // Votre Template ID
  publicKey: 'your_public_key_here' // Votre Public Key
};
```

## 📝 Template email recommandé

**Sujet :** Nouvelle demande de devis - {{package_title}}

**Corps :**
```
Nouvelle demande de devis

FORMULE SÉLECTIONNÉE:
{{package_title}} (€{{package_price}})
Période: {{package_period}}

INFORMATIONS CLIENT:
- Nom: {{from_name}}
- Email: {{from_email}}
- Téléphone: {{phone}}
- Entreprise: {{company}}

MESSAGE:
{{message}}

FONCTIONNALITÉS DE LA FORMULE:
{{package_features}}

---
Demande envoyée le {{timestamp}}
```

## ✅ Avantages d'EmailJS

- ✅ Fonctionne côté client (pas de serveur nécessaire)
- ✅ Gratuit jusqu'à 200 emails/mois
- ✅ Fiable et sécurisé
- ✅ Compatible avec tous les hébergeurs statiques
- ✅ Pas de configuration serveur requise
