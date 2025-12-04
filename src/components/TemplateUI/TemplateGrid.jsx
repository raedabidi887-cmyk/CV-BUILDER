import React, { useState } from 'react';
import { Grid, List, LayoutGrid, SortAsc, SortDesc } from 'lucide-react';

export default function TemplateGrid({ 
  children,
  viewMode = 'grid',
  onViewModeChange,
  sortBy = 'popular',
  onSortChange,
  itemsCount = 0,
  className = ''
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Plus populaires' },
    { value: 'recent', label: 'Plus récents' },
    { value: 'name-asc', label: 'Nom (A-Z)' },
    { value: 'name-desc', label: 'Nom (Z-A)' },
    { value: 'free-first', label: 'Gratuits en premier' },
    { value: 'premium-first', label: 'Premium en premier' }
  ];

  const currentSort = sortOptions.find(opt => opt.value === sortBy) || sortOptions[0];

  return (
    <div className={className}>
      {/* Barre d'outils */}
      <div className="flex items-center justify-between mb-6">
        {/* Compteur */}
        <div className="text-gray-600">
          <span className="font-semibold text-gray-900">{itemsCount}</span> template{itemsCount > 1 ? 's' : ''} trouvé{itemsCount > 1 ? 's' : ''}
        </div>

        {/* Options d'affichage */}
        <div className="flex items-center gap-3">
          {/* Tri */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              <SortAsc className="w-4 h-4" />
              <span>{currentSort.label}</span>
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onSortChange && onSortChange(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === option.value
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Séparateur */}
          <div className="w-px h-8 bg-gray-300"></div>

          {/* Modes d'affichage */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => onViewModeChange && onViewModeChange('grid')}
              className={`p-2.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="Vue en grille"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange && onViewModeChange('compact')}
              className={`p-2.5 transition-colors border-l border-gray-300 ${
                viewMode === 'compact'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="Vue compacte"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange && onViewModeChange('list')}
              className={`p-2.5 transition-colors border-l border-gray-300 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              title="Vue en liste"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grille de contenu */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : viewMode === 'compact'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          : 'flex flex-col gap-4'
      }>
        {children}
      </div>
    </div>
  );
}

// Version simple sans barre d'outils
export function SimpleTemplateGrid({ children, columns = 4, gap = 6, className = '' }) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  const gapClass = `gap-${gap}`;

  return (
    <div className={`grid ${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}