"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Bell, 
  LogOut, 
  Home, 
  Building2, 
  Wrench, 
  DollarSign, 
  FileText, 
  MessageSquare, 
  Calendar, 
  AlertCircle, 
  MessageCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Key
} from "lucide-react";
import { CRM_REGISTERED_USERS, getCrmRedirectUrl, CRM_BASE_URL, CrmUser } from "@/data/crmUsers";
import { getWhatsAppLink } from "@/data/properties";

function AreaDoClienteContent() {
  const searchParams = useSearchParams();
  const initialRoleParam = searchParams.get("role") || searchParams.get("portal") || "";
  const identifierParam = searchParams.get("identifier") || searchParams.get("email") || "";
  
  // Find user by identifier if provided
  const matchedUser = CRM_REGISTERED_USERS.find(
    (u) => u.email.toLowerCase() === identifierParam.toLowerCase() || u.name.toLowerCase() === identifierParam.toLowerCase()
  );

  // Determine initial role strictly based on CRM Cargo
  const initialRole: "proprietario" | "inquilino" = (() => {
    if (matchedUser) {
      if (matchedUser.crmCargo === "Proprietário") return "proprietario";
      if (matchedUser.crmCargo === "Inquilino") return "inquilino";
    }
    if (initialRoleParam === "inquilino" || initialRoleParam === "locatario") return "inquilino";
    return "proprietario";
  })();

  const [role, setRole] = useState<"proprietario" | "inquilino">(initialRole);

  const [currentUser, setCurrentUser] = useState<CrmUser>(() => {
    if (matchedUser) return matchedUser;
    return role === "proprietario" ? CRM_REGISTERED_USERS[0] : CRM_REGISTERED_USERS[1];
  });

  useEffect(() => {
    if (matchedUser) {
      setCurrentUser(matchedUser);
      if (matchedUser.crmCargo === "Proprietário") setRole("proprietario");
      else if (matchedUser.crmCargo === "Inquilino") setRole("inquilino");
    } else {
      if (role === "proprietario") {
        setCurrentUser(CRM_REGISTERED_USERS[0]); // miguel (Proprietário)
      } else {
        setCurrentUser(CRM_REGISTERED_USERS[1]); // Mariana (Inquilino)
      }
    }
  }, [role, identifierParam]);

  const [activeTab, setActiveTab] = useState("inicio");

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white pb-24">
      {/* Top Header Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/logo-white.png"
                alt="Araújo Imóveis"
                width={140}
                height={42}
                className="h-9 w-auto object-contain"
              />
            </Link>

            {/* Role Badge Button - Allows quick switching for demo/testing */}
            <button
              onClick={() => setRole(role === "proprietario" ? "inquilino" : "proprietario")}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                role === "proprietario"
                  ? "bg-slate-800 text-blue-300 border-blue-500/40 hover:bg-slate-700"
                  : "bg-slate-800 text-emerald-300 border-emerald-500/40 hover:bg-slate-700"
              }`}
              title="Clique para alternar entre Área do Proprietário e Área do Inquilino"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{role === "proprietario" ? "Área do Proprietário" : "Área do Inquilino"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Notificações"
              className="relative p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/50"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <Link
              href="/entrar"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold rounded-xl transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Client Area Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 w-full space-y-6">

        {/* Dynamic Header Switcher Notice */}
        <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 px-3 text-xs text-slate-400">
            <UserCheck className="w-4 h-4 text-blue-400" />
            <span>Perfil Ativo: <strong>{currentUser.name}</strong> ({currentUser.crmCargo})</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setRole("proprietario")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === "proprietario"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Área do Proprietário
            </button>
            <button
              onClick={() => setRole("inquilino")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                role === "inquilino"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Área do Inquilino
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TELA 1: ÁREA DO PROPRIETÁRIO (Fiel ao Screenshot 1) */}
        {/* ========================================================================= */}
        {role === "proprietario" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Greeting Header */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <span>Olá, {currentUser.name}!</span> 👋
                </h1>
                <p className="text-xs text-slate-400">
                  Confira o resumo financeiro dos seus imóveis.
                </p>
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                  alt="Foto do Proprietário"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Metric Card 1: Próximo Repasse Previsto */}
            <div className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 shadow-lg space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>PRÓXIMO REPASSE PREVISTO</span>
              </div>
              <div className="text-xs text-slate-400">Sem repasses agendados</div>
              <div className="text-3xl font-black text-white tracking-tight">R$ 0,00</div>
            </div>

            {/* Metric Cards Grid: Meus Imóveis & Aprovações Pendentes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-slate-800/80 rounded-2xl text-slate-300 border border-slate-700/60">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Meus Imóveis</div>
                  <div className="text-base font-bold text-white">1 Imóveis (0 Alugados)</div>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-800 flex items-center gap-4">
                <div className="p-3 bg-slate-800/80 rounded-2xl text-slate-300 border border-slate-700/60">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Aprovações Pendentes</div>
                  <div className="text-base font-bold text-white">0 Chamado(s)</div>
                </div>
              </div>
            </div>

            {/* Section: Meus Imóveis */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Meus Imóveis</h2>
                <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                  Ver todos
                </button>
              </div>

              {/* Property Card */}
              <div className="bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-colors">
                <div className="relative w-24 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400"
                    alt="Foto do Imóvel"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <span className="inline-block bg-blue-500/20 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-blue-500/30">
                    Disponível
                  </span>
                  <h3 className="text-sm font-bold text-white capitalize">
                    {currentUser.propertyTitle || "casa"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentUser.propertyAddress || "rua capitão paiva 202"}
                  </p>
                  <p className="text-xs font-bold text-slate-200 pt-0.5">
                    Aluguel: {currentUser.rentValue || "R$ 2.499,98"}
                  </p>
                </div>
              </div>
            </div>

            {/* Link Banner to Open in External CRM */}
            <div className="p-4 bg-gradient-to-r from-blue-900/30 to-slate-900 border border-blue-500/30 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">
                  Conectado ao <strong>CRM Araújo Imóveis</strong> • Painel Completo do Proprietário
                </span>
              </div>
              <a
                href={getCrmRedirectUrl("locador", currentUser.email)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Abrir no CRM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 2: ÁREA DO INQUILINO (Fiel ao Screenshot 2) */}
        {/* ========================================================================= */}
        {role === "inquilino" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Greeting Header */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <span>Olá, {currentUser.name}!</span> 👋
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  {currentUser.propertyTitle || "Casa"}
                </p>
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/40 shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Foto da Inquilina"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Status Card: Nenhum aluguel ou fatura pendente */}
            <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 text-center shadow-lg">
              <div className="text-sm font-semibold text-slate-300">
                Nenhum aluguel ou fatura pendente.
              </div>
            </div>

            {/* Quick Action Grid: Pedir Reparo & 2ª Via Aluguel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("reparos")}
                className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all text-center space-y-2 group shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="text-base font-bold text-white">Pedir Reparo</div>
                <div className="text-xs text-slate-400">Solicitar manutenção</div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("aluguel")}
                className="bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all text-center space-y-2 group shadow-lg"
              >
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-base font-bold text-white">2ª Via Aluguel</div>
                <div className="text-xs text-slate-400">Boletos e recibos</div>
              </button>
            </div>

            {/* Contract Renewal Notice Card */}
            <div className="bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-800 space-y-3 shadow-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">
                    Vencimento do Contrato em 60 Dias
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Seu contrato encerra em 10/09/2026. Informe sua intenção de renovação ou desocupação.
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppLink(`Olá! Sou ${currentUser.name} e gostaria de tratar sobre a renovação do meu contrato de aluguel.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-200 hover:bg-white text-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Responder Intenção
              </a>
            </div>

            {/* Section: Acompanhamento de Manutenções */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Acompanhamento de Manutenções</h2>
                <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">
                  Ver todas
                </button>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 text-center text-xs text-slate-400">
                Nenhum chamado de manutenção em aberto no momento.
              </div>
            </div>

            {/* Link Banner to Open in External CRM */}
            <div className="p-4 bg-gradient-to-r from-emerald-900/30 to-slate-900 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span className="text-slate-300">
                  Conectado ao <strong>CRM Araújo Imóveis</strong> • Portal do Locatário
                </span>
              </div>
              <a
                href={getCrmRedirectUrl("locatario", currentUser.email)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Abrir no CRM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Floating WhatsApp Action Button (Exact from Screenshot 2 for Inquilino) */}
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-4 py-3 rounded-full flex items-center gap-2 shadow-2xl transition-all active:scale-95 border border-emerald-400/50"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>Falar com a Imobiliária</span>
      </a>

      {/* Bottom Navigation Bar (Matching exact items from Screenshots) */}
      <nav className="fixed bottom-0 inset-x-0 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 py-2.5 px-4 z-40">
        <div className="max-w-md mx-auto flex items-center justify-between text-[11px] font-medium text-slate-400">
          {role === "proprietario" ? (
            // Bottom Items for Proprietário (Início | Imóveis | Extrato | Reparos | Docs | Recados)
            <>
              <button
                onClick={() => setActiveTab("inicio")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "inicio" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Home className="w-4 h-4" />
                <span>Início</span>
              </button>

              <button
                onClick={() => setActiveTab("imoveis")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "imoveis" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Building2 className="w-4 h-4" />
                <span>Imóveis</span>
              </button>

              <button
                onClick={() => setActiveTab("extrato")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "extrato" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Extrato</span>
              </button>

              <button
                onClick={() => setActiveTab("reparos")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "reparos" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Wrench className="w-4 h-4" />
                <span>Reparos</span>
              </button>

              <button
                onClick={() => setActiveTab("docs")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "docs" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <FileText className="w-4 h-4" />
                <span>Docs</span>
              </button>

              <button
                onClick={() => setActiveTab("recados")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "recados" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Recados</span>
              </button>
            </>
          ) : (
            // Bottom Items for Inquilino (Início | Aluguel | Reparos | Contrato | Recados)
            <>
              <button
                onClick={() => setActiveTab("inicio")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "inicio" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Home className="w-4 h-4" />
                <span>Início</span>
              </button>

              <button
                onClick={() => setActiveTab("aluguel")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "aluguel" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Building2 className="w-4 h-4" />
                <span>Aluguel</span>
              </button>

              <button
                onClick={() => setActiveTab("reparos")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "reparos" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <Wrench className="w-4 h-4" />
                <span>Reparos</span>
              </button>

              <button
                onClick={() => setActiveTab("contrato")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "contrato" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <FileText className="w-4 h-4" />
                <span>Contrato</span>
              </button>

              <button
                onClick={() => setActiveTab("recados")}
                className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "recados" ? "text-white font-bold" : "hover:text-slate-200"}`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Recados</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default function AreaDoClientePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Carregando Área do Cliente...</p>
        </div>
      </div>
    }>
      <AreaDoClienteContent />
    </Suspense>
  );
}
