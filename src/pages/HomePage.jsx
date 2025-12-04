// src/pages/Home.jsx
import React from "react";
import useCVStore from "../store/useCVStore";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#faf9f7] px-4">
  <div className="text-center max-w-2xl">
    
    {/* Titre principal */}
    <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-gray-900 mb-6">
      Créez votre CV pro en français
    </h1>

    {/* Sous-titre */}
    <p className="text-gray-500 text-lg leading-relaxed mb-10">
      Remplissez le formulaire, choisissez un modèle et téléchargez
      <br />
      votre CV en quelques minutes.
    </p>

    {/* Bouton */}
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md text-lg transition" onClick={() => navigate("/editor")}
>
      Créer un CV
    </button>

  </div>
</div>

  );
}
