import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles } from 'lucide-react';

export default function CreativeTemplate({ data = {}, color = '#7c3aed' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [], photo } = data;

  // Couleurs gradient créatif
  const gradientStyle = {
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
  };

  return (
    <div className="w-full bg-gray-50 font-sans" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Header créatif avec gradient */}
      <div className="relative overflow-hidden" style={gradientStyle}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
        </div>
        
        <div className="relative px-12 py-10 text-white">
          <div className="flex items-center gap-8">
            {/* Photo avec effet créatif */}
            {photo && (
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-2xl rotate-6"></div>
                <img 
                  src={photo} 
                  alt={personalInfo.name || 'Photo'} 
                  className="relative w-36 h-36 object-cover rounded-2xl shadow-2xl border-4 border-white"
                />
              </div>
            )}
            
            {/* Informations principales */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wider opacity-90">
                  Profil Créatif
                </span>
              </div>
              <h1 className="text-5xl font-bold mb-3">
                {personalInfo.name || 'Votre Nom'}
              </h1>
              <h2 className="text-2xl font-light mb-6 opacity-95">
                {personalInfo.title || 'Votre Titre Professionnel'}
              </h2>
              
              {/* Contact inline */}
              <div className="flex flex-wrap gap-4 text-sm opacity-90">
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        {/* À propos - avec design créatif */}
        {summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
              <h3 className="text-2xl font-bold" style={{ color }}>
                À Propos
              </h3>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md border-l-4" style={{ borderColor: color }}>
              <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
            </div>
          </div>
        )}

        {/* Expérience - Cards créatives */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
              <h3 className="text-2xl font-bold" style={{ color }}>
                Expérience
              </h3>
            </div>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4"
                  style={{ borderColor: color }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{exp.position || 'Poste'}</h4>
                      <p className="font-semibold" style={{ color }}>{exp.company || 'Entreprise'}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-600">
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </div>
                      {exp.location && (
                        <div className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </div>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-3 text-sm leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }}></span>
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

        {/* Grid pour Formation, Compétences et Langues */}
        <div className="grid grid-cols-2 gap-6">
          {/* Formation */}
          {education && education.length > 0 && (
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
                <h3 className="text-2xl font-bold" style={{ color }}>
                  Formation
                </h3>
              </div>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900">{edu.degree || 'Diplôme'}</h4>
                        <p className="text-sm" style={{ color }}>{edu.institution || 'Établissement'}</p>
                        {edu.description && (
                          <p className="text-xs text-gray-600 mt-2">{edu.description}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-600 whitespace-nowrap">
                        {edu.startDate} - {edu.endDate || 'Présent'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compétences */}
          {skills && skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
                <h3 className="text-2xl font-bold" style={{ color }}>
                  Compétences
                </h3>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-md"
                      style={{ backgroundColor: color }}
                    >
                      {skill.name || 'Compétence'}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-8 rounded-full" style={{ backgroundColor: color }}></div>
                <h3 className="text-2xl font-bold" style={{ color }}>
                  Langues
                </h3>
              </div>
              <div className="bg-white p-5 rounded-xl shadow-md">
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{lang.name || 'Langue'}</span>
                      <span 
                        className="text-xs px-3 py-1 rounded-full text-white font-medium"
                        style={{ backgroundColor: color }}
                      >
                        {lang.level || 'Niveau'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer avec liens */}
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="mt-8 pt-6 border-t border-gray-300">
            <div className="flex justify-center gap-6 text-sm">
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2" style={{ color }}>
                  <Linkedin className="w-4 h-4" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2" style={{ color }}>
                  <Globe className="w-4 h-4" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}