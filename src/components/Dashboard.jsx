import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp, TrendingDown, DollarSign, PiggyBank, Wallet } from 'lucide-react';
import FinancialCard from './FinancialCard';
import ExpenseForm from './ExpenseForm';
import IncomeEntryForm from './IncomeEntryForm';
import ReserveForm from './ReserveForm';
import ProgressBar from './ProgressBar';
import MotivationalMessage from './MotivationalMessage';
import { getData, saveExpense, saveIncomeEntry, saveReserve, updateSavings } from '../utils/localStorage';
import { 
  getFinancialStats, 
  calculateDreamProgress,
  calculateDreamReserves,
  calculateSavingsVariation,
  isDreamAchieved
} from '../utils/calculations';

const Dashboard = () => {
  const [data, setData] = useState(getData());
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showReserveForm, setShowReserveForm] = useState(false);
  const [stats, setStats] = useState(null);
  const [motivationalMessages, setMotivationalMessages] = useState([]);

  useEffect(() => {
    updateStats();
  }, [data]);

  const updateStats = () => {
    const incomeEntries = data.incomeEntries || [];
    const reserves = data.reserves || [];
    const financialStats = getFinancialStats(data.budget, data.expenses, incomeEntries, reserves);
    setStats(financialStats);

    // Mettre à jour les économies
    if (financialStats.savings !== data.savings) {
      updateSavings(financialStats.savings);
      checkForMotivationalMessages(financialStats.savings);
    }
  };

  const checkForMotivationalMessages = (currentSavings) => {
    const messages = [];

    // Vérifier si un rêve est atteint
    data.dreams.forEach(dream => {
      if (dream.targetAmount && !dream.achieved && isDreamAchieved(currentSavings, dream.targetAmount)) {
        messages.push({
          type: 'success',
          message: `🎉 Bravo ! Tu as atteint ton objectif "${dream.name}" !`
        });
      }
    });

    // Vérifier la variation des économies
    const variation = calculateSavingsVariation(currentSavings, data.previousSavings);
    
    if (variation >= 10) {
      messages.push({
        type: 'encouragement',
        message: 'Bravo 🎉 tu es en bonne voie vers tes rêves !'
      });
    } else if (variation <= -10) {
      messages.push({
        type: 'warning',
        message: '⚠️ Attention, tu t\'éloignes de tes rêves...'
      });
    }

    if (messages.length > 0) {
      setMotivationalMessages(messages);
    }
  };

  const handleAddExpense = (expense) => {
    saveExpense(expense);
    setData(getData());
    setShowExpenseForm(false);
  };

  const handleAddIncome = (incomeEntry) => {
    saveIncomeEntry(incomeEntry);
    setData(getData());
    setShowIncomeForm(false);
  };

  const handleAddReserve = (reserve) => {
    saveReserve(reserve);
    setData(getData());
    setShowReserveForm(false);
  };

  const handleCloseMessage = (index) => {
    setMotivationalMessages(prev => prev.filter((_, i) => i !== index));
  };

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tableau de Bord
          </h1>
          <p className="text-gray-600">
            Vue d'ensemble de vos finances
          </p>
        </div>

        {/* Messages motivants */}
        <div className="mb-6">
          {motivationalMessages.map((msg, index) => (
            <MotivationalMessage
              key={index}
              type={msg.type}
              message={msg.message}
              onClose={() => handleCloseMessage(index)}
            />
          ))}
        </div>

        {/* Boutons d'ajout */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowExpenseForm(true)}
            className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Ajouter une dépense
          </button>
          <button
            onClick={() => setShowIncomeForm(true)}
            className="flex-1 sm:flex-none px-6 py-3 bg-success text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Ajouter une entrée d'argent
          </button>
          <button
            onClick={() => setShowReserveForm(true)}
            className="flex-1 sm:flex-none px-6 py-3 bg-accent text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Ajouter une réserve
          </button>
        </div>

        {/* Indicateurs financiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <FinancialCard
            title="Total des Recettes"
            amount={stats.totalIncome}
            icon={<DollarSign />}
            color="primary"
          />
          <FinancialCard
            title="Total des Dépenses"
            amount={stats.totalExpenses}
            icon={<Wallet />}
            color="alert"
          />
          <FinancialCard
            title="Solde"
            amount={stats.balance}
            icon={stats.balance >= 0 ? <TrendingUp /> : <TrendingDown />}
            color={stats.balance >= 0 ? 'success' : 'alert'}
          />
          <FinancialCard
            title="Économies"
            amount={stats.savings}
            icon={<PiggyBank />}
            color="accent"
          />
        </div>

        {/* Progression des rêves */}
        {data.dreams.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Progression de vos rêves
            </h2>
            <div className="space-y-6">
              {data.dreams.slice(0, 3).map((dream, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-700">{dream.name}</h3>
                    {dream.targetAmount && (
                      <span className="text-sm text-gray-600">
                        {calculateDreamReserves(data.reserves || [], dream.id).toFixed(2)} € / {dream.targetAmount.toFixed(2)} €
                      </span>
                    )}
                  </div>
                  <ProgressBar
                    progress={dream.targetAmount ? calculateDreamProgress(calculateDreamReserves(data.reserves || [], dream.id), dream.targetAmount) : 0}
                    color="accent"
                    showPercentage={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liste des dernières dépenses */}
        {data.expenses.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Dernières dépenses
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Catégorie</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Description</th>
                    <th className="text-right py-3 px-4 text-gray-600 font-medium">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {data.expenses.slice(-10).reverse().map((expense, index) => (
                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-700">
                        {new Date(expense.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{expense.category}</td>
                      <td className="py-3 px-4 text-gray-600">{expense.description || '-'}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">
                        {expense.amount.toFixed(2)} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Formulaire d'ajout de dépense */}
      {showExpenseForm && (
        <ExpenseForm
          categories={data.budget.categories}
          onSubmit={handleAddExpense}
          onClose={() => setShowExpenseForm(false)}
        />
      )}

      {/* Formulaire d'ajout d'entrée d'argent */}
      {showIncomeForm && (
        <IncomeEntryForm
          onSubmit={handleAddIncome}
          onClose={() => setShowIncomeForm(false)}
        />
      )}

      {/* Formulaire d'ajout de réserve */}
      {showReserveForm && (
        <ReserveForm
          dreams={data.dreams}
          onSubmit={handleAddReserve}
          onClose={() => setShowReserveForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
