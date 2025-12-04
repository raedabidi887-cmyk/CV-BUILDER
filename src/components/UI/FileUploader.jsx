// src/components/UI/FileUploader.jsx
import React, { useState, useRef, useCallback } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  Image as ImageIcon,
  File,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  Download,
  Trash2
} from 'lucide-react';

/**
 * ============================================
 * COMPOSANT FILE UPLOADER AVANCÉ
 * ============================================
 * 
 * Composant réutilisable pour l'upload de fichiers avec :
 * - Drag & Drop
 * - Prévisualisation
 * - Validation
 * - Multi-upload
 * - Progress tracking
 */

const FileUploader = ({
  accept = '*',
  maxSize = 10 * 1024 * 1024, // 10MB par défaut
  maxFiles = 5,
  multiple = true,
  onFilesSelected,
  onFileRemove,
  className = '',
  showPreview = true,
  autoUpload = false,
  uploadEndpoint = null,
  existingFiles = []
}) => {
  const [files, setFiles] = useState(existingFiles);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);
  
  /**
   * ============================================
   * VALIDATION DES FICHIERS
   * ============================================
   */
  
  const validateFile = (file) => {
    const errors = [];
    
    // Vérifier la taille
    if (file.size > maxSize) {
      errors.push(`${file.name}: Fichier trop volumineux (max ${formatFileSize(maxSize)})`);
    }
    
    // Vérifier le type si accept est spécifié
    if (accept !== '*') {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      const mimeType = file.type;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type;
        }
        if (type.endsWith('/*')) {
          return mimeType.startsWith(type.replace('/*', ''));
        }
        return mimeType === type;
      });
      
      if (!isAccepted) {
        errors.push(`${file.name}: Type de fichier non supporté`);
      }
    }
    
    return errors;
  };
  
  /**
   * ============================================
   * GESTION DES FICHIERS
   * ============================================
   */
  
  const handleFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    
    // Vérifier le nombre maximum
    if (files.length + fileArray.length > maxFiles) {
      setErrors([`Maximum ${maxFiles} fichiers autorisés`]);
      return;
    }
    
    // Valider chaque fichier
    const allErrors = [];
    const validFiles = [];
    
    fileArray.forEach(file => {
      const fileErrors = validateFile(file);
      if (fileErrors.length > 0) {
        allErrors.push(...fileErrors);
      } else {
        validFiles.push({
          id: Date.now() + Math.random(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'pending', // 'pending' | 'uploading' | 'success' | 'error'
          progress: 0,
          preview: null,
          error: null
        });
      }
    });
    
    setErrors(allErrors);
    
    if (validFiles.length > 0) {
      // Générer les prévisualisations pour les images
      validFiles.forEach(fileData => {
        if (fileData.type.startsWith('image/')) {
          generatePreview(fileData);
        }
      });
      
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      
      // Notifier le parent
      if (onFilesSelected) {
        onFilesSelected(validFiles.map(f => f.file));
      }
      
      // Auto-upload si activé
      if (autoUpload && uploadEndpoint) {
        validFiles.forEach(fileData => uploadFile(fileData));
      }
    }
  }, [files, maxFiles, accept, maxSize, onFilesSelected, autoUpload, uploadEndpoint]);
  
  /**
   * Génère une prévisualisation pour les images
   */
  const generatePreview = (fileData) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileData.id 
            ? { ...f, preview: e.target.result }
            : f
        )
      );
    };
    reader.readAsDataURL(fileData.file);
  };
  
  /**
   * Upload un fichier vers le serveur
   */
  const uploadFile = async (fileData) => {
    if (!uploadEndpoint) return;
    
    // Mettre à jour le statut
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === fileData.id 
          ? { ...f, status: 'uploading', progress: 0 }
          : f
      )
    );
    
    try {
      const formData = new FormData();
      formData.append('file', fileData.file);
      
      const xhr = new XMLHttpRequest();
      
      // Progress
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === fileData.id 
                ? { ...f, progress }
                : f
            )
          );
        }
      });
      
      // Success
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          setFiles(prevFiles => 
            prevFiles.map(f => 
              f.id === fileData.id 
                ? { ...f, status: 'success', progress: 100 }
                : f
            )
          );
        } else {
          throw new Error('Upload failed');
        }
      });
      
      // Error
      xhr.addEventListener('error', () => {
        setFiles(prevFiles => 
          prevFiles.map(f => 
            f.id === fileData.id 
              ? { ...f, status: 'error', error: 'Erreur lors de l\'upload' }
              : f
          )
        );
      });
      
      xhr.open('POST', uploadEndpoint);
      xhr.send(formData);
      
    } catch (error) {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileData.id 
            ? { ...f, status: 'error', error: error.message }
            : f
        )
      );
    }
  };
  
  /**
   * Supprime un fichier
   */
  const removeFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    
    if (onFileRemove && fileToRemove) {
      onFileRemove(fileToRemove.file);
    }
  };
  
  /**
   * ============================================
   * GESTION DU DRAG & DROP
   * ============================================
   */
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };
  
  /**
   * ============================================
   * GESTION DU CLIC
   * ============================================
   */
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
    // Reset input pour permettre de re-sélectionner le même fichier
    e.target.value = '';
  };
  
  /**
   * ============================================
   * UTILITAIRES
   * ============================================
   */
  
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="w-5 h-5" />;
    if (fileType.includes('pdf')) return <FileText className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };
  
  /**
   * ============================================
   * RENDU DU COMPOSANT
   * ============================================
   */
  
  return (
    <div className={`w-full ${className}`}>
      {/* Zone de drop */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          isDragging ? 'text-blue-500' : 'text-gray-400'
        }`} />
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {isDragging 
            ? 'Déposez vos fichiers ici' 
            : 'Glissez-déposez vos fichiers'
          }
        </h3>
        
        <p className="text-sm text-gray-500 mb-4">
          ou cliquez pour sélectionner
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
          {accept !== '*' && (
            <span>Formats: {accept}</span>
          )}
          {accept !== '*' && <span>•</span>}
          <span>Max {formatFileSize(maxSize)}</span>
          <span>•</span>
          <span>Jusqu'à {maxFiles} fichiers</span>
        </div>
      </div>
      
      {/* Messages d'erreur */}
      {errors.length > 0 && (
        <div className="mt-4 space-y-2">
          {errors.map((error, index) => (
            <div 
              key={index}
              className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Liste des fichiers */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">
              Fichiers ({files.length})
            </h4>
            {files.length > 1 && (
              <button
                onClick={() => setFiles([])}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Tout supprimer
              </button>
            )}
          </div>
          
          {files.map((fileData) => (
            <div 
              key={fileData.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              {/* Prévisualisation ou icône */}
              <div className="flex-shrink-0">
                {showPreview && fileData.preview ? (
                  <img 
                    src={fileData.preview} 
                    alt={fileData.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                    {getFileIcon(fileData.type)}
                  </div>
                )}
              </div>
              
              {/* Informations du fichier */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {fileData.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(fileData.size)}
                </p>
                
                {/* Barre de progression */}
                {fileData.status === 'uploading' && (
                  <div className="mt-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${fileData.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload en cours... {fileData.progress}%
                    </p>
                  </div>
                )}
                
                {/* Message d'erreur */}
                {fileData.status === 'error' && fileData.error && (
                  <p className="text-sm text-red-600 mt-1">
                    {fileData.error}
                  </p>
                )}
              </div>
              
              {/* Statut et actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {fileData.status === 'uploading' && (
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                )}
                
                {fileData.status === 'success' && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
                
                {fileData.status === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                
                {/* Prévisualiser (pour images) */}
                {fileData.preview && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(fileData.preview, '_blank');
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Prévisualiser"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                
                {/* Supprimer */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(fileData.id);
                  }}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * ============================================
 * VARIANTES DU COMPOSANT
 * ============================================
 */

// Upload simple (une seule image)
export const ImageUploader = ({ onImageSelected, currentImage, ...props }) => {
  return (
    <FileUploader
      accept="image/*"
      maxFiles={1}
      multiple={false}
      showPreview={true}
      existingFiles={currentImage ? [{
        id: 'current',
        file: null,
        name: 'Image actuelle',
        size: 0,
        type: 'image/jpeg',
        status: 'success',
        progress: 100,
        preview: currentImage
      }] : []}
      onFilesSelected={(files) => {
        if (files[0]) {
          onImageSelected(files[0]);
        }
      }}
      {...props}
    />
  );
};

// Upload de documents
export const DocumentUploader = ({ onDocumentSelected, ...props }) => {
  return (
    <FileUploader
      accept=".pdf,.doc,.docx,.txt"
      showPreview={false}
      onFilesSelected={onDocumentSelected}
      {...props}
    />
  );
};

/**
 * ============================================
 * EXPORT PAR DÉFAUT
 * ============================================
 */

export default FileUploader;