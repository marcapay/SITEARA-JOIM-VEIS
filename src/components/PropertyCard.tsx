import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Car, Maximize2, MessageCircle } from "lucide-react";
import { Property, formatCurrency, getPropertyWhatsAppLink } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const isRent = property.transaction === 'alugar';
  const isLaunch = property.transaction === 'lancamento';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group h-full">
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 w-full bg-slate-200 overflow-hidden">
        <Link href={`/imoveis/${property.id}`} className="block w-full h-full">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        
        {/* Transaction Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md backdrop-blur-md ${
            isLaunch 
              ? 'bg-amber-500 text-white' 
              : isRent 
                ? 'bg-emerald-600 text-white' 
                : 'bg-blue-700 text-white'
          }`}>
            {isLaunch ? 'LANÇAMENTO' : isRent ? 'ALUGUEL' : 'VENDA'}
          </span>
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-mono px-2.5 py-1 rounded-full shadow-md">
            #{property.code}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Location */}
        <p className="text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 mb-1.5 line-clamp-1">
          <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{property.neighborhood}, {property.city}</span>
        </p>

        {/* Title */}
        <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
          <Link href={`/imoveis/${property.id}`}>
            {property.title}
          </Link>
        </h3>

        {/* Property Features Badges */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2 bg-slate-50 p-2.5 rounded-xl text-slate-700 text-xs sm:text-sm mb-4">
          {property.bedrooms > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center" title="Quartos">
              <Bed className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">{property.bedrooms} <span className="hidden sm:inline font-normal text-slate-500">qts</span></span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center" title="Banheiros">
              <Bath className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">{property.bathrooms} <span className="hidden sm:inline font-normal text-slate-500">ban</span></span>
            </div>
          )}
          {property.parkingSpots > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center" title="Vagas de Garagem">
              <Car className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">{property.parkingSpots} <span className="hidden sm:inline font-normal text-slate-500">vagas</span></span>
            </div>
          )}
          {property.area > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 text-center" title="Área Total">
              <Maximize2 className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">{property.area}m²</span>
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">
                {isRent ? 'Aluguel mensal' : 'Valor'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                {formatCurrency(property.price)}
                {isRent && <span className="text-xs font-normal text-slate-500">/mês</span>}
              </span>
            </div>

            <Link
              href={`/imoveis/${property.id}`}
              className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-semibold underline underline-offset-4"
            >
              Ver detalhes
            </Link>
          </div>

          {/* Quick WhatsApp CTA Button */}
          <a
            href={getPropertyWhatsAppLink(property)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm active:scale-[0.98] min-h-[44px]"
            aria-label={`Conversar no WhatsApp sobre ${property.title}`}
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
