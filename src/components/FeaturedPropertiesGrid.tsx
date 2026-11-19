"use client";

import { useEffect, useState } from "react";
import { Property, CRM_BASE_URL, CLOUD_STORE_URL } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";

interface FeaturedPropertiesGridProps {
  initialProperties: Property[];
}

export function FeaturedPropertiesGrid({ initialProperties }: FeaturedPropertiesGridProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

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
            if (Array.isArray(data) && data.length > 0) {
              liveCrmProps = data;
            }
          }
        } catch (crmErr) {}

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
          } catch (cloudErr) {}
        }

        if (isMounted && liveCrmProps.length > 0) {
          const liveCodes = new Set(liveCrmProps.map(p => (p.code || '').toLowerCase().replace(/^#+/, '')));
          const liveIds = new Set(liveCrmProps.map(p => (p.id || '').toLowerCase()));
          
          const staticRemain = initialProperties.filter(
            p => !liveCodes.has((p.code || '').toLowerCase().replace(/^#+/, '')) && !liveIds.has((p.id || '').toLowerCase())
          );

          const featuredLive = liveCrmProps.filter(p => p.featured !== false);
          setProperties([...featuredLive, ...staticRemain]);
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id || property.code} property={property} />
      ))}
    </div>
  );
}
