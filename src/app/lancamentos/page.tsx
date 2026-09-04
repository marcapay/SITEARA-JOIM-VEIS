import { Suspense } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA } from "@/data/properties";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Lançamentos e Empreendimentos em Caratinga | Araújo Imóveis",
  description: "Conheça os melhores lançamentos imobiliários e empreendimentos na planta em Caratinga - MG. Condições facilitadas de pagamento.",
};

export default function LancamentosPage() {
  const launchProperties = PROPERTIES_DATA.filter((p) => p.transaction === "lancamento" || p.launch);

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-8">
      {/* Header da Página */}
      <div className="bg-amber-950 text-white p-6 sm:p-10 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Empreendimentos Exclusivos
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Lançamentos na Planta e Imóveis Novos</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Garanta as melhores unidades com condições especiais de lançamento e parcelamento direto durante a construção.
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
            {launchProperties.length} lançamentos disponíveis
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
