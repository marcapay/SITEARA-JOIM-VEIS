import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Casas para alugar em Caratinga',
  description: 'Confira as melhores casas para alugar em Caratinga, com diversas opções de bairros, preços e infraestrutura. Agende sua visita.',
  alternates: {
    canonical: '/alugar/casas/caratinga',
  },
};

export default function CasasAlugarCaratinga() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Casas para alugar em Caratinga</h1>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Imóveis disponíveis</h2>
      <p className="text-gray-600 mb-8">
        Aqui você encontra a lista completa de casas disponíveis para locação. Utilize nossos filtros para encontrar o lar ideal para você e sua família.
      </p>
      
      {/* List of properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/imoveis/casa-centro-caratinga-ar101" className="block border border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
          <h3 className="font-bold text-lg mb-2">Casa no Centro</h3>
          <p className="text-blue-600 font-bold">R$ 2.500</p>
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-gray-800">Bairros com casas para alugar</h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-8">
        <li>Centro</li>
        <li>Santa Zita</li>
        <li>Limoeiro</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Perguntas frequentes</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-800">Quais as garantias aceitas?</h3>
          <p className="text-gray-600">Aceitamos fiador, seguro fiança e título de capitalização.</p>
        </div>
      </div>
    </div>
  );
}
