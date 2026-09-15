import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchFilter } from "@/components/SearchFilter";
import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES_DATA, NEIGHBORHOODS, getWhatsAppLink } from "@/data/properties";
import { Tag, Key, Sparkles, PlusCircle, ShieldCheck, MapPin, ChevronRight, MessageCircle, Send, CheckCircle2 } from "lucide-react";

export default function Home() {
  const featuredProperties = PROPERTIES_DATA.filter((p) => p.featured);

  return (
    <>
      {/* 1. Hero Section com Pesquisa de Imóveis Mobile-First */}
      <section className="relative w-full bg-slate-900 text-white overflow-hidden py-10 sm:py-16 md:py-20 px-4">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Imóveis de Luxo"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-semibold border border-blue-400/30 mb-4 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> CRECI-MG J 08993 • Caratinga - MG
          </span>

          {/* Frase Principal do Hero */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-white max-w-4xl leading-tight uppercase drop-shadow-sm">
            SEU NOVO LAR ESTÁ NA <span className="text-blue-400">ARAÚJO IMÓVEIS</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mb-8 font-normal leading-relaxed">
            Credibilidade começa no nome. Encontre os melhores imóveis para comprar, alugar ou lançamentos em Caratinga e região.
          </p>

          {/* Componente de Busca com Filtros e Suspense */}
          <div className="w-full max-w-4xl text-slate-900 text-left">
            <Suspense fallback={<div className="bg-white p-6 rounded-3xl h-36 animate-pulse"></div>}>
              <SearchFilter />
            </Suspense>
          </div>
        </div>
      </section>

      {/* 2. Botões Rápidos de Ação Touch (4 Botões) */}
      <section className="py-8 px-4 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Link
              href="/comprar"
              className="p-4 sm:p-5 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-100 flex flex-col items-center justify-center text-center transition-all group active:scale-95 min-h-[100px]"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <Tag className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">Comprar</span>
              <span className="text-xs text-slate-500 hidden sm:inline">Ver imóveis à venda</span>
            </Link>

            <Link
              href="/alugar"
              className="p-4 sm:p-5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100 flex flex-col items-center justify-center text-center transition-all group active:scale-95 min-h-[100px]"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <Key className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">Alugar</span>
              <span className="text-xs text-slate-500 hidden sm:inline">Casas e apartamentos</span>
            </Link>

            <Link
              href="/lancamentos"
              className="p-4 sm:p-5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-100 flex flex-col items-center justify-center text-center transition-all group active:scale-95 min-h-[100px]"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">Lançamentos</span>
              <span className="text-xs text-slate-500 hidden sm:inline">Imóveis na planta</span>
            </Link>

            <Link
              href="/anunciar"
              className="p-4 sm:p-5 rounded-2xl bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-100 flex flex-col items-center justify-center text-center transition-all group active:scale-95 min-h-[100px]"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-transform">
                <PlusCircle className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base">Anunciar</span>
              <span className="text-xs text-slate-500 hidden sm:inline">Cadastrar meu imóvel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Imóveis em Destaque */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Oportunidades Especiais</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Imóveis em Destaque</h2>
          </div>

          <Link
            href="/imoveis"
            className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 text-sm sm:text-base py-2"
          >
            <span>Ver todos</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. Bairros ou Regiões Mais Procuradas */}
      <section className="py-12 sm:py-16 px-4 bg-slate-100 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Localização Privilegiada</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Explore os Bairros de Caratinga</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Encontre o lugar ideal perto de onde você trabalha, estuda ou deseja morar.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {NEIGHBORHOODS.filter((n) => n !== "Todos").map((bairro) => (
              <Link
                key={bairro}
                href={`/imoveis?bairro=${encodeURIComponent(bairro)}`}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center group min-h-[110px]"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors">
                  {bairro}
                </span>
                <span className="text-xs text-slate-400 mt-0.5">Caratinga - MG</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Apresentação da Imobiliária */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[320px] sm:h-[420px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
              alt="Escritório Araújo Imóveis"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 sm:p-8">
              <div className="text-white space-y-1">
                <p className="text-amber-400 font-bold text-sm">CRECI-MG J 08993</p>
                <h3 className="text-2xl font-extrabold">Araújo Imóveis</h3>
                <p className="text-slate-300 text-sm">&quot;Credibilidade começa no nome&quot;</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Tradição &amp; Confiança</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                Sua parceira imobiliária em Caratinga e Região
              </h2>
            </div>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Na <strong>Araújo Imóveis</strong>, acreditamos que encontrar um imóvel vai muito além de uma simples negociação: é a realização de um sonho e a construção de novas histórias.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                <p className="text-slate-700 text-sm sm:text-base">
                  <strong>Atendimento rápido via WhatsApp:</strong> Converse diretamente com nossos corretores credenciados sem complicações.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                <p className="text-slate-700 text-sm sm:text-base">
                  <strong>Segurança Jurídica:</strong> Registro CRECI-MG J 08993 garantindo vistorias completas e contratos transparentes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-1 shrink-0" />
                <p className="text-slate-700 text-sm sm:text-base">
                  <strong>Ampla Carteira de Imóveis:</strong> Opções residenciais, comerciais, lotes e lançamentos.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppLink("Olá! Gostaria de conversar com um corretor da Araújo Imóveis.")}
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base shadow-md active:scale-95 transition-all min-h-[52px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Conversar no WhatsApp</span>
              </a>

              <Link
                href="/sobre"
                className="py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-colors min-h-[52px]"
              >
                <span>Saiba Mais Sobre Nós</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Formulário de Contato Rápido */}
      <section className="py-16 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-700">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Atendimento Personalizado</span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">Precisa de ajuda para encontrar um imóvel?</h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Preencha os campos abaixo e um de nossos corretores entrará em contato rapidamente.
            </p>
          </div>

          <form action={getWhatsAppLink()} method="GET" target="_blank" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João da Silva"
                  className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[48px]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Telefone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="(33) 99999-9999"
                  className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm min-h-[48px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">O que você procura?</label>
              <textarea
                rows={3}
                required
                placeholder="Ex: Procuro apartamento de 2 quartos no Centro até R$ 2.000 de aluguel..."
                className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base transition-all shadow-lg active:scale-98 min-h-[52px]"
            >
              <Send className="w-5 h-5" />
              <span>Enviar Mensagem para o WhatsApp</span>
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
