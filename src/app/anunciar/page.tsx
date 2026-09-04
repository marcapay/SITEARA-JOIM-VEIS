"use client";

import { useState } from "react";
import { PlusCircle, ShieldCheck, CheckCircle2, Send, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/data/properties";

export default function AnunciarPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Casa");
  const [transaction, setTransaction] = useState("Venda");
  const [neighborhood, setNeighborhood] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá Araújo Imóveis! Quero anunciar meu imóvel com vocês.\n\nNome: ${name}\nWhatsApp: ${phone}\nTipo: ${propertyType}\nModalidade: ${transaction}\nBairro/Cidade: ${neighborhood}\nValor Desejado: ${expectedPrice}\nDetalhes: ${details}`;
    window.open(getWhatsAppLink(msg), "_blank");
  };

  return (
    <div className="py-8 sm:py-12 px-4 max-w-4xl mx-auto w-full space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <PlusCircle className="w-4 h-4" /> Captação Imobiliária
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Anuncie seu Imóvel na Araújo Imóveis</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Venda ou alugue seu imóvel com rapidez, segurança jurídica (CRECI-MG J 08993) e avaliação precisa de mercado em Caratinga e região.
        </p>
      </div>

      {/* Vantagens */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">Divulgação Ampla</h3>
          <p className="text-xs text-slate-500">Seu imóvel em destaque no nosso site, redes sociais e portais imobiliários.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <ShieldCheck className="w-6 h-6 text-blue-600" />
          <h3 className="font-bold text-slate-900 text-base">Segurança Jurídica</h3>
          <p className="text-xs text-slate-500">Elaboração de contratos, análise de documentos e acompanhamento de vistorias.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <MessageCircle className="w-6 h-6 text-emerald-500" />
          <h3 className="font-bold text-slate-900 text-base">Atendimento Humanizado</h3>
          <p className="text-xs text-slate-500">Corretores experientes acompanhando cada visita e proposta recebida.</p>
        </div>
      </div>

      {/* Formulário de Captação */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-black text-slate-900">Preencha os Dados do Imóvel</h2>
          <p className="text-xs text-slate-500">Nossa equipe entrará em contato para agendar a vistoria e fotos profissionais.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carlos Araújo"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(33) 99999-9999"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tipo de Imóvel</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              >
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Cobertura">Cobertura</option>
                <option value="Terreno">Terreno / Lote</option>
                <option value="Comercial">Ponto Comercial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Modalidade</label>
              <select
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              >
                <option value="Venda">Vender</option>
                <option value="Aluguel">Alugar</option>
                <option value="Ambos">Venda ou Aluguel</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro / Cidade</label>
              <input
                type="text"
                required
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                placeholder="Ex: Centro, Caratinga"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Preço Pretendido (Estimado)</label>
            <input
              type="text"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
              placeholder="Ex: R$ 450.000 ou R$ 2.000/mês"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Descrição Breve do Imóvel</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Ex: Apartamento com 3 quartos, suíte, varanda gourmet, 2 vagas de garagem no 4º andar..."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-md active:scale-98 min-h-[52px]"
          >
            <Send className="w-5 h-5" />
            <span>Enviar Dados via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
