# Projeto: Araújo Imóveis

## Visão Geral
Este é o projeto do site da **Araújo Imóveis**, uma imobiliária com foco em aluguel, compra, administração de imóveis e avaliação imobiliária (Caratinga - MG).

## Estado Atual (Onde paramos)
- **Framework**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide React (ícones).
- **Design/Componentes Criados**:
  - `Header.tsx`: Cabeçalho com logo, menu de navegação e botão "Entrar".
  - `Footer.tsx`: Rodapé com informações de contato, links úteis e selo CRECI.
  - `page.tsx` (Home): Página inicial estruturada com:
    - Hero section com motor de busca (Alugar, Comprar, Anunciar).
    - Vitrine de Imóveis em Destaque (cards de imóveis).
    - Seções informativas (Administração de aluguéis e Simulação de valor).
- **Última modificação**: A logo da empresa foi atualizada para a versão mais recente em formato PNG (`/public/logo.png`), e as referências no Header, Footer e metatags foram ajustadas.

## Como o Miguel (e o Antigravity dele) deve continuar
1. **Configuração Inicial**:
   - Rodar `npm install` (ou `pnpm install` / `yarn`) para instalar as dependências.
   - Rodar `npm run dev` para subir o servidor local na porta 3000.
2. **Próximos Passos Sugeridos**:
   - Criar as páginas internas (`/alugar`, `/comprar`, `/imoveis`, `/contato`, etc.) que atualmente estão apenas "linkadas" mas não existem ou estão vazias.
   - Integrar o frontend com o CRM/Backend se aplicável (atualmente alguns links apontam para `elooscrmimobiliario.com.br`).
   - Refinar o layout da logo caso as dimensões precisem de ajuste mais fino no Header.
   
## Notas para o Agente Antigravity do Miguel
- Siga as convenções do Next.js App Router (pasta `src/app`).
- O Tailwind v4 está sendo utilizado, então as classes utilitárias já estão disponíveis.
- A logo oficial é `public/logo.png`. Não utilizar a antiga `.jpg`.
