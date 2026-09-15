"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Home,
  MapPin,
  FileText,
  Printer,
  Save,
  Edit,
  XCircle,
  ArrowLeft,
  PlusCircle,
  CheckCircle2,
  Search,
  Filter,
  AlertCircle,
  ShieldCheck,
  Building2,
  Compass,
  Zap,
  Droplets,
  Dog,
  Camera,
  MessageSquare
} from "lucide-react";

export interface TechnicalVisitForm {
  id: string;
  code: string;
  // Proprietário
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  bestContactTime: string;
  // Imóvel
  propertyType: string;
  address: string;
  neighborhood: string;
  referencePoint: string;
  locationUrl: string;
  occupancyStatus: "vazio" | "ocupado_proprietario" | "ocupado_inquilino";
  accessContactName: string;
  accessContactPhone: string;
  hasAccessDifficulty: boolean;
  waterConnected: boolean;
  powerConnected: boolean;
  hasPets: boolean;
  notes: string;
  // Agendamento
  visitDate: string;
  visitTime: string;
  responsibleProfessional: string;
  ownerWillAccompany: boolean;
  mediaAuthorization: boolean;
  whatsappConfirmed: boolean;
  // Controle Interno
  captureDate: string;
  realtorName: string;
  captureSource: string;
  status: "Aguardando agendamento" | "Agendado" | "Confirmado" | "Realizado" | "Reagendar";
  // Metadados
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const PROPERTY_TYPES_OPTIONS = [
  "Casa",
  "Apartamento",
  "Cobertura",
  "Terreno / Lote",
  "Comercial / Loja",
  "Galpão",
  "Chácara / Sítio",
  "Outro"
];

const STATUS_OPTIONS = [
  "Aguardando agendamento",
  "Agendado",
  "Confirmado",
  "Realizado",
  "Reagendar"
] as const;

const CAPTURE_SOURCES = [
  "Site Araújo Imóveis",
  "Indicação de Cliente",
  "Placa no Local",
  "WhatsApp da Imobiliária",
  "Redes Sociais (Instagram/FB)",
  "Atendimento Telefônico",
  "Outro"
];

// Fichas demonstrativas iniciais
const INITIAL_DEMO_FORMS: TechnicalVisitForm[] = [
  {
    id: "f-101",
    code: "IMV-2026-001",
    ownerName: "Carlos Eduardo Silva",
    ownerPhone: "(33) 99911-2233",
    ownerEmail: "carlos.silva@email.com",
    bestContactTime: "Manhã (08h às 12h)",
    propertyType: "Casa",
    address: "Rua Capitão Paiva, 202 - Centro",
    neighborhood: "Centro",
    referencePoint: "Próximo à Praça Cesário Alvim",
    locationUrl: "https://maps.google.com/?q=-19.7941,-42.1402",
    occupancyStatus: "vazio",
    accessContactName: "Carlos Eduardo (Proprietário)",
    accessContactPhone: "(33) 99911-2233",
    hasAccessDifficulty: false,
    waterConnected: true,
    powerConnected: true,
    hasPets: false,
    notes: "Chaves disponíveis com a secretária na recepção. Imóvel recém-pintado.",
    visitDate: "2026-09-18",
    visitTime: "14:30",
    responsibleProfessional: "Eng. Roberto Mendes",
    ownerWillAccompany: true,
    mediaAuthorization: true,
    whatsappConfirmed: true,
    captureDate: "2026-09-15",
    realtorName: "Fernanda Lima",
    captureSource: "WhatsApp da Imobiliária",
    status: "Agendado",
    createdAt: "2026-09-15T08:00:00.000Z",
    updatedAt: "2026-09-15T08:00:00.000Z",
    createdBy: "Fernanda Lima",
    updatedBy: "Fernanda Lima"
  },
  {
    id: "f-102",
    code: "IMV-2026-002",
    ownerName: "Mariana Oliveira Costa",
    ownerPhone: "(33) 99888-4455",
    ownerEmail: "mariana.costa@email.com",
    bestContactTime: "Tarde (13h às 18h)",
    propertyType: "Apartamento",
    address: "Av. Moacyr de Mattos, 450 - Apt 302",
    neighborhood: "Esplanada",
    referencePoint: "Ao lado da Padaria Pão Gostoso",
    locationUrl: "",
    occupancyStatus: "ocupado_inquilino",
    accessContactName: "Juliana (Inquilina atual)",
    accessContactPhone: "(33) 98765-4321",
    hasAccessDifficulty: true,
    waterConnected: true,
    powerConnected: true,
    hasPets: true,
    notes: "Possui 1 cão pequeno porte. Interfone 302. Agendar com 24h de antecedência com a inquilina.",
    visitDate: "2026-09-20",
    visitTime: "10:00",
    responsibleProfessional: "Vistoriador Lucas Souza",
    ownerWillAccompany: false,
    mediaAuthorization: true,
    whatsappConfirmed: true,
    captureDate: "2026-09-14",
    realtorName: "Ricardo Araújo",
    captureSource: "Indicação de Cliente",
    status: "Aguardando agendamento",
    createdAt: "2026-09-14T10:00:00.000Z",
    updatedAt: "2026-09-14T10:00:00.000Z",
    createdBy: "Ricardo Araújo",
    updatedBy: "Ricardo Araújo"
  }
];

export default function AgendamentoVisitaTecnicaPage() {
  const [formsList, setFormsList] = useState<TechnicalVisitForm[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "form" | "print_filled" | "print_blank">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [editingFormId, setEditingFormId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Estado do formulário atual
  const [formData, setFormData] = useState<Omit<TechnicalVisitForm, "id" | "createdAt" | "updatedAt" | "createdBy" | "updatedBy">>({
    code: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    bestContactTime: "Qualquer horário",
    propertyType: "Casa",
    address: "",
    neighborhood: "",
    referencePoint: "",
    locationUrl: "",
    occupancyStatus: "vazio",
    accessContactName: "",
    accessContactPhone: "",
    hasAccessDifficulty: false,
    waterConnected: true,
    powerConnected: true,
    hasPets: false,
    notes: "",
    visitDate: "",
    visitTime: "",
    responsibleProfessional: "",
    ownerWillAccompany: false,
    mediaAuthorization: true,
    whatsappConfirmed: true,
    captureDate: new Date().toISOString().split("T")[0],
    realtorName: "",
    captureSource: "Site Araújo Imóveis",
    status: "Aguardando agendamento"
  });

  // Carregar dados salvos do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("araujo_fichas_visita_tecnica");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFormsList(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Erro ao carregar fichas:", e);
    }
    setFormsList(INITIAL_DEMO_FORMS);
    localStorage.setItem("araujo_fichas_visita_tecnica", JSON.stringify(INITIAL_DEMO_FORMS));
  }, []);

