import React, { useState } from 'react';
import { ChevronDown, X, Filter, Check } from 'lucide-react';

export default function TemplateFilter({ 
  categories = [],
  selectedCategory = 'all',
  onCategoryChange,
  tags = [],
  selectedTags = [],
  onTagsChange,
  showPremiumOnly = false,
  onPremiumToggle,
  className = ''
}) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);

  const handleTagToggle = (tagId) => {
    const newTags = selectedTags.includes(tagId)
      ? selectedTags.filter(t => t !== tagId)
      : [...selectedTags, tagId];
    onTagsChange && onTagsChange(newTags);
  };

  const clearAllFilters = () => {
    onCategoryChange && onCategoryChange('all');
    onTagsChange && onTagsChange([]);
    onPremiumToggle && onPremiumToggle(false);
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedTags.length > 0 || showPremiumOnly;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      {/* Header avec bouton reset */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Filtres</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Catégories */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Catégories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange && onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.nameShort || category.name}
                {category.count && (
                  <span className="ml-1.5 text-xs opacity-75">({category.count})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Premium */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={showPremiumOnly}
              onChange={(e) => onPremiumToggle && onPremiumToggle(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-11 h-6 rounded-full transition-colors ${
              showPremiumOnly ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-gray-300'
            }`}></div>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
              showPremiumOnly ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Templates Premium uniquement</span>
            <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs rounded-full font-semibold">
              PRO
            </span>
          </div>
        </label>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="flex items-center justify-between w-full mb-3 text-sm font-semibold text-gray-700 hover:text-gray-900"
          >
            <span>Filtrer par tags {selectedTags.length > 0 && `(${selectedTags.length})`}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isTagsExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          {isTagsExpanded && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tags.map(tag => (
                <label
                  key={tag.id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagToggle(tag.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {selectedTags.includes(tag.id) && (
                      <Check className="absolute w-3 h-3 text-white pointer-events-none left-0.5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {tag.name}
                    </div>
                    {tag.description && (
                      <div className="text-xs text-gray-500 truncate">
                        {tag.description}
                      </div>
                    )}
                  </div>
                  {tag.color && (
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tag.color }}
                    ></div>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Compteur de résultats */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{selectedTags.length}</span> filtre{selectedTags.length > 1 ? 's' : ''} actif{selectedTags.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
}