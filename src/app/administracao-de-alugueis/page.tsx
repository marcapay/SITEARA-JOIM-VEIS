import { Key, ShieldCheck, DollarSign } from "lucide-react";
import Link from "next/link";

export const metadata = { 
  title: 'Administração de Aluguéis | Araújo Imóveis - Caratinga/MG',
  description: 'Administração completa de aluguéis em Caratinga e região. Vistoria rigorosa, garantia de repasse e contrato seguro.'
};

export default function Administracao() {
  return (
    <div className="bg-white min-h-screen text-slate-900 pb-12">
      <div className="bg-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Serviços Imobiliários</span>
          <h1 className="text-3xl sm:text-5xl font-black">Deixe a burocracia com a gente.</h1>
          <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto">
            Nós cuidamos do seu imóvel e garantimos seu aluguel em dia, com vistoria rigorosa e transparência.
          </p>
          <div className="pt-2">
            <Link 
              href="/anunciar" 
              className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-base shadow-lg transition-all active:scale-95"
            >
              Quero anunciar meu imóvel
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900">Vistoria Rigorosa</h3>
          <p className="text-slate-600 text-sm">Garantimos que seu imóvel será devolvido exatamente como foi entregue.</p>
        </div>

        <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-7 h-7"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900">Repasse Garantido</h3>
          <p className="text-slate-600 text-sm">Transparência financeira e relatórios mensais para você acompanhar seus recebimentos.</p>
        </div>

        <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Key className="w-7 h-7"/>
          </div>
          <h3 className="font-bold text-xl text-slate-900">Locação Ágil</h3>
          <p className="text-slate-600 text-sm">Anúncio nos principais canais para aprovar fichas rapidamente e alugar sem demora.</p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/" className="text-blue-700 hover:underline font-bold text-sm">
          ← Voltar para o início
        </Link>
      </div>
    </div>
  );
}