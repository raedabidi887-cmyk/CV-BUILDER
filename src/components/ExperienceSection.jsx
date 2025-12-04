import { useState } from 'react';
import useCVStore from '../store/useCVStore';

const ExperienceSection = () => {
  const { 
    cvData, 
    addExperience,
    updateExperience,
    deleteExperience,
  } = useCVStore();

  const experiences = cvData.experiences;

  const handleChange = (id, field, value) => {
    updateExperience(id, field, value);
  };

  return (
    <div className="space-y-6">
      {/* Liste des expériences */}
      {experiences.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Aucune expérience professionnelle ajoutée</p>
          <p className="text-xs text-gray-500">Cliquez sur le bouton ci-dessous pour ajouter votre première expérience</p>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative p-6 bg-gray-50 rounded-lg border border-gray-200">
              {/* Numéro de l'expérience */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {index + 1}
              </div>

              {/* Bouton Supprimer */}
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
                    deleteExperience(exp.id);
                  }
                }}
                className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer cette expérience"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <div className="space-y-4 pr-8">
                {/* Ligne 1 : Poste */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poste occupé <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                    placeholder="Ex: Développeur Full-Stack"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Ligne 2 : Entreprise + Lieu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entreprise <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                      placeholder="Ex: Google"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleChange(exp.id, 'location', e.target.value)}
                      placeholder="Ex: Paris"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Ligne 3 : Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de début <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                      disabled={exp.current}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) => {
                          handleChange(exp.id, 'current', e.target.checked);
                          if (e.target.checked) {
                            handleChange(exp.id, 'endDate', '');
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Poste actuel</span>
                    </label>
                  </div>
                </div>

                {/* Ligne 4 : Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                    placeholder="Décrivez vos missions, réalisations et responsabilités..."
                    rows={4}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    💡 Conseil : Utilisez des puces pour lister vos réalisations principales
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Ajouter une expérience */}
      <button
        onClick={addExperience}
        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une expérience
      </button>
    </div>
  );
};

export default ExperienceSection;