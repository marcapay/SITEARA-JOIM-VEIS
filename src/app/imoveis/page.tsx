import { Suspense } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA, Property, PROPERTY_TYPES } from "@/data/properties";
import { Search, ArrowUpDown, FilterX, Building2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Catálogo e Busca de Imóveis | Araújo Imóveis - Caratinga/MG",
  description: "Encontre imóveis para alugar, comprar e lançamentos em Caratinga e região com busca interativa e filtros por tipo, bairro, preço e quartos.",
};

interface SearchParamsProps {
  searchParams: Promise<{
    transacao?: string;
    tipo?: string;
    cidade?: string;
    bairro?: string;
    precoMax?: string;
    quartos?: string;
    vagas?: string;
    ordem?: string;
  }>;
}

async function PropertiesList({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const transacao = params.transacao;
  const tipo = params.tipo;
  const cidade = params.cidade;
  const bairro = params.bairro;
  const precoMax = params.precoMax ? Number(params.precoMax) : null;
  const quartos = params.quartos ? Number(params.quartos) : null;
  const vagas = params.vagas ? Number(params.vagas) : null;
  const ordem = params.ordem || "relevancia";

  const filteredProperties = PROPERTIES_DATA.filter((property: Property) => {
    if (transacao && transacao !== "todos" && property.transaction !== transacao) {
      return false;
    }
    if (tipo && tipo !== "Todos" && property.type !== tipo) {
      return false;
    }
    if (cidade && cidade !== "Todas" && property.city.toLowerCase() !== cidade.toLowerCase()) {
      return false;
    }
    if (bairro && bairro !== "Todos" && property.neighborhood.toLowerCase() !== bairro.toLowerCase()) {
      return false;
    }
    if (precoMax && property.price > precoMax) {
      return false;
    }
    if (quartos && property.bedrooms < quartos) {
      return false;
    }
    if (vagas && property.parkingSpots < vagas) {
      return false;
    }
    return true;
  });

  // Ordenação
  if (ordem === "menor-preco") {
    filteredProperties.sort((a, b) => a.price - b.price);
  } else if (ordem === "maior-preco") {
    filteredProperties.sort((a, b) => b.price - a.price);
  } else if (ordem === "maior-area") {
    filteredProperties.sort((a, b) => b.area - a.area);
  }

  const hasActiveFilters = Boolean(transacao || (tipo && tipo !== "Todos") || (cidade && cidade !== "Todas") || (bairro && bairro !== "Todos") || precoMax || quartos || vagas);

  return (
    <div className="space-y-6">
      {/* Header dos Resultados e Ordenação */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>{filteredProperties.length}</span>
            <span className="text-slate-600 text-base font-normal">
              {filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </span>
          </h2>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {transacao && transacao !== "todos" && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-100 capitalize">
                  {transacao}
                </span>
              )}
              {tipo && tipo !== "Todos" && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-100">
                  {tipo}
                </span>
              )}
              {bairro && bairro !== "Todos" && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold border border-blue-100">
                  📍 {bairro}
                </span>
              )}
              <Link href="/imoveis" className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold ml-1 py-1">
                <FilterX className="w-3.5 h-3.5" /> Limpar filtros
              </Link>
            </div>
          )}
        </div>

        {/* Quick Filter Chips (Pills QuintoAndar) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-blue-600" /> Ordem:
          </span>
          <form method="GET" action="/imoveis">
            {transacao && <input type="hidden" name="transacao" value={transacao} />}
            {tipo && <input type="hidden" name="tipo" value={tipo} />}
            {bairro && <input type="hidden" name="bairro" value={bairro} />}
            {cidade && <input type="hidden" name="cidade" value={cidade} />}
            {precoMax && <input type="hidden" name="precoMax" value={precoMax} />}
            {quartos && <input type="hidden" name="quartos" value={quartos} />}
            {vagas && <input type="hidden" name="vagas" value={vagas} />}

            <select
              name="ordem"
              defaultValue={ordem}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[40px]"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor-preco">Menor Preço</option>
              <option value="maior-preco">Maior Preço</option>
              <option value="maior-area">Maior Área (m²)</option>
            </select>
          </form>
        </div>
      </div>

      {/* Grade de Imóveis */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4 max-w-lg mx-auto my-12 shadow-sm">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-800">Nenhum imóvel encontrado</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Não encontramos imóveis com os critérios selecionados em Caratinga. Tente alterar ou limpar os filtros para ver mais opções.
          </p>
          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 py-3 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl text-sm transition-colors shadow-md min-h-[48px]"
          >
            Ver todos os imóveis
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ImoveisPage({ searchParams }: SearchParamsProps) {
  return (
    <div className="py-6 sm:py-10 px-4 max-w-7xl mx-auto w-full space-y-6">
      {/* Top Banner QuintoAndar Style */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider">
          <Building2 className="w-4 h-4" /> Catálogo Araújo Imóveis
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Encontre Imóveis em Caratinga e Região</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Filtre por venda ou aluguel, tipo de imóvel, bairro, preço, quartos e vagas com atendimento direto pelo WhatsApp.
        </p>

        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 scrollbar-none">
          {PROPERTY_TYPES.map((t) => (
            <Link
              key={t}
              href={`/imoveis?tipo=${encodeURIComponent(t)}`}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-full border border-slate-700 transition-colors"
            >
              {t === "Todos" ? "Todos os Tipos" : t}
            </Link>
          ))}
        </div>
      </div>

      {/* Componente de Filtros Avançados */}
      <Suspense fallback={<div className="bg-white p-6 rounded-3xl h-36 animate-pulse"></div>}>
        <SearchFilter />
      </Suspense>

      {/* Lista Dinâmica de Resultados */}
      <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-400 font-medium">Carregando imóveis...</div>}>
        <PropertiesList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}