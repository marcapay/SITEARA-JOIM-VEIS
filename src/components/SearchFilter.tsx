"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Home, DollarSign, Bed, Car, RefreshCw } from "lucide-react";
import { PROPERTY_TYPES, CITIES, NEIGHBORHOODS } from "@/data/properties";

interface SearchFilterProps {
  initialTransaction?: string;
  className?: string;
}

export function SearchFilter({ initialTransaction = "todos", className = "" }: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [transaction, setTransaction] = useState<string>(
    searchParams.get("transacao") || initialTransaction
  );
  const [type, setType] = useState<string>(searchParams.get("tipo") || "Todos");
  const [city, setCity] = useState<string>(searchParams.get("cidade") || "Todas");
  const [neighborhood, setNeighborhood] = useState<string>(searchParams.get("bairro") || "Todos");
  const [maxPrice, setMaxPrice] = useState<string>(searchParams.get("precoMax") || "");
  const [bedrooms, setBedrooms] = useState<string>(searchParams.get("quartos") || "");
  const [parking, setParking] = useState<string>(searchParams.get("vagas") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (transaction && transaction !== "todos") params.set("transacao", transaction);
    if (type && type !== "Todos") params.set("tipo", type);
    if (city && city !== "Todas") params.set("cidade", city);
    if (neighborhood && neighborhood !== "Todos") params.set("bairro", neighborhood);
    if (maxPrice) params.set("precoMax", maxPrice);
    if (bedrooms) params.set("quartos", bedrooms);
    if (parking) params.set("vagas", parking);

    router.push(`/imoveis?${params.toString()}`);
  };

  const handleReset = () => {
    setTransaction("todos");
    setType("Todos");
    setCity("Todas");
    setNeighborhood("Todos");
    setMaxPrice("");
    setBedrooms("");
    setParking("");
    router.push("/imoveis");
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-100 ${className}`}
    >
      {/* Abas: Comprar / Alugar / Lançamentos / Todos */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-4">
        <button
          type="button"
          onClick={() => setTransaction("comprar")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
            transaction === "comprar"
              ? "bg-blue-700 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Comprar
        </button>
        <button
          type="button"
          onClick={() => setTransaction("alugar")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
            transaction === "alugar"
              ? "bg-emerald-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Alugar
        </button>
        <button
          type="button"
          onClick={() => setTransaction("lancamento")}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all min-h-[44px] ${
            transaction === "lancamento"
              ? "bg-amber-500 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          Lançamentos
        </button>
        <button
          type="button"
          onClick={() => setTransaction("todos")}
          className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[44px] ${
            transaction === "todos"
              ? "bg-slate-800 text-white"
              : "text-slate-500 hover:bg-slate-100"
          }`}
        >
          Todos
        </button>
      </div>

      {/* Inputs de Filtro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-5">
        {/* Tipo de Imóvel */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Home className="w-3.5 h-3.5 text-blue-600" /> Tipo do Imóvel
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === "Todos" ? "Todos os Tipos" : t}
              </option>
            ))}
          </select>
        </div>

        {/* Cidade */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" /> Cidade
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c === "Todas" ? "Todas as Cidades" : c}
              </option>
            ))}
          </select>
        </div>

        {/* Bairro */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-600" /> Bairro
          </label>
          <select
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n === "Todos" ? "Todos os Bairros" : n}
              </option>
            ))}
          </select>
        </div>

        {/* Preço Máximo */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-blue-600" /> Valor Máximo
          </label>
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            <option value="">Qualquer Preço</option>
            {transaction === "alugar" ? (
              <>
                <option value="1500">Até R$ 1.500/mês</option>
                <option value="2500">Até R$ 2.500/mês</option>
                <option value="4000">Até R$ 4.000/mês</option>
                <option value="6000">Até R$ 6.000/mês</option>
              </>
            ) : (
              <>
                <option value="300000">Até R$ 300.000</option>
                <option value="500000">Até R$ 500.000</option>
                <option value="800000">Até R$ 800.000</option>
                <option value="1200000">Até R$ 1.200.000</option>
                <option value="2000000">Acima de R$ 1.200.000</option>
              </>
            )}
          </select>
        </div>

        {/* Quartos */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-blue-600" /> Mínimo de Quartos
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            <option value="">Qualquer quantidade</option>
            <option value="1">1+ quarto</option>
            <option value="2">2+ quartos</option>
            <option value="3">3+ quartos</option>
            <option value="4">4+ quartos</option>
          </select>
        </div>

        {/* Vagas de Garagem */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-blue-600" /> Vagas de Garagem
          </label>
          <select
            value={parking}
            onChange={(e) => setParking(e.target.value)}
            className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors min-h-[48px]"
          >
            <option value="">Qualquer quantidade</option>
            <option value="1">1+ vaga</option>
            <option value="2">2+ vagas</option>
            <option value="3">3+ vagas</option>
          </select>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-md active:scale-[0.99] min-h-[52px]"
        >
          <Search className="w-5 h-5" />
          <span>Buscar Imóveis</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-2xl flex items-center justify-center gap-2 text-sm transition-colors min-h-[48px]"
          title="Limpar Filtros"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Limpar</span>
        </button>
      </div>
    </form>
  );
}
