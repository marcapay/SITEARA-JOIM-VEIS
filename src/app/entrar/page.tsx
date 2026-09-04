
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
}