  // Salvar no localStorage sempre que formsList mudar
  const persistForms = (newList: TechnicalVisitForm[]) => {
    setFormsList(newList);
    try {
      localStorage.setItem("araujo_fichas_visita_tecnica", JSON.stringify(newList));
    } catch (e) {
      console.error("Erro ao salvar fichas no localStorage:", e);
    }
  };

  // Gerar código automático do imóvel
  const generateNewCode = () => {
    const year = new Date().getFullYear();
    const count = formsList.length + 1;
    return `IMV-${year}-${String(count).padStart(3, "0")}`;
  };

  // Iniciar criação de nova ficha
  const handleCreateNew = () => {
    setEditingFormId(null);
    setFormData({
      code: generateNewCode(),
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      bestContactTime: "Qualquer horário",
      propertyType: "Casa",
      address: "",
      neighborhood: "",
      referencePoint: "",
      locationUrl: "",
      occupancyStatus: "vazio",
      accessContactName: "",
      accessContactPhone: "",
      hasAccessDifficulty: false,
      waterConnected: true,
      powerConnected: true,
      hasPets: false,
      notes: "",
      visitDate: new Date().toISOString().split("T")[0],
      visitTime: "10:00",
      responsibleProfessional: "",
      ownerWillAccompany: false,
      mediaAuthorization: true,
      whatsappConfirmed: true,
      captureDate: new Date().toISOString().split("T")[0],
      realtorName: "",
      captureSource: "Site Araújo Imóveis",
      status: "Aguardando agendamento"
    });
    setViewMode("form");
  };

  // Carregar ficha para edição
  const handleEdit = (form: TechnicalVisitForm) => {
    setEditingFormId(form.id);
    setFormData({
      code: form.code,
      ownerName: form.ownerName,
      ownerPhone: form.ownerPhone,
      ownerEmail: form.ownerEmail,
      bestContactTime: form.bestContactTime,
      propertyType: form.propertyType,
      address: form.address,
      neighborhood: form.neighborhood,
      referencePoint: form.referencePoint,
      locationUrl: form.locationUrl,
      occupancyStatus: form.occupancyStatus,
      accessContactName: form.accessContactName,
      accessContactPhone: form.accessContactPhone,
      hasAccessDifficulty: form.hasAccessDifficulty,
      waterConnected: form.waterConnected,
      powerConnected: form.powerConnected,
      hasPets: form.hasPets,
      notes: form.notes,
      visitDate: form.visitDate,
      visitTime: form.visitTime,
      responsibleProfessional: form.responsibleProfessional,
      ownerWillAccompany: form.ownerWillAccompany,
      mediaAuthorization: form.mediaAuthorization,
      whatsappConfirmed: form.whatsappConfirmed,
      captureDate: form.captureDate,
      realtorName: form.realtorName,
      captureSource: form.captureSource,
      status: form.status
    });
    setViewMode("form");
  };

