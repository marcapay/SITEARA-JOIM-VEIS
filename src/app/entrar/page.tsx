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
  AlertTriangle
} from "lucide-react";
import { 
  findCrmUser, 
  getCrmRedirectUrl, 
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
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Auto-detect CRM user role as the user types email/CPF
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage(null);
    
    // Validar se o usuário existe na base cadastrada do CRM
    const user = findCrmUser(documentOrEmail);

    if (!user) {
      setIsLoading(false);
      setStatusMessage({ 
        type: "error", 
        text: "Acesso bloqueado: Este CPF/CNPJ ou E-mail não consta na base de usuários cadastrados no CRM Araújo Imóveis." 
      });
      return;
    }

    setStatusMessage({ 
      type: "success", 
      text: `Conta autenticada (${user.name})! Redirecionando para o CRM Araújo Imóveis...` 
    });

    const redirectUrl = getCrmRedirectUrl(user.email || documentOrEmail.trim(), activeRole);

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 600);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background Decorator Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full flex-1 flex flex-col justify-center">
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
                    Login
                  </h2>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
                CRM Araújo
              </span>
            </div>

            {/* Detected CRM User Banner */}
            {detectedUser && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Conta Reconhecida no CRM:</strong> {detectedUser.name} ({detectedUser.crmCargo})
                  </span>
                </div>
              </div>
            )}

            {statusMessage && (
              <div className={`mb-6 p-4 rounded-xl text-xs font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-3 border ${
                statusMessage.type === "success" 
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30" 
                  : statusMessage.type === "error"
                  ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                  : "bg-blue-500/10 text-blue-300 border-blue-500/30"
              }`}>
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
                )}
                <div className="flex-1">
                  <p>{statusMessage.text}</p>
                  {statusMessage.type === "error" && (
                    <div className="mt-2 pt-2 border-t border-rose-500/20 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-rose-300/80">Necessita de um cadastro no CRM?</span>
                      <a
                        href={`https://wa.me/5533999999999?text=${encodeURIComponent(`Olá! Tentei acessar a área do cliente no site com o dado "${documentOrEmail}", mas recebi mensagem de usuário não cadastrado no CRM. Gostaria de solicitar meu cadastro.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-200 hover:text-white underline shrink-0"
                      >
                        Falar no WhatsApp <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  CPF / CNPJ Cadastrado no CRM
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={documentOrEmail}
                    onChange={(e) => setDocumentOrEmail(e.target.value)}
                    placeholder="Digite seu CPF ou CNPJ cadastrado"
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
                  <span>Redirecionando para o CRM...</span>
                ) : (
                  <>
                    <span>Entrar no Portal</span>
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

          {/* Right Column: Quick Services Info */}
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