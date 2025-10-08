# Template EmailJS Simplifié (pour éviter l'erreur 422)

## 🔧 Template de base (sans variables complexes)

### Sujet :
```
Nouvelle demande de devis - {{package_title}}
```

### Corps HTML simple :
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #667eea; color: white; padding: 20px; text-align: center; }
        .section { background: #f8f9fa; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
        .label { font-weight: bold; color: #667eea; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Nouvelle demande de devis</h1>
    </div>

    <div class="section">
        <h2>Formule sélectionnée</h2>
        <p><span class="label">Formule :</span> {{package_title}}</p>
        <p><span class="label">Prix :</span> {{package_price}}</p>
        <p><span class="label">Période :</span> {{package_period}}</p>
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

## 🚨 Causes possibles de l'erreur 422 :

### 1. **Variables manquantes dans le template**
- Vérifiez que toutes les variables `{{variable}}` existent dans votre template EmailJS
- Assurez-vous qu'il n'y a pas de variables en double ou mal nommées

### 2. **Format des données**
- Les variables doivent être des chaînes de caractères
- Évitez les caractères spéciaux non échappés

### 3. **Template non sauvegardé**
- Assurez-vous d'avoir sauvegardé votre template dans EmailJS
- Vérifiez que le Template ID correspond bien

### 4. **Service non configuré**
- Vérifiez que votre service email est bien configuré
- Testez le service avec un email simple

## 🔍 Debugging :

1. **Ouvrez la console** du navigateur (F12)
2. **Essayez d'envoyer** le formulaire
3. **Regardez les logs** dans la console :
   - `Données EmailJS:` - Vérifiez les identifiants
   - `templateParams:` - Vérifiez les données envoyées
   - `Erreur détaillée:` - Message d'erreur spécifique

## ✅ Checklist de vérification :

- [ ] Service ID correct dans EmailJS
- [ ] Template ID correct dans EmailJS  
- [ ] Public Key correct dans EmailJS
- [ ] Template sauvegardé dans EmailJS
- [ ] Service email configuré et testé
- [ ] Toutes les variables du template existent
- [ ] Pas de caractères spéciaux dans les variables

## 🎯 Solution rapide :

1. **Utilisez le template simplifié** ci-dessus
2. **Testez avec des données simples** d'abord
3. **Vérifiez les logs** dans la console
4. **Ajustez selon les erreurs** spécifiques

L'erreur 422 devrait maintenant être plus claire avec les logs détaillés ! 🔍
