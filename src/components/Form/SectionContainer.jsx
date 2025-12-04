import { useState } from 'react';
import useCVStore from '../../store/useCVStore';

const SectionContainer = ({ 
  sectionKey,
  title, 
  icon,
  children,
  canDelete = false,
  canToggleVisibility = true,
  canReorder = true,
  defaultCollapsed = false,
}) => {
  const { 
    collapsedSections, 
    toggleSection,
    visibleSections,
    toggleSectionVisibility,
  } = useCVStore();

  const [showMenu, setShowMenu] = useState(false);
  
  // Utilise l'état du store si disponible, sinon fallback sur la prop
  const isCollapsed = collapsedSections[sectionKey] ?? defaultCollapsed;
  const isVisible = visibleSections[sectionKey] ?? true;

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all ${
      !isVisible ? 'opacity-50' : ''
    }`}>
      {/* Header de la section */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        {/* Titre avec icône */}
        <div className="flex items-center gap-3">
          {/* Drag handle (si réorganisation activée) */}
          {canReorder && (
            <button
              className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 transition-colors"
              title="Glisser pour réorganiser"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </button>
          )}

          {/* Icône de section */}
          {icon && <span className="text-2xl">{icon}</span>}

          {/* Titre */}
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

          {/* Badge "masqué" */}
          {!isVisible && (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
              Masqué
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Menu actions (⋮) */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              title="Options"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-200">
                  
                  {canToggleVisibility && (
                    <button
                      onClick={() => {
                        toggleSectionVisibility(sectionKey);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {isVisible ? (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                          Masquer sur le CV
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Afficher sur le CV
                        </>
                      )}
                    </button>
                  )}

                  {canDelete && (
                    <>
                      <div className="border-t border-gray-200 my-2" />
                      <button
                        onClick={() => {
                          if (confirm(`Êtes-vous sûr de vouloir supprimer la section "${title}" ?`)) {
                            // Action de suppression à implémenter
                          }
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Supprimer la section
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Bouton collapse (^) */}
          <button
            onClick={() => toggleSection(sectionKey)}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            title={isCollapsed ? 'Développer' : 'Réduire'}
          >
            <svg 
              className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenu de la section (collapsible) */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'max-h-0' : 'max-h-[5000px]'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SectionContainer;