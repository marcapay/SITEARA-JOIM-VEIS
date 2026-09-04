const fs = require('fs');
const path = require('path');

const pages = {
  'alugar': `
import { Search, MapPin, Bed, Bath, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: 'Imóveis para Alugar | Araújo Imóveis' };

export default function Alugar() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Imóveis para Alugar</h1>
          <p className="text-lg text-blue-100">Encontre o lar perfeito para você e sua família.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100">
          <h2 className="font-bold text-lg mb-4">Filtros</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Cidade ou bairro" className="w-full p-3 border border-gray-200 rounded-lg" />
            <select className="w-full p-3 border border-gray-200 rounded-lg"><option>Tipo de Imóvel</option></select>
            <select className="w-full p-3 border border-gray-200 rounded-lg"><option>Quartos</option></select>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg">Filtrar</button>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Link href="/imoveis/aluguel/demo" key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all block group">
                <div className="relative h-48 bg-gray-200"><Image src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" alt="Imóvel" fill className="object-cover group-hover:scale-105 transition-transform" /></div>
                <div className="p-5">
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-2"><MapPin className="w-4 h-4" /> Centro, Caratinga</p>
                  <h3 className="font-bold text-lg mb-2">Apartamento Padrão</h3>
                  <div className="flex gap-3 text-gray-600 text-sm mb-4"><span className="flex items-center gap-1"><Bed className="w-4 h-4"/>2</span><span className="flex items-center gap-1"><Bath className="w-4 h-4"/>1</span></div>
                  <div className="text-blue-600 font-bold text-xl">R$ 1.500</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <div className="mt-8 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'comprar': `
import { Search, MapPin, Bed, Bath, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: 'Imóveis à Venda | Araújo Imóveis' };

export default function Comprar() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-green-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Imóveis à Venda</h1>
          <p className="text-lg text-green-100">Invista no seu futuro com segurança e praticidade.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100">
          <h2 className="font-bold text-lg mb-4">Filtros</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Cidade ou bairro" className="w-full p-3 border border-gray-200 rounded-lg" />
            <select className="w-full p-3 border border-gray-200 rounded-lg"><option>Tipo de Imóvel</option></select>
            <select className="w-full p-3 border border-gray-200 rounded-lg"><option>Faixa de Preço</option></select>
            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg">Filtrar</button>
          </div>
        </aside>
        <main className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <Link href="/imoveis/venda/demo" key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all block group">
                <div className="relative h-48 bg-gray-200"><Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" alt="Imóvel" fill className="object-cover group-hover:scale-105 transition-transform" /></div>
                <div className="p-5">
                  <p className="text-gray-500 text-sm flex items-center gap-1 mb-2"><MapPin className="w-4 h-4" /> Bairro nobre, Caratinga</p>
                  <h3 className="font-bold text-lg mb-2">Casa de Alto Padrão</h3>
                  <div className="flex gap-3 text-gray-600 text-sm mb-4"><span className="flex items-center gap-1"><Bed className="w-4 h-4"/>3</span><span className="flex items-center gap-1"><Bath className="w-4 h-4"/>2</span></div>
                  <div className="text-green-600 font-bold text-xl">R$ 550.000</div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <div className="mt-8 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'guias': `
import Link from "next/link";
export const metadata = { title: 'Guias e Links Úteis | Araújo Imóveis' };

export default function Guias() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Links Úteis e Guias</h1>
          <p className="text-blue-100">Informações valiosas sobre o mercado imobiliário e processos de locação/compra.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-8">
        {[
          { title: 'Documentação Necessária para Alugar', desc: 'Saiba o que preparar para não perder tempo.' },
          { title: 'Como funciona o Seguro Fiança?', desc: 'A garantia mais rápida e segura para locatários e proprietários.' },
          { title: 'Passo a Passo para Comprar seu Primeiro Imóvel', desc: 'Tudo o que você precisa saber antes de fechar negócio.' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-blue-600 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.desc}</p>
            <button className="text-blue-600 font-semibold text-sm">Ler artigo completo →</button>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'contato': `
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export const metadata = { title: 'Fale Conosco | Araújo Imóveis' };

export default function Contato() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Fale Conosco</h1>
          <p className="text-blue-100">Estamos prontos para te atender e tirar todas as suas dúvidas.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold mb-6">Envie uma mensagem</h2>
          <form className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label><input type="email" className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label><textarea rows={4} className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"></textarea></div>
            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">Enviar Mensagem</button>
          </form>
        </div>
        <div className="space-y-8 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Phone /></div>
            <div><h3 className="font-bold">Telefone / WhatsApp</h3><p className="text-gray-600">(33) 3321-0000 / (33) 99999-9999</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Mail /></div>
            <div><h3 className="font-bold">E-mail</h3><p className="text-gray-600">contato@araujoimoveis.com.br</p></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><MapPin /></div>
            <div><h3 className="font-bold">Endereço</h3><p className="text-gray-600">Centro, Caratinga - MG</p></div>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'sobre': `
import Image from "next/image";
import Link from "next/link";
export const metadata = { title: 'Sobre Nós | Araújo Imóveis' };

export default function Sobre() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Nossa História</h1>
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          A Araújo Imóveis nasceu do sonho de simplificar a vida de quem busca um novo lar em Caratinga e região.
          Com transparência, tecnologia e atendimento humanizado, conectamos pessoas às melhores oportunidades do mercado imobiliário.
        </p>
        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden mb-12 shadow-xl">
          <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop" alt="Equipe Araújo Imóveis" fill className="object-cover" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-xl text-blue-600 mb-2">Missão</h3>
            <p className="text-gray-700">Garantir agilidade e segurança na locação e venda de imóveis.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-xl text-blue-600 mb-2">Visão</h3>
            <p className="text-gray-700">Ser a referência imobiliária número um da nossa região.</p>
          </div>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-xl text-blue-600 mb-2">Valores</h3>
            <p className="text-gray-700">Ética, inovação, transparência e respeito ao cliente.</p>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'trabalhe-conosco': `
import Link from "next/link";
export const metadata = { title: 'Trabalhe Conosco | Araújo Imóveis' };

export default function TrabalheConosco() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 text-white py-12 px-4 text-center">
        <h1 className="text-3xl font-bold mb-2">Vem ser Araújo Imóveis</h1>
        <p className="text-blue-100">Estamos sempre em busca de talentos que queiram revolucionar o mercado.</p>
      </div>
      <div className="max-w-3xl mx-auto px-4 mt-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6">Vagas Abertas</h2>
        <div className="space-y-4">
          <div className="p-6 border border-gray-200 rounded-xl flex justify-between items-center hover:border-blue-500 transition">
            <div><h3 className="font-bold text-lg">Corretor de Imóveis</h3><p className="text-gray-500 text-sm">Caratinga - Presencial</p></div>
            <button className="bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-lg">Candidatar-se</button>
          </div>
          <div className="p-6 border border-gray-200 rounded-xl flex justify-between items-center hover:border-blue-500 transition">
            <div><h3 className="font-bold text-lg">Atendente de Locação</h3><p className="text-gray-500 text-sm">Caratinga - Presencial</p></div>
            <button className="bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-lg">Candidatar-se</button>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">Não encontrou a vaga ideal? Envie seu currículo para nosso banco de talentos.</p>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl">Enviar Currículo</button>
        </div>
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'administracao-de-alugueis': `
import { Key, ShieldCheck, DollarSign } from "lucide-react";
import Link from "next/link";
export const metadata = { title: 'Administração de Aluguéis | Araújo Imóveis' };

export default function Administracao() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-50 py-16 px-4 text-center border-b border-blue-100">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Deixe a burocracia com a gente.</h1>
          <p className="text-xl text-gray-600 mb-8">Nós cuidamos do seu imóvel e garantimos seu aluguel em dia, sem dor de cabeça.</p>
          <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:bg-blue-700 transition">Quero anunciar meu imóvel</button>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><ShieldCheck className="w-8 h-8"/></div><h3 className="font-bold text-xl mb-2">Vistoria Rigorosa</h3><p className="text-gray-600">Garantimos que seu imóvel será devolvido exatamente como foi entregue.</p></div>
        <div className="text-center p-6"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><DollarSign className="w-8 h-8"/></div><h3 className="font-bold text-xl mb-2">Repasse Garantido</h3><p className="text-gray-600">Mesmo se o inquilino atrasar, seu dinheiro estará na conta na data certa.</p></div>
        <div className="text-center p-6"><div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><Key className="w-8 h-8"/></div><h3 className="font-bold text-xl mb-2">Locação Ágil</h3><p className="text-gray-600">Usamos tecnologia para aprovar fichas rapidamente e alugar seu imóvel em tempo recorde.</p></div>
      </div>
      <div className="text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'avaliacao-de-imoveis': `
import { TrendingUp, FileText } from "lucide-react";
import Link from "next/link";
export const metadata = { title: 'Avaliação de Imóveis | Araújo Imóveis' };

export default function Avaliacao() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-blue-600 py-16 px-4 text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Descubra o valor real do seu imóvel</h1>
          <p className="text-xl text-blue-100 mb-8">Para vender ou alugar, você precisa de um preço competitivo e justo.</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 mt-[-40px]">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"><TrendingUp className="w-10 h-10"/></div>
          <h2 className="text-2xl font-bold mb-4">Solicite uma avaliação técnica</h2>
          <p className="text-gray-600 mb-8">Preencha os dados básicos do seu imóvel e um de nossos corretores especialistas entrará em contato para agendar uma visita e elaborar o parecer de valor.</p>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Endereço do Imóvel</label><input type="text" className="w-full p-3 border border-gray-200 rounded-lg" /></div>
            <div className="sm:col-span-2"><button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-4">Solicitar Avaliação</button></div>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center"><Link href="/" className="text-blue-600 hover:underline">Voltar para o início</Link></div>
    </div>
  );
}`,
  'imoveis': `
import { Search } from "lucide-react";
import Link from "next/link";
export const metadata = { title: 'Todos os Imóveis | Araújo Imóveis' };

export default function Imoveis() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 pb-12">
      <div className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">Pesquisa de Imóveis</h1>
          <div className="flex bg-gray-100 rounded-full p-1 mt-4 sm:mt-0">
            <Link href="/alugar" className="px-6 py-2 rounded-full font-semibold hover:bg-white hover:shadow-sm">Alugar</Link>
            <Link href="/comprar" className="px-6 py-2 rounded-full font-semibold hover:bg-white hover:shadow-sm">Comprar</Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Utilize as categorias acima para iniciar</h2>
        <p className="text-gray-500">Selecione se você deseja alugar ou comprar um imóvel.</p>
        <Link href="/" className="inline-block mt-8 text-blue-600 font-semibold hover:underline">Voltar para a página inicial</Link>
      </div>
    </div>
  );
}`,
  'entrar': `
