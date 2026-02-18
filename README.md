# 🎯 Pilote Tes Rêves - Application de Gestion de Budget

Une application web moderne et intuitive pour gérer votre budget et atteindre vos rêves financiers.

![Pilote Tes Rêves](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC)

## 📋 Fonctionnalités

### 🚀 Configuration Initiale
- **Import Excel** : Chargez votre budget depuis un fichier Excel
- **Saisie manuelle** : Créez votre budget directement dans l'application
- **Périodes flexibles** : Gérez votre budget mensuel, semestriel ou annuel
- **Conversion automatique** : Les montants sont automatiquement convertis selon la période choisie

### 💼 Tableau de Bord
- **Indicateurs financiers en temps réel** :
  - Total des recettes
  - Total des dépenses
  - Solde actuel
  - Montant des économies
- **Saisie rapide des dépenses** avec formulaire intuitif
- **Suivi des 3 premiers rêves** avec barres de progression
- **Historique des dépenses** avec vue détaillée

### 🌟 Messages Motivants
L'application vous encourage automatiquement :
- 🎉 Quand vous atteignez un objectif
- 💪 Quand vos économies augmentent de 10%+
- ⚠️ Alertes bienveillantes si vous vous éloignez de vos objectifs

### 💭 Gestion des Rêves
- **Définissez jusqu'à 3+ rêves** avec descriptions personnalisées
- **Objectifs individuels** : Un montant cible par rêve
- **Objectif global** : Un seul objectif d'épargne pour tous vos rêves
- **Citations inspirantes** qui changent automatiquement
- **Barres de progression visuelles** pour chaque rêve

## 🛠️ Technologies Utilisées

- **React 18.2** - Framework JavaScript moderne
- **Vite 5.0** - Build tool ultra-rapide
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **xlsx (SheetJS)** - Lecture/écriture de fichiers Excel
- **Lucide React** - Icônes modernes et élégantes
- **LocalStorage** - Stockage des données dans le navigateur

## 📦 Installation

### Prérequis
- Node.js 16+ et npm

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone https://github.com/glad-cyber-hisseFR/Pilote-Tes-reves-Budget.git
cd Pilote-Tes-reves-Budget
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer l'application en mode développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 🏗️ Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

Pour prévisualiser le build :
```bash
npm run preview
```

## 📁 Structure du Projet

```
Pilote-Tes-reves-Budget/
├── index.html                 # Point d'entrée HTML
├── package.json              # Dépendances et scripts
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind CSS
├── postcss.config.js        # Configuration PostCSS
├── src/
│   ├── main.jsx             # Point d'entrée React
│   ├── App.jsx              # Composant principal avec navigation
│   ├── index.css            # Styles globaux et Tailwind
│   ├── components/
│   │   ├── OnboardingPage.jsx        # Configuration initiale
│   │   ├── Dashboard.jsx             # Tableau de bord principal
│   │   ├── DreamsPage.jsx            # Gestion des rêves
│   │   ├── ExpenseForm.jsx           # Formulaire de dépenses
│   │   ├── BudgetUpload.jsx          # Upload Excel
│   │   ├── FinancialCard.jsx         # Cartes d'indicateurs
│   │   ├── ProgressBar.jsx           # Barres de progression
│   │   ├── MotivationalMessage.jsx   # Messages motivants
│   │   └── InspirationalQuote.jsx    # Citations inspirantes
│   ├── utils/
│   │   ├── localStorage.js           # Gestion du stockage
│   │   ├── excelParser.js            # Parser Excel
│   │   └── calculations.js           # Calculs financiers
│   └── data/
│       └── quotes.js                 # Citations inspirantes
└── README.md
```

## 📊 Format du Fichier Excel

Le fichier Excel doit contenir les colonnes suivantes :

| Catégorie    | Montant | Période    |
|-------------|---------|------------|
| Loyer       | 800     | mensuel    |
| Alimentation| 400     | mensuel    |
| Transport   | 150     | mensuel    |
| Assurance   | 600     | semestriel |
| Salaire     | 24000   | annuel     |

### Télécharger un template Excel
Un bouton dans l'interface permet de télécharger un modèle Excel prérempli.

## 💾 Stockage des Données

Toutes les données sont stockées localement dans le navigateur (LocalStorage) :
- ✅ Vos données restent **privées**
- ✅ Aucune connexion serveur requise
- ✅ Fonctionne **hors ligne** (après premier chargement)
- ⚠️ Les données sont liées au navigateur (effacer le cache = perte de données)

### Structure des données
```javascript
{
  user: {
    hasCompletedOnboarding: boolean,
    budgetPeriod: 'mensuel' | 'semestriel' | 'annuel'
  },
  budget: {
    categories: Array,
    totalIncome: number
  },
  expenses: Array,
  savings: number,
  dreams: Array,
  globalSavingsGoal: number | null,
  previousSavings: number
}
```

## 🎨 Personnalisation

### Couleurs du thème
Les couleurs sont définies dans `tailwind.config.js` :
- **Primary (Bleu)** : `#3B82F6` - Confiance, stabilité
- **Success (Vert)** : `#10B981` - Objectifs atteints
- **Alert (Orange)** : `#F59E0B` - Avertissements
- **Accent (Violet)** : `#8B5CF6` - Rêves, inspiration

### Ajouter des citations
Modifiez le fichier `src/data/quotes.js` pour ajouter vos propres citations inspirantes.

## 🔒 Sécurité et Confidentialité

- ✅ Toutes les données sont stockées **localement**
- ✅ Aucune connexion à un serveur externe
- ✅ Aucune collecte de données personnelles
- ✅ Code open source et auditable

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**glad-cyber-hisseFR**

## 🙏 Remerciements

- Icons par [Lucide](https://lucide.dev/)
- Bibliothèque Excel par [SheetJS](https://sheetjs.com/)
- Framework CSS par [Tailwind CSS](https://tailwindcss.com/)

---

**💫 Pilote Tes Rêves - Maîtrise ton budget, atteins tes rêves ! 💫**