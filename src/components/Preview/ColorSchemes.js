// src/components/Preview/ColorSchemes.js

/**
 * ============================================
 * SCHÉMAS DE COULEURS DISPONIBLES
 * ============================================
 */
export const colorSchemes = {
  blue: {
    name: 'Bleu Professionnel',
    primary: '#2563eb',      // Bleu principal
    secondary: '#dbeafe',    // Bleu clair pour backgrounds
    accent: '#1e40af',       // Bleu foncé pour hover
    text: '#1e3a8a',         // Bleu très foncé pour texte
    light: '#eff6ff'         // Bleu très clair
  },
  
  green: {
    name: 'Vert Moderne',
    primary: '#059669',      // Vert émeraude
    secondary: '#d1fae5',    // Vert clair
    accent: '#047857',       // Vert foncé
    text: '#065f46',         // Vert très foncé
    light: '#ecfdf5'         // Vert très clair
  },
  
  purple: {
    name: 'Violet Créatif',
    primary: '#7c3aed',      // Violet vif
    secondary: '#ede9fe',    // Violet clair
    accent: '#6d28d9',       // Violet foncé
    text: '#5b21b6',         // Violet très foncé
    light: '#f5f3ff'         // Violet très clair
  },
  
  gray: {
    name: 'Gris Élégant',
    primary: '#374151',      // Gris anthracite
    secondary: '#e5e7eb',    // Gris clair
    accent: '#1f2937',       // Gris très foncé
    text: '#111827',         // Presque noir
    light: '#f9fafb'         // Gris très clair
  },
  
  red: {
    name: 'Rouge Dynamique',
    primary: '#dc2626',      // Rouge vif
    secondary: '#fee2e2',    // Rouge clair
    accent: '#b91c1c',       // Rouge foncé
    text: '#991b1b',         // Rouge très foncé
    light: '#fef2f2'         // Rouge très clair
  },
  
  turquoise: {
    name: 'Turquoise Fresh',
    primary: '#14b8a6',      // Turquoise
    secondary: '#ccfbf1',    // Turquoise clair
    accent: '#0f766e',       // Turquoise foncé
    text: '#134e4a',         // Turquoise très foncé
    light: '#f0fdfa'         // Turquoise très clair
  },
  
  orange: {
    name: 'Orange Énergique',
    primary: '#f97316',      // Orange vif
    secondary: '#ffedd5',    // Orange clair
    accent: '#ea580c',       // Orange foncé
    text: '#c2410c',         // Orange très foncé
    light: '#fff7ed'         // Orange très clair
  },
  
  pink: {
    name: 'Rose Moderne',
    primary: '#ec4899',      // Rose vif
    secondary: '#fce7f3',    // Rose clair
    accent: '#db2777',       // Rose foncé
    text: '#be185d',         // Rose très foncé
    light: '#fdf2f8'         // Rose très clair
  },
  
  indigo: {
    name: 'Indigo Corporate',
    primary: '#4f46e5',      // Indigo
    secondary: '#e0e7ff',    // Indigo clair
    accent: '#4338ca',       // Indigo foncé
    text: '#3730a3',         // Indigo très foncé
    light: '#eef2ff'         // Indigo très clair
  },
  
  slate: {
    name: 'Ardoise Minimaliste',
    primary: '#475569',      // Ardoise
    secondary: '#e2e8f0',    // Ardoise clair
    accent: '#334155',       // Ardoise foncé
    text: '#1e293b',         // Ardoise très foncé
    light: '#f8fafc'         // Ardoise très clair
  }
};

/**
 * ============================================
 * CONFIGURATIONS DE TAILLE DE POLICE
 * ============================================
 */
export const fontSizeConfigs = {
  small: {
    name: 'text-xs',
    title: 'text-sm',
    sectionTitle: 'text-base',
    jobTitle: 'text-sm',
    company: 'text-xs',
    body: 'text-xs',
    contact: 'text-xs',
    dates: 'text-xs',
    skill: 'text-xs'
  },
  
  medium: {
    name: 'text-3xl',
    title: 'text-lg',
    sectionTitle: 'text-xl',
    jobTitle: 'text-base',
    company: 'text-sm',
    body: 'text-sm',
    contact: 'text-sm',
    dates: 'text-sm',
    skill: 'text-sm'
  },
  
  large: {
    name: 'text-4xl',
    title: 'text-2xl',
    sectionTitle: 'text-2xl',
    jobTitle: 'text-lg',
    company: 'text-base',
    body: 'text-base',
    contact: 'text-base',
    dates: 'text-sm',
    skill: 'text-base'
  }
};

/**
 * ============================================
 * TEMPLATES PRÉDÉFINIS
 * ============================================
 */
