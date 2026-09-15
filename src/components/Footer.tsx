import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck, MessageCircle, ArrowUpRight, UserCheck, FileText } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from "@/data/properties";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 sm:pt-16 pb-20 sm:pb-12 px-4 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Coluna 1: Logo & Apresentação */}
        <div className="space-y-4">
          <Link href="/" className="inline-block py-1">
            <Image 
              src="/logo-white.png" 
              alt="Araújo Imóveis" 
              width={180} 
              height={60} 
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Sua imobiliária de confiança em Caratinga e região. Encontre imóveis para alugar, comprar ou anuncie conosco com total transparência.
          </p>
          
          <div className="flex flex-col gap-1 pt-2">
            <span className="text-xs font-mono text-blue-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg inline-block w-fit">
              CRECI-MG J 08993
            </span>
            <p className="text-xs text-slate-400 italic">&quot;Credibilidade começa no nome&quot;</p>
          </div>
        </div>

        {/* Coluna 2: Navegação Rápida */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">Páginas Principais</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors py-1 block">Página Inicial</Link>
            </li>
            <li>
              <Link href="/comprar" className="hover:text-white transition-colors py-1 block">Imóveis para Comprar</Link>
            </li>
            <li>
              <Link href="/alugar" className="hover:text-white transition-colors py-1 block">Imóveis para Alugar</Link>
            </li>
            <li>
              <Link href="/lancamentos" className="hover:text-white transition-colors py-1 block flex items-center gap-1 text-amber-300">
                <span>Investimentos</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </li>
            <li>
              <Link href="/anunciar" className="hover:text-white transition-colors py-1 block">Anuncie seu Imóvel</Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Institucional & Área do Cliente */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">Área do Cliente & Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/entrar" className="hover:text-blue-400 text-blue-300 transition-colors py-1 flex items-center gap-1.5 font-medium">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span>Portal Locador & Locatário</span>
              </Link>
            </li>
            <li>
              <Link href="/administracao-de-alugueis" className="hover:text-white transition-colors py-1 block">Administração de Aluguéis</Link>
            </li>
            <li>
              <Link href="/agendamento-visita-tecnica" className="hover:text-amber-300 text-amber-400 transition-colors py-1 flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Ficha 01: Visita Técnica</span>
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-white transition-colors py-1 block">Sobre a Araújo Imóveis</Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-white transition-colors py-1 block">Fale Conosco</Link>
            </li>
            <li>
              <Link href="/privacidade" className="hover:text-white transition-colors py-1 block flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Política de Privacidade</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 4: Atendimento & Localização */}
        <div>
          <h4 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-blue-400">Contato & Local</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-blue-400" />
              <span>Centro, Caratinga - MG</span>
            </li>
            <li>
              <a 
                href={getWhatsAppLink()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                <span>WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Atendimento via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright & LGPD Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Araújo Imóveis. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <Link href="/privacidade" className="hover:text-slate-200 transition-colors">Política de Privacidade</Link>
          <span className="text-slate-400 font-mono">CRECI-MG J 08993</span>
        </div>
      </div>
    </footer>
  );
}
