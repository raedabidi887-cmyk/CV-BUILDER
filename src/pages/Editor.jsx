import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditorLayout from '../components/Editor/EditorLayout';
import useCVStore from '../store/useCVStore';


const Editor = () => {
  const { cvId } = useParams(); // Si vous utilisez React Router avec /editor/:cvId
  const { loadCV, createNewCV, cvId: currentCvId } = useCVStore();

  useEffect(() => {
    // Si on a un ID dans l'URL, charger le CV
    if (cvId && cvId !== currentCvId) {
      loadCV(cvId);
    }
    
    // Si pas d'ID et pas de CV en cours, créer un nouveau CV
    if (!cvId && !currentCvId) {
      createNewCV();
    }
  }, [cvId, currentCvId]);

  return <EditorLayout />;
};

export default Editor;