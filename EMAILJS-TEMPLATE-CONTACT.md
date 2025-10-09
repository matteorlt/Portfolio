# Template EmailJS pour le formulaire de contact

## 📧 Sujet :
```
Nouveau message de contact - {{subject}}
```

## 📝 Corps HTML (copiez tout ça dans EmailJS) :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #4a90e2; }
        .label { font-weight: bold; color: #4a90e2; }
        .client-info { background: #f0f8f0; border-left-color: #28a745; }
        .message-box { background: #fff3cd; border-left-color: #ffc107; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📧 Nouveau message de contact</h1>
        <p>Portfolio Mattéo Rannou-Le Texier</p>
    </div>

    <div class="section client-info">
        <h2>👤 Informations de contact</h2>
        <p><span class="label">Nom :</span> {{from_name}}</p>
        <p><span class="label">Email :</span> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
        <p><span class="label">Sujet :</span> {{subject}}</p>
    </div>

    <div class="section message-box">
        <h2>💬 Message</h2>
        <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            {{message}}
        </p>
    </div>

    <div class="footer">
        <p><strong>📅 Message envoyé le :</strong> {{timestamp}}</p>
        <hr>
        <p><em>Email automatique généré par le formulaire de contact du portfolio</em></p>
        <p><strong>Mattéo Rannou-Le Texier</strong> - Développeur Web</p>
        <p>📧 matteo.rannou.letexier@gmail.com</p>
    </div>
</body>
</html>
```

## ✅ Variables utilisées dans le template :

### Informations de base :
- `{{from_name}}` - Nom complet du contact
- `{{from_email}}` - Email du contact
- `{{subject}}` - Sujet du message

### Message :
- `{{message}}` - Contenu du message

### Autres :
- `{{timestamp}}` - Date et heure

## 🎯 Instructions :

1. **Créez un nouveau template** dans EmailJS pour le contact
2. **Copiez le code HTML** ci-dessus
3. **Configurez l'expéditeur** : votre adresse email
4. **Configurez le destinataire** : votre adresse email
5. **Sauvegardez** avec le nom "Contact Portfolio"
6. **Notez le Template ID** pour l'utiliser dans le code

## 🔧 Configuration dans le code :

Vous devrez créer un deuxième template EmailJS avec un Template ID différent pour le formulaire de contact, ou utiliser le même template en adaptant les variables.

Le formulaire de contact utilisera les mêmes identifiants EmailJS que le formulaire de devis, mais avec des variables différentes.
