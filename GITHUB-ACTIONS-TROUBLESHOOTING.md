# 🔧 Dépannage GitHub Actions - Vercel Deployment

## ❌ Erreur : `Input required and not supplied: vercel-token`

### ✅ Vérifications à faire :

#### 1. **Secrets GitHub correctement configurés**

Vérifiez que les 3 secrets sont bien créés dans GitHub :

1. Allez sur votre repo GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Vérifiez que ces 3 secrets existent (avec exactement ces noms) :
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

⚠️ **Important** : Les noms doivent être EXACTEMENT comme ci-dessus (majuscules, underscores).

#### 2. **Où trouver ces valeurs :**

**VERCEL_TOKEN :**
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur votre avatar (en haut à droite)
3. **Settings** → **Tokens**
4. Cliquez sur **Create Token**
5. Donnez-lui un nom (ex: "GitHub Actions")
6. Copiez le token (vous ne pourrez plus le voir après)

**VERCEL_ORG_ID :**
1. Sur Vercel, allez dans **Settings** → **General**
2. Dans la section **Team ID** ou **Organization ID**, copiez l'ID

**VERCEL_PROJECT_ID :**
1. Allez dans votre projet Portfolio sur Vercel
2. **Settings** → **General**
3. Dans la section **Project ID**, copiez l'ID

#### 3. **Vérifier que les secrets ne sont pas vides :**

1. Dans GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Vérifiez que chaque secret a bien une valeur (vous ne pouvez pas voir la valeur, mais vérifiez qu'ils existent)
3. Si nécessaire, supprimez et recréez-les

#### 4. **Vérifier les permissions du workflow :**

1. Allez dans **Settings** → **Actions** → **General**
2. Vérifiez que **Workflow permissions** est sur :
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**

#### 5. **Réessayer après modification :**

1. Faites un nouveau commit et push
2. Ou allez dans **Actions** → Cliquez sur votre workflow → **Re-run jobs**

### 🔍 Debug supplémentaire

Si ça ne fonctionne toujours pas, ajoutez cette étape de debug dans votre workflow (temporairement) :

```yaml
- name: 🔍 Debug secrets
  run: |
    echo "VERCEL_TOKEN exists: ${{ secrets.VERCEL_TOKEN != '' }}"
    echo "VERCEL_ORG_ID exists: ${{ secrets.VERCEL_ORG_ID != '' }}"
    echo "VERCEL_PROJECT_ID exists: ${{ secrets.VERCEL_PROJECT_ID != '' }}"
```

⚠️ **À supprimer après** car cela peut exposer des informations sensibles.

### ✅ Solution alternative : Utiliser les variables d'environnement

Si les secrets ne fonctionnent toujours pas, vous pouvez aussi ajouter `env:` dans la section du job :

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

Et dans l'action Vercel :

```yaml
- name: 🚀 Deploy to Vercel
  uses: amondnet/vercel-action@v25
  with:
    vercel-token: ${{ env.VERCEL_TOKEN }}
    vercel-org-id: ${{ env.VERCEL_ORG_ID }}
    vercel-project-id: ${{ env.VERCEL_PROJECT_ID }}
```

### 📞 Problèmes persistants

Si rien ne fonctionne :
1. Vérifiez les logs complets dans **Actions** → Votre workflow → Cliquez sur le job qui échoue
2. Vérifiez que vous utilisez la bonne version de l'action : `amondnet/vercel-action@v25`
3. Essayez avec une version plus récente si disponible

