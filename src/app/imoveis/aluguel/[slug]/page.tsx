import { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';

type Props = {
  params: Promise<{ slug: string }>;
};

// Mock function to fetch property data
async function getProperty() {
  return {
    id: 'ai-001',
    title: 'Casa com 3 quartos para alugar no Centro de Caratinga',
    description: 'Casa com 3 quartos, garagem e área externa para alugar no Centro de Caratinga. Consulte valores, disponibilidade e agende uma visita.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
    type: 'Casa',
    status: 'Disponível',
    city: 'Caratinga',
    neighborhood: 'Centro'
  };
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const property = await getProperty();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = `${siteUrl}/imoveis/aluguel/${resolvedParams.slug}`;

  return {
    title: property.title,
    description: property.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: property.title,
      description: property.description,
      url,
      type: 'article',
      images: [
        {
          url: property.image,
          width: 800,
          height: 600,
          alt: `Fachada de ${property.type.toLowerCase()} no ${property.neighborhood} de ${property.city}`,
        },
      ],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const resolvedParams = await params;
  const property = await getProperty();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const propertyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Accommodation',
    name: property.title,
    description: property.description,
    image: property.image,
    url: `${siteUrl}/imoveis/aluguel/${resolvedParams.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.city,
      addressRegion: 'MG',
    },
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'BRL',
      availability: 'https://schema.org/InStock',
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <JsonLd data={propertyJsonLd} />
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <div className="relative h-80 w-full rounded-lg overflow-hidden mb-4">
        <Image src={property.image} alt={property.title} fill className="object-cover" />
      </div>
      <p className="text-lg mb-4">{property.description}</p>
      <div className="text-2xl font-bold text-blue-600">R$ {property.price} / mês</div>
    </div>
  );
}
