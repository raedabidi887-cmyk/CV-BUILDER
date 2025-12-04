import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Exporte un élément DOM en PDF de haute qualité
 * @param {HTMLElement} element - L'élément à exporter
 * @param {Object} cvData - Les données du CV (pour le nom du fichier)
 * @param {Object} options - Options d'export
 * @returns {Promise<boolean>}
 */
const pdfExport = async (element, cvData = {}, options = {}) => {
  try {
    if (!element) {
      throw new Error("Élément à exporter introuvable");
    }

    // Afficher un indicateur de chargement
    const loadingToast = showLoadingToast("Génération du PDF en cours...");

    // Configuration du PDF
    const pdfOptions = {
      orientation: options.orientation || "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    };

    // Générer le canvas avec haute qualité
    const canvas = await html2canvas(element, {
      scale: 2.5, // Haute qualité
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Convertir en image JPEG pour réduire la taille
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // Créer le PDF
    const pdf = new jsPDF(pdfOptions);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Calculer les dimensions
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Gérer les pages multiples
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, '', 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;
    }

    // Générer le nom du fichier
    const fileName = generateFileName(cvData, 'pdf');

    // Télécharger
    pdf.save(fileName);

    // Masquer le chargement et afficher succès
    hideLoadingToast(loadingToast);
    showSuccessToast(`✓ CV téléchargé : ${fileName}`);

    return true;
  } catch (err) {
    console.error("Erreur lors de l'export PDF:", err);
    showErrorToast("Erreur lors de la génération du PDF. Veuillez réessayer.");
    throw err;
  }
};

/**
 * Génère un nom de fichier basé sur les données du CV
 */
const generateFileName = (cvData, extension) => {
  const firstName = cvData?.personalInfo?.firstName || '';
  const lastName = cvData?.personalInfo?.lastName || '';
  
  if (firstName && lastName) {
    const name = `${firstName}_${lastName}`
      .replace(/\s+/g, '_')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Retirer les accents
      .replace(/[^a-zA-Z0-9_-]/g, '');
    return `CV_${name}.${extension}`;
  }
  
  const timestamp = new Date().toISOString().split('T')[0];
  return `CV_${timestamp}.${extension}`;
};

/**
 * Affiche un toast de chargement
 */
const showLoadingToast = (message) => {
  const toast = document.createElement('div');
  toast.id = 'pdf-loading-toast';
  toast.className = 'fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3';
  toast.innerHTML = `
    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <span class="font-medium">${message}</span>
  `;
  document.body.appendChild(toast);
  return toast;
};

/**
 * Masque le toast de chargement
 */
const hideLoadingToast = (toast) => {
  if (toast && toast.parentNode) {
    toast.remove();
  }
};

/**
 * Affiche un toast de succès
 */
const showSuccessToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3 animate-fade-in';
  toast.innerHTML = `
    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <span class="font-medium">${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
};

/**
 * Affiche un toast d'erreur
 */
const showErrorToast = (message) => {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 flex items-center gap-3';
  toast.innerHTML = `
    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
    </svg>
    <span class="font-medium">${message}</span>
  `;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 5000);
};

export default pdfExport;
