import { Suspense } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";
import { Key } from "lucide-react";

export const metadata = {
  title: "Imóveis para Alugar em Caratinga | Locação Residencial e Comercial",
  description: "Alugue seu imóvel residencial ou comercial sem burocracia na Araújo Imóveis. Casas, apartamentos e pontos comerciais em Caratinga.",
};

export default function AlugarPage() {
  const rentProperties = PROPERTIES_DATA.filter((p) => p.transaction === "alugar");

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-8">
      {/* Header da Página */}
      <div className="bg-emerald-950 text-white p-6 sm:p-10 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Key className="w-4 h-4" /> Locação Imobiliária
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Imóveis para Alugar em Caratinga</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Opções de aluguel residencial e comercial com processo agilizado e atendimento humanizado.
        </p>
      </div>

      {/* Painel de Filtros com Suspense */}
      <Suspense fallback={<div className="bg-white p-6 rounded-3xl h-36 animate-pulse"></div>}>
        <SearchFilter initialTransaction="alugar" />
      </Suspense>

      {/* Listagem de Imóveis */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {rentProperties.length} imóveis disponíveis para locação
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
