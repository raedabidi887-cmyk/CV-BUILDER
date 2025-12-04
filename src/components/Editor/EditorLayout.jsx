// src/components/Editor/EditorLayout.jsx
import { useState } from 'react';
import EditorHeader from './EditorHeader';
import FormPanel from './FormPanel';
import PreviewPanel from './PreviewPanel';
import useCVStore from '../../store/useCVStore'; // ⚠️ AJOUT IMPORTANT

const EditorLayout = () => {
  // ⚠️ AJOUT : Récupérer les données du CV depuis le store Zustand
  const cvData = useCVStore((state) => state.cvData);
  
  // État pour gérer la vue mobile (Éditer / Aperçu)
  const [mobileView, setMobileView] = useState('edit'); // 'edit' | 'preview'
  
  // État pour la largeur du panneau (optionnel - pour resize)
  const [formPanelWidth, setFormPanelWidth] = useState(40); // Pourcentage

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header Global */}
      <EditorHeader />

      {/* Tabs Mobile - Visible uniquement sur mobile/tablet */}
      <div className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex">
          <button
            onClick={() => setMobileView('edit')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileView === 'edit'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ✏️ Éditer
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileView === 'preview'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            👁️ Aperçu
          </button>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop - Split View */}
        <div className="hidden lg:flex h-full">
          {/* Panneau Formulaire - Gauche */}
          <div 
            className="overflow-y-auto bg-gray-50"
            style={{ width: `${formPanelWidth}%` }}
          >
            <FormPanel />
          </div>

          {/* Séparateur Draggable (optionnel) */}
          <div
            className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors"
            onMouseDown={(e) => {
              e.preventDefault();
              const startX = e.clientX;
              const startWidth = formPanelWidth;

              const handleMouseMove = (e) => {
                const delta = e.clientX - startX;
                const deltaPercent = (delta / window.innerWidth) * 100;
                const newWidth = Math.min(Math.max(startWidth + deltaPercent, 30), 70);
                setFormPanelWidth(newWidth);
              };

              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          />

          {/* Panneau Preview - Droite */}
          {/* ⚠️ MODIFICATION : Passer cvData au PreviewPanel */}
          <div 
            className="overflow-y-auto bg-gray-100"
            style={{ width: `${100 - formPanelWidth}%` }}
          >
            <PreviewPanel cvData={cvData} />
          </div>
        </div>

        {/* Mobile/Tablet - Single View avec Tabs */}
        <div className="lg:hidden h-full">
          {mobileView === 'edit' ? (
            <div className="h-full overflow-y-auto bg-gray-50">
              <FormPanel />
            </div>
          ) : (
            <div className="h-full overflow-y-auto bg-gray-100">
              {/* ⚠️ MODIFICATION : Passer cvData au PreviewPanel */}
              <PreviewPanel cvData={cvData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorLayout;