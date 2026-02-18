import ExcelJS from 'exceljs';

// Parser un fichier Excel pour extraire les données de budget
export const parseExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        
        // Lire la première feuille
        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
          reject(new Error('Aucune feuille de calcul trouvée dans le fichier'));
          return;
        }

        const categories = [];
        let headerRow = null;
        
        // Trouver la ligne d'en-tête
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) {
            headerRow = row.values;
            return;
          }

          // Lire les données
          const rowValues = row.values;
          const category = rowValues[1]; // Première colonne
          const amount = parseFloat(rowValues[2]); // Deuxième colonne
          const period = String(rowValues[3] || 'mensuel').toLowerCase(); // Troisième colonne

          if (!category || isNaN(amount)) {
            console.warn(`Ligne ${rowNumber} ignorée: données invalides`);
            return;
          }

          categories.push({
            name: String(category),
            amount: amount,
            period: period.includes('annuel') ? 'annuel' : 
                   period.includes('semestr') ? 'semestriel' : 'mensuel'
          });
        });

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
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Budget');

  // Définir les colonnes
  worksheet.columns = [
    { header: 'Catégorie', key: 'category', width: 20 },
    { header: 'Montant', key: 'amount', width: 15 },
    { header: 'Période', key: 'period', width: 15 }
  ];

  // Ajouter les données d'exemple
  const templateData = [
    { category: 'Loyer', amount: 800, period: 'mensuel' },
    { category: 'Alimentation', amount: 400, period: 'mensuel' },
    { category: 'Transport', amount: 150, period: 'mensuel' },
    { category: 'Loisirs', amount: 200, period: 'mensuel' },
    { category: 'Assurance', amount: 600, period: 'semestriel' },
    { category: 'Salaire', amount: 24000, period: 'annuel' }
  ];

  templateData.forEach(data => {
    worksheet.addRow(data);
  });

  // Styliser l'en-tête
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF3B82F6' }
  };
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  return workbook;
};

// Télécharger le template Excel
export const downloadExcelTemplate = async () => {
  const workbook = generateExcelTemplate();
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'template_budget_pilote_tes_reves.xlsx';
  link.click();
  window.URL.revokeObjectURL(url);
};
