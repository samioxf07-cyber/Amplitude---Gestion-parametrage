# Guide de Conversion MS Access vers JavaScript

## Vue d'ensemble

Ce guide vous explique comment exporter vos données depuis MS Access et les convertir en format JavaScript pour les intégrer dans votre application intranet.

## Étape 1: Export depuis MS Access

### Option A: Export en CSV (recommandé)

1. **Ouvrez votre base de données MS Access**
2. **Sélectionnez la table** que vous voulez exporter (ex: tblRegions)
3. **Clic droit** → "Export" → "Text File"
4. **Choisissez le format CSV**
5. **Spécifiez le chemin** de sauvegarde
6. **Cliquez sur "Finish"**

### Option B: Export en Excel

1. **Sélectionnez la table**
2. **Clic droit** → "Export" → "Excel"
3. **Sauvegardez le fichier** en .xlsx

## Étape 2: Conversion en JavaScript

### Structure des données attendue

Pour les régions:
```javascript
regions: [
    { id: 1, nom: 'Nom de la région' },
    { id: 2, nom: 'Nom de la région' }
]
```

Pour les supervisions:
```javascript
supervisions: {
    1: [
        { id: 1, nom: 'Nom de la supervision' },
        { id: 2, nom: 'Nom de la supervision' }
    ],
    2: [
        { id: 3, nom: 'Nom de la supervision' }
    ]
}
```

Pour les agences:
```javascript
agences: {
    1: [
        { id: 1, nom: 'Nom de l\'agence' },
        { id: 2, nom: 'Nom de l\'agence' }
    ]
}
```

### Méthode de conversion manuelle

#### Exemple: Table MS Access tblRegions

**Données MS Access:**
| ID | NomRegion |
|----|-----------|
| 1  | Région Nord |
| 2  | Région Sud |
| 3  | Région Oriental |

**Conversion JavaScript:**
```javascript
regions: [
    { id: 1, nom: 'Région Nord' },
    { id: 2, nom: 'Région Sud' },
    { id: 3, nom: 'Région Oriental' }
]
```

#### Exemple: Table MS Access tblSupervisions

**Données MS Access:**
| ID | RegionID | NomSupervision |
|----|----------|----------------|
| 1  | 1        | Supervision Tanger |
| 2  | 1        | Supervision Tétouan |
| 3  | 2        | Supervision Agadir |

**Conversion JavaScript:**
```javascript
supervisions: {
    1: [
        { id: 1, nom: 'Supervision Tanger' },
        { id: 2, nom: 'Supervision Tétouan' }
    ],
    2: [
        { id: 3, nom: 'Supervision Agadir' }
    ]
}
```

### Méthode de conversion automatique

#### Script Python pour conversion

Si vous avez beaucoup de données, utilisez ce script Python:

```python
import csv
import json

# Lire le fichier CSV exporté depuis MS Access
def csv_to_js_array(csv_file, id_field, name_field):
    data = []
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            data.append({
                'id': int(row[id_field]),
                'nom': row[name_field]
            })
    return data

# Pour les supervisions (avec relation parent-enfant)
def csv_to_js_nested(csv_file, parent_field, id_field, name_field):
    data = {}
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            parent_id = int(row[parent_field])
            if parent_id not in data:
                data[parent_id] = []
            data[parent_id].append({
                'id': int(row[id_field]),
                'nom': row[name_field]
            })
    return data

# Exemple d'utilisation
regions = csv_to_js_array('regions.csv', 'ID', 'NomRegion')
supervisions = csv_to_js_nested('supervisions.csv', 'RegionID', 'ID', 'NomSupervision')
agences = csv_to_js_nested('agences.csv', 'SupervisionID', 'ID', 'NomAgence')

# Générer le code JavaScript
js_code = f"""const CASCADE_DATA = {{
    regions: {json.dumps(regions, ensure_ascii=False)},
    supervisions: {json.dumps(supervisions, ensure_ascii=False)},
    agences: {json.dumps(agences, ensure_ascii=False)}
}};"""

print(js_code)
```

## Étape 3: Intégration dans data.js

1. **Ouvrez le fichier** `data.js`
2. **Remplacez les données existantes** par vos nouvelles données converties
3. **Sauvegardez le fichier**

## Étape 4: Test

1. **Ouvrez** `index.html` dans votre navigateur
2. **Testez les menus déroulants** en cascade
3. **Vérifiez que toutes les données** s'affichent correctement

## Conseils

- **Gardez une sauvegarde** de votre fichier data.js original
- **Testez avec un petit échantillon** de données d'abord
- **Vérifiez les relations** entre les tables (RegionID, SupervisionID)
- **Assurez-vous que les IDs sont uniques** dans chaque catégorie
- **Utilisez des guillemets simples** pour les chaînes de caractères en JavaScript

## Dépannage

### Problème: Les données ne s'affichent pas
- **Vérifiez** que le fichier data.js est bien chargé dans intranet-formulaire.html
- **Vérifiez** la syntaxe JavaScript (pas d'erreurs de syntaxe)
- **Ouvrez la console** du navigateur pour voir les erreurs

### Problème: Les relations ne fonctionnent pas
- **Vérifiez** que les IDs correspondent entre les tables
- **Assurez-vous** que la structure des objets est correcte

### Problème: Caractères spéciaux
- **Utilisez l'encodage UTF-8** pour les fichiers CSV
- **Échappez les apostrophes** dans les noms (ex: `l'agence` → `l\'agence`)

## Support

Si vous rencontrez des problèmes lors de la conversion:
1. Exportez un échantillon de vos données
2. Partagez la structure de vos tables MS Access
3. Je pourrai vous aider à créer le script de conversion personnalisé
