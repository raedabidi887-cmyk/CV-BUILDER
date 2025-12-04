import { useState } from 'react';
import useCVStore from '../store/useCVStore';
import PhotoUploader from './PhotoUploader';
import OptionalFieldButton from './Form/OptionalFieldButton';

const PersonalInfoForm = () => {
  const { 
    cvData, 
    updatePersonalInfo,
    optionalFields,
    toggleOptionalField,
  } = useCVStore();

  const personalInfo = cvData.personalInfo;
  const optionalPersonalFields = optionalFields.personalInfo;

  // État local pour la validation
  const [errors, setErrors] = useState({});

  // Validation email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validation téléphone
  const validatePhone = (phone) => {
    const regex = /^[\d\s\+\-\(\)]+$/;
    return phone === '' || regex.test(phone);
  };

  // Gérer les changements avec validation
  const handleChange = (field, value) => {
    updatePersonalInfo(field, value);

    // Validation en temps réel
    if (field === 'email' && value) {
      if (!validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Email invalide' }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    }

    if (field === 'phone' && value) {
      if (!validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Téléphone invalide' }));
      } else {
        setErrors(prev => ({ ...prev, phone: null }));
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Ligne 1 : Photo + Prénom + Nom */}
      <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-4">
        {/* Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photo
          </label>
          <PhotoUploader
            currentPhoto={personalInfo.photo}
            onPhotoChange={(photo) => handleChange('photo', photo)}
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="John"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom de famille <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Doe"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      {/* Ligne 2 : Emploi recherché */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Emploi recherché
        </label>
        <div className="space-y-2">
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="Ex: Développeur Full-Stack"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Toggle "En faire le titre du CV" */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={personalInfo.useJobTitleAsTitle}
              onChange={(e) => handleChange('useJobTitleAsTitle', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">En faire le titre du CV</span>
          </label>
        </div>
      </div>

      {/* Ligne 3 : Email + Téléphone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse e-mail <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john.doe@example.com"
            className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+33 6 12 34 56 78"
            className={`w-full px-4 py-2 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Ligne 4 : Adresse complète */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse
        </label>
        <input
          type="text"
          value={personalInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="123 Rue de la Paix"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Ligne 5 : Code postal + Ville */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code postal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Code postal
          </label>
          <input
            type="text"
            value={personalInfo.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="75001"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville
          </label>
          <input
            type="text"
            value={personalInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Paris"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* CHAMPS OPTIONNELS */}
      
      {/* Date de naissance */}
      {optionalPersonalFields.birthDate && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date de naissance
          </label>
          <input
            type="date"
            value={personalInfo.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Lieu de naissance */}
      {optionalPersonalFields.birthPlace && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lieu de naissance
          </label>
          <input
            type="text"
            value={personalInfo.birthPlace}
            onChange={(e) => handleChange('birthPlace', e.target.value)}
            placeholder="Paris, France"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Permis de conduire */}
      {optionalPersonalFields.drivingLicense && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permis de conduire
          </label>
          <div className="flex flex-wrap gap-2">
            {['B', 'A', 'C', 'D', 'E'].map((license) => (
              <label key={license} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={personalInfo.drivingLicense.includes(license)}
                  onChange={(e) => {
                    const newLicenses = e.target.checked
                      ? [...personalInfo.drivingLicense, license]
                      : personalInfo.drivingLicense.filter(l => l !== license);
                    handleChange('drivingLicense', newLicenses);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Permis {license}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sexe */}
      {optionalPersonalFields.gender && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sexe
          </label>
          <select
            value={personalInfo.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Sélectionner --</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>
      )}

      {/* Nationalité */}
      {optionalPersonalFields.nationality && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nationalité
          </label>
          <input
            type="text"
            value={personalInfo.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
            placeholder="Française"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* LinkedIn */}
      {optionalPersonalFields.linkedin && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profil LinkedIn
          </label>
          <input
            type="url"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Site web */}
      {optionalPersonalFields.website && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Site web
          </label>
          <input
            type="url"
            value={personalInfo.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="https://johndoe.com"
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {/* Boutons d'ajout de champs optionnels */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Ajouter des informations :</p>
        <div className="flex flex-wrap gap-2">
          <OptionalFieldButton
            section="personalInfo"
            field="birthDate"
            label="Date de naissance"
            isActive={optionalPersonalFields.birthDate}
            onToggle={() => toggleOptionalField('personalInfo', 'birthDate')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="birthPlace"
            label="Lieu de naissance"
            isActive={optionalPersonalFields.birthPlace}
            onToggle={() => toggleOptionalField('personalInfo', 'birthPlace')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="drivingLicense"
            label="Permis de conduire"
            isActive={optionalPersonalFields.drivingLicense}
            onToggle={() => toggleOptionalField('personalInfo', 'drivingLicense')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="gender"
            label="Sexe"
            isActive={optionalPersonalFields.gender}
            onToggle={() => toggleOptionalField('personalInfo', 'gender')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="nationality"
            label="Nationalité"
            isActive={optionalPersonalFields.nationality}
            onToggle={() => toggleOptionalField('personalInfo', 'nationality')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="linkedin"
            label="LinkedIn"
            isActive={optionalPersonalFields.linkedin}
            onToggle={() => toggleOptionalField('personalInfo', 'linkedin')}
          />
          <OptionalFieldButton
            section="personalInfo"
            field="website"
            label="Site web"
            isActive={optionalPersonalFields.website}
            onToggle={() => toggleOptionalField('personalInfo', 'website')}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;