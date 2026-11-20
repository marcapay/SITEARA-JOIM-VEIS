"use client";

import { useState, useRef } from "react";
import { PlusCircle, ShieldCheck, CheckCircle2, Send, MessageCircle, ImagePlus, X } from "lucide-react";

interface UploadedPreview {
  id: string;
  name: string;
  dataUrl: string;
}

export default function AnunciarPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("Casa");
  const [transaction, setTransaction] = useState("Venda");
  const [neighborhood, setNeighborhood] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState<UploadedPreview[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImages((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              name: file.name,
              dataUrl: reader.result as string,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Limpar campos após o envio
    setName("");
    setPhone("");
    setPropertyType("Casa");
    setTransaction("Venda");
    setNeighborhood("");
    setExpectedPrice("");
    setDetails("");
    setImages([]);
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

        {isSubmitted && (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-sm sm:text-base font-bold">
              Enviado com sucesso! Aguarde o contato para análise.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome Completo</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (isSubmitted) setIsSubmitted(false);
                }}
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
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (isSubmitted) setIsSubmitted(false);
                }}
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

          {/* Espaço para Adicionar Imagens do Imóvel */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Fotos do Imóvel (Opcional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-blue-50/40"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <ImagePlus className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">
                    Clique aqui para adicionar imagens do imóvel
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Você pode selecionar várias fotos (JPG, PNG, WEBP)
                  </p>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                      title="Remover imagem"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 text-base transition-all shadow-md active:scale-98 min-h-[52px]"
          >
            <Send className="w-5 h-5" />
            <span>Enviar para análise imobiliária</span>
          </button>
        </form>
      </div>
    </div>
  );
}
