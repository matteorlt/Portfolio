# Template EmailJS de Test Simple

## 🧪 Template minimal pour tester

### Sujet :
```
Nouvelle demande de devis - {{package_title}}
```

### Corps HTML :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #4a90e2; color: white; padding: 20px; text-align: center; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #4a90e2; }
        .label { font-weight: bold; color: #4a90e2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouvelle demande de devis</h1>
    </div>

    <div class="section">
        <h2>Formule sélectionnée</h2>
        <p><span class="label">Formule :</span> {{package_title}}</p>
        <p><span class="label">Prix :</span> €{{package_price}}</p>
        <p><span class="label">Délai :</span> {{package_period}}</p>
    </div>

    <div class="section">
        <h2>Informations client</h2>
        <p><span class="label">Nom :</span> {{from_name}}</p>
        <p><span class="label">Email :</span> {{from_email}}</p>
        <p><span class="label">Téléphone :</span> {{phone}}</p>
        <p><span class="label">Entreprise :</span> {{company}}</p>
    </div>

    <div class="section">
        <h2>Message</h2>
        <p>{{message}}</p>
    </div>

    <div class="section">
        <h2>Fonctionnalités</h2>
        <p>{{package_features}}</p>
    </div>

    <div class="section">
        <p><strong>Demande envoyée le :</strong> {{timestamp}}</p>
    </div>
</body>
</html>
```

## ✅ Variables utilisées :
- `{{package_title}}` - Titre de la formule
- `{{package_price}}` - Prix de la formule  
- `{{package_period}}` - Délai de livraison
- `{{from_name}}` - Nom du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone du client
- `{{company}}` - Entreprise du client
- `{{message}}` - Message du client
- `{{package_features}}` - Liste des fonctionnalités
- `{{timestamp}}` - Date et heure

## 🎯 Instructions :
1. Copiez ce template dans EmailJS
2. Sauvegardez-le
3. Testez le formulaire
4. Vérifiez que l'email arrive bien
