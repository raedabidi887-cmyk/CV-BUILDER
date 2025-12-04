// src/translations/cv-translations.js

/**
 * Système de traduction pour le CV Builder
 * Supporte plusieurs langues avec fallback automatique
 */

export const translations = {
  fr: {
    // Sections principales
    sections: {
      personalInfo: 'Informations personnelles',
      summary: 'Profil professionnel',
      experience: 'Expérience professionnelle',
      education: 'Formation',
      skills: 'Compétences',
      languages: 'Langues',
      certifications: 'Certifications',
      projects: 'Projets',
      hobbies: 'Centres d\'intérêt',
    },

    // Labels des champs
    fields: {
      firstName: 'Prénom',
      lastName: 'Nom',
      jobTitle: 'Titre du poste',
      email: 'E-mail',
      phone: 'Téléphone',
      address: 'Adresse',
      city: 'Ville',
      postalCode: 'Code postal',
      country: 'Pays',
      website: 'Site web',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      birthDate: 'Date de naissance',
      birthPlace: 'Lieu de naissance',
      nationality: 'Nationalité',
      drivingLicense: 'Permis de conduire',
      gender: 'Genre',
      
      // Expérience
      position: 'Poste',
      company: 'Entreprise',
      location: 'Lieu',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      current: 'En cours',
      description: 'Description',
      achievements: 'Réalisations',
      technologies: 'Technologies',
      
      // Formation
      degree: 'Diplôme',
      school: 'École / Université',
      fieldOfStudy: 'Domaine d\'études',
      gpa: 'Mention',
      courses: 'Cours principaux',
      
      // Compétences
      skillName: 'Nom de la compétence',
      skillLevel: 'Niveau',
      
      // Langues
      language: 'Langue',
      languageLevel: 'Niveau',
    },

    // Niveaux de langue
    languageLevels: {
      native: 'Langue maternelle',
      fluent: 'Courant',
      advanced: 'Avancé',
      intermediate: 'Intermédiaire',
      beginner: 'Débutant',
    },

    // Niveaux de compétences
    skillLevels: {
      1: 'Débutant',
      2: 'Intermédiaire',
      3: 'Confirmé',
      4: 'Avancé',
      5: 'Expert',
    },

    // Dates
    dates: {
      present: 'Présent',
      to: 'à',
      from: 'De',
    },

    // Boutons et actions
    actions: {
      add: 'Ajouter',
      delete: 'Supprimer',
      edit: 'Modifier',
      save: 'Enregistrer',
      cancel: 'Annuler',
      download: 'Télécharger',
      export: 'Exporter',
      import: 'Importer',
      duplicate: 'Dupliquer',
      reset: 'Réinitialiser',
    },

    // Messages
    messages: {
      saved: 'Sauvegardé',
      saving: 'Sauvegarde en cours...',
      unsaved: 'Non sauvegardé',
      noData: 'Aucune donnée disponible',
      fillForm: 'Remplissez le formulaire pour voir l\'aperçu',
    },
  },

  en: {
    // Main sections
    sections: {
      personalInfo: 'Personal Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      languages: 'Languages',
      certifications: 'Certifications',
      projects: 'Projects',
      hobbies: 'Interests',
    },

    // Field labels
    fields: {
      firstName: 'First Name',
      lastName: 'Last Name',
      jobTitle: 'Job Title',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      postalCode: 'Postal Code',
      country: 'Country',
      website: 'Website',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      birthDate: 'Date of Birth',
      birthPlace: 'Place of Birth',
      nationality: 'Nationality',
      drivingLicense: 'Driver\'s License',
      gender: 'Gender',
      
      // Experience
      position: 'Position',
      company: 'Company',
      location: 'Location',
      startDate: 'Start Date',
      endDate: 'End Date',
      current: 'Current',
      description: 'Description',
      achievements: 'Achievements',
      technologies: 'Technologies',
      
      // Education
      degree: 'Degree',
      school: 'School / University',
      fieldOfStudy: 'Field of Study',
      gpa: 'GPA',
      courses: 'Relevant Courses',
      
      // Skills
      skillName: 'Skill Name',
      skillLevel: 'Level',
      
      // Languages
      language: 'Language',
      languageLevel: 'Proficiency',
    },

    // Language levels
    languageLevels: {
      native: 'Native',
      fluent: 'Fluent',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Beginner',
    },

    // Skill levels
    skillLevels: {
      1: 'Beginner',
      2: 'Intermediate',
      3: 'Proficient',
      4: 'Advanced',
      5: 'Expert',
    },

    // Dates
    dates: {
      present: 'Present',
      to: 'to',
      from: 'From',
    },

    // Actions
    actions: {
      add: 'Add',
      delete: 'Delete',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      download: 'Download',
      export: 'Export',
      import: 'Import',
      duplicate: 'Duplicate',
      reset: 'Reset',
    },

    // Messages
    messages: {
      saved: 'Saved',
      saving: 'Saving...',
      unsaved: 'Unsaved',
      noData: 'No data available',
      fillForm: 'Fill in the form to see the preview',
    },
  },

  es: {
    // Secciones principales
    sections: {
      personalInfo: 'Información Personal',
      summary: 'Resumen Profesional',
      experience: 'Experiencia Laboral',
      education: 'Formación',
      skills: 'Habilidades',
      languages: 'Idiomas',
      certifications: 'Certificaciones',
      projects: 'Proyectos',
      hobbies: 'Intereses',
    },

    fields: {
      firstName: 'Nombre',
      lastName: 'Apellido',
      jobTitle: 'Título del Puesto',
      email: 'Correo Electrónico',
      phone: 'Teléfono',
      address: 'Dirección',
      city: 'Ciudad',
      postalCode: 'Código Postal',
      country: 'País',
      website: 'Sitio Web',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      birthDate: 'Fecha de Nacimiento',
      birthPlace: 'Lugar de Nacimiento',
      nationality: 'Nacionalidad',
      drivingLicense: 'Licencia de Conducir',
      gender: 'Género',
      
      position: 'Puesto',
      company: 'Empresa',
      location: 'Ubicación',
      startDate: 'Fecha de Inicio',
      endDate: 'Fecha de Fin',
      current: 'Actual',
      description: 'Descripción',
      achievements: 'Logros',
      technologies: 'Tecnologías',
      
      degree: 'Título',
      school: 'Escuela / Universidad',
      fieldOfStudy: 'Campo de Estudio',
      gpa: 'Promedio',
      courses: 'Cursos Relevantes',
      
      skillName: 'Nombre de la Habilidad',
      skillLevel: 'Nivel',
      
      language: 'Idioma',
      languageLevel: 'Nivel',
    },

    languageLevels: {
      native: 'Nativo',
      fluent: 'Fluido',
      advanced: 'Avanzado',
      intermediate: 'Intermedio',
      beginner: 'Principiante',
    },

    skillLevels: {
      1: 'Principiante',
      2: 'Intermedio',
      3: 'Competente',
      4: 'Avanzado',
      5: 'Experto',
    },

    dates: {
      present: 'Actual',
      to: 'a',
      from: 'Desde',
    },

    actions: {
      add: 'Añadir',
      delete: 'Eliminar',
      edit: 'Editar',
      save: 'Guardar',
      cancel: 'Cancelar',
      download: 'Descargar',
      export: 'Exportar',
      import: 'Importar',
      duplicate: 'Duplicar',
      reset: 'Restablecer',
    },

    messages: {
      saved: 'Guardado',
      saving: 'Guardando...',
      unsaved: 'No guardado',
      noData: 'No hay datos disponibles',
      fillForm: 'Rellena el formulario para ver la vista previa',
    },
  },

  de: {
    // Hauptabschnitte
    sections: {
      personalInfo: 'Persönliche Informationen',
      summary: 'Berufsprofil',
      experience: 'Berufserfahrung',
      education: 'Ausbildung',
      skills: 'Fähigkeiten',
      languages: 'Sprachen',
      certifications: 'Zertifizierungen',
      projects: 'Projekte',
      hobbies: 'Interessen',
    },

    fields: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      jobTitle: 'Berufsbezeichnung',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      city: 'Stadt',
      postalCode: 'Postleitzahl',
      country: 'Land',
      website: 'Webseite',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      birthDate: 'Geburtsdatum',
      birthPlace: 'Geburtsort',
      nationality: 'Nationalität',
      drivingLicense: 'Führerschein',
      gender: 'Geschlecht',
      
      position: 'Position',
      company: 'Unternehmen',
      location: 'Standort',
      startDate: 'Startdatum',
      endDate: 'Enddatum',
      current: 'Aktuell',
      description: 'Beschreibung',
      achievements: 'Erfolge',
      technologies: 'Technologien',
      
      degree: 'Abschluss',
      school: 'Schule / Universität',
      fieldOfStudy: 'Studienrichtung',
      gpa: 'Note',
      courses: 'Relevante Kurse',
      
      skillName: 'Fähigkeit',
      skillLevel: 'Niveau',
      
      language: 'Sprache',
      languageLevel: 'Niveau',
    },

    languageLevels: {
      native: 'Muttersprache',
      fluent: 'Fließend',
      advanced: 'Fortgeschritten',
      intermediate: 'Mittelstufe',
      beginner: 'Anfänger',
    },

    skillLevels: {
      1: 'Anfänger',
      2: 'Mittelstufe',
      3: 'Kompetent',
      4: 'Fortgeschritten',
      5: 'Experte',
    },

    dates: {
      present: 'Heute',
      to: 'bis',
      from: 'Von',
    },

    actions: {
      add: 'Hinzufügen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      save: 'Speichern',
      cancel: 'Abbrechen',
      download: 'Herunterladen',
      export: 'Exportieren',
      import: 'Importieren',
      duplicate: 'Duplizieren',
      reset: 'Zurücksetzen',
    },

    messages: {
      saved: 'Gespeichert',
      saving: 'Speichern...',
      unsaved: 'Nicht gespeichert',
      noData: 'Keine Daten verfügbar',
      fillForm: 'Füllen Sie das Formular aus, um die Vorschau zu sehen',
    },
  },

  it: {
    // Sezioni principali
    sections: {
      personalInfo: 'Informazioni Personali',
      summary: 'Profilo Professionale',
      experience: 'Esperienza Lavorativa',
      education: 'Formazione',
      skills: 'Competenze',
      languages: 'Lingue',
      certifications: 'Certificazioni',
      projects: 'Progetti',
      hobbies: 'Interessi',
    },

    fields: {
      firstName: 'Nome',
      lastName: 'Cognome',
      jobTitle: 'Titolo Professionale',
      email: 'Email',
      phone: 'Telefono',
      address: 'Indirizzo',
      city: 'Città',
      postalCode: 'CAP',
      country: 'Paese',
      website: 'Sito Web',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      birthDate: 'Data di Nascita',
      birthPlace: 'Luogo di Nascita',
      nationality: 'Nazionalità',
      drivingLicense: 'Patente',
      gender: 'Genere',
      
      position: 'Posizione',
      company: 'Azienda',
      location: 'Località',
      startDate: 'Data Inizio',
      endDate: 'Data Fine',
      current: 'Attuale',
      description: 'Descrizione',
      achievements: 'Risultati',
      technologies: 'Tecnologie',
      
      degree: 'Titolo di Studio',
      school: 'Scuola / Università',
      fieldOfStudy: 'Campo di Studio',
      gpa: 'Voto',
      courses: 'Corsi Rilevanti',
      
      skillName: 'Nome Competenza',
      skillLevel: 'Livello',
      
      language: 'Lingua',
      languageLevel: 'Livello',
    },

    languageLevels: {
      native: 'Madrelingua',
      fluent: 'Fluente',
      advanced: 'Avanzato',
      intermediate: 'Intermedio',
      beginner: 'Base',
    },

    skillLevels: {
      1: 'Base',
      2: 'Intermedio',
      3: 'Competente',
      4: 'Avanzato',
      5: 'Esperto',
    },

    dates: {
      present: 'Presente',
      to: 'a',
      from: 'Da',
    },

    actions: {
      add: 'Aggiungi',
      delete: 'Elimina',
      edit: 'Modifica',
      save: 'Salva',
      cancel: 'Annulla',
      download: 'Scarica',
      export: 'Esporta',
      import: 'Importa',
      duplicate: 'Duplica',
      reset: 'Ripristina',
    },

    messages: {
      saved: 'Salvato',
      saving: 'Salvataggio...',
      unsaved: 'Non salvato',
      noData: 'Nessun dato disponibile',
      fillForm: 'Compila il modulo per vedere l\'anteprima',
    },
  },
};

/**
 * Hook personnalisé pour accéder aux traductions
 */
export const useTranslation = (lang = 'fr') => {
  const t = translations[lang] || translations['fr'];
  
  return {
    t,
    translate: (key) => {
      const keys = key.split('.');
      let value = t;
      
      for (const k of keys) {
        value = value?.[k];
        if (!value) return key; // Retourne la clé si non trouvée
      }
      
      return value;
    },
  };
};

export default translations;
