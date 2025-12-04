import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

export default function TwoColumnTemplate({ data = {}, color = '#2563eb' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [], photo } = data;

  return (
    <div className="w-full bg-white font-sans flex" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Sidebar gauche */}
      <div className="w-2/5 p-8 text-white" style={{ backgroundColor: color }}>
        {/* Photo */}
        {photo && (
          <div className="mb-6">
            <img 
              src={photo} 
              alt={personalInfo.name || 'Photo'} 
              className="w-32 h-32 object-cover rounded-full mx-auto border-4 border-white shadow-lg"
            />
          </div>
        )}

        {/* Contact */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-white/30 pb-2">
            Contact
          </h3>
          <div className="space-y-3 text-sm">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 opacity-80" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <Linkedin className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                <span className="break-all text-xs">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 flex-shrink-0 mt-0.5 opacity-80" />
                <span className="break-all text-xs">{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>

        {/* Compétences */}
        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-white/30 pb-2">
              Compétences
            </h3>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.name || 'Compétence'}</span>
                  </div>
                  {skill.level && (
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full transition-all" 
                        style={{ 
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
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-white/30 pb-2">
              Langues
            </h3>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{lang.name || 'Langue'}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {lang.level || 'Niveau'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenu principal */}
      <div className="w-3/5 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            {personalInfo.name || 'Votre Nom'}
          </h1>
          <h2 className="text-xl font-medium mb-4" style={{ color }}>
            {personalInfo.title || 'Votre Titre Professionnel'}
          </h2>
          {summary && (
            <p className="text-gray-700 text-sm leading-relaxed text-justify">{summary}</p>
          )}
        </div>

        {/* Expérience professionnelle */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ color, borderColor: color }}>
              Expérience
            </h3>
            <div className="space-y-5">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{exp.position || 'Poste'}</h4>
                      <p className="text-sm font-medium" style={{ color }}>{exp.company || 'Entreprise'}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600 whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      <span>{exp.startDate} - {exp.endDate || 'Présent'}</span>
                    </div>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="mt-1" style={{ color }}>●</span>
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
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide mb-4 pb-2 border-b-2" style={{ color, borderColor: color }}>
              Formation
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{edu.degree || 'Diplôme'}</h4>
                      <p className="text-sm" style={{ color }}>{edu.institution || 'Établissement'}</p>
                    </div>
                    <span className="text-xs text-gray-600 whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || 'Présent'}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-gray-600 mt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}