import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Zap } from 'lucide-react';

export default function ColorfulTemplate({ data = {}, color = '#f59e0b' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [], photo } = data;

  // Couleurs vibrantes pour les sections
  const colors = {
    primary: color,
    secondary: '#ec4899',
    accent: '#8b5cf6',
    success: '#10b981'
  };

  return (
    <div className="w-full bg-white font-sans" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Header dynamique avec fond dégradé */}
      <div 
        className="relative overflow-hidden text-white px-12 py-10"
        style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`
        }}
      >
        <div className="relative flex items-center gap-8">
          {/* Photo avec bordure colorée */}
          {photo && (
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
              <img 
                src={photo} 
                alt={personalInfo.name || 'Photo'} 
                className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
            </div>
          )}
          
          {/* Informations principales */}
          <div className="flex-1">
            <h1 className="text-5xl font-black mb-3 drop-shadow-lg">
              {personalInfo.name || 'VOTRE NOM'}
            </h1>
            <h2 className="text-2xl font-semibold mb-6 opacity-95">
              {personalInfo.title || 'Votre Titre Professionnel'}
            </h2>
            
            {/* Contact inline coloré */}
            <div className="flex flex-wrap gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        {/* À propos avec accent coloré */}
        {summary && (
          <div className="mb-8">
            <div className="inline-block mb-4">
              <h3 
                className="text-2xl font-black px-4 py-2 text-white rounded-lg inline-block"
                style={{ backgroundColor: colors.primary }}
              >
                🎯 À PROPOS
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
          </div>
        )}

        {/* Expérience avec cartes colorées */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <div className="inline-block mb-4">
              <h3 
                className="text-2xl font-black px-4 py-2 text-white rounded-lg inline-block"
                style={{ backgroundColor: colors.secondary }}
              >
                💼 EXPÉRIENCE
              </h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="relative p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-md border-l-8 hover:shadow-xl transition-shadow"
                  style={{ borderColor: colors.primary }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{exp.position || 'Poste'}</h4>
                      <p className="text-lg font-semibold" style={{ color: colors.primary }}>
                        {exp.company || 'Entreprise'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-sm font-bold text-white px-3 py-1 rounded-full"
                        style={{ backgroundColor: colors.accent }}
                      >
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </div>
                      {exp.location && (
                        <div className="text-xs text-gray-600 mt-1 flex items-center justify-end gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                          <span 
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: colors.success }}
                          ></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formation */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <div className="inline-block mb-4">
              <h3 
                className="text-2xl font-black px-4 py-2 text-white rounded-lg inline-block"
                style={{ backgroundColor: colors.accent }}
              >
                🎓 FORMATION
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{edu.degree || 'Diplôme'}</h4>
                      <p className="font-semibold" style={{ color: colors.accent }}>
                        {edu.institution || 'Établissement'}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                      )}
                    </div>
                    <span 
                      className="text-sm font-bold text-white px-3 py-1 rounded-full whitespace-nowrap"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {edu.startDate} - {edu.endDate || 'Présent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compétences et Langues - Design coloré */}
        <div className="grid grid-cols-2 gap-6">
          {/* Compétences sous forme de badges */}
          {skills && skills.length > 0 && (
            <div>
              <div className="inline-block mb-4">
                <h3 
                  className="text-2xl font-black px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: colors.success }}
                >
                  ⚡ COMPÉTENCES
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
                    style={{ 
                      backgroundColor: [colors.primary, colors.secondary, colors.accent, colors.success][index % 4]
                    }}
                  >
                    {skill.name || 'Compétence'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div>
              <div className="inline-block mb-4">
                <h3 
                  className="text-2xl font-black px-4 py-2 text-white rounded-lg"
                  style={{ backgroundColor: colors.secondary }}
                >
                  🌍 LANGUES
                </h3>
              </div>
              <div className="space-y-3">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-bold text-gray-900">{lang.name || 'Langue'}</span>
                    <span 
                      className="text-xs font-bold text-white px-3 py-1 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    >
                      {lang.level || 'Niveau'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer avec liens */}
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="mt-8 pt-6 border-t-4 border-gray-200">
            <div className="flex justify-center gap-6">
              {personalInfo.linkedin && (
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-full font-semibold"
                  style={{ backgroundColor: colors.primary }}
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div 
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-full font-semibold"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}