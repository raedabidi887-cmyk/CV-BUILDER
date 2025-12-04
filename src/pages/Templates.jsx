import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Grid, List } from 'lucide-react';

// Import de vos composants existants
import TemplateCard from '../components/TemplateCard';
import TemplateBadge from '../components/TemplateUI/TemplateBadge';
import TemplateFilter from '../components/TemplateUI/TemplateFilter';
import TemplateSearch from '../components/TemplateUI/TemplateSearch';
import TemplateGrid from '../components/TemplateUI/TemplateGrid';
import { useNavigate } from 'react-router-dom';


// Import de vos données JSON
import templateList from '../data/templateList.json';
import templateCategories from '../data/templateCategories.json';
import templateTags from '../data/templateTags.json';

export default function Templates() {
  // États pour la recherche et les filtres
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();


  // Extraction des données
  const templates = templateList.templates || [];
  const categories = templateCategories.categories || [];
  const tags = templateTags.tags || [];

  // Filtrage et tri des templates
  const filteredTemplates = useMemo(() => {
    let filtered = [...templates];

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags?.some(tag => tag.toLowerCase().includes(query)) ||
        t.category?.toLowerCase().includes(query)
      );
    }

    // Filtre par catégorie
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    // Filtre par tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(t => 
        t.tags && selectedTags.some(tag => t.tags.includes(tag))
      );
    }

    // Filtre Premium
    if (showPremiumOnly) {
      filtered = filtered.filter(t => t.isPremium === true);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        case 'recent':
          return 0; // À implémenter avec une date
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'free-first':
          return (a.isPremium ? 1 : 0) - (b.isPremium ? 1 : 0);
        case 'premium-first':
          return (b.isPremium ? 1 : 0) - (a.isPremium ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [templates, searchQuery, selectedCategory, selectedTags, showPremiumOnly, sortBy]);

  // Gestion de la sélection d'un template
  const handleTemplateClick = (template) => {
    // TODO: Naviguer vers l'éditeur avec le template sélectionné
    console.log('Template sélectionné:', template);
     navigate(`/editor/${template.id}`, { state: { template } });
    // Exemple: navigate(`/editor?template=${template.id}`);
    
    // Pour l'instant, on affiche juste une alerte
    //alert(`Template "${template.name}" sélectionné!\n\nÀ implémenter: Navigation vers l'éditeur avec ce template.`);
  };

  // Gestion des recherches récentes
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim() && !recentSearches.includes(value)) {
      setRecentSearches(prev => [value, ...prev.slice(0, 4)]);
    }
  };

  // Reset de tous les filtres
  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setShowPremiumOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTags.length > 0 || showPremiumOnly;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Choisissez votre template de CV
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              {templates.length} templates professionnels pour créer le CV parfait
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <TemplateSearch
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher par nom, style ou mot-clé..."
              suggestions={tags.map(t => t.name)}
              recentSearches={recentSearches}
              onRecentSearchClick={(search) => setSearchQuery(search)}
            />
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filtres - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-6">
              <TemplateFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                tags={tags}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                showPremiumOnly={showPremiumOnly}
                onPremiumToggle={setShowPremiumOnly}
              />
            </div>
          </aside>

          {/* Filtres Mobile - Collapsible */}
          <div className="lg:hidden">
            <details className="bg-white rounded-lg shadow-sm mb-6">
              <summary className="px-4 py-3 cursor-pointer flex items-center justify-between font-semibold text-gray-900">
                <span className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtres
                  {hasActiveFilters && (
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                      {(selectedCategory !== 'all' ? 1 : 0) + selectedTags.length + (showPremiumOnly ? 1 : 0)}
                    </span>
                  )}
                </span>
              </summary>
              <div className="px-4 pb-4 pt-2">
                <TemplateFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  tags={tags}
                  selectedTags={selectedTags}
                  onTagsChange={setSelectedTags}
                  showPremiumOnly={showPremiumOnly}
                  onPremiumToggle={setShowPremiumOnly}
                />
              </div>
            </details>
          </div>

          {/* Contenu principal - Grille de templates */}
          <main className="flex-1 min-w-0">
            {/* Barre d'actions avec reset */}
            {hasActiveFilters && (
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <Filter className="w-4 h-4" />
                  <span className="font-medium">
                    {filteredTemplates.length} résultat{filteredTemplates.length > 1 ? 's' : ''} trouvé{filteredTemplates.length > 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Réinitialiser les filtres
                </button>
              </div>
            )}

            {/* Grille avec toolbar */}
            <TemplateGrid
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              itemsCount={filteredTemplates.length}
            >
              {filteredTemplates.length === 0 ? (
                // État vide
                <div className="col-span-full text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Aucun template trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                // Cartes de templates
                filteredTemplates.map(template => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={handleTemplateClick}
                    viewMode={viewMode}
                  />
                ))
              )}
            </TemplateGrid>
          </main>
        </div>
      </div>

      {/* Footer avec statistiques */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {templates.length}
              </div>
              <div className="text-sm text-gray-600">Templates disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {templates.filter(t => !t.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Templates gratuits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {templates.filter(t => t.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Templates premium</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-sm text-gray-600">Catégories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}