// src/components/TemplateCard.jsx
import React from 'react';
import { Check, Star, Crown, Lock } from 'lucide-react';

export default function TemplateCard({ 
  // Anciens props (rétrocompatibilité)
  id, 
  image, 
  title, 
  description, 
  onSelect,
  
  // Nouveaux props
  template, 
  onClick, 
  viewMode = 'grid' 
}) {
  // Support des deux formats : ancien et nouveau
  const templateData = template || {
    id: id,
    name: title,
    description: description,
    thumbnail: image,
    isPremium: false,
    isPopular: false,
    tags: [],
    features: [],
    colorSchemes: [],
    difficulty: 'facile'
  };

  const handleClick = () => {
    if (onClick) {
      onClick(templateData);
    } else if (onSelect) {
      onSelect(templateData.id);
    }
  };

  // Vue Liste (horizontale)
  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleClick}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden cursor-pointer"
      >
        <div className="flex gap-4 p-4">
          {/* Thumbnail */}
          <div className="relative w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={templateData.thumbnail || image}
              alt={templateData.name || title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/api/placeholder/300/400';
              }}
            />
            {templateData.isPopular && (
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Populaire
              </div>
            )}
            {templateData.isPremium && (
              <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-1.5 rounded-full">
                <Crown className="w-3 h-3" />
              </div>
            )}
          </div>
          
          {/* Contenu */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {templateData.name || title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {templateData.description || description}
                </p>
              </div>
              {/* Badge */}
              {templateData.isPremium ? (
                <span className="ml-2 inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-semibold whitespace-nowrap">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
              ) : (
                <span className="ml-2 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-semibold whitespace-nowrap">
                  <Check className="w-3 h-3" />
                  Gratuit
                </span>
              )}
            </div>
            
            {/* Tags */}
            {templateData.tags && templateData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {templateData.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {templateData.colorSchemes && (
                  <>
                    <span className="font-medium">{templateData.colorSchemes.length}</span> couleurs • 
                  </>
                )}
                <span className="ml-1 capitalize">{templateData.difficulty || 'facile'}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  {templateData.isPremium ? 'Voir' : 'Utiliser'}
                </button>
                <a
                  href={templateData.thumbnail || image}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Aperçu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vue Grille (par défaut) - Compatible avec l'ancien format
  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group cursor-pointer"
    >
      {/* Thumbnail avec overlay */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={templateData.thumbnail || image}
          alt={templateData.name || title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = '/api/placeholder/300/400';
          }}
        />
        
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <div className="flex flex-col gap-2">
            {templateData.isPopular && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs rounded-full font-semibold">
                <Star className="w-3 h-3 fill-current" />
                Populaire
              </span>
            )}
          </div>
          
          {/* Badge Premium/Gratuit */}
          {templateData.isPremium ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-semibold">
              <Crown className="w-3.5 h-3.5" />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
              <Check className="w-3.5 h-3.5" />
              Gratuit
            </span>
          )}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {templateData.isPremium ? (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Voir
                </span>
              ) : (
                'Utiliser'
              )}
            </button>
            <a
              href={templateData.thumbnail || image}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 bg-white/90 text-gray-900 rounded-lg font-semibold hover:bg-white transition-colors"
            >
              Aperçu
            </a>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {templateData.name || title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {templateData.description || description}
        </p>

        {/* Tags */}
        {templateData.tags && templateData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {templateData.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {templateData.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{templateData.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Features */}
        {templateData.features && templateData.features.length > 0 && (
          <div className="space-y-1 mb-4">
            {templateData.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {/* Color dots */}
            {templateData.colorSchemes && templateData.colorSchemes.length > 0 && (
              <>
                <div className="flex -space-x-1">
                  {templateData.colorSchemes.slice(0, 3).map((color, i) => (
                    <div 
                      key={i} 
                      className="w-5 h-5 rounded-full border-2 border-white"
                      style={{ 
                        zIndex: 3 - i,
                        background: i === 0 ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' :
                                   i === 1 ? 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' :
                                   'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  {templateData.colorSchemes.length} couleurs
                </span>
              </>
            )}
          </div>
          {templateData.difficulty && (
            <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
              {templateData.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}