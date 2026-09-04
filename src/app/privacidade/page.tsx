import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade | Araújo Imóveis",
  description: "Conheça nossa política de privacidade e como a Araújo Imóveis trata e protege seus dados pessoais de acordo com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <div className="py-8 sm:py-12 px-4 max-w-4xl mx-auto w-full space-y-8">
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Proteção de Dados (LGPD)
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Política de Privacidade</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          A Araújo Imóveis compromete-se com a transparência, segurança e privacidade no tratamento dos seus dados.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">1. Informações Gerais</h2>
          <p>
            Esta Política de Privacidade contém informações sobre como tratamos, total ou parcialmente, de forma automatizada ou não, os dados pessoais dos usuários que acessam nosso site. O objetivo é esclarecer os interessados acerca dos tipos de dados que são coletados, dos motivos da coleta e da forma como o usuário poderá atualizar, gerenciar ou excluir estas informações.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">2. Coleta de Dados Pessoais</h2>
          <p>
            Os dados pessoais do usuário são coletados pela Araújo Imóveis quando este preenche formulários de contato, simulações de agendamento de visita ou solicita atendimento direto via WhatsApp.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Nome completo;</li>
            <li>Número de telefone / WhatsApp;</li>
            <li>Preferências de busca por imóveis (bairro, faixa de preço, tipo de imóvel).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">3. Finalidade do Tratamento dos Dados</h2>
          <p>
            Os dados pessoais do usuário coletados têm por finalidade:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Permitir a comunicação direta entre o cliente e nossos corretores credenciados (CRECI-MG J 08993);</li>
            <li>Apresentar propostas e agendamentos de visitas aos imóveis selecionados;</li>
            <li>Cumprir obrigações legais e regulatórias do setor imobiliário.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">4. Compartilhamento e Segurança dos Dados</h2>
          <p>
            Não vendemos nem alugamos dados pessoais a terceiros. As informações coletadas são utilizadas exclusivamente para os serviços imobiliários prestados pela Araújo Imóveis em Caratinga - MG.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-4">
          <h2 className="text-xl font-bold text-slate-900">5. Contato sobre LGPD</h2>
          <p>
            Para exercer seus direitos relativos aos seus dados pessoais (confirmação, acesso, correção ou exclusão), entre em contato com a Araújo Imóveis através dos nossos canais oficiais de atendimento em Caratinga.
          </p>
        </section>
      </div>
    </div>
  );
}