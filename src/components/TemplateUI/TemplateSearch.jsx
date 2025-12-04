import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';

export default function TemplateSearch({ 
  value = '',
  onChange,
  placeholder = "Rechercher un template par nom, style ou mot-clé...",
  suggestions = [],
  recentSearches = [],
  onRecentSearchClick,
  className = ''
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShowSuggestions(isFocused && (value.length > 0 || recentSearches.length > 0));
  }, [isFocused, value, recentSearches]);

  const handleClear = () => {
    onChange && onChange('');
  };

  const handleSuggestionClick = (suggestion) => {
    onChange && onChange(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(value.toLowerCase())
  ).slice(0, 5);

  return (
    <div className={`relative ${className}`}>
      {/* Barre de recherche */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-12 py-4 text-base border-2 rounded-xl transition-all ${
            isFocused 
              ? 'border-blue-500 ring-4 ring-blue-100 shadow-lg' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Dropdown avec suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Suggestions basées sur la recherche */}
          {value.length > 0 && filteredSuggestions.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-lg text-left transition-colors group"
                >
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-700">
                    {suggestion}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recherches récentes */}
          {value.length === 0 && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                Recherches récentes
              </div>
              {recentSearches.slice(0, 5).map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onRecentSearchClick && onRecentSearchClick(search);
                    handleSuggestionClick(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg text-left transition-colors group"
                >
                  <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {search}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Recherches populaires */}
          <div className="p-2 border-t border-gray-100">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Recherches populaires
            </div>
            <div className="flex flex-wrap gap-2 px-3 py-2">
              {['Moderne', 'Minimaliste', 'Créatif', 'Professionnel', 'ATS'].map((tag, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(tag)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-xs font-medium text-gray-700 hover:text-blue-700 rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Version compacte pour les sidebars
export function TemplateSearchCompact({ 
  value = '',
  onChange,
  placeholder = "Rechercher...",
  className = ''
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-9 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value && (
        <button
          onClick={() => onChange && onChange('')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}