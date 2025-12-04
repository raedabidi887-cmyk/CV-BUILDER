import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCVStore = create(
  persist(
    (set, get) => ({
      // ==========================================
      // ÉTAT DU CV
      // ==========================================
      
      cvId: null, // ID unique du CV (généré à la création)
      cvTitle: 'CV sans titre',
      selectedTemplate: 'classic',
      language: 'fr',
      
      // Données du CV
      cvData: {
        personalInfo: {
          photo: null,
          firstName: '',
          lastName: '',
          jobTitle: '',
          useJobTitleAsTitle: false,
          email: '',
          phone: '',
          address: '',
          postalCode: '',
          city: '',
          country: '',
          // Champs optionnels
          birthDate: '',
          birthPlace: '',
          drivingLicense: [],
          gender: '',
          nationality: '',
          linkedin: '',
          website: '',
        },
        
        summary: '',
        
        experiences: [
          // {
          //   id: 'exp_1',
          //   jobTitle: '',
          //   company: '',
          //   location: '',
          //   startDate: '',
          //   endDate: '',
          //   current: false,
          //   description: '',
          // }
        ],
        
        educations: [
          // {
          //   id: 'edu_1',
          //   degree: '',
          //   school: '',
          //   location: '',
          //   startDate: '',
          //   endDate: '',
          //   current: false,
          //   description: '',
          // }
        ],
        
        skills: [
          // {
          //   id: 'skill_1',
          //   name: '',
          //   level: 3, // 1-5
          //   category: 'technical' // technical, soft, language
          // }
        ],
        
        languages: [
          // {
          //   id: 'lang_1',
          //   name: '',
          //   level: 'native' // native, fluent, intermediate, beginner
          // }
        ],
        
        hobbies: [],
        certifications: [],
        projects: [],
      },
      
      // ==========================================
      // CONFIGURATION DES SECTIONS
      // ==========================================
      
      sectionsOrder: [
        'personalInfo',
        'summary',
        'experience',
        'education',
        'skills',
        'languages',
        'certifications',
        'projects',
        'hobbies',
      ],
      
      collapsedSections: {
        personalInfo: false,
        summary: true,
        experience: true,
        education: true,
        skills: true,
        languages: true,
        certifications: true,
        projects: true,
        hobbies: true,
      },
      
      visibleSections: {
        personalInfo: true,
        summary: true,
        experience: true,
        education: true,
        skills: true,
        languages: false,
        certifications: false,
        projects: false,
        hobbies: false,
      },
      
      // Champs optionnels activés
      optionalFields: {
        personalInfo: {
          birthDate: false,
          birthPlace: false,
          drivingLicense: false,
          gender: false,
          nationality: false,
          linkedin: false,
          website: false,
        },
      },
      
      // ==========================================
      // ÉTAT DE SAUVEGARDE
      // ==========================================
      
      saveStatus: 'saved', // 'saved' | 'saving' | 'unsaved'
      lastSaved: null,
      
      // ==========================================
      // HISTORIQUE (pour undo/redo)
      // ==========================================
      
      history: [],
      historyIndex: -1,
      
      // ==========================================
      // ACTIONS - CV MANAGEMENT
      // ==========================================
      
      // Créer un nouveau CV
     // Créer un nouveau CV
createNewCV: () => {
  const newId = `cv_${Date.now()}`;
  set({
    cvId: newId,
    cvTitle: 'Mon CV',
    cvData: {
      personalInfo: {
        photo: null,
        firstName: 'Jean',
        lastName: 'Dupont',
        jobTitle: 'Développeur Full Stack',
        useJobTitleAsTitle: false,
        email: 'jean.dupont@email.com',
        phone: '+33 6 12 34 56 78',
        address: '123 Rue Example',
        postalCode: '75001',
        city: 'Paris',
        country: 'France',
        birthDate: '',
        birthPlace: '',
        drivingLicense: [],
        gender: '',
        nationality: '',
        linkedin: 'https://linkedin.com/in/jeandupont',
        website: 'https://jeandupont.com',
      },
      summary: 'Développeur Full Stack passionné avec 5+ ans d\'expérience dans la création d\'applications web modernes. Expert en React, Node.js et architectures cloud.',
      experiences: [
        {
          id: 'exp_1',
          jobTitle: 'Senior Developer',
          company: 'TechCorp',
          location: 'Paris',
          startDate: '2021-01',
          endDate: '2023-12',
          current: false,
          description: 'Développement d\'applications web modernes avec React et Node.js. Gestion d\'une équipe de 5 développeurs.',
        }
      ],
      educations: [
        {
          id: 'edu_1',
          degree: 'Master en Informatique',
          school: 'Université Paris-Saclay',
          location: 'Paris',
          startDate: '2017',
          endDate: '2019',
          current: false,
          description: 'Spécialisation en Intelligence Artificielle',
        }
      ],
      skills: [
        { id: 'skill_1', name: 'React', level: 5, category: 'technical' },
        { id: 'skill_2', name: 'Node.js', level: 4, category: 'technical' },
        { id: 'skill_3', name: 'TypeScript', level: 4, category: 'technical' },
        { id: 'skill_4', name: 'Python', level: 3, category: 'technical' },
      ],
      languages: [
        { id: 'lang_1', name: 'Français', level: 'native' },
        { id: 'lang_2', name: 'Anglais', level: 'fluent' },
      ],
      hobbies: ['Photographie', 'Randonnée', 'Gaming'],
      certifications: [],
      projects: [],
    },
    saveStatus: 'unsaved',
  });
},
      
      // Charger un CV existant
      loadCV: (cvId) => {
        // Cette fonction sera appelée avec les données du localStorage
        const savedCV = localStorage.getItem(`cv_${cvId}`);
        if (savedCV) {
          const cvData = JSON.parse(savedCV);
          set({ ...cvData, cvId });
        }
      },
      
      // Sauvegarder le CV
      saveCV: () => {
        const state = get();
        set({ saveStatus: 'saving' });
        
        // Simulation d'une sauvegarde (peut être remplacé par API)
        setTimeout(() => {
          localStorage.setItem(`cv_${state.cvId}`, JSON.stringify({
            cvTitle: state.cvTitle,
            cvData: state.cvData,
            selectedTemplate: state.selectedTemplate,
            sectionsOrder: state.sectionsOrder,
            collapsedSections: state.collapsedSections,
            visibleSections: state.visibleSections,
            optionalFields: state.optionalFields,
          }));
          
          set({ 
            saveStatus: 'saved',
            lastSaved: new Date().toISOString(),
          });
        }, 500);
      },
      
      // ==========================================
      // ACTIONS - TITRE & TEMPLATE
      // ==========================================
      
      updateCVTitle: (title) => {
        set({ cvTitle: title, saveStatus: 'unsaved' });
        get().debouncedSave();
      },
      
      updateTemplate: (template) => {
        set({ selectedTemplate: template, saveStatus: 'unsaved' });
        get().saveCV();
      },
      
      updateLanguage: (language) => {
        set({ language, saveStatus: 'unsaved' });
        get().saveCV();
      },
      
      // ==========================================
      // ACTIONS - DONNÉES DU CV
      // ==========================================
      
      // Mettre à jour les informations personnelles
      updatePersonalInfo: (field, value) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            personalInfo: {
              ...state.cvData.personalInfo,
              [field]: value,
            },
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Mettre à jour le résumé
      updateSummary: (summary) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            summary,
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Ajouter une expérience
      addExperience: () => {
        const newExp = {
          id: `exp_${Date.now()}`,
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        };
        
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: [...state.cvData.experiences, newExp],
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Mettre à jour une expérience
      updateExperience: (id, field, value) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.map((exp) =>
              exp.id === id ? { ...exp, [field]: value } : exp
            ),
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Supprimer une expérience
      deleteExperience: (id) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            experiences: state.cvData.experiences.filter((exp) => exp.id !== id),
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Ajouter une formation
      addEducation: () => {
        const newEdu = {
          id: `edu_${Date.now()}`,
          degree: '',
          school: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
        };
        
        set((state) => ({
          cvData: {
            ...state.cvData,
            educations: [...state.cvData.educations, newEdu],
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Mettre à jour une formation
      updateEducation: (id, field, value) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            educations: state.cvData.educations.map((edu) =>
              edu.id === id ? { ...edu, [field]: value } : edu
            ),
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Supprimer une formation
      deleteEducation: (id) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            educations: state.cvData.educations.filter((edu) => edu.id !== id),
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Ajouter une compétence
      addSkill: () => {
        const newSkill = {
          id: `skill_${Date.now()}`,
          name: '',
          level: 3,
          category: 'technical',
        };
        
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: [...state.cvData.skills, newSkill],
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Mettre à jour une compétence
      updateSkill: (id, field, value) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.map((skill) =>
              skill.id === id ? { ...skill, [field]: value } : skill
            ),
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Supprimer une compétence
      deleteSkill: (id) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            skills: state.cvData.skills.filter((skill) => skill.id !== id),
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Ajouter une langue
      addLanguage: () => {
        const newLang = {
          id: `lang_${Date.now()}`,
          name: '',
          level: 'intermediate',
        };
        
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: [...state.cvData.languages, newLang],
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Mettre à jour une langue
      updateLanguage: (id, field, value) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: state.cvData.languages.map((lang) =>
              lang.id === id ? { ...lang, [field]: value } : lang
            ),
          },
          saveStatus: 'unsaved',
        }));
        get().debouncedSave();
      },
      
      // Supprimer une langue
      deleteLanguage: (id) => {
        set((state) => ({
          cvData: {
            ...state.cvData,
            languages: state.cvData.languages.filter((lang) => lang.id !== id),
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // ==========================================
      // ACTIONS - SECTIONS
      // ==========================================
      
      // Toggle collapse d'une section
      toggleSection: (sectionName) => {
        set((state) => ({
          collapsedSections: {
            ...state.collapsedSections,
            [sectionName]: !state.collapsedSections[sectionName],
          },
        }));
      },
      
      // Toggle visibilité d'une section
      toggleSectionVisibility: (sectionName) => {
        set((state) => ({
          visibleSections: {
            ...state.visibleSections,
            [sectionName]: !state.visibleSections[sectionName],
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // Réorganiser les sections
      reorderSections: (newOrder) => {
        set({ sectionsOrder: newOrder, saveStatus: 'unsaved' });
        get().saveCV();
      },
      
      // ==========================================
      // ACTIONS - CHAMPS OPTIONNELS
      // ==========================================
      
      toggleOptionalField: (section, field) => {
        set((state) => ({
          optionalFields: {
            ...state.optionalFields,
            [section]: {
              ...state.optionalFields[section],
              [field]: !state.optionalFields[section][field],
            },
          },
          saveStatus: 'unsaved',
        }));
        get().saveCV();
      },
      
      // ==========================================
      // UTILITAIRES
      // ==========================================
      
      // Debounced save (pour éviter trop de sauvegardes)
      debouncedSave: (() => {
        let timeout;
        return () => {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            get().saveCV();
          }, 1000); // Sauvegarde après 1 seconde d'inactivité
        };
      })(),
      
      // Récupérer la structure par défaut
      getDefaultCVData: () => ({
        personalInfo: {
          photo: null,
          firstName: '',
          lastName: '',
          jobTitle: '',
          useJobTitleAsTitle: false,
          email: '',
          phone: '',
          address: '',
          postalCode: '',
          city: '',
          country: '',
          birthDate: '',
          birthPlace: '',
          drivingLicense: [],
          gender: '',
          nationality: '',
          linkedin: '',
          website: '',
        },
        summary: '',
        experiences: [],
        educations: [],
        skills: [],
        languages: [],
        hobbies: [],
        certifications: [],
        projects: [],
      }),
      
      // Réinitialiser le CV
      resetCV: () => {
        set({
          cvTitle: 'CV sans titre',
          cvData: get().getDefaultCVData(),
          saveStatus: 'unsaved',
        });
      },
      
      // Dupliquer le CV
      duplicateCV: () => {
        const newId = `cv_${Date.now()}`;
        const state = get();
        set({
          cvId: newId,
          cvTitle: `${state.cvTitle} (copie)`,
          saveStatus: 'unsaved',
        });
        get().saveCV();
      },
    }),
    {
      name: 'cv-builder-storage',
      partialize: (state) => ({
        cvId: state.cvId,
        cvTitle: state.cvTitle,
        cvData: state.cvData,
        selectedTemplate: state.selectedTemplate,
        language: state.language,
        sectionsOrder: state.sectionsOrder,
        visibleSections: state.visibleSections,
        optionalFields: state.optionalFields,
      }),
    }
  )
);

export default useCVStore;