  // Validações antes de salvar
  const validateForm = () => {
    if (!formData.ownerName.trim()) return "O Nome do Proprietário é obrigatório.";
    if (!formData.ownerPhone.trim()) return "O Telefone/WhatsApp do Proprietário é obrigatório.";
    if (!formData.propertyType) return "O Tipo do Imóvel é obrigatório.";
    if (!formData.address.trim()) return "O Endereço Completo do Imóvel é obrigatório.";
    if (!formData.neighborhood.trim()) return "O Bairro do Imóvel é obrigatório.";
    if (!formData.visitDate) return "A Data da Visita Técnica é obrigatória.";
    if (!formData.visitTime) return "O Horário da Visita é obrigatório.";
    if (!formData.responsibleProfessional.trim()) return "O Profissional Responsável é obrigatório.";
    if (!formData.realtorName.trim()) return "O Corretor Responsável é obrigatório.";
    if (!formData.status) return "O Status do Agendamento é obrigatório.";

    // Validação básica de telefone (mínimo 8 dígitos)
    const cleanPhone = formData.ownerPhone.replace(/\D/g, "");
    if (cleanPhone.length < 8) return "Informe um telefone/WhatsApp válido (ex: 33 99999-9999).";

    // Validação opcional de e-mail
    if (formData.ownerEmail.trim() && !formData.ownerEmail.includes("@")) {
      return "Informe um endereço de e-mail válido.";
    }

    return null;
  };

