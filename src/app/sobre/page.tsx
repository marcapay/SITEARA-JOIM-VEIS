import Image from "next/image";
import { ShieldCheck, Award, Users, HeartHandshake, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/properties";

export const metadata = {
  title: "Sobre a Araújo Imóveis | Credibilidade começa no nome",
  description: "Conheça a história e os valores da Araújo Imóveis em Caratinga - MG. Atendimento ético, transparente e registrado no CRECI-MG J 08993.",
};

export default function SobrePage() {
  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-12">
      {/* Header Institucional */}
      <div className="bg-slate-900 text-white p-6 sm:p-12 rounded-3xl space-y-4 text-center max-w-4xl mx-auto relative overflow-hidden">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> CRECI-MG J 08993
        </span>

        <h1 className="text-3xl sm:text-5xl font-black">Sobre a Araújo Imóveis</h1>

        <p className="text-amber-400 font-serif italic text-lg sm:text-xl">
          &quot;Credibilidade começa no nome&quot;
        </p>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Atuamos com excelência no mercado imobiliário de Caratinga e região, oferecendo assessoria completa para compra, venda, aluguel e administração de imóveis.
        </p>
      </div>

      {/* Seção da História */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop"
            alt="Fachada Araújo Imóveis"
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Nossa Trajetória</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Compromisso com o seu futuro</h2>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Fundada com a missão de trazer clareza e segurança jurídica às transações imobiliárias em Caratinga - MG, a <strong>Araújo Imóveis</strong> se consolidou pela seriedade no atendimento e pela busca incessante da satisfação de proprietários e inquilinos.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
            Nossa equipe de corretores é registrada no CRECI-MG e altamente capacitada para identificar as melhores oportunidades de investimento e encontrar a residência perfeita para cada família.
          </p>

          <div className="pt-2">
            <a
              href={getWhatsAppLink("Olá! Gostaria de conhecer os serviços da Araújo Imóveis.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm transition-colors shadow-md min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Falar Conosco no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Nossos Pilares */}
      <div className="bg-slate-100 p-8 sm:p-12 rounded-3xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Nossos Valores</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">O que guia nosso trabalho</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Ética &amp; Transparência</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Negociações claras, sem letras miúdas. Informamos todos os detalhes do imóvel e documentação antecipadamente.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Segurança Jurídica</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Registro sob CRECI-MG J 08993 com suporte em minutas contratuais, vistorias de entrada e saída e acompanhamento cartorário.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Agilidade no WhatsApp</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Atendimento ágil direto no celular, facilitando o agendamento de visitas e respostas a dúvidas em tempo real.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}