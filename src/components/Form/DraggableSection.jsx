// src/components/Form/DraggableSection.jsx
import React, { useState, useRef } from 'react';
import { 
  GripVertical, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  EyeOff,
  Trash2,
  Plus
} from 'lucide-react';

/**
 * ============================================
 * COMPOSANT SECTION DRAGGABLE
 * ============================================
 * 
 * Permet de réorganiser les sections du CV par glisser-déposer
 * avec feedback visuel et sauvegarde automatique
 */

const DraggableSection = ({ 
  section,
  index,
  onMove,
  onToggleVisibility,
  onDelete,
  children,
  className = ''
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [draggedOver, setDraggedOver] = useState(false);
  
  const dragRef = useRef(null);
  const dragCounter = useRef(0);
  
  /**
   * ============================================
   * GESTION DU DRAG & DROP
   * ============================================
   */
  
  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
    e.dataTransfer.setData('sectionIndex', index.toString());
    
    // Style du drag ghost
    if (e.target) {
      e.target.style.opacity = '0.5';
    }
  };
  
  const handleDragEnd = (e) => {
    setIsDragging(false);
    if (e.target) {
      e.target.style.opacity = '1';
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    if (dragCounter.current === 1) {
      setDraggedOver(true);
    }
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDraggedOver(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDraggedOver(false);
    dragCounter.current = 0;
    
    const draggedIndex = parseInt(e.dataTransfer.getData('sectionIndex'));
    
    if (draggedIndex !== index && onMove) {
      onMove(draggedIndex, index);
    }
  };
  
  /**
   * ============================================
   * ACTIONS DE LA SECTION
   * ============================================
   */
  
  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleToggleVisibility = () => {
    if (onToggleVisibility) {
      onToggleVisibility(section.id);
    }
  };
  
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la section "${section.title}" ?`)) {
      if (onDelete) {
        onDelete(section.id);
      }
    }
  };
  
  /**
   * ============================================
   * RENDU DU COMPOSANT
   * ============================================
   */
  
  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        bg-white rounded-lg border-2 transition-all duration-200
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${draggedOver ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
        ${!section.visible ? 'opacity-60' : ''}
        ${className}
      `}
    >
      {/* Header de la section avec drag handle */}
      <div className="flex items-center gap-3 p-4 cursor-move select-none">
        {/* Drag Handle */}
        <div className="flex-shrink-0 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
        </div>
        
        {/* Titre de la section */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {section.icon && <span className="mr-2">{section.icon}</span>}
            {section.title}
          </h3>
          {section.description && (
            <p className="text-sm text-gray-500 truncate">
              {section.description}
            </p>
          )}
        </div>
        
        {/* Badge nombre d'items */}
        {section.itemCount !== undefined && (
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {section.itemCount} {section.itemCount > 1 ? 'items' : 'item'}
            </span>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Toggle Visibilité */}
          <button
            onClick={handleToggleVisibility}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={section.visible ? 'Masquer dans le CV' : 'Afficher dans le CV'}
          >
            {section.visible ? (
              <Eye className="w-4 h-4 text-gray-600" />
            ) : (
              <EyeOff className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {/* Toggle Expand/Collapse */}
          <button
            onClick={handleToggleExpand}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isExpanded ? 'Réduire' : 'Développer'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
          
          {/* Supprimer (optionnel) */}
          {section.deletable && (
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
              title="Supprimer la section"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>
      
      {/* Indicateur de position pendant le drag */}
      {draggedOver && (
        <div className="h-1 bg-blue-500 mx-4 rounded-full" />
      )}
      
      {/* Contenu de la section (collapsed) */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="mt-4">
            {children}
          </div>
        </div>
      )}
      
      {/* Footer avec indicateurs */}
      {!isExpanded && section.itemCount > 0 && (
        <div className="px-4 pb-3 text-xs text-gray-500">
          Cliquez pour développer • {section.itemCount} {section.itemCount > 1 ? 'éléments' : 'élément'}
        </div>
      )}
    </div>
  );
};

/**
 * ============================================
 * COMPOSANT CONTENEUR DE SECTIONS DRAGGABLES
 * ============================================
 */

export const DraggableSectionList = ({ 
  sections, 
  onReorder,
  onToggleVisibility,
  onDelete,
  renderSectionContent,
  className = ''
}) => {
  const [localSections, setLocalSections] = useState(sections);
  
  // Synchroniser avec les props
  React.useEffect(() => {
    setLocalSections(sections);
  }, [sections]);
  
  /**
   * Gère le déplacement d'une section
   */
  const handleMove = (fromIndex, toIndex) => {
    const newSections = [...localSections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    
    setLocalSections(newSections);
    
    // Notifier le parent avec un léger délai pour une animation fluide
    setTimeout(() => {
      if (onReorder) {
        onReorder(newSections);
      }
    }, 100);
  };
  
  return (
    <div className={`space-y-4 ${className}`}>
      {localSections.map((section, index) => (
        <DraggableSection
          key={section.id}
          section={section}
          index={index}
          onMove={handleMove}
          onToggleVisibility={onToggleVisibility}
          onDelete={onDelete}
        >
          {renderSectionContent ? renderSectionContent(section) : null}
        </DraggableSection>
      ))}
    </div>
  );
};

/**
 * ============================================
 * EXEMPLE DE STRUCTURE DE SECTION
 * ============================================
 */

export const createSection = (
  id,
  title,
  description = '',
  icon = null,
  itemCount = 0,
  visible = true,
  deletable = false
) => ({
  id,
  title,
  description,
  icon,
  itemCount,
  visible,
  deletable
});

/**
 * ============================================
 * HELPER POUR SAUVEGARDER L'ORDRE
 * ============================================
 */

export const saveSectionOrder = (sections, storageKey = 'cv_section_order') => {
  const order = sections.map(s => s.id);
  localStorage.setItem(storageKey, JSON.stringify(order));
};

export const loadSectionOrder = (sections, storageKey = 'cv_section_order') => {
  try {
    const savedOrder = localStorage.getItem(storageKey);
    if (!savedOrder) return sections;
    
    const order = JSON.parse(savedOrder);
    const orderedSections = [];
    
    // Réorganiser selon l'ordre sauvegardé
    order.forEach(id => {
      const section = sections.find(s => s.id === id);
      if (section) {
        orderedSections.push(section);
      }
    });
    
    // Ajouter les nouvelles sections qui n'étaient pas dans l'ordre sauvegardé
    sections.forEach(section => {
      if (!orderedSections.find(s => s.id === section.id)) {
        orderedSections.push(section);
      }
    });
    
    return orderedSections;
  } catch (error) {
    console.error('Erreur lors du chargement de l\'ordre des sections:', error);
    return sections;
  }
};

/**
 * ============================================
 * COMPOSANT POUR AJOUTER UNE NOUVELLE SECTION
 * ============================================
 */

export const AddSectionButton = ({ onAdd, availableSections = [] }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  const handleAddSection = (sectionType) => {
    if (onAdd) {
      onAdd(sectionType);
    }
    setShowMenu(false);
  };
  
  if (availableSections.length === 0) return null;
  
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-gray-600 hover:text-blue-600 font-medium flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Ajouter une section
      </button>
      
      {showMenu && (
        <>
          {/* Overlay pour fermer */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu déroulant */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
            {availableSections.map((section, index) => (
              <button
                key={index}
                onClick={() => handleAddSection(section.type)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  {section.icon && <span className="text-xl">{section.icon}</span>}
                  <div>
                    <p className="font-medium text-gray-900">{section.title}</p>
                    {section.description && (
                      <p className="text-xs text-gray-500">{section.description}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/**
 * ============================================
 * EXPORT PAR DÉFAUT
 * ============================================
 */

export default DraggableSection;