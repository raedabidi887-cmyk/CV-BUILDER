// src/components/UI/PreviewToolbar.jsx
import React from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';

const PreviewToolbar = ({ 
  zoomLevel = 100, 
  onZoomChange, 
  currentPage = 1, 
  totalPages = 1,
  onPageChange,
  onExportPDF,        // fonction pour export PDF
  onExportWord,       // fonction pour export Word
  colorScheme = 'blue',
  onColorSchemeChange,
  fontSize = 'medium',
  onFontSizeChange
}) => {
  // Niveaux de zoom prédéfinis
  const zoomLevels = [50, 75, 100, 125, 150, 200];

  // Schémas de couleurs
  const colorSchemes = [
    { value: 'blue', label: 'Bleu Professionnel', color: '#2563eb' },
    { value: 'green', label: 'Vert Moderne', color: '#059669' },
    { value: 'purple', label: 'Violet Créatif', color: '#7c3aed' },
    { value: 'gray', label: 'Gris Élégant', color: '#374151' },
    { value: 'red', label: 'Rouge Dynamique', color: '#dc2626' }
  ];

  // Tailles de police
  const fontSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' }
  ];

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoomLevel);
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  const handleResetZoom = () => {
    onZoomChange(100);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">

        {/* Section Gauche - Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3">
            
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom arrière"
            >
              <ZoomOut className="w-4 h-4 text-gray-700" />
            </button>

            <select
              value={zoomLevel}
              onChange={(e) => onZoomChange(Number(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer"
            >
              {zoomLevels.map(level => (
                <option key={level} value={level}>{level}%</option>
              ))}
            </select>

            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200}
              className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Zoom avant"
            >
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>

            <button
              onClick={handleResetZoom}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-1"
              title="Taille réelle"
            >
              <Maximize2 className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Navigation pages */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 pl-3">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>

              <span className="text-sm text-gray-600 font-medium">
                Page {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        {/* Options de style */}
        <div className="flex items-center gap-4">

          {/* Thème */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Thème:</label>
            <select
              value={colorScheme}
              onChange={(e) => onColorSchemeChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm cursor-pointer"
            >
              {colorSchemes.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Taille de texte */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Taille:</label>
            <select
              value={fontSize}
              onChange={(e) => onFontSizeChange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm cursor-pointer"
            >
              {fontSizes.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions : Export */}
        <div className="flex items-center gap-2">
          {/* Export PDF */}
          <button
            onClick={onExportPDF}
            disabled={!onExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Télécharger en PDF"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">PDF</span>
          </button>

          {/* Export Word */}
          <button
            onClick={onExportWord}
            disabled={!onExportWord}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Télécharger en Word"
          >
            <Download className="w-4 h-4" />
            <span className="font-medium">Word</span>
          </button>
        </div>
      </div>

      {/* Barre info */}
      <div className="mt-2 pt-2 border-t text-xs text-gray-500 flex justify-between items-center">
        <span>📄 Format A4 • Haute qualité</span>
        <span className="text-green-600">✓ Prêt à télécharger</span>
      </div>
    </div>
  );
};

export default PreviewToolbar;
