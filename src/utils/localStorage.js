// Gestion du stockage local des données
const STORAGE_KEY = 'pilote-tes-reves-data';

// Structure des données par défaut
const defaultData = {
  user: {
    hasCompletedOnboarding: false,
    budgetPeriod: 'mensuel'
  },
  budget: {
    categories: [],
    totalIncome: 0
  },
  expenses: [],
  incomeEntries: [], // Nouvelles entrées d'argent
  reserves: [], // Réserves d'économies
  savings: 0,
  dreams: [],
  globalSavingsGoal: null,
  categoryGoals: [],
  previousSavings: 0 // Pour calculer la variation
};

// Récupérer toutes les données
export const getData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { ...defaultData };
  } catch (error) {
    console.error('Erreur lors de la lecture des données:', error);
    return { ...defaultData };
  }
};

// Sauvegarder toutes les données
export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des données:', error);
    return false;
  }
};

// Mettre à jour une partie des données
export const updateData = (updates) => {
  const currentData = getData();
  const newData = { ...currentData, ...updates };
  return saveData(newData);
};

// Réinitialiser les données
export const resetData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    return false;
  }
};

// Fonctions spécifiques pour chaque type de données

export const saveBudget = (budget) => {
  const data = getData();
  data.budget = budget;
  return saveData(data);
};

export const saveExpense = (expense) => {
  const data = getData();
  data.expenses.push({
    ...expense,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
  });
  return saveData(data);
};

export const deleteExpense = (expenseId) => {
  const data = getData();
  data.expenses = data.expenses.filter(e => e.id !== expenseId);
  return saveData(data);
};

export const saveIncomeEntry = (incomeEntry) => {
  const data = getData();
  if (!data.incomeEntries) {
    data.incomeEntries = [];
  }
  data.incomeEntries.push({
    ...incomeEntry,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
  });
  return saveData(data);
};

export const deleteIncomeEntry = (incomeId) => {
  const data = getData();
  if (data.incomeEntries) {
    data.incomeEntries = data.incomeEntries.filter(e => e.id !== incomeId);
  }
  return saveData(data);
};

export const saveReserve = (reserve) => {
  const data = getData();
  if (!data.reserves) {
    data.reserves = [];
  }
  data.reserves.push({
    ...reserve,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11)
  });
  return saveData(data);
};

export const deleteReserve = (reserveId) => {
  const data = getData();
  if (data.reserves) {
    data.reserves = data.reserves.filter(e => e.id !== reserveId);
  }
  return saveData(data);
};

export const saveDreams = (dreams) => {
  const data = getData();
  data.dreams = dreams;
  return saveData(data);
};

export const completeOnboarding = (budgetPeriod = 'mensuel') => {
  const data = getData();
  data.user.hasCompletedOnboarding = true;
  data.user.budgetPeriod = budgetPeriod;
  return saveData(data);
};

export const updateSavings = (savings) => {
  const data = getData();
  data.previousSavings = data.savings; // Garder l'ancienne valeur
  data.savings = savings;
  return saveData(data);
};
