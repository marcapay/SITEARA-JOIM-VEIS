
import Link from "next/link";
export const metadata = { title: 'Termos de Uso | Araújo Imóveis' };

export default function Termos() {
  return (
    <div className="bg-white min-h-screen text-gray-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <div className="prose prose-blue text-gray-600 space-y-4">
          <p>Estes Termos de Uso regulam a utilização do site da Araújo Imóveis.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">1. Aceitação</h2>
          <p>Ao acessar e utilizar este site, você concorda com nossos termos e condições.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">2. Serviços</h2>
          <p>As informações dos imóveis podem sofrer alterações de preço e disponibilidade sem aviso prévio.</p>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200"><Link href="/" className="text-blue-600 hover:underline font-semibold">← Voltar para o início</Link></div>
      </div>
    </div>
  );
}