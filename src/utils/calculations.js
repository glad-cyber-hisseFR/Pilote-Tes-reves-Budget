// Calculs financiers pour l'application

// Calculer le total des recettes
export const calculateTotalIncome = (categories) => {
  return categories.reduce((total, category) => {
    // On ne compte que les montants positifs comme recettes
    return total + (category.amount > 0 ? category.amount : 0);
  }, 0);
};

// Calculer le total des dépenses
export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculer le solde
export const calculateBalance = (totalIncome, totalExpenses) => {
  return totalIncome - totalExpenses;
};

// Calculer les économies (solde positif)
export const calculateSavings = (balance) => {
  return Math.max(0, balance);
};

// Calculer la progression d'un rêve
export const calculateDreamProgress = (currentSavings, targetAmount) => {
  if (targetAmount <= 0) return 0;
  return Math.min(100, (currentSavings / targetAmount) * 100);
};

// Calculer la variation des économies en pourcentage
export const calculateSavingsVariation = (currentSavings, previousSavings) => {
  if (previousSavings === 0) return currentSavings > 0 ? 100 : 0;
  return ((currentSavings - previousSavings) / previousSavings) * 100;
};

// Vérifier si un objectif est atteint
export const isDreamAchieved = (currentSavings, targetAmount) => {
  return currentSavings >= targetAmount;
};

// Calculer les dépenses par catégorie
export const calculateExpensesByCategory = (expenses) => {
  const byCategory = {};
  
  expenses.forEach(expense => {
    if (!byCategory[expense.category]) {
      byCategory[expense.category] = 0;
    }
    byCategory[expense.category] += expense.amount;
  });

  return byCategory;
};

// Calculer la progression d'une catégorie par rapport à son objectif
export const calculateCategoryProgress = (expenses, category, budgetAmount) => {
  const categoryExpenses = expenses
    .filter(e => e.category === category)
    .reduce((total, e) => total + e.amount, 0);

  if (budgetAmount <= 0) return 0;
  return (categoryExpenses / budgetAmount) * 100;
};

// Vérifier si une catégorie dépasse son budget
export const isCategoryOverBudget = (expenses, category, budgetAmount) => {
  const progress = calculateCategoryProgress(expenses, category, budgetAmount);
  return progress > 100;
};

// Calculer le montant restant dans une catégorie
export const calculateRemainingBudget = (expenses, category, budgetAmount) => {
  const categoryExpenses = expenses
    .filter(e => e.category === category)
    .reduce((total, e) => total + e.amount, 0);

  return budgetAmount - categoryExpenses;
};

// Formater un montant en euros
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

// Formater un pourcentage
export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
};

// Obtenir les statistiques globales
export const getFinancialStats = (budget, expenses) => {
  const totalIncome = calculateTotalIncome(budget.categories);
  const totalExpenses = calculateTotalExpenses(expenses);
  const balance = calculateBalance(totalIncome, totalExpenses);
  const savings = calculateSavings(balance);

  return {
    totalIncome,
    totalExpenses,
    balance,
    savings
  };
};