  // Salvar ficha no cadastro
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      setNotification({ type: "error", message: errorMsg });
      return;
    }

    const nowIso = new Date().toISOString();
    const currentUserName = formData.realtorName || "Equipe Araújo Imóveis";

    if (editingFormId) {
      // Atualizar ficha existente
      const updatedList = formsList.map((f) => {
        if (f.id === editingFormId) {
          return {
            ...f,
            ...formData,
            updatedAt: nowIso,
            updatedBy: currentUserName
          };
        }
        return f;
      });
      persistForms(updatedList);
      setNotification({ type: "success", message: `Ficha ${formData.code} atualizada com sucesso!` });
    } else {
      // Criar nova ficha
      const newForm: TechnicalVisitForm = {
        id: "f-" + Date.now(),
        ...formData,
        createdAt: nowIso,
        updatedAt: nowIso,
        createdBy: currentUserName,
        updatedBy: currentUserName
      };
      persistForms([newForm, ...formsList]);
      setEditingFormId(newForm.id);
      setNotification({ type: "success", message: `Ficha ${newForm.code} salva com sucesso no sistema!` });
    }
  };

  // Abrir tela de impressão preenchida
  const handlePrintFilled = () => {
    const errorMsg = validateForm();
    if (errorMsg) {
      setNotification({ type: "error", message: `Por favor, preencha os campos obrigatórios antes de imprimir: ${errorMsg}` });
      return;
    }
    setViewMode("print_filled");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Abrir tela de impressão em branco
  const handlePrintBlank = () => {
    setViewMode("print_blank");
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Excluir ficha
  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a Ficha ${code}?`)) {
      const filtered = formsList.filter((f) => f.id !== id);
      persistForms(filtered);
      setNotification({ type: "info", message: `Ficha ${code} removida com sucesso.` });
      if (editingFormId === id) {
        setViewMode("list");
      }
    }
  };

  // Filtragem de fichas na lista
  const filteredForms = formsList.filter((f) => {
    const matchSearch =
      f.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.realtorName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = statusFilter === "todos" || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 selection:bg-blue-600 selection:text-white">
      {/* Container Principal */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Banner de Cabeçalho do Módulo (No-Print) */}
        <div className="no-print bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span>Módulo Interno Araújo Imóveis • CRECI-MG J 08993</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Ficha 01: Agendamento de Visita Técnica
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Sistema oficial de captação e agendamento de vistoria técnica presencial. Crie, gerencie e imprima fichas em formato A4 preenchidas ou em branco para preenchimento manual em campo.
            </p>
          </div>

          {/* Botões de Ação Principais da Barra Superior */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {viewMode !== "list" && (
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all border border-slate-700 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar à Lista</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePrintBlank}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all border border-amber-500/30 active:scale-95"
              title="Imprimir Ficha 01 totalmente em branco para campo"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Imprimir em Branco</span>
            </button>

            {viewMode === "list" && (
              <button
                type="button"
                onClick={handleCreateNew}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Nova Ficha 01</span>
              </button>
            )}
          </div>
        </div>

        {/* Notificação Flutuante (No-Print) */}
        {notification && (
          <div
            className={`no-print p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-lg transition-all animate-in fade-in slide-in-from-top-2 ${
              notification.type === "success"
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                : notification.type === "error"
                ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                : "bg-blue-500/10 text-blue-300 border-blue-500/30"
            }`}
          >
            <div className="flex items-center gap-3">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 1: LISTA E GESTÃO DE FICHAS REGISTRADAS */}
        {/* ========================================================================= */}
        {viewMode === "list" && (
          <div className="no-print space-y-6">
            {/* Filtros e Pesquisa */}
            <div className="bg-slate-900/80 p-4 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por código, proprietário, endereço ou corretor..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto scrollbar-none">
                <Filter className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs text-slate-400 font-medium shrink-0">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="todos">Todos os Status</option>
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tabela de Fichas Registradas */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Fichas de Visita Técnica Salvas</span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded-full font-mono">
                    {filteredForms.length}
                  </span>
                </h2>
              </div>

              {filteredForms.length === 0 ? (
                <div className="p-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-800/80 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-300">Nenhuma Ficha 01 encontrada</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Não encontramos fichas registradas com os filtros aplicados. Tente limpar a busca ou crie um novo agendamento.
                  </p>
                  <button
                    type="button"
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Criar Nova Ficha 01</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Código / Status</th>
                        <th className="py-3.5 px-4">Proprietário & Contato</th>
                        <th className="py-3.5 px-4">Imóvel & Bairro</th>
                        <th className="py-3.5 px-4">Data & Horário Visita</th>
                        <th className="py-3.5 px-4">Corretor / Vistoriador</th>
                        <th className="py-3.5 px-4 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {filteredForms.map((form) => (
                        <tr key={form.id} className="hover:bg-slate-850/60 transition-colors">
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-mono font-bold text-white text-xs">{form.code}</div>
                            <span
                              className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                form.status === "Confirmado"
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                  : form.status === "Agendado"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                                  : form.status === "Realizado"
                                  ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                                  : form.status === "Reagendar"
                                  ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                                  : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              }`}
                            >
                              {form.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="font-bold text-white">{form.ownerName}</div>
                            <div className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-emerald-400" />
                              <span>{form.ownerPhone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 max-w-xs truncate">
                            <span className="text-blue-300 font-semibold">{form.propertyType}</span>
                            <div className="text-slate-400 text-xs truncate" title={form.address}>
                              📍 {form.address} ({form.neighborhood})
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-1 text-slate-200">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span>{form.visitDate ? new Date(form.visitDate + "T00:00:00").toLocaleDateString("pt-BR") : "--/--/----"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-xs mt-0.5">
                              <Clock className="w-3.5 h-3.5 text-amber-400" />
                              <span>{form.visitTime || "--:--"}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-xs">
                            <div className="text-slate-200 font-semibold">{form.realtorName || "Corretor N/D"}</div>
                            <div className="text-slate-400 text-[11px]">{form.responsibleProfessional || "Vistoriador N/D"}</div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => handleEdit(form)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-lg border border-slate-700 transition-colors"
                              title="Editar Ficha"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleEdit(form);
                                handlePrintFilled();
                              }}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg border border-slate-700 transition-colors"
                              title="Imprimir Ficha Preenchida"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(form.id, form.code)}
                              className="p-2 bg-slate-800 hover:bg-rose-900/50 text-rose-400 rounded-lg border border-slate-700 transition-colors"
                              title="Excluir Ficha"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 2: FORMULÁRIO INTERATIVO DE EDICÃO / CADASTRO DA FICHA 01 */}
        {/* ========================================================================= */}
        {viewMode === "form" && (
          <form onSubmit={handleSave} className="no-print space-y-6">
            {/* Barra de Ações Superior do Formulário */}
            <div className="bg-slate-900/90 p-4 sm:p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-blue-600/30 text-blue-300 px-2.5 py-0.5 rounded border border-blue-500/30">
                      {formData.code}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {editingFormId ? "Modo Edição" : "Nova Ficha 01"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Preenchimento da Visita Técnica
                  </h3>
                </div>
              </div>

              {/* Todos os 6 Botões Exigidos */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
                  title="Salvar Ficha no Sistema"
                >
                  <Save className="w-4 h-4" />
                  <span>1. Salvar Ficha</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintFilled}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
                  title="Gerar impressão da Ficha 01 Preenchida"
                >
                  <Printer className="w-4 h-4" />
                  <span>3. Imprimir Preenchida</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintBlank}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all border border-amber-500/30 active:scale-95"
                  title="Gerar impressão de Ficha 01 em Branco para papel"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>4. Imprimir em Branco</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Deseja cancelar as alterações não salvas?")) {
                      setViewMode("list");
                    }
                  }}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span>5. Cancelar</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>6. Voltar</span>
                </button>
              </div>
            </div>

            {/* SEÇÃO 1: DADOS DO PROPRIETÁRIO */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">1. Dados do Proprietário</h4>
                  <p className="text-xs text-slate-400">Informações pessoais e de contato direto com o proprietário do imóvel.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Nome Completo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    placeholder="Ex: Carlos Eduardo Silva"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Telefone / WhatsApp <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.ownerPhone}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      placeholder="(33) 99999-9999"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-emerald-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    E-mail do Proprietário
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.ownerEmail}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      placeholder="proprietario@email.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Melhor Horário para Contato
                  </label>
                  <select
                    value={formData.bestContactTime}
                    onChange={(e) => setFormData({ ...formData, bestContactTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Qualquer horário">Qualquer horário (Comercial)</option>
                    <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                    <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                    <option value="Noite (Após 18h)">Noite (Após 18h)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: DADOS INICIAIS DO IMÓVEL */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">2. Dados Iniciais do Imóvel</h4>
                  <p className="text-xs text-slate-400">Localização, caracterização física e condições de acesso ao imóvel.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Tipo do Imóvel <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {PROPERTY_TYPES_OPTIONS.map((tp) => (
                      <option key={tp} value={tp}>
                        {tp}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Endereço Completo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Rua, Número, Complemento"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bairro <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Ex: Centro, Esplanada, Limoeiro"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Ponto de Referência
                  </label>
                  <input
                    type="text"
                    value={formData.referencePoint}
                    onChange={(e) => setFormData({ ...formData, referencePoint: e.target.value })}
                    placeholder="Ex: Próximo à praça central ou padaria X"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Link da Localização (Google Maps / Waze)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.locationUrl}
                      onChange={(e) => setFormData({ ...formData, locationUrl: e.target.value })}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <MapPin className="w-4 h-4 text-blue-400 absolute right-3.5 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Ocupação Atual
                  </label>
                  <select
                    value={formData.occupancyStatus}
                    onChange={(e) => setFormData({ ...formData, occupancyStatus: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="vazio">Imóvel Vazio (Desocupado)</option>
                    <option value="ocupado_proprietario">Ocupado pelo Proprietário</option>
                    <option value="ocupado_inquilino">Ocupado por Inquilino</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Nome de Quem Dará Acesso
                  </label>
                  <input
                    type="text"
                    value={formData.accessContactName}
                    onChange={(e) => setFormData({ ...formData, accessContactName: e.target.value })}
                    placeholder="Nome do responsável pelas chaves"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Telefone de Quem Dará Acesso
                  </label>
                  <input
                    type="text"
                    value={formData.accessContactPhone}
                    onChange={(e) => setFormData({ ...formData, accessContactPhone: e.target.value })}
                    placeholder="(33) 99999-9999"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Toggles de Utilidades e Condição */}
                <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <label className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Droplets className="w-4 h-4 text-blue-400" /> Água Ligada
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.waterConnected}
                      onChange={(e) => setFormData({ ...formData, waterConnected: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" /> Energia Ligada
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.powerConnected}
                      onChange={(e) => setFormData({ ...formData, powerConnected: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                  </label>

                  <label className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Dog className="w-4 h-4 text-rose-400" /> Há Animais
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.hasPets}
                      onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked })}
                      className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                    />
                  </label>

                  <label className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-indigo-400" /> Dificuldade Acesso
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.hasAccessDifficulty}
                      onChange={(e) => setFormData({ ...formData, hasAccessDifficulty: e.target.checked })}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                  </label>
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Observações Importantes do Imóvel
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Instruções sobre chaves, portaria, código do alarme, horário permitido pelo condomínio, etc."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: AGENDAMENTO E RESPONSÁVEL TÉCNICO */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">3. Agendamento da Visita Técnica</h4>
                  <p className="text-xs text-slate-400">Data, horário e equipe profissional designada para a vistoria.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Data da Visita <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.visitDate}
                    onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Horário da Visita <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.visitTime}
                    onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Profissional Vistoriador <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.responsibleProfessional}
                    onChange={(e) => setFormData({ ...formData, responsibleProfessional: e.target.value })}
                    placeholder="Nome do técnico ou engenheiro vistoriador"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <label className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-blue-400" /> Proprietário Acompanhará?
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.ownerWillAccompany}
                      onChange={(e) => setFormData({ ...formData, ownerWillAccompany: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </label>

                  <label className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-emerald-400" /> Autoriza Fotos / Vídeos?
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.mediaAuthorization}
                      onChange={(e) => setFormData({ ...formData, mediaAuthorization: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </label>

                  <label className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-400" /> Confirmado no WhatsApp?
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.whatsappConfirmed}
                      onChange={(e) => setFormData({ ...formData, whatsappConfirmed: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* SEÇÃO 4: CONTROLE INTERNO DA IMOBILIÁRIA */}
            <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">4. Controle Interno da Captação</h4>
                  <p className="text-xs text-slate-400">Dados do corretor de imóveis, origem da demanda e status do fluxo.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Código do Imóvel (Auto)
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.code}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-blue-300 font-mono font-bold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Data da Captação
                  </label>
                  <input
                    type="date"
                    value={formData.captureDate}
                    onChange={(e) => setFormData({ ...formData, captureDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Corretor Responsável <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.realtorName}
                    onChange={(e) => setFormData({ ...formData, realtorName: e.target.value })}
                    placeholder="Nome do corretor Araújo Imóveis"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Origem da Captação
                  </label>
                  <select
                    value={formData.captureSource}
                    onChange={(e) => setFormData({ ...formData, captureSource: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {CAPTURE_SOURCES.map((src) => (
                      <option key={src} value={src}>
                        {src}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 lg:col-span-4">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Status do Agendamento <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm font-bold text-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Barra de Botões Inferior do Formulário */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-end gap-3 shadow-lg">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/25 active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Ficha 01</span>
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* VISTA 3: IMPRESSÃO A4 PREENCHIDA (Aparece na Impressão e na Tela de Pré-visualização) */}
        {/* ========================================================================= */}
        {viewMode === "print_filled" && (
          <div className="space-y-4">
            {/* Barra de Controles da Pré-visualização (No-Print) */}
            <div className="no-print bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Pré-visualização da Ficha 01 Preenchida (Pronta para PDF / Papel A4)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Imprimir Agora
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("form")}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Voltar ao Formulário
                </button>
              </div>
            </div>

            {/* DOCUMENTO IMPRESSO A4 PREENCHIDO */}
            <div className="bg-white text-black p-8 sm:p-10 rounded-lg shadow-2xl max-w-[210mm] mx-auto text-sm border border-slate-300 print:shadow-none print:border-none print:p-0">
              {/* Header do Documento de Impressão */}
              <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
                <div>
                  <div className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    ARAÚJO IMÓVEIS
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    CRECI-MG J 08993 • Credibilidade começa no nome
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Caratinga - MG | Contato: (33) 99999-9999
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-slate-100 border border-slate-300 px-3 py-1 rounded text-xs font-mono font-bold text-slate-800">
                    CÓDIGO: {formData.code}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Emissão: {new Date().toLocaleDateString("pt-BR")}
                  </div>
                </div>
              </div>

              {/* Título Principal da Ficha */}
              <div className="bg-slate-100 border border-slate-300 p-2.5 text-center font-black uppercase text-base text-slate-900 mb-6 tracking-wide rounded">
                FICHA 01: AGENDAMENTO DE VISITA TÉCNICA
              </div>

              {/* Bloco 1: Dados do Proprietário */}
              <div className="mb-5">
                <div className="font-bold text-xs uppercase bg-slate-200 px-2 py-1 text-slate-800 mb-2 border-l-4 border-slate-900">
                  1. Dados do Proprietário
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="font-bold">Nome Completo:</span> {formData.ownerName || "________________________"}
                  </div>
                  <div>
                    <span className="font-bold">Telefone/WhatsApp:</span> {formData.ownerPhone || "________________________"}
                  </div>
                  <div>
                    <span className="font-bold">E-mail:</span> {formData.ownerEmail || "Nenhum informado"}
                  </div>
                  <div>
                    <span className="font-bold">Melhor Horário:</span> {formData.bestContactTime}
                  </div>
                </div>
              </div>

              {/* Bloco 2: Dados Iniciais do Imóvel */}
              <div className="mb-5">
                <div className="font-bold text-xs uppercase bg-slate-200 px-2 py-1 text-slate-800 mb-2 border-l-4 border-slate-900">
                  2. Dados Iniciais do Imóvel
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="font-bold">Tipo do Imóvel:</span> {formData.propertyType}
                  </div>
                  <div>
                    <span className="font-bold">Bairro:</span> {formData.neighborhood}
                  </div>
                  <div className="col-span-2">
                    <span className="font-bold">Endereço Completo:</span> {formData.address}
                  </div>
                  {formData.referencePoint && (
                    <div className="col-span-2">
                      <span className="font-bold">Ponto de Referência:</span> {formData.referencePoint}
                    </div>
                  )}
                  {formData.locationUrl && (
                    <div className="col-span-2 text-[11px] truncate">
                      <span className="font-bold">Link Localização:</span> {formData.locationUrl}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">Situação Ocupação:</span>{" "}
                    {formData.occupancyStatus === "vazio"
                      ? "Imóvel Vazio"
                      : formData.occupancyStatus === "ocupado_proprietario"
                      ? "Ocupado pelo Proprietário"
                      : "Ocupado por Inquilino"}
                  </div>
                  <div>
                    <span className="font-bold">Dificuldade Acesso:</span> {formData.hasAccessDifficulty ? "Sim" : "Não"}
                  </div>
                  <div>
                    <span className="font-bold">Quem Dará Acesso:</span> {formData.accessContactName || "Proprietário"}
                  </div>
                  <div>
                    <span className="font-bold">Tel. Acesso:</span> {formData.accessContactPhone || formData.ownerPhone}
                  </div>

                  <div className="col-span-2 grid grid-cols-3 gap-2 bg-slate-50 p-2 border border-slate-200 rounded mt-1">
                    <div>
                      <span className="font-bold">Água Ligada:</span> {formData.waterConnected ? "[X] Sim  [ ] Não" : "[ ] Sim  [X] Não"}
                    </div>
                    <div>
                      <span className="font-bold">Energia Ligada:</span> {formData.powerConnected ? "[X] Sim  [ ] Não" : "[ ] Sim  [X] Não"}
                    </div>
                    <div>
                      <span className="font-bold">Animais no Imóvel:</span> {formData.hasPets ? "[X] Sim  [ ] Não" : "[ ] Sim  [X] Não"}
                    </div>
                  </div>

                  {formData.notes && (
                    <div className="col-span-2 bg-amber-50/60 p-2 border border-amber-200 rounded mt-1 text-xs">
                      <span className="font-bold">Observações Importantes:</span> {formData.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Bloco 3: Agendamento */}
              <div className="mb-5">
                <div className="font-bold text-xs uppercase bg-slate-200 px-2 py-1 text-slate-800 mb-2 border-l-4 border-slate-900">
                  3. Agendamento da Visita Técnica
                </div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="font-bold">Data da Visita:</span>{" "}
                    {formData.visitDate ? new Date(formData.visitDate + "T00:00:00").toLocaleDateString("pt-BR") : "____/____/________"}
                  </div>
                  <div>
                    <span className="font-bold">Horário:</span> {formData.visitTime || "____:____"}
                  </div>
                  <div>
                    <span className="font-bold">Profissional Vistoriador:</span> {formData.responsibleProfessional || "________________________"}
                  </div>
                  <div>
                    <span className="font-bold">Proprietário Acompanhará:</span> {formData.ownerWillAccompany ? "Sim" : "Não"}
                  </div>
                  <div>
                    <span className="font-bold">Autoriza Fotos/Vídeos:</span> {formData.mediaAuthorization ? "Sim" : "Não"}
                  </div>
                  <div>
                    <span className="font-bold">Confirmado WhatsApp:</span> {formData.whatsappConfirmed ? "Sim" : "Não"}
                  </div>
                </div>
              </div>

              {/* Bloco 4: Controle Interno */}
              <div className="mb-6">
                <div className="font-bold text-xs uppercase bg-slate-200 px-2 py-1 text-slate-800 mb-2 border-l-4 border-slate-900">
                  4. Controle Interno da Imobiliária
                </div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <span className="font-bold">Data da Captação:</span>{" "}
                    {formData.captureDate ? new Date(formData.captureDate + "T00:00:00").toLocaleDateString("pt-BR") : "____/____/________"}
                  </div>
                  <div>
                    <span className="font-bold">Corretor Responsável:</span> {formData.realtorName || "________________________"}
                  </div>
                  <div>
                    <span className="font-bold">Origem Captação:</span> {formData.captureSource}
                  </div>
                  <div className="col-span-3 font-bold text-xs">
                    Status Atual: <span className="underline uppercase">{formData.status}</span>
                  </div>
                </div>
              </div>

              {/* Seção de Assinaturas */}
              <div className="mt-12 pt-6 border-t border-slate-400 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="border-b border-slate-900 mb-1 pb-1">
                    {formData.realtorName || "Responsável Araújo Imóveis"}
                  </div>
                  <span className="text-[11px] text-slate-600 font-semibold">Assinatura do Responsável / Vistoriador</span>
                </div>
                <div>
                  <div className="border-b border-slate-900 mb-1 pb-1">
                    {formData.ownerName || "Proprietário(a)"}
                  </div>
                  <span className="text-[11px] text-slate-600 font-semibold">Assinatura do Proprietário</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VISTA 4: IMPRESSÃO A4 TOTALMENTE EM BRANCO PARA PREENCHIMENTO MANUAL */}
        {/* ========================================================================= */}
        {viewMode === "print_blank" && (
          <div className="space-y-4">
            {/* Barra de Controles da Pré-visualização (No-Print) */}
            <div className="no-print bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-400" /> Pré-visualização da Ficha 01 em Branco (Formulário Físico para Campo)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Imprimir Ficha em Branco
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Voltar à Lista
                </button>
              </div>
            </div>

            {/* DOCUMENTO IMPRESSO A4 EM BRANCO */}
            <div className="bg-white text-black p-8 sm:p-10 rounded-lg shadow-2xl max-w-[210mm] mx-auto text-xs border border-slate-300 print:shadow-none print:border-none print:p-0">
              {/* Header do Documento em Branco */}
              <div className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <div className="text-lg font-black text-slate-900 uppercase tracking-tight">
                    ARAÚJO IMÓVEIS
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">
                    CRECI-MG J 08993 • Credibilidade começa no nome
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Caratinga - MG | Contato: (33) 99999-9999
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-slate-100 border border-slate-300 px-2.5 py-1 rounded text-xs font-mono font-bold text-slate-800">
                    CÓDIGO: IMV-2026-____
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Emissão: ____/____/2026
                  </div>
                </div>
              </div>

              {/* Título Principal */}
              <div className="bg-slate-100 border border-slate-300 p-2 text-center font-black uppercase text-sm text-slate-900 mb-4 tracking-wide rounded">
                FICHA 01: AGENDAMENTO DE VISITA TÉCNICA (FORMULÁRIO EM BRANCO)
              </div>

              {/* Seção 1: Proprietário */}
              <div className="mb-4">
                <div className="font-bold text-[11px] uppercase bg-slate-200 px-2 py-0.5 text-slate-800 mb-2 border-l-4 border-slate-900">
                  1. Dados do Proprietário
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="font-bold">Nome Completo:</span>
                    <span className="flex-1 border-b border-dotted border-slate-400"></span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2">
                      <span className="font-bold">Telefone/WhatsApp:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">E-mail:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-bold">Melhor Horário Contato:</span>
                    <span>[ &nbsp; ] Manhã</span>
                    <span>[ &nbsp; ] Tarde</span>
                    <span>[ &nbsp; ] Noite</span>
                    <span>[ &nbsp; ] Qualquer Horário</span>
                  </div>
                </div>
              </div>

              {/* Seção 2: Imóvel */}
              <div className="mb-4">
                <div className="font-bold text-[11px] uppercase bg-slate-200 px-2 py-0.5 text-slate-800 mb-2 border-l-4 border-slate-900">
                  2. Dados Iniciais do Imóvel
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex gap-2 col-span-2">
                      <span className="font-bold">Tipo do Imóvel:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Bairro:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">Endereço Completo:</span>
                    <span className="flex-1 border-b border-dotted border-slate-400"></span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">Ponto de Referência:</span>
                    <span className="flex-1 border-b border-dotted border-slate-400"></span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">Link da Localização:</span>
                    <span className="flex-1 border-b border-dotted border-slate-400"></span>
                  </div>
                  <div className="flex gap-4 pt-1">
                    <span className="font-bold">Imóvel:</span>
                    <span>[ &nbsp; ] Vazio</span>
                    <span>[ &nbsp; ] Ocupado pelo Proprietário</span>
                    <span>[ &nbsp; ] Ocupado por Inquilino</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2">
                      <span className="font-bold">Nome de quem dará acesso:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Telefone:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                  </div>

                  {/* Checklist Caixas de Marcar */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-50 p-2 border border-slate-300 rounded mt-1">
                    <div><span className="font-bold">Dificuldade Acesso:</span><br />[ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</div>
                    <div><span className="font-bold">Água Ligada:</span><br />[ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</div>
                    <div><span className="font-bold">Energia Ligada:</span><br />[ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</div>
                    <div><span className="font-bold">Animais no Imóvel:</span><br />[ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</div>
                  </div>

                  <div className="pt-1">
                    <span className="font-bold">Observações Importantes:</span>
                    <div className="border border-slate-300 rounded p-2 h-16 mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Seção 3: Agendamento */}
              <div className="mb-4">
                <div className="font-bold text-[11px] uppercase bg-slate-200 px-2 py-0.5 text-slate-800 mb-2 border-l-4 border-slate-900">
                  3. Agendamento da Visita Técnica
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex gap-2">
                      <span className="font-bold">Data Visita:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400">____/____/________</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Horário:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400">____:____</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Profissional Responsável:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                  </div>
                  <div className="flex justify-between gap-4 pt-1">
                    <span><span className="font-bold">Proprietário Acompanhará?</span> [ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</span>
                    <span><span className="font-bold">Autoriza Fotos/Vídeos?</span> [ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</span>
                    <span><span className="font-bold">Confirmado WhatsApp?</span> [ &nbsp; ] Sim &nbsp;&nbsp; [ &nbsp; ] Não</span>
                  </div>
                </div>
              </div>

              {/* Seção 4: Controle Interno */}
              <div className="mb-6">
                <div className="font-bold text-[11px] uppercase bg-slate-200 px-2 py-0.5 text-slate-800 mb-2 border-l-4 border-slate-900">
                  4. Controle Interno da Imobiliária
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex gap-2">
                      <span className="font-bold">Data Captação:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400">____/____/________</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Corretor Responsável:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-bold">Origem Captação:</span>
                      <span className="flex-1 border-b border-dotted border-slate-400"></span>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-1">
                    <span className="font-bold">Status:</span>
                    <span>[ &nbsp; ] Aguardando agendamento</span>
                    <span>[ &nbsp; ] Agendado</span>
                    <span>[ &nbsp; ] Confirmado</span>
                    <span>[ &nbsp; ] Realizado</span>
                    <span>[ &nbsp; ] Reagendar</span>
                  </div>
                </div>
              </div>

              {/* Seção de Assinaturas */}
              <div className="mt-14 pt-6 border-t border-slate-400 grid grid-cols-2 gap-8 text-center text-xs">
                <div>
                  <div className="border-b border-slate-900 mb-1 pb-1 font-bold text-slate-400">
                    ___________________________________________
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold">Assinatura do Responsável / Vistoriador</span>
                </div>
                <div>
                  <div className="border-b border-slate-900 mb-1 pb-1 font-bold text-slate-400">
                    ___________________________________________
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold">Assinatura do Proprietário</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
