// src/app/enviar/actions.ts

'use server'; // Diretiva que marca este arquivo para rodar apenas no servidor

import { supabase } from '@/lib/supabaseclient';
import { revalidatePath } from 'next/cache'; // A função mágica para limpar o cache
import { redirect } from 'next/navigation'; // Para redirecionar o usuário

// Definimos a "forma" dos dados que a action espera receber
interface FormData {
  title: string;
  author: string;
  course: string;
  fileName: string;
  fileUrl: string;
}

export async function submitTccAction(formData: FormData) {
  try {
    // 1. Inserimos os dados na tabela do Supabase
    const { error: insertError } = await supabase.from('tccs').insert([
      {
        title: formData.title,
        author: formData.author,
        course: formData.course,
        file_name: formData.fileName,
        file_url: formData.fileUrl,
      },
    ]);

    if (insertError) {
      throw insertError;
    }

    // 2. A PARTE MAIS IMPORTANTE: Limpamos o cache da página inicial
    revalidatePath('/');

  } catch (error) {
    // Se der erro, retornamos uma mensagem
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error: 'Ocorreu um erro desconhecido.',
    };
  }

  // 3. Se tudo deu certo, redirecionamos o usuário para a página inicial
  redirect('/');
}