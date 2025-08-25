// src/app/page.tsx

import TccCard from "@/app/components/TccCard";// 1. Importando nosso componente
import { supabase } from "@/lib/supabaseclient";

// 2. Definindo um tipo para os dados do TCC, com base no seu CSV
/*type Tcc = {
  id: number;
  created_at: string;
  author: string;
  title: string;
  file_url: string;
  course: string;
};*/


// 3. Transformando o componente em uma função assíncrona
export default async function Home() {

  // 4. Buscando os dados diretamente do Supabase
  const { data: tccs, error } = await supabase
    .from('tccs') // O nome da sua tabela
    .select('*')  // Seleciona todas as colunas
    .order('created_at', { ascending: false }); // Ordena pelos mais recentes

  // 5. Tratamento de erro básico
  if (error) {
    return <p className="text-white text-center">Ocorreu um erro ao buscar os TCCs.</p>;
  }

  return (
    <main className="bg-[#18191A] min-h-screen p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100">Acervo de TCCs</h1>
          <h2 className="text-3xl font-bold text-gray-100 mb-8">Instituto Central de Educação Isaías Alves - ICEIA</h2>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 6. Mapeando os dados REAIS vindos do Supabase */}
          {tccs?.map((tcc) => (
            <TccCard
              key={tcc.id}
              titulo={tcc.title}
              autor={tcc.author}
              ano={new Date(tcc.created_at).getFullYear()} // Extraindo o ano da data
              fileUrl={tcc.file_url} // Passando a URL do arquivo
            />
          ))}
        </div>
      </div>
    </main>
  );
}