import React, { useState } from 'react';
import { Upload, Download, FileSpreadsheet } from 'lucide-react';
import { parseExcelFile, normalizeBudgetToPeriod, downloadExcelTemplate } from '../utils/excelParser';

const BudgetUpload = ({ onBudgetLoaded, selectedPeriod = 'mensuel' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Vérifier le type de fichier
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Format de fichier non valide. Utilisez un fichier Excel (.xlsx ou .xls)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const categories = await parseExcelFile(file);
      const normalizedCategories = normalizeBudgetToPeriod(categories, selectedPeriod);
      onBudgetLoaded(normalizedCategories);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement du fichier');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragOver
            ? 'border-primary bg-blue-50'
            : 'border-gray-300 hover:border-primary'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="budget-file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />
        
        <label
          htmlFor="budget-file"
          className="cursor-pointer flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center">
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 mb-1">
              {isLoading ? 'Chargement...' : 'Cliquez pour charger un fichier Excel'}
            </p>
            <p className="text-sm text-gray-500">
              ou glissez-déposez votre fichier ici
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
        <FileSpreadsheet className="w-5 h-5" />
        <span>Format attendu: Catégorie, Montant, Période</span>
      </div>

      <button
        type="button"
        onClick={downloadExcelTemplate}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
      >
        <Download className="w-5 h-5" />
        Télécharger un modèle Excel
      </button>
    </div>
  );
};

export default BudgetUpload;
