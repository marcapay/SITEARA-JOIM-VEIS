import Link from "next/link";
import Image from "next/image";
import { getWhatsAppLink } from "@/data/properties";

export const metadata = { 
  title: 'Trabalhe Conosco | Araújo Imóveis - Caratinga/MG',
  description: 'Faça parte da equipe Araújo Imóveis em Caratinga - MG. Oportunidades para corretores e equipe de locação.'
};

export default function TrabalheConosco() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-12">
      <div className="relative text-white py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop" alt="Equipe Araújo Imóveis" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-slate-950/80"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black">Vem ser Araújo Imóveis</h1>
          <p className="text-slate-300 text-sm sm:text-lg">Estamos sempre em busca de novos talentos para integrar nossa equipe em Caratinga.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-12 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200 space-y-6">
        <h2 className="text-2xl font-black text-slate-900">Vagas Abertas em Caratinga</h2>
        <div className="space-y-4">
          <div className="p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-500 transition">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Corretor(a) de Imóveis</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Caratinga/MG • Registro CRECI obrigatório</p>
            </div>
            <a 
              href={getWhatsAppLink("Olá! Gostaria de me candidatar à vaga de Corretor de Imóveis na Araújo Imóveis.")} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm text-center transition-colors min-h-[44px] flex items-center justify-center"
            >
              Candidatar-se no WhatsApp
            </a>
          </div>

          <div className="p-5 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-blue-500 transition">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Atendente de Locação</h3>
              <p className="text-slate-500 text-xs sm:text-sm">Caratinga/MG • Atendimento Presencial e WhatsApp</p>
            </div>
            <a 
              href={getWhatsAppLink("Olá! Gostaria de me candidatar à vaga de Atendente de Locação na Araújo Imóveis.")} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm text-center transition-colors min-h-[44px] flex items-center justify-center"
            >
              Candidatar-se no WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center space-y-4">
          <p className="text-slate-600 text-sm">Não encontrou a vaga ideal? Envie sua apresentação para nosso banco de talentos.</p>
          <a 
            href={getWhatsAppLink("Olá! Gostaria de enviar meu currículo para o Banco de Talentos da Araújo Imóveis.")} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-colors min-h-[48px]"
          >
            Enviar Currículo pelo WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-700 hover:underline font-bold text-sm">
          ← Voltar para o início
        </Link>
      </div>
    </div>
  );
}
