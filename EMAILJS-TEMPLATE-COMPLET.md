# Template EmailJS Complet avec toutes les informations

## 📧 Template complet pour les devis détaillés

### Sujet :
```
Nouvelle demande de devis - {{package_title}}
```

### Corps HTML complet :
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
        .package-info { background: #e8f4fd; border-left-color: #4a90e2; }
        .client-info { background: #f0f8f0; border-left-color: #28a745; }
        .project-info { background: #fff3cd; border-left-color: #ffc107; }
        .message-box { background: #f8d7da; border-left-color: #dc3545; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #666; font-size: 12px; }
        .highlight { background: #4a90e2; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold; }
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
        <p><span class="label">Prix indicatif :</span> <strong>€{{package_price}}</strong></p>
        <p><span class="label">Délai estimé :</span> {{package_period}}</p>
        <p><span class="label">Fonctionnalités :</span> {{package_features}}</p>
    </div>

    <div class="section client-info">
        <h2>👤 Informations client</h2>
        <p><span class="label">Nom complet :</span> {{from_name}}</p>
        <p><span class="label">Email :</span> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
        <p><span class="label">Téléphone :</span> {{phone}}</p>
        <p><span class="label">Entreprise :</span> {{company}}</p>
        <p><span class="label">Site web existant :</span> {{website}}</p>
    </div>

    <div class="section project-info">
        <h2>🎯 Détails du projet</h2>
        <p><span class="label">Budget approximatif :</span> {{budget}}</p>
        <p><span class="label">Délai souhaité :</span> {{timeline}}</p>
        <p><span class="label">Type de projet :</span> {{project_type}}</p>
        <p><span class="label">Public cible :</span> {{target_audience}}</p>
        <p><span class="label">Sites concurrents :</span> {{competitors}}</p>
    </div>

    <div class="section message-box">
        <h2>💬 Message du client</h2>
        <p style="background: white; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
            {{message}}
        </p>
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

## ✅ Variables utilisées dans le template :

### Informations de base :
- `{{from_name}}` - Nom complet du client
- `{{from_email}}` - Email du client
- `{{phone}}` - Téléphone du client
- `{{company}}` - Entreprise du client
- `{{website}}` - Site web existant

### Détails du projet :
- `{{budget}}` - Budget approximatif
- `{{timeline}}` - Délai souhaité
- `{{project_type}}` - Type de projet
- `{{target_audience}}` - Public cible
- `{{competitors}}` - Sites concurrents

### Formule sélectionnée :
- `{{package_title}}` - Titre de la formule
- `{{package_price}}` - Prix de la formule
- `{{package_period}}` - Délai de livraison
- `{{package_features}}` - Liste des fonctionnalités

### Autres :
- `{{message}}` - Message du client
- `{{timestamp}}` - Date et heure

## 🎯 Instructions :

1. **Copiez ce template** dans EmailJS
2. **Sauvegardez-le** avec le nom "Devis Complet"
3. **Testez** avec le formulaire agrandi
4. **Vérifiez** que toutes les informations arrivent bien

Maintenant vous aurez toutes les informations nécessaires pour faire un devis précis ! 🚀
