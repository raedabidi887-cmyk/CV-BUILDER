import React from 'react';
import { Mail, Phone, MapPin, Globe, BookOpen } from 'lucide-react';

export default function AcademicTemplate({ data = {}, color = '#0369a1' }) {
  const { 
    personalInfo = {}, 
    summary = '', 
    experience = [], 
    education = [], 
    skills = [], 
    languages = [],
    publications = [],
    research = []
  } = data;

  return (
    <div className="w-full bg-white font-serif" style={{ maxWidth: '210mm', minHeight: '297mm' }}>
      {/* Header académique classique */}
      <div className="border-b-4 px-12 pt-10 pb-6" style={{ borderColor: color }}>
        <h1 className="text-4xl font-bold mb-2 text-center" style={{ color }}>
          {personalInfo.name || 'VOTRE NOM'}
        </h1>
        <h2 className="text-lg text-gray-700 mb-4 text-center">
          {personalInfo.title || 'Votre Titre Académique'}
        </h2>
        
        {/* Contact académique */}
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 font-sans">
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
          {personalInfo.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" style={{ color }} />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* Résumé académique */}
        {summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-3 uppercase" style={{ color }}>
              Research Interests
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify font-sans">{summary}</p>
          </div>
        )}

        {/* Formation (prioritaire en académique) */}
        {education && education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{edu.degree || 'Diplôme'}</h4>
                      <p className="text-gray-700 italic">{edu.institution || 'Établissement'}</p>
                    </div>
                    <span className="text-sm text-gray-600 font-sans whitespace-nowrap">
                      {edu.startDate} - {edu.endDate || 'Présent'}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-gray-600 mt-2 font-sans">{edu.description}</p>
                  )}
                  {edu.thesis && (
                    <p className="text-sm text-gray-600 mt-2 font-sans">
                      <span className="font-semibold">Thèse: </span>{edu.thesis}
                    </p>
                  )}
                  {edu.advisor && (
                    <p className="text-sm text-gray-600 mt-1 font-sans">
                      <span className="font-semibold">Directeur: </span>{edu.advisor}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Expérience académique / professionnelle */}
        {experience && experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
              Academic Appointments & Experience
            </h3>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{exp.position || 'Poste'}</h4>
                      <p className="text-gray-700 italic">{exp.company || 'Institution'}</p>
                    </div>
                    <span className="text-sm text-gray-600 font-sans whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || 'Présent'}
                    </span>
                  </div>
                  {exp.location && (
                    <p className="text-sm text-gray-600 mb-2 font-sans flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </p>
                  )}
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed font-sans">{exp.description}</p>
                  )}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="mt-2 space-y-1 font-sans">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="mt-1.5">•</span>
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

        {/* Publications (section cruciale en académique) */}
        {publications && publications.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b-2 pb-2 flex items-center gap-2" style={{ color, borderColor: color }}>
              <BookOpen className="w-5 h-5" />
              Publications
            </h3>
            <div className="space-y-3">
              {publications.map((pub, index) => (
                <div key={index} className="text-sm font-sans">
                  <p className="text-gray-700">
                    <span className="font-semibold">{pub.authors || 'Auteurs'}.</span>{' '}
                    ({pub.year || 'Année'}).{' '}
                    <span className="italic">{pub.title || 'Titre de la publication'}</span>.{' '}
                    {pub.journal && <span className="font-medium">{pub.journal}</span>}
                    {pub.volume && <span>, {pub.volume}</span>}
                    {pub.pages && <span>, {pub.pages}</span>}.
                    {pub.doi && (
                      <span className="text-blue-600"> doi: {pub.doi}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recherche / Projets */}
        {research && research.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
              Research Projects & Grants
            </h3>
            <div className="space-y-4">
              {research.map((proj, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-900">{proj.title || 'Titre du projet'}</h4>
                    <span className="text-sm text-gray-600 font-sans whitespace-nowrap">
                      {proj.year || 'Année'}
                    </span>
                  </div>
                  {proj.funding && (
                    <p className="text-sm text-gray-600 font-sans">
                      <span className="font-semibold">Financement: </span>{proj.funding}
                    </p>
                  )}
                  {proj.description && (
                    <p className="text-sm text-gray-700 mt-2 font-sans">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compétences et Langues */}
        <div className="grid grid-cols-2 gap-8">
          {/* Compétences techniques / de recherche */}
          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                Technical Skills
              </h3>
              <div className="space-y-2 font-sans">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-sm mt-0.5">•</span>
                    <span className="text-sm text-gray-700">{skill.name || 'Compétence'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div>
              <h3 className="text-lg font-bold mb-3 uppercase border-b-2 pb-2" style={{ color, borderColor: color }}>
                Languages
              </h3>
              <div className="space-y-2 font-sans">
                {languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 font-medium">{lang.name || 'Langue'}</span>
                    <span className="text-gray-600">{lang.level || 'Niveau'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer académique */}
        <div className="mt-10 pt-4 border-t border-gray-300 text-center text-xs text-gray-500 font-sans">
          <p>Curriculum Vitae - {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
    </div>
  );
}