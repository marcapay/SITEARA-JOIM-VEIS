"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/properties";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300"
      aria-label="Falar com corretor no WhatsApp"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="hidden sm:inline font-semibold text-sm">Falar com Corretor</span>
    </a>
  );
}
