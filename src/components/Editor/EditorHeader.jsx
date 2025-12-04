import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCVStore from '../../store/useCVStore';

const EditorHeader = () => {
  const navigate = useNavigate();
  
  // Store
  const {
    cvTitle,
    updateCVTitle,
    saveStatus,
    lastSaved,
    language,
    updateLanguage,
    saveCV,
    duplicateCV,
    resetCV,
  } = useCVStore();

  // États locaux
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [localTitle, setLocalTitle] = useState(cvTitle);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  
  const titleInputRef = useRef(null);

  // Sync le titre local avec le store
  useEffect(() => {
    setLocalTitle(cvTitle);
  }, [cvTitle]);

  // Focus l'input quand on passe en mode édition
  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  // Icône de sauvegarde selon le statut
  const SaveIcon = () => {
    if (saveStatus === 'saving') {
      return (
        <div className="flex items-center gap-2 text-gray-600">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-xs hidden md:inline">Sauvegarde...</span>
        </div>
      );
    }
    
    if (saveStatus === 'saved') {
      return (
        <div className="flex items-center gap-2 text-green-600" title={`Dernière sauvegarde: ${new Date(lastSaved).toLocaleTimeString()}`}>
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 16A3.5 3.5 0 002 12.5v-8A3.5 3.5 0 005.5 1h4.09a.5.5 0 01.353.146L13.854 5.146a.5.5 0 01.146.354V12.5a3.5 3.5 0 01-3.5 3.5h-5z" />
            <path d="M7 7a1 1 0 011-1h2a1 1 0 010 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h2a1 1 0 010 2H8a1 1 0 01-1-1z" />
          </svg>
          <span className="text-xs hidden md:inline">Sauvegardé</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center gap-2 text-orange-600">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-xs hidden md:inline">Non sauvegardé</span>
      </div>
    );
  };

  // Gestion du titre
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (localTitle.trim() !== cvTitle) {
      updateCVTitle(localTitle.trim() || 'CV sans titre');
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
    if (e.key === 'Escape') {
      setLocalTitle(cvTitle);
      setIsEditingTitle(false);
    }
  };

  // Langues disponibles
  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <>
      <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          
          {/* GAUCHE - Retour + Titre page */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Retour au tableau de bord"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden md:inline font-medium">Curriculum vitae</span>
            </button>
          </div>

          {/* CENTRE - Titre CV éditable + Statut sauvegarde */}
          <div className="flex-1 flex items-center justify-center gap-3 max-w-md">
            {isEditingTitle ? (
              <input
                ref={titleInputRef}
                type="text"
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={handleTitleKeyDown}
                className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={50}
              />
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="flex-1 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-center truncate"
                title="Cliquer pour modifier le titre"
              >
                {cvTitle}
              </button>
            )}
            
            <SaveIcon />
          </div>

          {/* DROITE - Actions */}
          <div className="flex items-center gap-2">
            
            {/* Sélecteur de langue */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>{currentLanguage.flag}</span>
                <span className="hidden md:inline font-medium">{currentLanguage.code.toUpperCase()}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLanguageMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowLanguageMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-20">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          updateLanguage(lang.code);
                          setShowLanguageMenu(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 transition-colors ${
                          language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {language === lang.code && (
                          <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Menu Actions (⋮) */}
            <div className="relative">
              <button
                onClick={() => setShowActionsMenu(!showActionsMenu)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>

              {showActionsMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowActionsMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20">
                    <button
                      onClick={() => {
                        saveCV();
                        setShowActionsMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      Sauvegarder maintenant
                    </button>
                    
                    <button
                      onClick={() => {
                        duplicateCV();
                        setShowActionsMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Dupliquer le CV
                    </button>

                    <div className="border-t border-gray-200 my-2" />

                    <button
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir réinitialiser ce CV ?')) {
                          resetCV();
                        }
                        setShowActionsMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Réinitialiser le CV
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Bouton Télécharger */}
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="hidden md:inline">Télécharger</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal Export (à développer plus tard) */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Télécharger votre CV</h2>
            <p className="text-gray-600 mb-4">Sélectionnez le format d'export :</p>
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium">
                📄 PDF
              </button>
              <button className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                📝 DOCX
              </button>
            </div>
            <button
              onClick={() => setShowExportModal(false)}
              className="w-full mt-4 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditorHeader;