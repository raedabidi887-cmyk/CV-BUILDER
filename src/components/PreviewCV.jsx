import useCVStore from '../store/useCVStore';

const PreviewCV = () => {
  const { cvData, cvTitle } = useCVStore();
  const { personalInfo, summary, experiences, educations, skills, languages } = cvData;

  return (
    <div className="w-full max-w-[21cm] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      {/* A4 ratio */}
      <div className="aspect-[1/1.414]">
        
        {/* Header avec design */}
        <div className="relative h-48 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
          {/* Forme courbe */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 100" className="w-full h-16">
              <path d="M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z" fill="white" />
            </svg>
          </div>
          
          {/* Contenu du header */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
            {personalInfo.photo && (
              <img 
                src={personalInfo.photo} 
                alt="Photo" 
                className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover mb-4"
              />
            )}
            <h1 className="text-3xl font-bold tracking-wide">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-lg mt-2 opacity-90">{personalInfo.jobTitle}</p>
            )}
          </div>
        </div>

        {/* Contenu */}
        <div className="p-8 space-y-6">
          
          {/* Informations de contact */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📧</span>
                <span className="text-gray-700">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📱</span>
                <span className="text-gray-700">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.address && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📍</span>
                <span className="text-gray-700">{personalInfo.address}</span>
              </div>
            )}
            {personalInfo.city && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600">🏙️</span>
                <span className="text-gray-700">{personalInfo.city}</span>
              </div>
            )}
          </div>

          {/* Résumé */}
          {summary && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-600 pb-2 mb-3">
                Profil professionnel
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Expériences */}
          {experiences.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-600 pb-2 mb-3">
                Expérience professionnelle
              </h2>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-sm">
                    <p className="font-semibold text-gray-800">{exp.jobTitle || 'Poste'}</p>
                    <p className="text-gray-600">{exp.company || 'Entreprise'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formations */}
          {educations.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-600 pb-2 mb-3">
                Formation
              </h2>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id} className="text-sm">
                    <p className="font-semibold text-gray-800">{edu.degree || 'Diplôme'}</p>
                    <p className="text-gray-600">{edu.school || 'École'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Compétences */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-600 pb-2 mb-3">
                Compétences
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                  >
                    {skill.name || 'Compétence'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Langues */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 border-b-2 border-blue-600 pb-2 mb-3">
                Langues
              </h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{lang.name || 'Langue'}</span>
                    <span className="text-gray-500">- {lang.level || 'Niveau'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PreviewCV;