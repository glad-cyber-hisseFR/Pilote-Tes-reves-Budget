import React, { useState } from 'react';
import { ChevronRight, FileSpreadsheet, Edit, User } from 'lucide-react';
import BudgetUpload from './BudgetUpload';
import { completeOnboarding, saveBudget, saveUserProfile } from '../utils/localStorage';
import { calculateTotalIncome } from '../utils/calculations';

const OnboardingPage = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [budgetPeriod, setBudgetPeriod] = useState('mensuel');
  const [useExcel, setUseExcel] = useState(true);
  const [categories, setCategories] = useState([]);
  const [manualCategories, setManualCategories] = useState([
    { name: '', amount: '', period: 'mensuel' }
  ]);
  const [validationError, setValidationError] = useState('');
  
  // User profile fields
  const [userProfile, setUserProfile] = useState({
    prenom: '',
    nom: '',
    sexe: '',
    age: '',
    adresse: ''
  });

  const handleProfileChange = (field, value) => {
    setUserProfile({ ...userProfile, [field]: value });
  };

  const handleProfileSubmit = () => {
    // Validation
    if (!userProfile.prenom || !userProfile.nom || !userProfile.sexe) {
      setValidationError('Veuillez remplir au moins le prénom, le nom et le sexe');
      return;
    }

    setValidationError('');
    saveUserProfile(userProfile);
    setStep(1);
  };

  const handleExcelLoaded = (loadedCategories) => {
    setCategories(loadedCategories);
    setStep(2);
  };

  const handleAddManualCategory = () => {
    setManualCategories([
      ...manualCategories,
      { name: '', amount: '', period: budgetPeriod }
    ]);
  };

  const handleRemoveManualCategory = (index) => {
    setManualCategories(manualCategories.filter((_, i) => i !== index));
  };

  const handleManualCategoryChange = (index, field, value) => {
    const updated = [...manualCategories];
    updated[index][field] = value;
    setManualCategories(updated);
  };

  const handleManualSubmit = () => {
    const validCategories = manualCategories
      .filter(cat => cat.name && cat.amount)
      .map(cat => ({
        name: cat.name,
        amount: parseFloat(cat.amount),
        period: cat.period
      }));

    if (validCategories.length === 0) {
      setValidationError('Veuillez ajouter au moins une catégorie valide');
      return;
    }

    setValidationError('');
    setCategories(validCategories);
    setStep(2);
  };

  const handleComplete = () => {
    const totalIncome = calculateTotalIncome(categories);
    
    saveBudget({
      categories: categories,
      totalIncome: totalIncome
    });

    completeOnboarding(budgetPeriod);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        {step === 0 ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Bienvenue !
              </h1>
              <p className="text-gray-600">
                Commençons par faire connaissance
              </p>
            </div>

            {validationError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {validationError}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    value={userProfile.prenom}
                    onChange={(e) => handleProfileChange('prenom', e.target.value)}
                    placeholder="Ex: Jean"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    value={userProfile.nom}
                    onChange={(e) => handleProfileChange('nom', e.target.value)}
                    placeholder="Ex: Dupont"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexe *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleProfileChange('sexe', 'homme')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      userProfile.sexe === 'homme'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Homme
                  </button>
                  <button
                    onClick={() => handleProfileChange('sexe', 'femme')}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      userProfile.sexe === 'femme'
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Femme
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Âge
                </label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => handleProfileChange('age', e.target.value)}
                  placeholder="Ex: 25"
                  min="0"
                  max="150"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <input
                  type="text"
                  value={userProfile.adresse}
                  onChange={(e) => handleProfileChange('adresse', e.target.value)}
                  placeholder="Ex: 123 Rue de la Paix, Paris"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleProfileSubmit}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
            >
              Continuer
              <ChevronRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              * Champs obligatoires
            </p>
          </>
        ) : step === 1 ? (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Pilote Tes Rêves
              </h1>
              <p className="text-gray-600">
                Bienvenue ! Commençons par configurer votre budget
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Période de votre budget
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['mensuel', 'semestriel', 'annuel'].map(period => (
                  <button
                    key={period}
                    onClick={() => setBudgetPeriod(period)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      budgetPeriod === period
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period.charAt(0).toUpperCase() + period.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Comment souhaitez-vous charger votre budget ?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setUseExcel(true)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    useExcel
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileSpreadsheet className="w-5 h-5" />
                  Fichier Excel
                </button>
                <button
                  onClick={() => setUseExcel(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    !useExcel
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Edit className="w-5 h-5" />
                  Saisie manuelle
                </button>
              </div>
            </div>

            {useExcel ? (
              <BudgetUpload
                onBudgetLoaded={handleExcelLoaded}
                selectedPeriod={budgetPeriod}
              />
            ) : (
              <div className="space-y-4">
                {validationError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {validationError}
                  </div>
                )}
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {manualCategories.map((category, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Catégorie"
                        value={category.name}
                        onChange={(e) => handleManualCategoryChange(index, 'name', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="number"
                        placeholder="Montant"
                        value={category.amount}
                        onChange={(e) => handleManualCategoryChange(index, 'amount', e.target.value)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                      />
                      {manualCategories.length > 1 && (
                        <button
                          onClick={() => handleRemoveManualCategory(index)}
                          className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={handleAddManualCategory}
                  className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-primary hover:text-primary transition-colors"
                >
                  + Ajouter une catégorie
                </button>

                <button
                  onClick={handleManualSubmit}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  Continuer
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Parfait ! Votre budget est configuré
              </h2>
              <p className="text-gray-600">
                Voici un résumé de votre budget {budgetPeriod}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-gray-700 mb-4">Catégories :</h3>
              <div className="space-y-2">
                {categories.map((cat, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">{cat.name}</span>
                    <span className="font-semibold text-gray-800">
                      {cat.amount.toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300 mt-4">
                <span className="font-bold text-gray-800">Total :</span>
                <span className="font-bold text-primary text-xl">
                  {calculateTotalIncome(categories).toFixed(2)} €
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Modifier
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Commencer
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
