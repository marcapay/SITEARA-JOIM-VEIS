"use client";

import { useEffect, useState } from "react";
import { Property, CRM_BASE_URL, CLOUD_STORE_URL, isImaginaryProperty } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { Building2 } from "lucide-react";

interface FeaturedPropertiesGridProps {
  initialProperties: Property[];
}

export function FeaturedPropertiesGrid({ initialProperties }: FeaturedPropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(
    (initialProperties || []).filter((p) => !isImaginaryProperty(p))
  );

  useEffect(() => {
    let isMounted = true;

    async function refreshFromCrm() {
      try {
        let liveCrmProps: Property[] = [];
        
        // 1. Tenta carregar do endpoint do CRM
        try {
          const res = await fetch(`${CRM_BASE_URL}/api/properties`, {
            method: "GET",
            cache: "no-store",
          });
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data)) {
              liveCrmProps = data;
            }
          }
        } catch {}

        // 2. Se o CRM não respondeu, consulta o repositório de nuvem compartilhado
        if (liveCrmProps.length === 0 && CLOUD_STORE_URL) {
          try {
            const cloudRes = await fetch(CLOUD_STORE_URL, {
              method: "GET",
              cache: "no-store",
            });
            if (cloudRes.ok) {
              const cloudJson = await cloudRes.json();
              if (cloudJson?.data?.list && Array.isArray(cloudJson.data.list)) {
                liveCrmProps = cloudJson.data.list;
              }
            }
          } catch {}
        }

        if (isMounted) {
          const realFeatured = liveCrmProps
            .filter((p) => !isImaginaryProperty(p) && p.featured !== false);
          setProperties(realFeatured);
        }
      } catch (e) {
        console.warn("Client live properties refresh error:", e);
      }
    }

    refreshFromCrm();

    return () => {
      isMounted = false;
    };
  }, [initialProperties]);

  if (properties.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3 max-w-lg mx-auto my-4 shadow-sm">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
          <Building2 className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Nenhum imóvel publicado no momento</h3>
        <p className="text-slate-500 text-sm">
          Os imóveis aprovados e publicados pela Araújo Imóveis aparecerão automaticamente aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id || property.code} property={property} />
      ))}
    </div>
  );
}
