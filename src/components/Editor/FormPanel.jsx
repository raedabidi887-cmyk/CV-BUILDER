import { useState } from 'react';
import ImportOptions from '../Form/ImportOptions';
import  PersonalInfoForm  from '../PersonalInfoForm';
import { SummarySection } from '../SummarySection';
import  ExperienceSection  from '../ExperienceSection';  // ← Changé ici
import  EducationSection  from '../EducationSection';
import  SkillsSection  from '../SkillsSection';
import  LanguagesSection  from '../LanguagesSection';
import SectionContainer from '../Form/SectionContainer';
import useCVStore from '../../store/useCVStore';

const FormPanel = () => {
  const { sectionsOrder, visibleSections } = useCVStore();

  // Map des sections avec leurs configurations
  const sectionsConfig = {
    personalInfo: {
      key: 'personalInfo',
      title: 'Informations personnelles',
      icon: '👤',
      component: PersonalInfoForm,
      canDelete: false,
      canToggleVisibility: false,
      canReorder: false,
    },
    summary: {
      key: 'summary',
      title: 'Profil professionnel',
      icon: '📝',
      component: SummarySection,
      canDelete: false,
      canToggleVisibility: true,
      canReorder: true,
    },
    experience: {
      key: 'experience',
      title: 'Expérience professionnelle',
      icon: '💼',
      component: ExperienceSection,
      canDelete: false,
      canToggleVisibility: true,
      canReorder: true,
    },
    education: {
      key: 'education',
      title: 'Formation',
      icon: '🎓',
      component: EducationSection,
      canDelete: false,
      canToggleVisibility: true,
      canReorder: true,
    },
    skills: {
      key: 'skills',
      title: 'Compétences',
      icon: '⚡',
      component: SkillsSection,
      canDelete: false,
      canToggleVisibility: true,
      canReorder: true,
    },
    languages: {
      key: 'languages',
      title: 'Langues',
      icon: '🌐',
      component: LanguagesSection,
      canDelete: false,
      canToggleVisibility: true,
      canReorder: true,
    },
  };

  // Rendre les sections selon l'ordre du store
  const renderSections = () => {
    return sectionsOrder
      .filter(sectionKey => sectionsConfig[sectionKey]) // Filtrer les sections valides
      .map((sectionKey) => {
        const config = sectionsConfig[sectionKey];
        const SectionComponent = config.component;

        return (
          <SectionContainer
            key={config.key}
            sectionKey={config.key}
            title={config.title}
            icon={config.icon}
            canDelete={config.canDelete}
            canToggleVisibility={config.canToggleVisibility}
            canReorder={config.canReorder}
          >
            <SectionComponent />
          </SectionContainer>
        );
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Options d'import en haut */}
      <ImportOptions />

      {/* Sections du formulaire */}
      {renderSections()}

      {/* Bouton d'ajout de section (optionnel) */}
      <div className="pt-4">
        <button className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors font-medium">
          + Ajouter une section
        </button>
      </div>
    </div>
  );
};

export default FormPanel;