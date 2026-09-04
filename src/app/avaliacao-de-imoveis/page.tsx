import { TrendingUp } from "lucide-react";
import Link from "next/link";
export const metadata = { title: 'Simulação de Imóveis | Araújo Imóveis' };

export default function Avaliacao() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Descubra o valor real do seu imóvel</h1>
          <p className="text-xl text-blue-100 mb-8">Para vender ou alugar, você precisa de um preço competitivo e justo.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-[-40px]">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><TrendingUp className="w-10 h-10"/></div>
          <h2 className="text-2xl font-bold mb-4">Solicite uma simulação técnica</h2>
          <p className="text-gray-600 mb-8">Preencha os dados básicos do seu imóvel e um de nossos corretores especialistas entrará em contato para agendar uma visita e elaborar o parecer de valor.</p>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Endereço do Imóvel</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div className="sm:col-span-2"><button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4">Solicitar Simulação</button></div>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}