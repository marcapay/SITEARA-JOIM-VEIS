import { Suspense } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";
import { TrendingUp, Sparkles } from "lucide-react";

export const metadata = {
  title: "Investimentos Imobiliários em Caratinga | Araújo Imóveis",
  description: "Conheça as melhores oportunidades de investimento imobiliário, empreendimentos e lançamentos na planta em Caratinga - MG.",
};

export default function LancamentosPage() {
  const launchProperties = PROPERTIES_DATA.filter((p) => p.transaction === "lancamento" || p.launch);

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-8">
      {/* Header da Página */}
      <div className="bg-amber-950 text-white p-6 sm:p-10 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" /> Oportunidades & Rendimento
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Investimentos Imobiliários em Caratinga</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Garanta os melhores imóveis com alto potencial de valorização, condições facilitadas e parcelamento direto durante a construção.
        </p>
      </div>

      {/* Painel de Filtros com Suspense */}
      <Suspense fallback={<div className="bg-white p-6 rounded-3xl h-36 animate-pulse"></div>}>
        <SearchFilter initialTransaction="lancamento" />
      </Suspense>

      {/* Listagem de Imóveis */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {launchProperties.length} oportunidades de investimento disponíveis
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {launchProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
