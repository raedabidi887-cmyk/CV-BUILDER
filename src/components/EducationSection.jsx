import { useState } from 'react';
import useCVStore from '../store/useCVStore';

const EducationSection = () => {
  const { 
    cvData, 
    addEducation,
    updateEducation,
    deleteEducation,
  } = useCVStore();

  const educations = cvData.educations;

  const handleChange = (id, field, value) => {
    updateEducation(id, field, value);
  };

  return (
    <div className="space-y-6">
      {/* Liste des formations */}
      {educations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Aucune formation ajoutée</p>
          <p className="text-xs text-gray-500">Cliquez sur le bouton ci-dessous pour ajouter votre première formation</p>
        </div>
      ) : (
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div key={edu.id} className="relative p-6 bg-gray-50 rounded-lg border border-gray-200">
              {/* Numéro de la formation */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                {index + 1}
              </div>

              {/* Bouton Supprimer */}
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
                    deleteEducation(edu.id);
                  }
                }}
                className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer cette formation"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <div className="space-y-4 pr-8">
                {/* Ligne 1 : Diplôme */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diplôme / Formation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                    placeholder="Ex: Master en Informatique"
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Ligne 2 : École + Lieu */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      École / Université <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => handleChange(edu.id, 'school', e.target.value)}
                      placeholder="Ex: Université Paris-Saclay"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => handleChange(edu.id, 'location', e.target.value)}
                      placeholder="Ex: Paris"
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      value={edu.startDate}
                      onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date de fin
                    </label>
                    <input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                      disabled={edu.current}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) => {
                          handleChange(edu.id, 'current', e.target.checked);
                          if (e.target.checked) {
                            handleChange(edu.id, 'endDate', '');
                          }
                        }}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">En cours</span>
                    </label>
                  </div>
                </div>

                {/* Ligne 4 : Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => handleChange(edu.id, 'description', e.target.value)}
                    placeholder="Spécialisation, projets académiques, mention obtenue..."
                    rows={3}
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Ajouter une formation */}
      <button
        onClick={addEducation}
        className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une formation
      </button>
    </div>
  );
};

export default EducationSection;