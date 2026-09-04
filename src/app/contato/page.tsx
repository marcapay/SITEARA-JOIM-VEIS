"use client";

import { useState } from "react";
import { MapPin, MessageCircle, Send, Clock, ShieldCheck } from "lucide-react";
import { getWhatsAppLink, WHATSAPP_DISPLAY_PHONE } from "@/data/properties";

export default function ContatoPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Informações de Imóveis");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá Araújo Imóveis! Mensagem via site:\n\nNome: ${name}\nWhatsApp: ${phone}\nAssunto: ${subject}\nMensagem: ${message}`;
    window.open(getWhatsAppLink(msg), "_blank");
  };

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-10 rounded-3xl space-y-3 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> CRECI-MG J 08993
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Fale Conosco</h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Estamos prontos para atender você com agilidade. Converse com nossos corretores pelo WhatsApp ou envie uma mensagem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna de Informações de Contato */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Canal Direto</h2>

            <div className="space-y-4 text-sm">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 font-semibold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-emerald-600 shrink-0 fill-current" />
                <div>
                  <span className="text-xs text-emerald-600 block">WhatsApp de Atendimento</span>
                  <span>{WHATSAPP_DISPLAY_PHONE}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Endereço</span>
                  <span className="text-slate-600">Centro, Caratinga - MG</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block">Horário de Atendimento</span>
                  <span className="text-slate-600">Segunda a Sexta: 08:00 às 18:00</span>
                  <span className="text-slate-600 block">Sábado: 08:00 às 12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Contato */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-black text-slate-900">Envie uma Mensagem</h2>
            <p className="text-xs text-slate-500">Respondemos rapidamente pelo seu número de WhatsApp cadastrado.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
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

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assunto</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none min-h-[48px]"
              >
                <option value="Informações de Imóveis">Quero informações sobre um imóvel</option>
                <option value="Agendamento de Visita">Quero agendar uma visita</option>
                <option value="Anúncio de Imóvel">Quero anunciar meu imóvel</option>
                <option value="Administração de Aluguel">Administração de Aluguéis</option>
                <option value="Outros Assuntos">Outros assuntos</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sua Mensagem</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos te ajudar hoje?"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-md active:scale-98 min-h-[52px]"
            >
              <Send className="w-5 h-5" />
              <span>Enviar via WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
