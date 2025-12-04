// src/components/Preview/CVTemplate.jsx
import React from 'react';
import { colorSchemes, getFontSizeClasses } from './ColorSchemes';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Calendar } from 'lucide-react';

const CVTemplate = ({ cvData = {}, colorScheme = 'blue', fontSize = 'medium' }) => {
  const colors = colorSchemes[colorScheme] || colorSchemes.blue;
  const fontClasses = getFontSizeClasses(fontSize);
  
  // ⚠️ PROTECTION : Si cvData est vide ou undefined
  if (!cvData || !cvData.personalInfo) {
    return (
      <div className="flex items-center justify-center h-full p-12 text-center">
        <div>
          <div className="mb-4">
            <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-semibold mb-2">
            Aucune donnée de CV disponible
          </p>
          <p className="text-gray-400 text-sm">
            Commencez à remplir le formulaire pour voir l'aperçu de votre CV
          </p>
        </div>
      </div>
    );
  }
  
  // Helper pour formater les dates
  const formatDate = (startDate, endDate, current) => {
    if (!startDate) return '';
    if (current) return `${startDate} - Présent`;
    if (endDate) return `${startDate} - ${endDate}`;
    return startDate;
  };
  
  // Helper pour vérifier si une section a du contenu
  const hasContent = (array) => array && array.length > 0;
  
  return (
    <div 
      className="w-full h-full p-12"
      style={{ 
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        lineHeight: '1.6',
        color: '#1f2937'
      }}
    >
      {/* ============================================ */}
      {/* HEADER - Informations personnelles */}
      {/* ============================================ */}
      <header className="mb-8">
        <div className="flex items-start gap-6">
          {/* Photo (si disponible) */}
          {cvData.personalInfo?.photo && (
            <div className="flex-shrink-0">
              <img 
                src={cvData.personalInfo.photo} 
                alt="Photo de profil" 
                className="rounded-full object-cover border-4"
                style={{ 
                  width: '120px',
                  height: '120px',
                  borderColor: colors.primary 
                }}
              />
            </div>
          )}
          
          {/* Infos principales */}
          <div className="flex-1">
            {/* Nom complet */}
            <h1 
              className={`font-bold mb-2 ${fontClasses.name}`}
              style={{ color: colors.primary }}
            >
              {cvData.personalInfo?.firstName || ''} {cvData.personalInfo?.lastName || ''}
            </h1>
            
            {/* Titre / Poste */}
            {cvData.personalInfo?.jobTitle && (
              <p 
                className={`text-gray-600 mb-4 ${fontClasses.title}`}
                style={{ fontWeight: '500' }}
              >
                {cvData.personalInfo.jobTitle}
              </p>
            )}
            
            {/* Coordonnées en ligne */}
            <div className={`flex flex-wrap gap-4 ${fontClasses.contact}`}>
              {cvData.personalInfo?.email && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              
              {cvData.personalInfo?.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              
              {cvData.personalInfo?.address && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" style={{ color: colors.primary }} />
                  <span>{cvData.personalInfo.address}</span>
                </div>
              )}
              
              {cvData.personalInfo?.website && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe className="w-4 h-4" style={{ color: colors.primary }} />
                  <a href={cvData.personalInfo.website} className="hover:underline">
                    {cvData.personalInfo.website.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
              
              {cvData.personalInfo?.linkedin && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Linkedin className="w-4 h-4" style={{ color: colors.primary }} />
                  <a href={cvData.personalInfo.linkedin} className="hover:underline">
                    LinkedIn
                  </a>
                </div>
              )}
              
              {cvData.personalInfo?.github && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Github className="w-4 h-4" style={{ color: colors.primary }} />
                  <a href={cvData.personalInfo.github} className="hover:underline">
                    GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Ligne de séparation */}
        <div 
          className="mt-6 h-1 rounded-full"
          style={{ backgroundColor: colors.primary }}
        />
      </header>
      
      {/* ============================================ */}
      {/* PROFIL / RÉSUMÉ */}
      {/* ============================================ */}
      {cvData.summary && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-3 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Profil Professionnel
          </h2>
          <p 
            className={`text-gray-700 leading-relaxed ${fontClasses.body}`}
            style={{ textAlign: 'justify' }}
          >
            {cvData.summary}
          </p>
        </section>
      )}
      
      {/* ============================================ */}
      {/* EXPÉRIENCE PROFESSIONNELLE */}
      {/* ============================================ */}
      {hasContent(cvData.experiences) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Expérience Professionnelle
          </h2>
          
          {cvData.experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`mb-5 pl-4 border-l-4 ${index === cvData.experiences.length - 1 ? '' : 'pb-5'}`}
              style={{ borderColor: colors.secondary }}
            >
              {/* Titre du poste et entreprise */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 
                    className={`font-semibold ${fontClasses.jobTitle}`}
                    style={{ color: colors.text }}
                  >
                    {exp.position}
                  </h3>
                  <p className={`text-gray-600 font-medium ${fontClasses.company}`}>
                    {exp.company}
                    {exp.location && ` • ${exp.location}`}
                  </p>
                </div>
                
                {/* Dates */}
                <div className="flex items-center gap-1 text-gray-500 text-sm ml-4">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className={fontClasses.dates}>
                    {formatDate(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              {exp.description && (
                <p className={`text-gray-700 mb-2 ${fontClasses.body}`}>
                  {exp.description}
                </p>
              )}
              
              {/* Réalisations / Points clés */}
              {hasContent(exp.achievements) && (
                <ul className={`list-disc list-inside space-y-1 text-gray-700 ${fontClasses.body}`}>
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
              
              {/* Technologies / Compétences utilisées */}
              {hasContent(exp.technologies) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: colors.secondary, 
                        color: colors.text 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* ============================================ */}
      {/* FORMATION */}
      {/* ============================================ */}
      {hasContent(cvData.educations) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Formation
          </h2>
          
          {cvData.educations.map((edu, index) => (
            <div 
              key={index} 
              className={`mb-4 pl-4 border-l-4 ${index === cvData.educations.length - 1 ? '' : 'pb-4'}`}
              style={{ borderColor: colors.secondary }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 
                    className={`font-semibold ${fontClasses.jobTitle}`}
                    style={{ color: colors.text }}
                  >
                    {edu.degree}
                  </h3>
                  <p className={`text-gray-600 font-medium ${fontClasses.company}`}>
                    {edu.school}
                    {edu.location && ` • ${edu.location}`}
                  </p>
                  
                  {/* Description / Spécialisation */}
                  {edu.description && (
                    <p className={`text-gray-700 mt-1 ${fontClasses.body}`}>
                      {edu.description}
                    </p>
                  )}
                  
                  {/* GPA / Mention */}
                  {edu.gpa && (
                    <p className={`text-gray-600 mt-1 text-sm`}>
                      Note: {edu.gpa}
                    </p>
                  )}
                  
                  {/* Cours pertinents */}
                  {hasContent(edu.courses) && (
                    <div className="mt-2">
                      <p className="text-gray-600 text-sm font-medium">Cours principaux:</p>
                      <p className="text-gray-700 text-sm">
                        {edu.courses.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Dates */}
                <div className="text-gray-500 text-sm ml-4">
                  <span className={fontClasses.dates}>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
      
      {/* ============================================ */}
      {/* COMPÉTENCES */}
      {/* ============================================ */}
      {hasContent(cvData.skills) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Compétences
          </h2>
          
          <div className="flex flex-wrap gap-2">
            {cvData.skills.map((skill, index) => (
              <span 
                key={index}
                className={`px-4 py-2 rounded-full font-medium ${fontClasses.skill}`}
                style={{ 
                  backgroundColor: colors.secondary, 
                  color: colors.text 
                }}
              >
                {skill.name}
                {skill.level && ` • ${skill.level}`}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* ============================================ */}
      {/* LANGUES */}
      {/* ============================================ */}
      {hasContent(cvData.languages) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Langues
          </h2>
          
          <div className="grid grid-cols-2 gap-3">
            {cvData.languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className={`font-medium ${fontClasses.body}`}>
                  {lang.name}
                </span>
                <span 
                  className={`px-3 py-1 rounded-full text-xs font-medium`}
                  style={{ 
                    backgroundColor: colors.secondary, 
                    color: colors.text 
                  }}
                >
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* ============================================ */}
      {/* CERTIFICATIONS */}
      {/* ============================================ */}
      {hasContent(cvData.certifications) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Certifications
          </h2>
          
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="mb-3 pl-4 border-l-4" style={{ borderColor: colors.secondary }}>
              <h3 className={`font-semibold ${fontClasses.company}`} style={{ color: colors.text }}>
                {cert.name}
              </h3>
              <p className={`text-gray-600 ${fontClasses.body}`}>
                {cert.issuer}
                {cert.date && ` • ${cert.date}`}
              </p>
              {cert.credentialId && (
                <p className="text-gray-500 text-xs mt-1">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* ============================================ */}
      {/* PROJETS */}
      {/* ============================================ */}
      {hasContent(cvData.projects) && (
        <section className="mb-8">
          <h2 
            className={`font-bold mb-4 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Projets
          </h2>
          
          {cvData.projects.map((project, index) => (
            <div key={index} className="mb-4 pl-4 border-l-4" style={{ borderColor: colors.secondary }}>
              <h3 className={`font-semibold ${fontClasses.jobTitle}`} style={{ color: colors.text }}>
                {project.name}
              </h3>
              {project.description && (
                <p className={`text-gray-700 mt-1 ${fontClasses.body}`}>
                  {project.description}
                </p>
              )}
              {hasContent(project.technologies) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: colors.secondary, 
                        color: colors.text 
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}
      
      {/* ============================================ */}
      {/* CENTRES D'INTÉRÊT / HOBBIES */}
      {/* ============================================ */}
      {hasContent(cvData.hobbies) && (
        <section>
          <h2 
            className={`font-bold mb-3 ${fontClasses.sectionTitle}`}
            style={{ color: colors.primary }}
          >
            Centres d'Intérêt
          </h2>
          
          <p className={`text-gray-700 ${fontClasses.body}`}>
            {cvData.hobbies.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default CVTemplate;