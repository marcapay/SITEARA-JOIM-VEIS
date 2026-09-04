export interface Property {
  id: string;
  code: string; // Ex: #AR-101
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
  status: 'Disponível' | 'Reservado' | 'Vendido';
}

export const PROPERTIES_DATA: Property[] = [
  {
    id: "casa-centro-caratinga-ar101",
    code: "AR-101",
    title: "Casa de Alto Padrão no Centro de Caratinga",
    type: "Casa",
    transaction: "comprar",
    price: 850000,
    condoFee: 0,
    iptu: 1200,
    city: "Caratinga",
    neighborhood: "Centro",
    address: "Rua Raúl Soares, Centro - Caratinga/MG",
    bedrooms: 4,
    bathrooms: 4,
    suites: 2,
    parkingSpots: 3,
    area: 280,
    description: "Excelente residência de alto padrão no coração de Caratinga. Possui salas amplas para três ambientes, acabamento refinado em porcelanato e madeira nobre, cozinha planejada com ilha central, espaço gourmet com churrasqueira e piscina privativa com hidromassagem. Suíte máster com closet e varanda.",
    features: [
      "Piscina Privativa",
      "Espaço Gourmet com Churrasqueira",
      "Cozinha Planejada",
      "Suíte Máster com Closet",
      "Portão Eletrônico",
      "Sistema de Alarme e Câmeras",
      "Ar Condicionado Instalado",
      "Energia Solar Fotovoltaica"
    ],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    status: "Disponível"
  },
  {
    id: "apto-limoeiro-caratinga-ar102",
    code: "AR-102",
    title: "Apartamento Moderno com Varanda Gourmet",
    type: "Apartamento",
    transaction: "alugar",
    price: 2200,
    condoFee: 320,
    iptu: 75,
    city: "Caratinga",
    neighborhood: "Limoeiro",
    address: "Avenida Professor Armando Alves da Silva, Limoeiro - Caratinga/MG",
    bedrooms: 3,
    bathrooms: 2,
    suites: 1,
    parkingSpots: 2,
    area: 95,
    description: "Apartamento seminovo e muito ensolarado no Bairro Limoeiro. Prédio com elevador e água individualizada. Conta com sala para 2 ambientes integrada à varanda gourmet, móveis planejados na cozinha e banheiros, ar-condicionado na suíte principal.",
    features: [
      "Varanda Gourmet",
      "Elevador Social",
      "Móveis Planejados",
      "Garagem Coberta",
      "Água e Gás Individualizados",
      "Portaria Eletrônica 24h"
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    status: "Disponível"
  },
  {
    id: "residencial-horizonte-lancamento-ar103",
    code: "AR-103",
    title: "Residencial Horizonte - Lançamento Exclusivo",
    type: "Apartamento",
    transaction: "lancamento",
    price: 390000,
    condoFee: 200,
    iptu: 0,
    city: "Caratinga",
    neighborhood: "Das Graças",
    address: "Rua Coronel Pedro Martins, Bairro Das Graças - Caratinga/MG",
    bedrooms: 2,
    bathrooms: 2,
    suites: 1,
    parkingSpots: 1,
    area: 72,
    description: "O mais novo empreendimento imobiliário de Caratinga! O Residencial Horizonte combina arquitetura contemporânea, localização estratégica próximo a escolas e supermercados, e condições facilitadas de pagamento na planta durante a obra.",
    features: [
      "Lançamento na Planta",
      "Entrada Facilitada em até 36x",
      "Academia Equipada no Condomínio",
      "Espaço Pet Care",
      "Salão de Festas com Churrasqueira",
      "Playground Infantil",
      "Pré-disposição para Ar-Split"
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    launch: true,
    status: "Disponível"
  },
  {
    id: "cobertura-santa-zita-ar104",
    code: "AR-104",
    title: "Cobertura Duplex Panorama com Vista Panorâmica",
    type: "Cobertura",
    transaction: "comprar",
    price: 1150000,
    condoFee: 550,
    iptu: 1800,
    city: "Caratinga",
    neighborhood: "Santa Zita",
    address: "Rua Princesa Isabel, Santa Zita - Caratinga/MG",
    bedrooms: 4,
    bathrooms: 4,
    suites: 3,
    parkingSpots: 3,
    area: 230,
    description: "Fantástica cobertura duplex com vista privilegiada de toda a cidade de Caratinga. Pavimento inferior com 3 quartos, sala ampla e varanda. Pavimento superior com área social completa, churrasqueira, deck de madeira e jacuzzi privativa aquecida.",
    features: [
      "Cobertura Duplex Exclusiva",
      "Jacuzzi Privativa no Terraço",
      "Deck de Madeira Nobre",
      "Espaço Gourmet com Ilha",
      "Vista Panorâmica da Cidade",
      "3 Vagas Livres de Garagem",
      "Elevador que atende os 2 andares"
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    status: "Disponível"
  },
  {
    id: "casa-esplanada-caratinga-ar105",
    code: "AR-105",
    title: "Casa Aconchegante com Quintal Amplo",
    type: "Casa",
    transaction: "alugar",
    price: 1800,
    condoFee: 0,
    iptu: 60,
    city: "Caratinga",
    neighborhood: "Esplanada",
    address: "Rua Antônio Cimini, Esplanada - Caratinga/MG",
    bedrooms: 3,
    bathrooms: 2,
    suites: 1,
    parkingSpots: 2,
    area: 160,
    description: "Excelente opção residencial no Bairro Esplanada. Casa térrea com jardim frontal, quintal privativo gramado ideal para pets e crianças, sala aconchegante, quartos bem ventilados e garagem coberta.",
    features: [
      "Quintal Espaçoso com Árvores Frutíferas",
      "Pet Friendly (Aceita Animais)",
      "Garagem Coberta para 2 Carros",
      "Lavanderia Separada",
      "Bairro Tranquilo e Estritamente Residencial"
    ],
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: false,
    status: "Disponível"
  },
  {
    id: "loja-comercial-centro-ar106",
    code: "AR-106",
    title: "Ponto Comercial de Esquina na Avenida Principal",
    type: "Comercial",
    transaction: "alugar",
    price: 4500,
    condoFee: 0,
    iptu: 250,
    city: "Caratinga",
    neighborhood: "Centro",
    address: "Avenida Olegário Maciel, Centro - Caratinga/MG",
    bedrooms: 0,
    bathrooms: 2,
    suites: 0,
    parkingSpots: 2,
    area: 140,
    description: "Oportunidade única para o seu negócio! Loja comercial de esquina no Ponto Nobre do Centro de Caratinga. Grande fluxo de pedestres e veículos, vitrine ampla em blindex, pé direito duplo e sobreloja para escritório/estoque.",
    features: [
      "Ponto Nobre de Esquina",
      "Vitrine Ampla em Blindex",
      "Pé Direito Duplo de 5,5m",
      "Mezanino para Escritório",
      "Acessibilidade PCD",
      "Sistema Elétrico Trifásico"
    ],
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    status: "Disponível"
  },
  {
    id: "lote-belvedere-caratinga-ar107",
    code: "AR-107",
    title: "Lote Residencial Topografia Plana",
    type: "Terreno",
    transaction: "comprar",
    price: 195000,
    condoFee: 150,
    iptu: 450,
    city: "Caratinga",
    neighborhood: "Belvedere",
    address: "Alameda das Gameleiras, Belvedere - Caratinga/MG",
    bedrooms: 0,
    bathrooms: 0,
    suites: 0,
    parkingSpots: 0,
    area: 360,
    description: "Excelente terreno em aclive suave com 360m² (12x30), localizado em rua asfaltada e com infraestrutura completa de água, luz e esgoto. Pronto para construir a casa dos seus sonhos com linda vista panorâmica.",
    features: [
      "Terreno 360m² Pronto para Construir",
      "Rua Asfaltada e Iluminada",
      "Escriturado e Registrado em Cartório",
      "Vista Definitiva da Serra"
    ],
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: false,
    status: "Disponível"
  },
  {
    id: "apto-centro-venda-ar108",
    code: "AR-108",
    title: "Apartamento 3 Quartos com Suíte e Garagem Dupla",
    type: "Apartamento",
    transaction: "comprar",
    price: 520000,
    condoFee: 380,
    iptu: 900,
    city: "Caratinga",
    neighborhood: "Centro",
    address: "Rua Marechal Deodoro, Centro - Caratinga/MG",
    bedrooms: 3,
    bathrooms: 2,
    suites: 1,
    parkingSpots: 2,
    area: 110,
    description: "Lindo apartamento reformado no Centro de Caratinga. Possui cômodos amplos e arejados, sala em 'L' para dois ambientes com sanca de gesso e iluminação em LED, suíte confortável e 2 vagas livres paralelas de garagem.",
    features: [
      "Localização Central Privilegiada",
      "Iluminação em LED e Sanca de Gesso",
      "Armários Embutidos na Cozinha e Banheiros",
      "2 Vagas Paralelas Cobertas",
      "Condomínio Familiar com Câmeras"
    ],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop"
    ],
    featured: true,
    status: "Disponível"
  }
];

export const PROPERTY_TYPES = ["Todos", "Casa", "Apartamento", "Cobertura", "Terreno", "Comercial"];
export const CITIES = ["Todas", "Caratinga", "Ipatinga", "Manhuaçu"];
export const NEIGHBORHOODS = ["Todos", "Centro", "Limoeiro", "Das Graças", "Santa Zita", "Esplanada", "Belvedere"];

export const WHATSAPP_PHONE = "5533999999999";
export const WHATSAPP_DISPLAY_PHONE = "(33) 99999-9999";

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
