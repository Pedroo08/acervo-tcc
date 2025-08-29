
// src/components/Header.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    // 1. Container principal: Relativo, empilhado no mobile e linha no desktop
    <header className="relative w-full bg-[#242526] py-6 px-4 sm:px-8 border-b border-gray-700 shadow-lg flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      
      {/* 2. Div para os Títulos (sempre centralizado) */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
          Acervo de TCCs
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-300 mt-1">
          Instituto Central de Educação Isaías Alves - ICEIA
        </h2>
      </div>

      {/* 3. Div para o Botão (ocupa a largura toda no mobile, posicionado à direita no desktop) */}
      <div className="w-full sm:w-auto sm:absolute sm:right-4 md:right-8">
        {pathname === '/' ? (
          <Link
            href="/enviar"
            // Adicionado 'block' para o 'w-full' funcionar
            className="block w-full text-center sm:w-auto bg-[#00c7a9] hover:bg-[#00a88e] text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm sm:text-base"
          >
            + Enviar TCC
          </Link>
        ) : (
          <Link
            href="/"
            className="block w-full text-center sm:w-auto bg-[#00c7a9] hover:bg-[#00a88e] text-white font-semibold py-2 px-4 rounded-md transition-colors text-sm sm:text-base"
          >
            ← Voltar ao Acervo
          </Link>
        )}
      </div>
    </header>
  );
}
