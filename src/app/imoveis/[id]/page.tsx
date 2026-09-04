"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  PROPERTIES_DATA, 
  formatCurrency, 
  getPropertyWhatsAppLink, 
  getWhatsAppLink 
} from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Maximize2, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Share2, 
  ShieldCheck, 
  Send,
  UserCheck
} from "lucide-react";

interface PropertyDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = use(params);

  const property = PROPERTIES_DATA.find(
    (p) => p.id === id || p.code.toLowerCase() === id.toLowerCase()
  );

  if (!property) {
    notFound();
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Form State para agendamento de visita
  const [scheduleName, setScheduleName] = useState("");
  const [schedulePhone, setSchedulePhone] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const similarProperties = PROPERTIES_DATA.filter(
    (p) => p.id !== property.id && (p.neighborhood === property.neighborhood || p.type === property.type)
  ).slice(0, 3);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Confira este imóvel da Araújo Imóveis (Código #${property.code}): ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Olá Araújo Imóveis! Gostaria de agendar uma visita para o imóvel código #${property.code} (${property.title}).\nMeu Nome: ${scheduleName}\nMeu WhatsApp: ${schedulePhone}\nData Preferida: ${scheduleDate}`;
    window.open(getWhatsAppLink(message), "_blank");
    setIsScheduleModalOpen(false);
  };

  const isRent = property.transaction === 'alugar';
  const isLaunch = property.transaction === 'lancamento';

  return (
    <div className="pb-28 pt-4 sm:pt-8 px-4 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Navigation */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500">
        <Link 
          href="/imoveis" 
          className="flex items-center gap-1.5 hover:text-blue-700 font-semibold transition-colors py-2 px-3.5 bg-white rounded-xl border border-slate-200 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Voltar para a busca
        </Link>

        <div className="flex items-center gap-2">
          <span className="font-mono bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
            Cód: #{property.code}
          </span>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-slate-700 hover:text-blue-700 py-1.5 px-3 bg-white rounded-xl border border-slate-200 font-medium transition-colors min-h-[38px]"
            aria-label="Compartilhar imóvel"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">{copied ? "Link Copiado!" : "Compartilhar"}</span>
          </button>
        </div>
      </div>

      {/* 1. Galeria de Fotos Interativa Touch */}
      <div className="space-y-3">
        <div className="relative h-[320px] sm:h-[480px] lg:h-[540px] w-full bg-slate-950 rounded-3xl overflow-hidden shadow-xl group">
          <Image
            src={property.images[activeImageIndex]}
            alt={`${property.title} - Foto ${activeImageIndex + 1}`}
            fill
            className="object-cover cursor-pointer transition-all duration-300"
            onClick={() => setIsGalleryOpen(true)}
            priority
          />

          {/* Badges de Categoria */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span className={`px-3.5 py-1.5 text-xs font-bold rounded-full shadow-lg backdrop-blur-md ${
              isLaunch 
                ? 'bg-amber-500 text-white' 
                : isRent 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-blue-700 text-white'
            }`}>
              {isLaunch ? 'LANÇAMENTO' : isRent ? 'ALUGUEL' : 'VENDA'}
            </span>
          </div>

          {/* Navegação de Fotos com Setas Touch */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-all shadow-md focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicador de Fotos */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-semibold px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center gap-1.5 transition-colors shadow-md"
          >
            <span>Ver todas ({activeImageIndex + 1}/{property.images.length})</span>
          </button>
        </div>

        {/* Miniaturas de Fotos */}
        {property.images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 w-28 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-blue-600 ring-2 ring-blue-300 scale-105' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal Galeria Fullscreen */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between p-4">
          <div className="flex justify-between items-center text-white px-2">
            <span className="font-mono text-sm">
              #{property.code} — Foto {activeImageIndex + 1} de {property.images.length}
            </span>
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-grow flex items-center justify-center my-4">
            <Image
              src={property.images[activeImageIndex]}
              alt={property.title}
              fill
              className="object-contain"
            />
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-800"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-800"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 2. Ficha Técnica e Detalhamento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Esquerda: Informações Principais */}
        <div className="lg:col-span-2 space-y-8">
          {/* Card de Preço e Endereço */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-slate-500 text-sm font-medium">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{property.address}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              {property.title}
            </h1>

            {/* Preço e Taxas */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 font-medium block">
                  {isRent ? 'Aluguel mensal' : 'Valor de Venda'}
                </span>
                <span className="text-3xl sm:text-5xl font-black text-slate-900">
                  {formatCurrency(property.price)}
                  {isRent && <span className="text-base font-normal text-slate-500">/mês</span>}
                </span>
              </div>

              {(property.condoFee || property.iptu) ? (
                <div className="text-xs text-slate-500 space-y-0.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {property.condoFee ? <p>Condomínio: <strong className="text-slate-900">{formatCurrency(property.condoFee)}</strong></p> : null}
                  {property.iptu ? <p>IPTU: <strong className="text-slate-900">{formatCurrency(property.iptu)}</strong></p> : null}
                </div>
              ) : null}
            </div>

            {/* Ficha com Chips Touch */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="bg-blue-50/70 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100">
                <Bed className="w-5 h-5 text-blue-700 mb-1" />
                <span className="text-xs text-slate-500">Quartos</span>
                <span className="font-bold text-sm text-slate-900">{property.bedrooms}</span>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100">
                <Bed className="w-5 h-5 text-indigo-700 mb-1" />
                <span className="text-xs text-slate-500">Suítes</span>
                <span className="font-bold text-sm text-slate-900">{property.suites}</span>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100">
                <Bath className="w-5 h-5 text-blue-700 mb-1" />
                <span className="text-xs text-slate-500">Banheiros</span>
                <span className="font-bold text-sm text-slate-900">{property.bathrooms}</span>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100">
                <Car className="w-5 h-5 text-blue-700 mb-1" />
                <span className="text-xs text-slate-500">Vagas</span>
                <span className="font-bold text-sm text-slate-900">{property.parkingSpots}</span>
              </div>

              <div className="bg-blue-50/70 p-3.5 rounded-2xl flex flex-col items-center justify-center text-center border border-blue-100 col-span-2 sm:col-span-1">
                <Maximize2 className="w-5 h-5 text-blue-700 mb-1" />
                <span className="text-xs text-slate-500">Área Útil</span>
                <span className="font-bold text-sm text-slate-900">{property.area} m²</span>
              </div>
            </div>
          </div>

          {/* Descrição Detalhada */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Sobre o Imóvel
            </h2>
            <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Características e Diferenciais */}
          {property.features && property.features.length > 0 && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                Diferenciais e Infraestrutura
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-slate-700 text-sm bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Localização Aproximada em Caratinga */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Localização no Bairro {property.neighborhood}
            </h2>
            <div className="bg-slate-100 rounded-2xl p-6 text-center space-y-3 border border-slate-200">
              <MapPin className="w-10 h-10 text-blue-600 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{property.neighborhood}, {property.city} - MG</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Por razões de privacidade e segurança, a localização exata do imóvel é fornecida ao agendar uma visita.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Direita: Box de Ação Desktop */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6 sticky top-24">
            <div className="space-y-1 text-center border-b border-slate-100 pb-4">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Atendimento Imediato</span>
              <h3 className="text-3xl font-black text-slate-900">{formatCurrency(property.price)}</h3>
              <p className="text-xs text-emerald-600 font-semibold flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Garantia CRECI-MG J 08993
              </p>
            </div>

            {/* Corretor de Plantão */}
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">Corretor de Plantão</p>
                <p className="text-slate-500">Especialista na região de {property.neighborhood}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a
                href={getPropertyWhatsAppLink(property)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-md active:scale-95 min-h-[52px]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Conversar pelo WhatsApp</span>
              </a>

              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-colors min-h-[52px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar uma Visita</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Agendamento */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsScheduleModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase">Agendamento Rápido</span>
              <h3 className="text-xl font-black text-slate-900">Agendar Visita ao Imóvel</h3>
              <p className="text-xs text-slate-500">Cód: #{property.code} - {property.title}</p>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  placeholder="Nome completo"
                  className="w-full px-3.5 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp de Contato</label>
                <input
                  type="tel"
                  required
                  value={schedulePhone}
                  onChange={(e) => setSchedulePhone(e.target.value)}
                  placeholder="(33) 99999-9999"
                  className="w-full px-3.5 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Data e Horário Preferido</label>
                <input
                  type="text"
                  required
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  placeholder="Ex: Amanhã às 14h ou Sábado de manhã"
                  className="w-full px-3.5 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-sm shadow-md transition-colors min-h-[52px]"
              >
                <Send className="w-4 h-4" />
                <span>Confirmar via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Imóveis Semelhantes */}
      {similarProperties.length > 0 && (
        <section className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">Sugestões de Imóveis</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Imóveis Semelhantes em Caratinga</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {/* 4. Sticky Bottom Bar Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 px-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Preço</span>
          <span className="text-lg font-black text-slate-900">{formatCurrency(property.price)}</span>
        </div>

        <a
          href={getPropertyWhatsAppLink(property)}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl flex items-center gap-2 shadow-md active:scale-95 transition-all min-h-[48px]"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Falar no WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
