# Images de Fond Personnalisées

## Comment ajouter vos propres images de fond

Cette application affiche une image de fond différente selon le sexe de l'utilisateur configuré lors de l'inscription.

### Images requises

1. **`background-male.jpg`** - Image de fond pour les utilisateurs masculins
2. **`background-female.jpg`** - Image de fond pour les utilisateurs féminins

### Instructions

1. Ajoutez vos images dans ce dossier (`public/images/`)
2. Nommez-les exactement comme indiqué ci-dessus
3. Format recommandé : JPG ou PNG
4. Taille recommandée : Minimum 1920x1080 pixels pour une bonne qualité sur tous les écrans
5. Poids du fichier : Essayez de garder les images en dessous de 2 MB pour des performances optimales

### Images par défaut

Si aucune image n'est fournie, l'application utilisera un dégradé de couleur par défaut :
- **Homme** : Dégradé bleu frais
- **Femme** : Dégradé rose/violet chaleureux

### Format des images

Les images seront affichées avec :
- Un overlay semi-transparent pour améliorer la lisibilité du texte
- Un effet de flou subtil en arrière-plan
- Couvrent tout l'écran (background-size: cover)
- Position fixe lors du défilement

### Conseils pour choisir vos images

- Privilégiez des images avec des zones calmes où le texte peut être lisible
- Évitez les images trop chargées ou avec trop de détails
- Des images avec des couleurs douces fonctionnent mieux
- L'application ajoute automatiquement un overlay pour améliorer le contraste

### Exemple de structure

```
public/
└── images/
    ├── README.md (ce fichier)
    ├── background-male.jpg (votre image pour homme)
    └── background-female.jpg (votre image pour femme)
```
