"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Home, Key, Tag, Sparkles, PlusCircle, Info, PhoneCall, MessageCircle, UserCheck } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from "@/data/properties";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md text-white sticky top-0 z-50 shadow-md">
      {/* Top Banner */}
      <div className="bg-slate-950/90 text-slate-300 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="font-medium text-slate-300">CRECI-MG J 08993 • Credibilidade começa no nome</span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Caratinga - MG</span>
            <Link 
              href="/entrar" 
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Portal Locador / Locatário</span>
            </Link>
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: {WHATSAPP_DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group py-1">
          <Image
            src="/logo-white.png"
            alt="Araújo Imóveis Logo"
            width={160}
            height={50}
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-slate-200 text-sm">
          <Link href="/" className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-semibold text-white">
            <Home className="w-4 h-4 text-blue-400" /> Início
          </Link>
          <Link href="/comprar" className="hover:text-blue-400 transition-colors">
            Comprar
          </Link>
          <Link href="/alugar" className="hover:text-blue-400 transition-colors">
            Alugar
          </Link>
          <Link href="/lancamentos" className="hover:text-amber-300 transition-colors flex items-center gap-1 text-amber-300 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 hover:bg-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Lançamentos
          </Link>
          <Link href="/anunciar" className="hover:text-blue-400 transition-colors">
            Anunciar Imóvel
          </Link>
          <Link href="/sobre" className="hover:text-blue-400 transition-colors">
            Sobre Nós
          </Link>
          <Link href="/contato" className="hover:text-blue-400 transition-colors">
            Contato
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/entrar"
            className="hidden sm:flex items-center gap-1.5 bg-blue-600/90 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-blue-500/40 transition-all shadow-sm active:scale-95"
          >
            <UserCheck className="w-4 h-4 text-blue-200" />
            <span>Área do Cliente</span>
          </Link>

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={toggleMenu}
            className="lg:hidden p-2.5 text-slate-200 hover:text-white hover:bg-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-6 animate-in slide-in-from-top duration-300 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <Link
              href="/entrar"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 bg-blue-900/40 border border-blue-500/40 text-blue-200 rounded-xl text-lg font-semibold transition-colors mb-2"
            >
              <UserCheck className="w-5 h-5 text-blue-400" />
              <span>Área do Cliente (Locador & Locatário)</span>
            </Link>

            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <Home className="w-5 h-5 text-blue-400" />
              <span>Página Inicial</span>
            </Link>

            <Link
              href="/comprar"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <Tag className="w-5 h-5 text-blue-400" />
              <span>Imóveis para Comprar</span>
            </Link>

            <Link
              href="/alugar"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <Key className="w-5 h-5 text-emerald-400" />
              <span>Imóveis para Alugar</span>
            </Link>

            <Link
              href="/lancamentos"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Lançamentos</span>
            </Link>

            <Link
              href="/anunciar"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              <span>Anunciar seu Imóvel</span>
            </Link>

            <Link
              href="/sobre"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <Info className="w-5 h-5 text-slate-400" />
              <span>Sobre a Araújo Imóveis</span>
            </Link>

            <Link
              href="/contato"
              onClick={closeMenu}
              className="flex items-center gap-3 p-3.5 text-slate-100 hover:bg-slate-800 rounded-xl text-lg font-medium transition-colors"
            >
              <PhoneCall className="w-5 h-5 text-slate-400" />
              <span>Fale Conosco</span>
            </Link>
          </nav>

          <div className="pt-6 border-t border-slate-800 space-y-4">
            <div className="text-slate-400 text-xs space-y-1">
              <p className="font-semibold text-slate-200">Araújo Imóveis</p>
              <p>CRECI-MG J 08993 • Caratinga / MG</p>
              <p className="italic text-slate-400">&quot;Credibilidade começa no nome&quot;</p>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-colors shadow-lg active:scale-95"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Conversar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
