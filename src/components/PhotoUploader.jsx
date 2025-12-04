import { useRef } from 'react';

const PhotoUploader = ({ currentPhoto, onPhotoChange }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onloadend = () => {
      onPhotoChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {currentPhoto ? (
        <div className="relative group">
          <img
            src={currentPhoto}
            alt="Photo de profil"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="Changer"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              onClick={handleRemove}
              className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              title="Supprimer"
            >
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center bg-gray-50 hover:bg-blue-50"
        >
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default PhotoUploader;