export const templates = {
  classic: {
    name: 'Classique',
    description: 'Template traditionnel et professionnel',
    colorScheme: 'blue',
    fontSize: 'medium',
    layout: 'single-column'
  },
  
  modern: {
    name: 'Moderne',
    description: 'Design contemporain avec accents colorés',
    colorScheme: 'purple',
    fontSize: 'medium',
    layout: 'single-column'
  },
  
  minimal: {
    name: 'Minimaliste',
    description: 'Épuré et élégant',
    colorScheme: 'gray',
    fontSize: 'small',
    layout: 'single-column'
  },
  
  bold: {
    name: 'Audacieux',
    description: 'Visuel et impactant',
    colorScheme: 'red',
    fontSize: 'large',
    layout: 'single-column'
  },
  
  corporate: {
    name: 'Corporate',
    description: 'Sobre et professionnel',
    colorScheme: 'indigo',
    fontSize: 'medium',
    layout: 'single-column'
  },
  
  creative: {
    name: 'Créatif',
    description: 'Original et dynamique',
    colorScheme: 'turquoise',
    fontSize: 'medium',
    layout: 'single-column'
  }
};

/**
 * ============================================
 * FONCTIONS UTILITAIRES
 * ============================================
 */

/**
 * Récupère un schéma de couleur par son nom
 */
export const getColorScheme = (schemeName) => {
  return colorSchemes[schemeName] || colorSchemes.blue;
};

/**
 * Récupère les classes de taille de police
 */
export const getFontSizeClasses = (size) => {
  return fontSizeConfigs[size] || fontSizeConfigs.medium;
};

/**
 * Récupère un template prédéfini
 */
export const getTemplate = (templateName) => {
  return templates[templateName] || templates.classic;
};

/**
 * Liste tous les schémas de couleurs disponibles
 */
export const getAvailableColorSchemes = () => {
  return Object.entries(colorSchemes).map(([key, value]) => ({
    value: key,
    label: value.name,
    color: value.primary
  }));
};

/**
 * Liste toutes les tailles de police disponibles
 */
export const getAvailableFontSizes = () => {
  return [
    { value: 'small', label: 'Petit', description: 'Compact, plus d\'informations' },
    { value: 'medium', label: 'Moyen', description: 'Équilibré et lisible' },
    { value: 'large', label: 'Grand', description: 'Très lisible, moins dense' }
  ];
};

/**
 * Liste tous les templates disponibles
 */
export const getAvailableTemplates = () => {
  return Object.entries(templates).map(([key, value]) => ({
    value: key,
    ...value
  }));
};

/**
 * Génère les styles CSS pour un schéma de couleur
 */
export const generateColorStyles = (schemeName) => {
  const scheme = getColorScheme(schemeName);
  
  return {
    '--color-primary': scheme.primary,
    '--color-secondary': scheme.secondary,
    '--color-accent': scheme.accent,
    '--color-text': scheme.text,
    '--color-light': scheme.light
  };
};

/**
 * Calcule la couleur de contraste (noir ou blanc) pour une couleur donnée
 */
export const getContrastColor = (hexColor) => {
  // Convertir hex en RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculer la luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retourner noir ou blanc selon la luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Génère des variantes de couleur (plus clair / plus foncé)
 */
export const generateColorVariants = (hexColor, steps = 5) => {
  const variants = {
    lighter: [],
    darker: []
  };
  
  // Convertir hex en RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Générer des variantes plus claires
  for (let i = 1; i <= steps; i++) {
    const factor = i / (steps + 1);
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    variants.lighter.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
  }
  
  // Générer des variantes plus foncées
  for (let i = 1; i <= steps; i++) {
    const factor = 1 - (i / (steps + 1));
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);
    variants.darker.push(`#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`);
  }
  
  return variants;
};

/**
 * Retourne la configuration complète de style pour un CV
 */
export const getStyleConfig = (colorScheme, fontSize, template) => {
  return {
    colors: getColorScheme(colorScheme),
    fontSizes: getFontSizeClasses(fontSize),
    template: getTemplate(template),
    styles: generateColorStyles(colorScheme)
  };
};

/**
 * ============================================
 * STYLES POUR L'IMPRESSION PDF
 * ============================================
 */
export const printStyles = `
  @media print {
    @page {
      size: A4;
      margin: 0;
    }
    
    body {
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .no-print {
      display: none !important;
    }
    
    .page-break {
      page-break-before: always;
    }
    
    .avoid-break {
      page-break-inside: avoid;
    }
  }
`;

/**
 * ============================================
 * EXPORT PAR DÉFAUT
 * ============================================
 */
export default {
  colorSchemes,
  fontSizeConfigs,
  templates,
  getColorScheme,
  getFontSizeClasses,
  getTemplate,
  getAvailableColorSchemes,
  getAvailableFontSizes,
  getAvailableTemplates,
  generateColorStyles,
  getContrastColor,
  generateColorVariants,
  getStyleConfig,
  printStyles
};