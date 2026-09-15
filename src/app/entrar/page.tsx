"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Key, 
  Home, 
  UserCheck, 
  FileText, 
  Wrench, 
  DollarSign, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ExternalLink,
  Building2,
  User,
  Sparkles,
  AlertTriangle
} from "lucide-react";
import { 
  CRM_REGISTERED_USERS, 
  findCrmUser, 
  getCrmRedirectUrl, 
  getTargetPortalUrl,
  isClientRole,
  CrmUser,
  CRM_BASE_URL
} from "@/data/crmUsers";

export default function EntrarPage() {
  const [activeRole, setActiveRole] = useState<"locatario" | "locador">("locatario");
  const [documentOrEmail, setDocumentOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [detectedUser, setDetectedUser] = useState<CrmUser | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info" | "warning"; text: string } | null>(null);

  // Auto-detect CRM user as the user types email/CPF
  useEffect(() => {
    if (documentOrEmail.trim().length > 3) {
      const match = findCrmUser(documentOrEmail);
      if (match) {
        setDetectedUser(match);
        if (match.crmCargo === "Proprietário") {
          setActiveRole("locador");
        } else if (match.crmCargo === "Inquilino") {
          setActiveRole("locatario");
        }
      } else {
        setDetectedUser(null);
      }
    } else {
      setDetectedUser(null);
    }
  }, [documentOrEmail]);

  // Quick filler function for CRM users
  const selectQuickCrmUser = (user: CrmUser) => {
    setDocumentOrEmail(user.email);
    setPassword("••••••••••••");
    setDetectedUser(user);
    if (user.crmCargo === "Proprietário") {
      setActiveRole("locador");
      setStatusMessage({
        type: "success",
        text: `Usuário '${user.name}' selecionado. Função no CRM: PROPRIETÁRIO. Redirecionará para a Área do Proprietário.`
      });
    } else if (user.crmCargo === "Inquilino") {
      setActiveRole("locatario");
      setStatusMessage({
        type: "success",
        text: `Usuário '${user.name}' selecionado. Função no CRM: INQUILINO. Redirecionará para a Área do Inquilino.`
      });
    } else {
      setStatusMessage({
        type: "warning",
        text: `Usuário '${user.name}' é ${user.crmCargo.toUpperCase()} no CRM (membro de equipe). Redirecionará para o painel de administração.`
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const targetInfo = getTargetPortalUrl(documentOrEmail, activeRole);
    
    setStatusMessage({ 
      type: "info", 
      text: targetInfo.message 
    });

    try {
      await new Promise((resolve) => setTimeout(resolve, 600));

      setStatusMessage({ 
        type: targetInfo.isExternalCrm ? "warning" : "success", 
        text: targetInfo.message 
      });

      setTimeout(() => {
        window.location.href = targetInfo.url;
      }, 700);
    } catch {
      setStatusMessage({ 
        type: "error", 
        text: "Erro ao conectar com a Área do Cliente. Tente novamente ou entre em contato via WhatsApp." 
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background Decorator Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wide uppercase">
            <Building2 className="w-3.5 h-3.5 text-blue-400" />
            <span>CRM Araújo Imóveis • Portal Exclusivo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Área do Cliente
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Insira seu e-mail ou CPF cadastrado no CRM. O sistema reconhece sua função no CRM (<strong>Proprietário</strong> ou <strong>Inquilino</strong>) e direciona para a sua página exata.
          </p>
        </div>

        {/* Quick User Selection Chips (Registered CRM Accounts matching exact roles) */}
        <div className="max-w-3xl mx-auto w-full mb-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Testar Usuários Cadastrados no CRM:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {CRM_REGISTERED_USERS.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => selectQuickCrmUser(user)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 group ${
                  documentOrEmail.toLowerCase() === user.email.toLowerCase()
                    ? "bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>{user.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{user.email}</div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    user.crmCargo === "Proprietário"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : user.crmCargo === "Inquilino"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  }`}>
                    {user.crmCargo}
                  </span>

                  <span className="text-[10px] text-slate-500">
                    {user.crmCargo === "Proprietário" ? "→ Proprietário" : user.crmCargo === "Inquilino" ? "→ Inquilino" : "→ Admin"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Tab Role Switcher */}
        <div className="max-w-md mx-auto w-full mb-8">
          <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 flex shadow-inner">
            <button
              type="button"
              onClick={() => setActiveRole("locatario")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                activeRole === "locatario"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Locatário (Inquilino)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole("locador")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                activeRole === "locador"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Locador (Proprietário)</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout: Form & Quick Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto w-full">
          {/* Left Column: Interactive Login Form */}
          <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${activeRole === "locatario" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}`}>
                  {activeRole === "locatario" ? <Key className="w-6 h-6" /> : <Home className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Login do {activeRole === "locatario" ? "Locatário" : "Locador"}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {activeRole === "locatario" ? "Inquilinos: boletos PIX, chamados e vistorias" : "Proprietários: repasses, extratos e informe de IR"}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                CRM Araújo
              </span>
            </div>

            {/* Detected CRM User Match Banner */}
            {detectedUser && (
              <div className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center justify-between animate-in fade-in ${
                isClientRole(detectedUser.crmCargo)
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-300"
              }`}>
                <div className="flex items-center gap-2">
                  {isClientRole(detectedUser.crmCargo) ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>
                    <strong>Função no CRM:</strong> {detectedUser.name} ({detectedUser.crmCargo})
                  </span>
                </div>
                <span className="bg-slate-900 px-2 py-0.5 rounded text-[10px] font-mono font-bold border border-slate-700">
                  {detectedUser.crmCargo === "Proprietário"
                    ? "Área do Proprietário"
                    : detectedUser.crmCargo === "Inquilino"
                    ? "Área do Inquilino"
                    : "Painel Equipe CRM"}
                </span>
              </div>
            )}

            {statusMessage && (
              <div className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center gap-3 border ${
                statusMessage.type === "success" 
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" 
                  : statusMessage.type === "error"
                  ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                  : statusMessage.type === "warning"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  : "bg-blue-500/10 text-blue-300 border-blue-500/30"
              }`}>
                {statusMessage.type === "success" && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                {statusMessage.type === "warning" && <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  CPF / CNPJ ou E-mail Cadastrado no CRM
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={documentOrEmail}
                    onChange={(e) => setDocumentOrEmail(e.target.value)}
                    placeholder={activeRole === "locatario" ? "Ex: mariana@araujo.com ou CPF" : "Ex: miguelmr.pessoal@gmail.com ou CPF"}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <UserCheck className="w-5 h-5 text-slate-500 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Senha de Acesso
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
                  />
                  <span>Lembrar meu acesso</span>
                </label>

                <a
                  href={`https://wa.me/5533999999999?text=${encodeURIComponent(`Olá! Sou ${activeRole === "locador" ? "Locador/Proprietário" : "Locatário/Inquilino"} na Araújo Imóveis e preciso recuperar minha senha do Portal.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-semibold hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                  activeRole === "locatario"
                    ? "bg-blue-600 hover:bg-blue-500 shadow-blue-600/25"
                    : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25"
                }`}
              >
                {isLoading ? (
                  <span>Acessando sua Área...</span>
                ) : (
                  <>
                    <span>Entrar na {activeRole === "locatario" ? "Área do Inquilino" : "Área do Proprietário"}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-slate-400 text-xs">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Conectado Diretamente ao <strong>CRM Araújo Imóveis</strong></span>
            </div>
          </div>

          {/* Right Column: Quick Services & CRM Features */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
              <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <span>Serviços Rápidos do {activeRole === "locatario" ? "Inquilino" : "Proprietário"}</span>
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Principais tarefas administrativas disponíveis diretamente pelo seu painel no CRM:
              </p>

              {activeRole === "locatario" ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">2ª Via de Boleto</h4>
                      <p className="text-[11px] text-slate-400">Baixe seu boleto do mês com código de barras PIX.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Solicitar Reparos</h4>
                      <p className="text-[11px] text-slate-400">Abra chamados de manutenção e acompanhe prazos.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Laudo de Vistoria</h4>
                      <p className="text-[11px] text-slate-400">Consulte fotos e termos de vistoria do seu contrato.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Extratos de Repasse</h4>
                      <p className="text-[11px] text-slate-400">Acompanhe as datas e valores creditados em sua conta.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
                      <PieChart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Informe de Rendimentos (IR)</h4>
                      <p className="text-[11px] text-slate-400">Gere o relatório completo para a declaração de Imposto de Renda.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">Gestão de Imóveis & Contratos</h4>
                      <p className="text-[11px] text-slate-400">Visualize ocupação, vistorias e reajustes anuais de aluguel.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CRM Araújo Imóveis Direct Link Card */}
            <div className="bg-gradient-to-br from-blue-900/40 via-slate-900 to-slate-950 p-6 rounded-3xl border border-blue-500/30 text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mx-auto">
                <ExternalLink className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Acesso Geral ao CRM Araújo Imóveis</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Painel administrativo completo de atendimento, contratos e gestão de imóveis.
              </p>
              <a
                href={CRM_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-3 rounded-xl border border-blue-500/40 transition-colors w-full shadow-md"
              >
                <span>Abrir CRM Araújo Imóveis</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <span>← Voltar para o Site Principal</span>
          </Link>
        </div>
      </div>
    </div>
  );
}