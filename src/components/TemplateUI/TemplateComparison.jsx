import React, { useState } from 'react';
import { X, Check, Crown, Star, AlertCircle, ChevronRight } from 'lucide-react';

export default function TemplateComparison({ 
  templates = [],
  maxTemplates = 3,
  onClose,
  onSelectTemplate,
  className = ''
}) {
  const [selectedTemplates, setSelectedTemplates] = useState(templates.slice(0, maxTemplates));

  const comparisonFeatures = [
    { id: 'price', label: 'Prix', icon: Crown },
    { id: 'category', label: 'Catégorie', icon: null },
    { id: 'difficulty', label: 'Difficulté', icon: null },
    { id: 'atsCompatible', label: 'Compatible ATS', icon: Check },
    { id: 'colorSchemes', label: 'Schémas de couleur', icon: null },
    { id: 'features', label: 'Caractéristiques', icon: Star }
  ];

  const removeTemplate = (templateId) => {
    setSelectedTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const getFeatureValue = (template, featureId) => {
    switch (featureId) {
      case 'price':
        return template.isPremium ? 'Premium' : 'Gratuit';
      case 'category':
        return template.category || 'N/A';
      case 'difficulty':
        return template.difficulty || 'Intermédiaire';
      case 'atsCompatible':
        return template.tags?.includes('ats-friendly');
      case 'colorSchemes':
        return template.colorSchemes?.length || 0;
      case 'features':
        return template.features?.length || 0;
      default:
        return 'N/A';
    }
  };

  if (selectedTemplates.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-8 text-center ${className}`}>
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Aucun template à comparer
        </h3>
        <p className="text-gray-600 mb-4">
          Sélectionnez au moins 2 templates pour les comparer
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retour aux templates
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-2xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Comparaison de templates</h2>
            <p className="text-blue-100">
              Comparez jusqu'à {maxTemplates} templates côte à côte
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tableau de comparaison */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-700 bg-gray-50 sticky left-0 z-10">
                Caractéristiques
              </th>
              {selectedTemplates.map(template => (
                <th key={template.id} className="p-4 min-w-[250px]">
                  <div className="space-y-3">
                    {/* Thumbnail */}
                    <div className="relative h-40 rounded-lg overflow-hidden bg-gray-100 group">
                      <img
                        src={template.thumbnail}
                        alt={template.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 260"%3E%3Crect fill="%23f3f4f6" width="200" height="260"/%3E%3Ctext x="50%25" y="50%25" font-size="16" text-anchor="middle" fill="%239ca3af"%3E' + template.name + '%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <button
                        onClick={() => removeTemplate(template.id)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {template.isPopular && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Populaire
                        </div>
                      )}
                    </div>

                    {/* Nom et description */}
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{template.name}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>

                    {/* Badge Premium/Gratuit */}
                    <div>
                      {template.isPremium ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-semibold">
                          <Crown className="w-3 h-3" />
                          Premium
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold">
                          <Check className="w-3 h-3" />
                          Gratuit
                        </span>
                      )}
                    </div>

                    {/* Bouton d'action */}
                    <button
                      onClick={() => onSelectTemplate && onSelectTemplate(template)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      Utiliser ce template
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {comparisonFeatures.map((feature, index) => (
              <tr 
                key={feature.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="p-4 font-medium text-gray-700 border-r border-gray-200 bg-gray-50 sticky left-0">
                  <div className="flex items-center gap-2">
                    {feature.icon && <feature.icon className="w-4 h-4 text-gray-500" />}
                    {feature.label}
                  </div>
                </td>
                {selectedTemplates.map(template => {
                  const value = getFeatureValue(template, feature.id);
                  return (
                    <td key={template.id} className="p-4 text-center">
                      {typeof value === 'boolean' ? (
                        value ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : feature.id === 'features' ? (
                        <div className="space-y-1">
                          {template.features?.slice(0, 3).map((feat, i) => (
                            <div key={i} className="text-xs text-gray-700 text-left">
                              • {feat}
                            </div>
                          ))}
                          {template.features?.length > 3 && (
                            <div className="text-xs text-blue-600 font-medium">
                              +{template.features.length - 3} autres
                            </div>
                          )}
                        </div>
                      ) : feature.id === 'colorSchemes' ? (
                        <span className="text-sm font-medium text-gray-900">
                          {value} couleurs
                        </span>
                      ) : (
                        <span className="text-sm text-gray-700 capitalize">
                          {value}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Tags */}
            <tr className="bg-white">
              <td className="p-4 font-medium text-gray-700 border-r border-gray-200 bg-gray-50 sticky left-0">
                Tags
              </td>
              {selectedTemplates.map(template => (
                <td key={template.id} className="p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {template.tags?.slice(0, 4).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Meilleur pour */}
            {selectedTemplates.some(t => t.bestFor) && (
              <tr className="bg-gray-50">
                <td className="p-4 font-medium text-gray-700 border-r border-gray-200 bg-gray-50 sticky left-0">
                  Recommandé pour
                </td>
                {selectedTemplates.map(template => (
                  <td key={template.id} className="p-4">
                    <div className="space-y-1">
                      {template.bestFor?.map((industry, i) => (
                        <div key={i} className="text-xs text-gray-700">
                          • {industry}
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer avec note */}
      <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t border-gray-200">
        💡 Tous les templates sont personnalisables et exportables en PDF haute qualité
      </div>
    </div>
  );
}