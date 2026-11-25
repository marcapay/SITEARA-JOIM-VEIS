export interface Property {
  id: string;
  code: string;
  title: string;
  type: 'Casa' | 'Apartamento' | 'Cobertura' | 'Terreno' | 'Comercial';
  transaction: 'comprar' | 'alugar' | 'lancamento';
  price: number;
  condoFee?: number;
  iptu?: number;
  city: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  suites: number;
  parkingSpots: number;
  area: number; // m²
  description: string;
  features: string[];
  images: string[];
  featured?: boolean;
  launch?: boolean;
  fichaId?: string;
  status: 'Disponível' | 'Reservado' | 'Vendido';
}

const IMAGINARY_CODES = new Set([
  "ar-101",
  "ar-102",
  "ar-103",
  "ar-104",
  "ar-105",
  "ar-106",
  "ar-107",
  "ar-108",
]);

export function isImaginaryProperty(p?: Partial<Property> | null): boolean {
  if (!p) return true;
  const cleanCode = (p.code || "").toLowerCase().replace(/^#+/, "").trim();
  const cleanId = (p.id || "").toLowerCase().trim();
  if (IMAGINARY_CODES.has(cleanCode)) return true;
  for (const code of IMAGINARY_CODES) {
    if (cleanId.endsWith(`-${code}`) || cleanId === code) return true;
  }
  return false;
}

export const PROPERTIES_DATA: Property[] = [];

export const PROPERTY_TYPES = ["Todos", "Casa", "Apartamento", "Cobertura", "Terreno", "Comercial"];
export const CITIES = ["Todas", "Caratinga", "Ipatinga", "Manhuaçu"];
export const NEIGHBORHOODS = ["Todos", "Centro", "Limoeiro", "Das Graças", "Santa Zita", "Esplanada", "Belvedere"];

export const WHATSAPP_PHONE = "553330400919";
export const WHATSAPP_DISPLAY_PHONE = "+55 33 3040-0919";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
}

export function getWhatsAppLink(message?: string): string {
  const defaultText = "Olá, Araújo Imóveis! Gostaria de falar com um corretor.";
  const encoded = encodeURIComponent(message || defaultText);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function getPropertyWhatsAppLink(property: Property): string {
  const text = `Olá Araújo Imóveis! Tenho interesse no imóvel código #${property.code}: ${property.title} (${property.neighborhood}, ${property.city}) - ${formatCurrency(property.price)}. Gostaria de agendar uma visita!`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export const CRM_BASE_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crmaraujoimoveis.vercel.app";
export const CLOUD_STORE_URL = "https://api.restful-api.dev/objects/ff808181a09d98f701a1f4330be964d4";

/**
 * Busca exclusivamente os imóveis reais cadastrados e publicados via CRM em tempo real.
 */
export async function getLiveProperties(): Promise<Property[]> {
  let liveCrmProps: Property[] = [];

  // 1. Tenta carregar do endpoint oficial do CRM
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
  } catch (err) {
    console.warn("CRM /api/properties indisponível no momento, tentando fallback de nuvem:", err);
  }

  // 2. Se o CRM não respondeu, consulta o repositório de nuvem compartilhado
  if (liveCrmProps.length === 0) {
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
    } catch (cloudErr) {
      console.warn("Fallback de nuvem indisponível:", cloudErr);
    }
  }

  return liveCrmProps.filter((p) => !isImaginaryProperty(p));
}

/**
 * Busca um imóvel específico pelo ID ou Código (#VT-0001, VT-0001, etc.) vindo do CRM
 */
export async function getPropertyByIdOrCode(idOrCode: string): Promise<Property | undefined> {
  const all = await getLiveProperties();
  const search = (idOrCode || '').toLowerCase().replace(/^#+/, '').trim();
  return all.find(
    p => (p.id || '').toLowerCase() === search || 
         (p.code || '').toLowerCase().replace(/^#+/, '') === search ||
         (p.id || '').toLowerCase() === `imovel-${search}`
  );
}
