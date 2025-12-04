import useCVStore from '../store/useCVStore';

export const SummarySection = () => {
  const { cvData, updateSummary } = useCVStore();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Décrivez-vous en quelques lignes
      </label>
      <textarea
        value={cvData.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Exemple : Développeur Full-Stack passionné avec 5 ans d'expérience..."
        rows={6}
        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
      />
      <p className="mt-2 text-xs text-gray-500">
        💡 Conseil : Mettez en avant vos compétences clés et votre valeur ajoutée
      </p>
    </div>
  );
};
