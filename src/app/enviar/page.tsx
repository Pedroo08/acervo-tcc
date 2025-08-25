// src/app/enviar/page.tsx
//http://localhost:3000/enviar
'use client'; // Marcando como Componente de Cliente para interatividade

import { useState } from 'react';
import { supabase } from '@/lib/supabaseclient'; // Nosso cliente Supabase
import Link from 'next/link';

export default function EnviarTccPage() {
  // 1. Estados para cada campo do formulário
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [course, setCourse] = useState('');
  const [file, setFile] = useState<File | null>(null);


    // 1. ADICIONE O ESTADO PARA A SENHA
  const [password, setPassword] = useState('');

  // 2. Estados para feedback ao usuário
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 3. Função para lidar com a seleção do arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 4. Função principal que lida com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Impede o recarregamento da página

    // 2. ADICIONE A VERIFICAÇÃO DA SENHA AQUI
    if (password !== process.env.NEXT_PUBLIC_UPLOAD_PASSWORD) {
      setError('Senha incorreta.');
      return; // Interrompe a execução da função se a senha estiver errada
    }


    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      // ETAPA A: Fazer o upload do arquivo para o Supabase Storage
      const filePath = `${Date.now()}-${file.name}`; // Nome único para o arquivo
      const { error: uploadError } = await supabase.storage
        .from('arquivos-tccs') // Nome do seu bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // ETAPA B: Obter a URL pública do arquivo que acabamos de enviar
      const { data: urlData } = supabase.storage
        .from('arquivos-tccs')
        .getPublicUrl(filePath);

      const fileUrl = urlData.publicUrl;

      // ETAPA C: Inserir os dados (incluindo a URL do arquivo) na tabela 'tccs'
      const { error: insertError } = await supabase
        .from('tccs')
        .insert([{ 
            title, 
            author, 
            course, 
            file_name: file.name, 
            file_url: fileUrl 
        }]);

      if (insertError) throw insertError;
      
      setMessage('TCC enviado com sucesso!');
      // Limpar o formulário
      setTitle('');
      setAuthor('');
      setCourse('');
      setFile(null);
      setPassword('');
      (document.getElementById('file-input') as HTMLInputElement).value = '';


    } catch (err: any) {
      console.error('Erro no envio:', err);
      setError('Falha ao enviar o TCC. Detalhes: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <main className="bg-[#18191A] min-h-screen p-8 md:p-12 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-[#242526] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
          Enviar Novo TCC
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
              Título do TCC
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-[#3A3B3C] border border-gray-600 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Autor */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">
              Autor(es)
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full bg-[#3A3B3C] border border-gray-600 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Curso */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-300 mb-1">
              Curso
            </label>
            <input
              type="text"
              id="course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              className="w-full bg-[#3A3B3C] border border-gray-600 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Campo Arquivo */}
          <div>
            <label htmlFor="file-input" className="block text-sm font-medium text-gray-300 mb-1">
              Arquivo do TCC (PDF, DOCX)
            </label>
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#00c7a9] file:text-white hover:file:bg-[#00a88e]"
            />
          </div>
            {/* Campo Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Senha para Upload
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#3A3B3C] border border-gray-600 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar TCC'}
          </button>
        </form>

        {/* Mensagens de Feedback */}
        {message && <p className="mt-4 text-center text-green-400">{message}</p>}
        {error && <p className="mt-4 text-center text-red-400">{error}</p>}

        <div className="text-center mt-6">
            <Link href="/" className="text-sm text-blue-400 hover:underline">
                ← Voltar para o Acervo
            </Link>
        </div>
      </div>
    </main>
  );
}