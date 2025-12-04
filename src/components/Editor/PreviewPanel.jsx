import React, { useState, useRef, useEffect } from 'react';
import PreviewToolbar from '../UI/PreviewToolbar';
import CVTemplate from '../Preview/CVTemplate';
import pdfExport from "../../utils/pdfExport";      // ✅ IMPORT CORRECT
import wordExport from "../../utils/wordExport";    // ✅ IMPORT CORRECT

const PreviewPanel = ({ 
  cvData, 
  className = ''
}) => {

  const [zoomLevel, setZoomLevel] = useState(100);
  const [colorScheme, setColorScheme] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');

  const previewRef = useRef(null);

  // ------------ HANDLERS EXPORT -------------

  const handleExportPDF = async () => {
    if (!previewRef.current) return;

    await pdfExport(previewRef.current, cvData);
  };

  const handleExportWord = async () => {
    if (!previewRef.current) return;

    await wordExport(previewRef.current, cvData);
  };

  // ------------ RENDER --------------

  return (
    <div className={`flex flex-col h-full bg-gray-100 ${className}`}>

      <PreviewToolbar
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}

        colorScheme={colorScheme}
        onColorSchemeChange={setColorScheme}

        fontSize={fontSize}
        onFontSizeChange={setFontSize}

        onExportPDF={handleExportPDF}     // ⬅️ IMPORTANT
        onExportWord={handleExportWord}   // ⬅️ IMPORTANT
      />

      <div className="flex-1 overflow-auto p-8">
        {/* Zone A4 */}
        <div
          className="mx-auto transition-transform duration-150"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top center",
            width: "210mm",
            minHeight: "297mm"
          }}
        >
          <div
            ref={previewRef}
            className="bg-white shadow-2xl"
            style={{
              width: "210mm",
              minHeight: "297mm"
            }}
          >
            <CVTemplate
              cvData={cvData}
              colorScheme={colorScheme}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PreviewPanel;
