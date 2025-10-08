# Template EmailJS pour les demandes de devis

## 📧 Configuration du template dans EmailJS

### 1. Créer le template
- Allez dans EmailJS > "Email Templates"
- Cliquez sur "Create New Template"
- Nom : "Demande de devis Portfolio"

### 2. Sujet de l'email
```
Nouvelle demande de devis - {{package_title}}
```

### 3. Corps de l'email (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
        }
        .section {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 5px;
            border-left: 4px solid #667eea;
        }
        .label {
            font-weight: bold;
            color: #667eea;
        }
        .package-info {
            background: #e8f4fd;
            border-left-color: #4a90e2;
        }
        .client-info {
            background: #f0f8f0;
            border-left-color: #28a745;
        }
        .message-box {
            background: #fff3cd;
            border-left-color: #ffc107;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #666;
            font-size: 12px;
        }
        .highlight {
            background: #667eea;
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 Nouvelle demande de devis</h1>
        <p>Portfolio Mattéo Rannou-Le Texier</p>
    </div>

    <div class="section package-info">
        <h2>📦 Formule sélectionnée</h2>
        <p><span class="label">Formule :</span> <span class="highlight">{{package_title}}</span></p>
        <p><span class="label">Prix :</span> <strong>€{{package_price}}</strong></p>
        <p><span class="label">Période de livraison :</span> {{package_period}}</p>
    </div>

    <div class="section client-info">
        <h2>👤 Informations client</h2>
        <p><span class="label">Nom complet :</span> {{from_name}}</p>
        <p><span class="label">Email :</span> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
        <p><span class="label">Téléphone :</span> {{phone}}</p>
        <p><span class="label">Entreprise :</span> {{company}}</p>
    </div>

    <div class="section message-box">
        <h2>💬 Message du client</h2>
        <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            {{message}}
        </p>
    </div>

    <div class="section">
        <h2>⚡ Fonctionnalités incluses</h2>
        <p>{{package_features}}</p>
    </div>

    <div class="footer">
        <p><strong>📅 Demande envoyée le :</strong> {{timestamp}}</p>
        <hr>
        <p><em>Email automatique généré par le formulaire de devis du portfolio</em></p>
        <p><strong>Mattéo Rannou-Le Texier</strong> - Développeur Web</p>
        <p>📧 matteo.rannou.letexier@gmail.com</p>
    </div>
</body>
</html>
```

### 4. Version texte simple (alternative)
Si vous préférez un email en texte simple :

```
🎯 NOUVELLE DEMANDE DE DEVIS
Portfolio Mattéo Rannou-Le Texier

📦 FORMULE SÉLECTIONNÉE
Formule : {{package_title}}
Prix : €{{package_price}}
Période : {{package_period}}

👤 INFORMATIONS CLIENT
Nom : {{from_name}}
Email : {{from_email}}
Téléphone : {{phone}}
Entreprise : {{company}}

💬 MESSAGE DU CLIENT
{{message}}

⚡ FONCTIONNALITÉS INCLUSES
{{package_features}}

📅 Demande envoyée le : {{timestamp}}

---
Mattéo Rannou-Le Texier - Développeur Web
Email : matteo.rannou.letexier@gmail.com
```

### 5. Variables utilisées dans le template
- `{{from_name}}` - Nom complet du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone du client
- `{{company}}` - Entreprise du client
- `{{message}}` - Message du client
- `{{package_title}}` - Titre de la formule
- `{{package_price}}` - Prix de la formule
- `{{package_period}}` - Période de livraison
- `{{package_features}}` - Liste des fonctionnalités
- `{{timestamp}}` - Date et heure de la demande

### 6. Configuration dans EmailJS
1. Copiez le code HTML dans le template
2. Configurez l'expéditeur : votre adresse email
3. Configurez le destinataire : votre adresse email (pour recevoir les demandes)
4. Testez le template avec des données d'exemple
5. Sauvegardez et notez le Template ID

### 7. Exemple de données de test
```json
{
  "from_name": "Jean Dupont",
  "from_email": "jean.dupont@example.com",
  "phone": "06 12 34 56 78",
  "company": "Entreprise ABC",
  "message": "Bonjour, je souhaite créer un site web pour mon entreprise...",
  "package_title": "Formule Professionnelle",
  "package_price": "1500",
  "package_period": "4-6 semaines",
  "package_features": "Site responsive, SEO de base, Formulaire de contact, 5 pages",
  "timestamp": "15/12/2024 à 14:30"
}
```

Ce template créera un email professionnel et bien structuré pour vos demandes de devis ! 🎉
