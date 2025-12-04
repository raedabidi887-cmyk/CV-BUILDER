import React from 'react';

export default function MinimalistTemplate({ data = {}, color = '#1f2937' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [] } = data;

  return (
    <div className="w-full bg-white font-serif" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      <div className="px-16 py-12">
        {/* Header minimaliste */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light mb-4 tracking-tight" style={{ color }}>
            {personalInfo.name || 'VOTRE NOM'}
          </h1>
          <div className="w-24 h-px mx-auto mb-4" style={{ backgroundColor: color }}></div>
          <h2 className="text-xl font-light text-gray-600 tracking-wide">
            {personalInfo.title || 'Votre Titre Professionnel'}
          </h2>
        </div>

        {/* Contact minimaliste centré */}
        <div className="flex justify-center gap-8 mb-16 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>

        {/* Résumé */}
        {summary && (
          <div className="mb-16">
            <p className="text-gray-700 leading-loose text-center max-w-3xl mx-auto font-sans">
              {summary}
            </p>
          </div>
        )}

        {/* Expérience */}
        {experience && experience.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-8 text-center" style={{ color }}>
              Expérience Professionnelle
            </h3>
            <div className="space-y-10">
              {experience.map((exp, index) => (
                <div key={index} className="max-w-3xl mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-light mb-2" style={{ color }}>
                      {exp.position || 'Poste'}
                    </h4>
                    <p className="text-gray-600 font-sans mb-1">{exp.company || 'Entreprise'}</p>
                    <p className="text-sm text-gray-500 font-sans">
                      {exp.startDate} — {exp.endDate || 'Présent'}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed text-center font-sans mb-3">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div className="space-y-2 max-w-2xl mx-auto">
                      {exp.achievements.map((achievement, i) => (
                        <p key={i} className="text-sm text-gray-600 text-center font-sans">
                          {achievement}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formation */}
        {education && education.length > 0 && (
          <div className="mb-16">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-8 text-center" style={{ color }}>
              Formation
            </h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="text-center max-w-3xl mx-auto">
                  <h4 className="text-xl font-light mb-2" style={{ color }}>
                    {edu.degree || 'Diplôme'}
                  </h4>
                  <p className="text-gray-600 font-sans mb-1">{edu.institution || 'Établissement'}</p>
                  <p className="text-sm text-gray-500 font-sans">
                    {edu.startDate} — {edu.endDate || 'Présent'}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-3 font-sans">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compétences et Langues en ligne */}
        <div className="max-w-3xl mx-auto">
          {/* Compétences */}
          {skills && skills.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                Compétences
              </h3>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-700 font-sans">
                {skills.map((skill, index) => (
                  <span key={index}>{skill.name || 'Compétence'}</span>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div className="mb-12">
              <h3 className="text-sm font-semibold uppercase tracking-widest mb-6 text-center" style={{ color }}>
                Langues
              </h3>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-sans">
                {languages.map((lang, index) => (
                  <div key={index} className="text-center">
                    <span className="text-gray-700">{lang.name || 'Langue'}</span>
                    <span className="text-gray-500 mx-2">—</span>
                    <span className="text-gray-600">{lang.level || 'Niveau'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ligne de séparation finale */}
        <div className="w-24 h-px mx-auto mt-16" style={{ backgroundColor: color }}></div>

        {/* Contact footer */}
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="flex justify-center gap-8 mt-8 text-xs text-gray-500 font-sans">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>
    </div>
  );
}