import Link from "next/link";
export const metadata = { title: 'Entrar | Araújo Imóveis', robots: 'noindex, nofollow' };

export default function Entrar() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Área do Cliente</h2>
          <p className="mt-2 text-sm text-gray-600">Acesse o portal do proprietário ou inquilino.</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label><input type="email" required className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="seu@email.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Senha</label><input type="password" required className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="••••••••" /></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center"><input id="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" /><label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembrar-me</label></div>
            <div className="text-sm"><a href="#" className="font-medium text-blue-600 hover:text-blue-500">Esqueceu a senha?</a></div>
          </div>
          <div><button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Entrar</button></div>
        </form>
        <div className="mt-6 text-center"><Link href="/" className="text-blue-600 font-semibold hover:underline">Voltar para o início</Link></div>
      </div>
    </div>
  );
}`,
  'termos': `
import Link from "next/link";
export const metadata = { title: 'Termos de Uso | Araújo Imóveis' };

export default function Termos() {
  return (
    <div className="bg-white min-h-screen text-gray-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <div className="prose prose-blue text-gray-600 space-y-4">
          <p>Estes Termos de Uso regulam a utilização do site da Araújo Imóveis.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">1. Aceitação</h2>
          <p>Ao acessar e utilizar este site, você concorda com nossos termos e condições.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">2. Serviços</h2>
          <p>As informações dos imóveis podem sofrer alterações de preço e disponibilidade sem aviso prévio.</p>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200"><Link href="/" className="text-blue-600 hover:underline font-semibold">← Voltar para o início</Link></div>
      </div>
    </div>
  );
}`,
  'privacidade': `
import Link from "next/link";
export const metadata = { title: 'Política de Privacidade | Araújo Imóveis' };

export default function Privacidade() {
  return (
    <div className="bg-white min-h-screen text-gray-900 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        <div className="prose prose-blue text-gray-600 space-y-4">
          <p>A privacidade das suas informações é muito importante para nós da Araújo Imóveis.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">Coleta de Dados</h2>
          <p>Coletamos dados básicos como nome, e-mail e telefone apenas quando você os fornece através dos nossos formulários de contato ou avaliação.</p>
          <h2 className="text-xl font-bold text-gray-900 mt-6">Uso dos Dados</h2>
          <p>Utilizamos os dados apenas para retornar o seu contato e oferecer os serviços imobiliários que você solicitou.</p>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200"><Link href="/" className="text-blue-600 hover:underline font-semibold">← Voltar para o início</Link></div>
      </div>
    </div>
  );
}`
};

Object.keys(pages).forEach(pageName => {
  const dirPath = path.join(__dirname, 'src', 'app', pageName);
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, pages[pageName], 'utf8');
});

console.log('Todas as páginas criadas com sucesso!');
