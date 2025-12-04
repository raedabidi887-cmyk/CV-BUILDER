import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

export default function ProfessionalTemplate({ data = {}, color = '#2563eb' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [], photo } = data;

  return (
    <div className="w-full bg-white font-sans" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Header avec ligne colorée */}
      <div className="border-t-8 pt-8 px-12" style={{ borderColor: color }}>
        <div className="flex items-start gap-6 mb-8">
          {/* Photo */}
          {photo && (
            <div className="flex-shrink-0">
              <img 
                src={photo} 
                alt={personalInfo.name || 'Photo'} 
                className="w-28 h-28 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
          
          {/* Informations principales */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2" style={{ color }}>
              {personalInfo.name || 'Votre Nom'}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4 font-medium">
              {personalInfo.title || 'Votre Titre Professionnel'}
            </h2>
            
            {/* Contact */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color }} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" style={{ color }} />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" style={{ color }} />
                  <span className="truncate">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 pb-12">
        {/* Résumé professionnel */}
        {summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-6 rounded" style={{ backgroundColor: color }}></div>
              <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color }}>
                Profil Professionnel
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Expérience professionnelle */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded" style={{ backgroundColor: color }}></div>
              <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color }}>
                Expérience Professionnelle
              </h3>
            </div>
            <div className="space-y-5">
              {experience.map((exp, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{exp.position || 'Poste'}</h4>
                      <p className="text-gray-700 font-medium">{exp.company || 'Entreprise'}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 whitespace-nowrap ml-4">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.startDate || 'Date'} - {exp.endDate || 'Présent'}</span>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-xs mt-1.5" style={{ color }}>●</span>
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
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded" style={{ backgroundColor: color }}></div>
              <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color }}>
                Formation
              </h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{edu.degree || 'Diplôme'}</h4>
                    <p className="text-gray-700">{edu.institution || 'Établissement'}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {edu.startDate || 'Date'} - {edu.endDate || 'Présent'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compétences et Langues */}
        <div className="grid grid-cols-2 gap-8">
          {/* Compétences */}
          {skills && skills.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 rounded" style={{ backgroundColor: color }}></div>
                <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color }}>
                  Compétences
                </h3>
              </div>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{skill.name || 'Compétence'}</span>
                      {skill.level && (
                        <span className="text-xs text-gray-500">{skill.level}</span>
                      )}
                    </div>
                    {skill.level && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            backgroundColor: color,
                            width: skill.level === 'Expert' ? '100%' : 
                                   skill.level === 'Avancé' ? '75%' : 
                                   skill.level === 'Intermédiaire' ? '50%' : '25%'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 rounded" style={{ backgroundColor: color }}></div>
                <h3 className="text-lg font-bold uppercase tracking-wide" style={{ color }}>
                  Langues
                </h3>
              </div>
              <div className="space-y-2">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{lang.name || 'Langue'}</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {lang.level || 'Niveau'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}