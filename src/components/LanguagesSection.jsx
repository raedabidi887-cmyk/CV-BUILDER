import { useState } from 'react';
import useCVStore from '../store/useCVStore';

const LanguagesSection = () => {
  const { 
    cvData, 
    addLanguage,
    updateLanguage,
    deleteLanguage,
  } = useCVStore();

  const languages = cvData.languages;

  const handleChange = (id, field, value) => {
    updateLanguage(id, field, value);
  };

  const languageLevels = [
    { value: 'beginner', label: 'Débutant', description: 'A1-A2', color: 'bg-red-100 text-red-800' },
    { value: 'intermediate', label: 'Intermédiaire', description: 'B1-B2', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'fluent', label: 'Courant', description: 'C1-C2', color: 'bg-blue-100 text-blue-800' },
    { value: 'native', label: 'Langue maternelle', description: 'Natif', color: 'bg-green-100 text-green-800' },
  ];

  const commonLanguages = [
    'Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 
    'Arabe', 'Chinois', 'Japonais', 'Portugais', 'Russe'
  ];

  return (
    <div className="space-y-6">
      {/* Liste des langues */}
      {languages.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Aucune langue ajoutée</p>
          <p className="text-xs text-gray-500">Cliquez sur le bouton ci-dessous pour ajouter vos langues parlées</p>
        </div>
      ) : (
        <div className="space-y-4">
          {languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-4 border p-3 rounded-md bg-white shadow-sm">
              <input
                type="text"
                placeholder="Nom de la langue"
                value={lang.name}
                onChange={(e) => handleChange(lang.id, 'name', e.target.value)}
                list="common-languages"
                className="flex-1 border rounded px-2 py-1"
              />
              <datalist id="common-languages">
                {commonLanguages.map((langName) => (
                  <option key={langName} value={langName} />
                ))}
              </datalist>

              <select
                value={lang.level}
                onChange={(e) => handleChange(lang.id, 'level', e.target.value)}
                className="border rounded px-2 py-1"
              >
                {languageLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>

              <button
                onClick={() => deleteLanguage(lang.id)}
                className="text-red-500 hover:text-red-700 font-bold px-2"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Ajouter une langue */}
      <div className="pt-4">
        <button
          onClick={addLanguage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter une langue
        </button>
      </div>
    </div>
  );
};

export default LanguagesSection;
