// src/components/Form/ImportOptions.jsx
import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Linkedin, 
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2,
  File,
  FileType
} from 'lucide-react';

const ImportOptions = ({ isOpen, onClose, onImportComplete }) => {
  const [activeTab, setActiveTab] = useState('file'); // 'file' | 'linkedin' | 'url'
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [parseResults, setParseResults] = useState(null);
  
  const fileInputRef = useRef(null);
  
  // Fermer le modal
  if (!isOpen) return null;
  
  /**
   * ============================================
   * GESTION DES FICHIERS
   * ============================================
   */
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };
  
  const handleFiles = async (files) => {
    // Filtrer les fichiers supportés
    const supportedFiles = files.filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return ['pdf', 'doc', 'docx', 'txt'].includes(ext);
    });
    
    if (supportedFiles.length === 0) {
      alert('❌ Format de fichier non supporté. Utilisez PDF, DOC, DOCX ou TXT.');
      return;
    }
    
    // Ajouter les fichiers à la liste
    const newFiles = supportedFiles.map(file => ({
      file,
      name: file.name,
      size: file.size,
      status: 'pending', // 'pending' | 'processing' | 'success' | 'error'
      error: null
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Parser automatiquement
    await parseFiles(newFiles);
  };
  
  const parseFiles = async (files) => {
    setIsProcessing(true);
    
    for (let i = 0; i < files.length; i++) {
      const fileData = files[i];
      
      // Mettre à jour le statut
      setUploadedFiles(prev => 
        prev.map(f => 
          f.name === fileData.name 
            ? { ...f, status: 'processing' }
            : f
        )
      );
      
      try {
        // Simuler le parsing (remplacer par votre vrai parser)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // TODO: Appeler votre vrai parser ici
        // const parsedData = await cvParser.parse(fileData.file);
        
        const mockParsedData = {
          personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@email.com',
            phone: '+33 6 12 34 56 78',
            title: 'Développeur Full Stack'
          },
          experiences: [
            {
              position: 'Senior Developer',
              company: 'TechCorp',
              startDate: '2020',
              endDate: '2023',
              description: 'Développement d\'applications web'
            }
          ],
          skills: [
            { name: 'React', level: 'Expert' },
            { name: 'Node.js', level: 'Avancé' }
          ]
        };
        
        // Succès
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === fileData.name 
              ? { ...f, status: 'success', parsedData: mockParsedData }
              : f
          )
        );
        
        setParseResults(mockParsedData);
        
      } catch (error) {
        // Erreur
        setUploadedFiles(prev => 
          prev.map(f => 
            f.name === fileData.name 
              ? { ...f, status: 'error', error: error.message }
              : f
          )
        );
      }
    }
    
    setIsProcessing(false);
  };
  
  const removeFile = (fileName) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };
  
  /**
   * ============================================
   * GESTION DU DRAG & DROP
   * ============================================
   */
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  /**
   * ============================================
   * IMPORT LINKEDIN
   * ============================================
   */
  
  const handleLinkedInImport = async () => {
    if (!linkedinUrl.trim()) {
      alert('⚠️ Veuillez entrer une URL LinkedIn valide');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // TODO: Implémenter l'import LinkedIn (nécessite un backend)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('ℹ️ Import LinkedIn nécessite une configuration backend.\n\nPour l\'activer :\n1. Configurez l\'API LinkedIn OAuth\n2. Implémentez le scraping sécurisé\n3. Respectez les conditions d\'utilisation LinkedIn');
      
    } catch (error) {
      alert('❌ Erreur lors de l\'import LinkedIn');
    } finally {
      setIsProcessing(false);
    }
  };
  
  /**
   * ============================================
   * IMPORT PAR URL
   * ============================================
   */
  
  const handleUrlImport = async () => {
    if (!profileUrl.trim()) {
      alert('⚠️ Veuillez entrer une URL valide');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // TODO: Implémenter l'import par URL
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('ℹ️ Import par URL en cours de développement');
      
    } catch (error) {
      alert('❌ Erreur lors de l\'import par URL');
    } finally {
      setIsProcessing(false);
    }
  };
  
  /**
   * ============================================
   * FINALISER L'IMPORT
   * ============================================
   */
  
  const handleConfirmImport = () => {
    const successfulFiles = uploadedFiles.filter(f => f.status === 'success');
    
    if (successfulFiles.length === 0) {
      alert('⚠️ Aucun fichier parsé avec succès');
      return;
    }
    
    // Prendre les données du premier fichier réussi
    const importedData = successfulFiles[0].parsedData;
    
    if (onImportComplete) {
      onImportComplete(importedData);
    }
    
    // Réinitialiser et fermer
    setUploadedFiles([]);
    setParseResults(null);
    onClose();
  };
  
  /**
   * ============================================
   * FORMATAGE DES TAILLES DE FICHIER
   * ============================================
   */
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  /**
   * ============================================
   * RENDU DU COMPOSANT
   * ============================================
   */
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Importer un CV
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Importez votre CV existant depuis un fichier ou LinkedIn
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'file'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5 inline-block mr-2" />
            Depuis un fichier
          </button>
          
          <button
            onClick={() => setActiveTab('linkedin')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'linkedin'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Linkedin className="w-5 h-5 inline-block mr-2" />
            Depuis LinkedIn
          </button>
          
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'url'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-5 h-5 inline-block mr-2" />
            Depuis une URL
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          
          {/* TAB 1: Upload de fichier */}
          {activeTab === 'file' && (
            <div className="space-y-6">
              {/* Zone de drag & drop */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Upload className={`w-16 h-16 mx-auto mb-4 ${
                  dragActive ? 'text-blue-500' : 'text-gray-400'
                }`} />
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Glissez-déposez votre CV ici
                </h3>
                <p className="text-gray-500 mb-4">
                  ou cliquez pour sélectionner un fichier
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sélectionner un fichier
                </button>
                
                <p className="text-xs text-gray-400 mt-4">
                  Formats supportés : PDF, DOC, DOCX, TXT (max 10 MB)
                </p>
              </div>
              
              {/* Liste des fichiers uploadés */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">
                    Fichiers ({uploadedFiles.length})
                  </h4>
                  
                  {uploadedFiles.map((fileData, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <FileType className="w-8 h-8 text-blue-500" />
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {fileData.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(fileData.size)}
                          </p>
                        </div>
                        
                        {/* Statut */}
                        <div className="flex items-center gap-2">
                          {fileData.status === 'pending' && (
                            <span className="text-xs text-gray-500">En attente</span>
                          )}
                          
                          {fileData.status === 'processing' && (
                            <>
                              <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                              <span className="text-xs text-blue-600">Analyse...</span>
                            </>
                          )}
                          
                          {fileData.status === 'success' && (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="text-xs text-green-600 font-medium">Réussi</span>
                            </>
                          )}
                          
                          {fileData.status === 'error' && (
                            <>
                              <AlertCircle className="w-5 h-5 text-red-500" />
                              <span className="text-xs text-red-600">Erreur</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFile(fileData.name)}
                        className="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* TAB 2: Import LinkedIn */}
          {activeTab === 'linkedin' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  <strong>Note :</strong> L'import depuis LinkedIn nécessite une configuration backend et le respect des conditions d'utilisation de LinkedIn.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du profil LinkedIn
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://www.linkedin.com/in/votre-profil"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleLinkedInImport}
                disabled={isProcessing || !linkedinUrl.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  <>
                    <Linkedin className="w-5 h-5" />
                    Importer depuis LinkedIn
                  </>
                )}
              </button>
            </div>
          )}
          
          {/* TAB 3: Import par URL */}
          {activeTab === 'url' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du profil en ligne
                </label>
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://monsite.com/mon-cv"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Formats supportés : CV en ligne publics, portfolios, pages personnelles
                </p>
              </div>
              
              <button
                onClick={handleUrlImport}
                disabled={isProcessing || !profileUrl.trim()}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Import en cours...
                  </>
                ) : (
                  <>
                    <Globe className="w-5 h-5" />
                    Importer depuis l'URL
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Annuler
          </button>
          
          <button
            onClick={handleConfirmImport}
            disabled={uploadedFiles.filter(f => f.status === 'success').length === 0}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Confirmer l'import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportOptions;