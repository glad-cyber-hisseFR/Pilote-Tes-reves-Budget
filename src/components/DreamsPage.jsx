import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Target } from 'lucide-react';
import InspirationalQuote from './InspirationalQuote';
import ProgressBar from './ProgressBar';
import Toast from './Toast';
import { getData, saveDreams, updateData } from '../utils/localStorage';
import { calculateDreamProgress, formatCurrency, getFinancialStats } from '../utils/calculations';

const DreamsPage = () => {
  const [data, setData] = useState(getData());
  const [dreams, setDreams] = useState(data.dreams || []);
  const [globalGoal, setGlobalGoal] = useState(data.globalSavingsGoal || '');
  const [useGlobalGoal, setUseGlobalGoal] = useState(data.globalSavingsGoal !== null);
  const [stats, setStats] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const financialStats = getFinancialStats(data.budget, data.expenses);
    setStats(financialStats);
  }, [data]);

  useEffect(() => {
    // Initialiser avec 3 rêves vides si aucun rêve n'existe
    if (dreams.length === 0) {
      setDreams([
        { id: '1', name: '', targetAmount: '', achieved: false },
        { id: '2', name: '', targetAmount: '', achieved: false },
        { id: '3', name: '', targetAmount: '', achieved: false }
      ]);
    }
  }, []);

  const handleDreamChange = (index, field, value) => {
    const updated = [...dreams];
    updated[index][field] = value;
    setDreams(updated);
  };

  const handleAddDream = () => {
    setDreams([
      ...dreams,
      { 
        id: Date.now().toString(), 
        name: '', 
        targetAmount: '', 
        achieved: false 
      }
    ]);
  };

  const handleRemoveDream = (index) => {
    if (dreams.length > 3) {
      setDreams(dreams.filter((_, i) => i !== index));
    }
  };

  const handleSave = () => {
    // Nettoyer les rêves vides
    const validDreams = dreams
      .filter(dream => dream.name.trim() !== '')
      .map(dream => ({
        ...dream,
        targetAmount: parseFloat(dream.targetAmount) || 0
      }));

    saveDreams(validDreams);

    // Sauvegarder l'objectif global
    const updatedData = getData();
    updatedData.globalSavingsGoal = useGlobalGoal ? parseFloat(globalGoal) || null : null;
    updateData(updatedData);

    setData(getData());
    setShowToast(true);
  };

  const calculateTotalTargetAmount = () => {
    return dreams.reduce((total, dream) => {
      return total + (parseFloat(dream.targetAmount) || 0);
    }, 0);
  };

  if (!stats) return null;

  const currentSavings = stats.savings;
  const totalTarget = useGlobalGoal 
    ? (parseFloat(globalGoal) || 0) 
    : calculateTotalTargetAmount();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {showToast && (
        <Toast
          message="Vos rêves ont été sauvegardés avec succès ! 🎉"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mes Rêves et Objectifs
          </h1>
          <p className="text-gray-600">
            Définissez vos rêves et suivez votre progression
          </p>
        </div>

        {/* Citation inspirante */}
        <div className="mb-8">
          <InspirationalQuote />
        </div>

        {/* Résumé des économies */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Vos économies actuelles
          </h2>
          <div className="text-4xl font-bold text-accent mb-4">
            {formatCurrency(currentSavings)}
          </div>
          {totalTarget > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Objectif total: {formatCurrency(totalTarget)}
              </p>
              <ProgressBar
                progress={calculateDreamProgress(currentSavings, totalTarget)}
                color="accent"
                showPercentage={true}
              />
            </div>
          )}
        </div>

        {/* Type d'objectif */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Type d'objectif
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={!useGlobalGoal}
                onChange={() => setUseGlobalGoal(false)}
                className="w-5 h-5 text-primary"
              />
              <span className="text-gray-700">
                Objectifs individuels par rêve
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={useGlobalGoal}
                onChange={() => setUseGlobalGoal(true)}
                className="w-5 h-5 text-primary"
              />
              <span className="text-gray-700">
                Objectif global d'épargne
              </span>
            </label>

            {useGlobalGoal && (
              <div className="ml-8 mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Montant de l'objectif global (€)
                </label>
                <input
                  type="number"
                  value={globalGoal}
                  onChange={(e) => setGlobalGoal(e.target.value)}
                  placeholder="Ex: 5000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}
          </div>
        </div>

        {/* Liste des rêves */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Vos rêves
          </h2>
          <div className="space-y-6">
            {dreams.map((dream, index) => (
              <div key={dream.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={dream.name}
                      onChange={(e) => handleDreamChange(index, 'name', e.target.value)}
                      placeholder="Décrivez votre rêve..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    
                    {!useGlobalGoal && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Objectif financier (€)
                        </label>
                        <input
                          type="number"
                          value={dream.targetAmount}
                          onChange={(e) => handleDreamChange(index, 'targetAmount', e.target.value)}
                          placeholder="Ex: 1000"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}

                    {!useGlobalGoal && dream.name && dream.targetAmount > 0 && (
                      <div>
                        <ProgressBar
                          progress={calculateDreamProgress(currentSavings, parseFloat(dream.targetAmount))}
                          label={`Progression vers "${dream.name}"`}
                          color="accent"
                          showPercentage={true}
                        />
                      </div>
                    )}
                  </div>
                  
                  {index >= 3 && (
                    <button
                      onClick={() => handleRemoveDream(index)}
                      className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAddDream}
            className="mt-6 w-full px-4 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Ajouter un rêve
          </button>
        </div>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Target className="w-5 h-5" />
            Sauvegarder mes rêves
          </button>
        </div>

        {/* Message d'encouragement */}
        <div className="mt-8 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg p-6 text-white">
          <p className="text-center text-lg font-medium">
            💫 Chaque pas compte ! Continuez à économiser pour réaliser vos rêves ! 💫
          </p>
        </div>
      </div>
    </div>
  );
};

export default DreamsPage;
