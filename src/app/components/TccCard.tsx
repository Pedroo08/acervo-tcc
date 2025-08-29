// src/components/TccCard.tsx

import React from 'react';
// 1. Importando o ícone que acabamos de instalar
import { DocumentTextIcon } from '@heroicons/react/24/outline';

// 2. Ajustando as propriedades: 'resumo' foi removido e 'ano' é opcional
interface TccCardProps {
  titulo: string;
  autor: string;
  ano?: number; // O '?' torna a propriedade 'ano' opcional
  fileUrl: string; // Adicionando a URL do arquivo
}

const TccCard = ({ titulo, autor, ano,fileUrl }: TccCardProps) => {
  return (
    // 3. Container principal do card com a nova cor de fundo e layout flexível
    <div className="bg-[#242526] rounded-lg p-4 shadow-md flex flex-col h-full border border-transparent hover:border-blue-500 transition-colors">
      
      {/* 4. Área do Ícone */}
      <div className="flex justify-center items-center h-24 bg-[#3A3B3C] rounded-md mb-4">
        <DocumentTextIcon className="h-12 w-12 text-gray-400" />
      </div>
      
      {/* 5. Área de Texto Centralizada */}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-100 mb-1">{titulo}</h2>
        <p className="text-sm text-gray-400">Autor(es): {autor}</p>
        {/* Renderização condicional: só mostra o ano se ele existir */}
        {ano && <p className="text-sm text-gray-400 mb-4">Ano: {ano}</p>}
      </div>

      {/* 6. Área dos Botões (pressionada para baixo) */}
      <div className="mt-auto pt-4 flex space-x-3">
       <a 
          href={fileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 text-center bg-[#3A3B3C] hover:bg-[#4E4F50] text-gray-100 font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Abrir
        </a>
       <a 
          href={fileUrl} 
          download
          target ="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-[#00c7a9] hover:bg-[#00a88e] text-white font-semibold py-2 rounded-md transition-colors duration-200"
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default TccCard;
 
