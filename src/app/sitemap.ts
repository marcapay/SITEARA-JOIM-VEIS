import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sitearaujoimoveis.vercel.app';

  const routes = [
    '',
    '/comprar',
    '/alugar',
    '/lancamentos',
    '/anunciar',
    '/imoveis',
    '/sobre',
    '/contato',
    '/privacidade',
    '/administracao-de-alugueis',
    '/avaliacao-de-imoveis',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
