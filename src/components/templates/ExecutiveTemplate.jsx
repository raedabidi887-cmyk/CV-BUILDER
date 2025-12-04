import React from 'react';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function ExecutiveTemplate({ data = {}, color = '#1a1a1a' }) {
  const { personalInfo = {}, summary = '', experience = [], education = [], skills = [], languages = [], photo } = data;

  return (
    <div className="w-full bg-white font-serif" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Header premium avec accent gold */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-12 py-10">
        <div className="flex items-center gap-8">
          {photo && (
            <div className="relative">
              <div className="w-32 h-32 rounded-sm overflow-hidden border-4 border-amber-500 shadow-2xl">
                <img 
                  src={photo} 
                  alt={personalInfo.name || 'Photo'} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          
          <div className="flex-1">
            <div className="w-16 h-1 bg-amber-500 mb-4"></div>
            <h1 className="text-5xl font-light tracking-wide mb-3">
              {personalInfo.name || 'VOTRE NOM'}
            </h1>
            <h2 className="text-xl font-light text-gray-300 tracking-wide mb-6">
              {personalInfo.title || 'Votre Titre Professionnel'}
            </h2>
            
            {/* Contact premium */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-amber-500" />
                  <span className="truncate">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        {/* Executive Summary */}
        {summary && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-2 h-8 bg-amber-500"></div>
              <h3 className="text-xl font-light uppercase tracking-widest" style={{ color }}>
                Executive Summary
              </h3>
            </div>
            <p className="text-gray-700 leading-loose text-lg font-light text-justify pl-6">
              {summary}
            </p>
          </div>
        )}

        {/* Professional Experience */}
        {experience && experience.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-amber-500"></div>
              <h3 className="text-xl font-light uppercase tracking-widest" style={{ color }}>
                Professional Experience
              </h3>
            </div>
            <div className="space-y-8 pl-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-gray-200 pl-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-2xl font-light mb-2" style={{ color }}>
                        {exp.position || 'Poste'}
                      </h4>
                      <p className="text-lg text-gray-700 font-medium">
                        {exp.company || 'Entreprise'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        {exp.startDate} — {exp.endDate || 'Présent'}
                      </p>
                      {exp.location && (
                        <p className="text-xs text-gray-500 mt-1">{exp.location}</p>
                      )}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed mb-3 font-sans">
                      {exp.description}
                    </p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mt-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-700 flex items-start gap-3 font-sans">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-amber-500"></div>
              <h3 className="text-xl font-light uppercase tracking-widest" style={{ color }}>
                Education
              </h3>
            </div>
            <div className="space-y-6 pl-6">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-light mb-1" style={{ color }}>
                      {edu.degree || 'Diplôme'}
                    </h4>
                    <p className="text-gray-700 font-sans">{edu.institution || 'Établissement'}</p>
                    {edu.description && (
                      <p className="text-sm text-gray-600 mt-2 font-sans">{edu.description}</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 whitespace-nowrap font-sans">
                    {edu.startDate} — {edu.endDate || 'Présent'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills & Languages Grid */}
        <div className="grid grid-cols-2 gap-10">
          {/* Core Competencies */}
          {skills && skills.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-8 bg-amber-500"></div>
                <h3 className="text-xl font-light uppercase tracking-widest" style={{ color }}>
                  Core Competencies
                </h3>
              </div>
              <div className="pl-6 space-y-2 font-sans">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">{skill.name || 'Compétence'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-8 bg-amber-500"></div>
                <h3 className="text-xl font-light uppercase tracking-widest" style={{ color }}>
                  Languages
                </h3>
              </div>
              <div className="pl-6 space-y-3 font-sans">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{lang.name || 'Langue'}</span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                      {lang.level || 'Niveau'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer elegant */}
      <div className="mt-10 pt-6 pb-8 px-12 border-t-2 border-amber-500">
        <div className="text-center text-xs text-gray-500 font-sans">
          {personalInfo.website && (
            <span>{personalInfo.website}</span>
          )}
        </div>
      </div>
    </div>
  );
}