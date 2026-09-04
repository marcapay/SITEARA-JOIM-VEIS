import Link from "next/link";
import Image from "next/image";
export const metadata = { title: 'Guias e Links Úteis | Araújo Imóveis' };

export default function Guias() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="relative text-white py-20 px-4">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop" alt="Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Links Úteis e Guias</h1>
          <p className="text-blue-100">Informações valiosas sobre o mercado imobiliário e processos de locação/compra.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-8">
        {[
          { title: 'Documentação Necessária para Alugar', desc: 'Saiba o que preparar para não perder tempo.' },
          { title: 'Como funciona o Seguro Fiança?', desc: 'A garantia mais rápida e segura para locatários e proprietários.' },
          { title: 'Passo a Passo para Comprar seu Primeiro Imóvel', desc: 'Tudo o que você precisa saber antes de fechar negócio.' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.desc}</p>
            <button className="text-blue-600 font-semibold text-sm">Ler artigo completo →</button>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}
