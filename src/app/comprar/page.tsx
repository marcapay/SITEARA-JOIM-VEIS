import { Suspense } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";
import { Tag } from "lucide-react";

export const metadata = {
  title: "Imóveis à Venda em Caratinga | Comprar Casas e Apartamentos",
  description: "Confira as melhores opções de imóveis para comprar em Caratinga e região. Casas, apartamentos, coberturas e terrenos com garantia Araújo Imóveis.",
};

export default function ComprarPage() {
  const buyProperties = PROPERTIES_DATA.filter((p) => p.transaction === "comprar");

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-8">
      {/* Header da Página */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Tag className="w-4 h-4" /> Venda Imobiliária
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Imóveis para Comprar em Caratinga</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Conquiste a casa própria ou invista no mercado imobiliário com assessoria completa e credibilidade comprovada.
        </p>
      </div>

      {/* Painel de Filtros com Suspense */}
      <Suspense fallback={<div className="bg-white p-6 rounded-3xl h-36 animate-pulse"></div>}>
        <SearchFilter initialTransaction="comprar" />
      </Suspense>

      {/* Listagem de Imóveis */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {buyProperties.length} imóveis encontrados para compra
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
