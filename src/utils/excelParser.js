import * as XLSX from 'xlsx';

// Parser un fichier Excel pour extraire les données de budget
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Lire la première feuille
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);

        // Valider et formater les données
        const categories = jsonData.map((row, index) => {
          // Chercher les colonnes avec différentes variations de noms
          const category = row['Catégorie'] || row['Categorie'] || row['Category'] || row['category'] || '';
          const amount = parseFloat(row['Montant'] || row['Amount'] || row['amount'] || 0);
          const period = (row['Période'] || row['Periode'] || row['Period'] || row['period'] || 'mensuel').toLowerCase();

          if (!category || isNaN(amount)) {
            console.warn(`Ligne ${index + 1} ignorée: données invalides`);
            return null;
          }

          return {
            name: category,
            amount: amount,
            period: period.includes('annuel') ? 'annuel' : 
                   period.includes('semestr') ? 'semestriel' : 'mensuel'
          };
        }).filter(item => item !== null);

        if (categories.length === 0) {
          reject(new Error('Aucune donnée valide trouvée dans le fichier Excel'));
          return;
        }

        resolve(categories);
      } catch (error) {
        reject(new Error(`Erreur lors de la lecture du fichier: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'));
    };

    reader.readAsArrayBuffer(file);
  });
};

// Convertir un montant selon la période
export const convertAmount = (amount, fromPeriod, toPeriod) => {
  const periods = {
    'mensuel': 1,
    'semestriel': 6,
    'annuel': 12
  };

  const fromMonths = periods[fromPeriod] || 1;
  const toMonths = periods[toPeriod] || 1;

  return (amount / fromMonths) * toMonths;
};

// Normaliser toutes les catégories à une période donnée
export const normalizeBudgetToPeriod = (categories, targetPeriod) => {
  return categories.map(category => ({
    ...category,
    amount: convertAmount(category.amount, category.period, targetPeriod),
    originalPeriod: category.period,
    period: targetPeriod
  }));
};

// Créer un fichier Excel template pour l'exemple
export const generateExcelTemplate = () => {
  const templateData = [
    { 'Catégorie': 'Loyer', 'Montant': 800, 'Période': 'mensuel' },
    { 'Catégorie': 'Alimentation', 'Montant': 400, 'Période': 'mensuel' },
    { 'Catégorie': 'Transport', 'Montant': 150, 'Période': 'mensuel' },
    { 'Catégorie': 'Loisirs', 'Montant': 200, 'Période': 'mensuel' },
    { 'Catégorie': 'Assurance', 'Montant': 600, 'Période': 'semestriel' },
    { 'Catégorie': 'Salaire', 'Montant': 24000, 'Période': 'annuel' }
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Budget');

  return workbook;
};

// Télécharger le template Excel
export const downloadExcelTemplate = () => {
  const workbook = generateExcelTemplate();
  XLSX.writeFile(workbook, 'template_budget_pilote_tes_reves.xlsx');
};
