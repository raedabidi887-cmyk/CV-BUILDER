import { useState } from 'react';
import useCVStore from '../store/useCVStore';

const SkillsSection = () => {
  const { 
    cvData, 
    addSkill,
    updateSkill,
    deleteSkill,
  } = useCVStore();

  const skills = cvData.skills;

  const handleChange = (id, field, value) => {
    updateSkill(id, field, value);
  };

  const categories = [
    { value: 'technical', label: 'Technique', color: 'bg-blue-100 text-blue-800' },
    { value: 'soft', label: 'Soft Skills', color: 'bg-purple-100 text-purple-800' },
    { value: 'tools', label: 'Outils', color: 'bg-orange-100 text-orange-800' },
  ];

  const levelLabels = {
    1: 'Débutant',
    2: 'Intermédiaire',
    3: 'Confirmé',
    4: 'Avancé',
    5: 'Expert',
  };

  return (
    <div className="space-y-6">
      {/* Liste des compétences */}
      {skills.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Aucune compétence ajoutée</p>
          <p className="text-xs text-gray-500">Cliquez sur le bouton ci-dessous pour ajouter vos compétences</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="relative p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
              {/* Bouton Supprimer */}
              <button
                onClick={() => deleteSkill(skill.id)}
                className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer cette compétence"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-3 pr-6">
                {/* Nom de la compétence */}
                <div>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                    placeholder="Ex: React, Leadership..."
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium"
                  />
                </div>

                {/* Catégorie */}
                <div>
                  <select
                    value={skill.category}
                    onChange={(e) => handleChange(skill.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Niveau avec barre de progression */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">
                      {levelLabels[skill.level]}
                    </span>
                    <span className="text-xs text-gray-500">
                      {skill.level}/5
                    </span>
                  </div>

                  {/* Barre de progression visuelle */}
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleChange(skill.id, 'level', level)}
                        className={`flex-1 h-2 rounded-full transition-all ${
                          level <= skill.level
                            ? 'bg-purple-500 hover:bg-purple-600'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        title={`Niveau ${level} - ${levelLabels[level]}`}
                      />
                    ))}
                  </div>

                  {/* Slider alternatif */}
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={skill.level}
                    onChange={(e) => handleChange(skill.id, 'level', parseInt(e.target.value))}
                    className="w-full mt-2 accent-purple-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bouton Ajouter une compétence */}
      <button
        onClick={addSkill}
        className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Ajouter une compétence
      </button>

      {/* Info bulle */}
      <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <svg className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-purple-700">
          <strong>Conseil :</strong> Listez vos compétences les plus pertinentes pour le poste visé. Soyez honnête sur votre niveau !
        </p>
      </div>
    </div>
  );
};

export default SkillsSection;