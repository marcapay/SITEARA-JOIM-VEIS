"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getCrmRedirectUrl } from "@/data/crmUsers";

function AreaDoClienteContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") || searchParams.get("portal") || "";
  const identifierParam = searchParams.get("identifier") || searchParams.get("email") || "";

  useEffect(() => {
    const activeRole = roleParam === "inquilino" || roleParam === "locatario" ? "locatario" : "locador";
    const targetUrl = getCrmRedirectUrl(identifierParam, activeRole);
    window.location.href = targetUrl;
  }, [roleParam, identifierParam]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center space-y-4 max-w-md w-full shadow-2xl">
        <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-lg font-bold text-white">Redirecionando para o CRM Araújo Imóveis...</h2>
        <p className="text-xs text-slate-400">
          Você está sendo direcionado diretamente para a sua página no CRM.
        </p>
      </div>
    </div>
  );
}

export default function AreaDoClientePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Acessando o CRM...</p>
        </div>
      </div>
    }>
      <AreaDoClienteContent />
    </Suspense>
  );
}
