# Template EmailJS Ultra-Simple (pour tester)

## 🧪 Template de test minimal

### Sujet :
```
Test EmailJS - {{from_name}}
```

### Corps HTML minimal :
```html
<!DOCTYPE html>
<html>
<body>
    <h1>Test EmailJS</h1>
    
    <h2>Informations de base</h2>
    <p><strong>Nom:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    
    <h2>Formule</h2>
    <p><strong>Formule:</strong> {{package_title}}</p>
    <p><strong>Prix:</strong> {{package_price}}</p>
    
    <h2>Message</h2>
    <p>{{message}}</p>
    
    <hr>
    <p><em>Envoyé le {{timestamp}}</em></p>
</body>
</html>
```

## 🔧 Configuration EmailJS étape par étape

### 1. Créer le service
- Allez sur [EmailJS.com](https://www.emailjs.com/)
- Connectez-vous ou créez un compte
- Allez dans "Email Services"
- Cliquez "Add New Service"
- Choisissez "Gmail" (ou votre fournisseur)
- Connectez votre compte Gmail
- Notez le **Service ID** (ex: `service_abc123`)

### 2. Créer le template
- Allez dans "Email Templates"
- Cliquez "Create New Template"
- Nom: "Test Portfolio"
- **Sujet:** `Test EmailJS - {{from_name}}`
- **Corps:** Copiez le HTML ci-dessus
- **From Name:** Votre nom
- **From Email:** Votre adresse email
- **To Email:** Votre adresse email (pour recevoir les tests)
- Cliquez "Save"
- Notez le **Template ID** (ex: `template_xyz789`)

### 3. Obtenir la clé publique
- Allez dans "Account" > "General"
- Copiez votre **Public Key** (ex: `user_abc123def456`)

### 4. Configurer le fichier
Modifiez `client/src/config/emailjs.js` :
```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_votre_id_ici',
  templateId: 'template_votre_id_ici', 
  publicKey: 'votre_public_key_ici'
};
```

### 5. Tester
- Ouvrez la console du navigateur (F12)
- Essayez d'envoyer le formulaire
- Regardez les logs dans la console
- Vérifiez votre boîte email

## 🚨 Erreur 422 - Causes communes

### 1. **Template non sauvegardé**
- Assurez-vous d'avoir cliqué "Save" dans EmailJS
- Vérifiez que le Template ID est correct

### 2. **Variables manquantes**
- Le template doit contenir exactement les variables envoyées
- Vérifiez l'orthographe : `{{from_name}}` et non `{{fromName}}`

### 3. **Service non activé**
- Vérifiez que votre service email est bien connecté
- Testez le service avec un email simple

### 4. **Identifiants incorrects**
- Service ID doit commencer par `service_`
- Template ID doit commencer par `template_`
- Public Key doit commencer par `user_`

## ✅ Checklist de vérification

- [ ] Compte EmailJS créé
- [ ] Service Gmail connecté et activé
- [ ] Template créé et sauvegardé
- [ ] Service ID copié correctement
- [ ] Template ID copié correctement  
- [ ] Public Key copié correctement
- [ ] Fichier `emailjs.js` mis à jour
- [ ] Console ouverte pour voir les logs
- [ ] Test avec des données simples

## 🎯 Prochaines étapes

1. **Configurez EmailJS** avec le template simple
2. **Testez** avec des données basiques
3. **Regardez les logs** dans la console
4. **Ajustez** selon les erreurs spécifiques
5. **Une fois que ça marche**, utilisez le template complet

Le template simple devrait éviter l'erreur 422 ! 🚀
