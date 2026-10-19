# Natubras — site institucional

Site institucional em Next.js 16, React 19, TypeScript e Tailwind CSS 4. O projeto foi criado com a CLI oficial `create-next-app`, com exportação estática. Os originais de fotografia ficam em `../docs/`; apenas os arquivos otimizados de `public/images/` entram no site.

## Rodar

Usa Node.js 24 e npm 11. A versão do Node também é declarada no `package.json` para o build da Vercel.

```sh
npm ci
npm run dev
```

Página institucional: http://localhost:3000/

Sistema visual: http://localhost:3000/sistema-visual

Para conferir exatamente a exportação de produção:

```sh
npm run build
npm run preview
```

`npm start` também serve a pasta `out/`, em vez de chamar `next start` (incompatível com `output: "export"`). O servidor de prévia é local; para desenvolvimento use `npm run dev`.

## Conteúdo e identidade

- Dados empresariais e contatos: `src/content/company.ts`.
- Tokens de cor, tipografia, espaçamento e componentes: `src/app/globals.css`.
- Exemplos visuais: `src/app/sistema-visual/page.tsx` (marcado como `noindex`, fora da navegação pública).
- Página institucional: `src/app/page.tsx`.
- Contatos sem valor não geram botões ou links fictícios.

As fontes são Lora e Source Sans 3, servidas localmente pelo Next depois do build. A marca tipográfica do cabeçalho é provisória: o logotipo fornecido está em curvas no CorelDRAW e precisa de uma exportação fiel em SVG ou PNG limpo. O desenho original continua presente na fotografia do prato.

## Fotografias

Para regenerar os assets, com os originais em `../docs/`:

```sh
npm run assets
```

O script usa Sharp para o TIFF do prato e um leitor local do composite dos PSDs CMYK de 8 bits. Não renderiza nem edita as camadas. O perfil ICC é preservado em um TIFF intermediário em memória antes da conversão de cor. Os originais não são alterados. A imagem principal vem de `Natubras_DF5P8553_OK_recorte_capa.tif`; a foto aérea e as composições vêm dos PSDs.

## Fontes e revisão antes de publicar

- Razão social e CNPJ: [RDAP oficial do Registro.br](https://rdap.registro.br/domain/natubras.com.br), consultado em 19/10/2026; titular Natubras Pescados Ltda., CNPJ 72.207.251/0001-52.
- Endereço e atividade: [Licença municipal LAO 7506/2024, páginas 1–2](https://s3cache.dom.sc.gov.br/atos/2024/10/1727805878_renovao_de_lao_75062024__req._sinfat_40540__natubras_pescados_ltda.pdf).
- Requisito declarado pelo ChatPro: `../docs/chatpro/WhatsApp_Oficial-Du00.pdf`, página 9: site funcional, acessível internacionalmente, com razão social e CNPJ no rodapé.
- A conferência das embalagens comprova material histórico, com datas de 2006. Seus telefones não foram tratados como contatos atuais.

Telefone confirmado para contato: +55 (47) 3347-4800. Confirmar endereço e preencher WhatsApp e e-mail de atendimento; fornecer logo limpo e revisar o conteúdo. A presença dos dados no site é uma parte do onboarding; não garante a aprovação da Meta.

## Publicação na Vercel

Repositório: https://github.com/petersonbrand/natubras. O aplicativo está na raiz do repositório: usar a raiz padrão na Vercel. Instalação: `npm ci`; build: `npm run build`; saída estática: `out`. As opções ficam em `vercel.json`. O domínio atual já aponta para a Vercel; o DNS e o e-mail são administrados pela Microsoft.

### Portal de pedidos

`/pedidos` e seus subcaminhos são redirecionados pela Vercel, com HTTP 307, para `http://186.208.217.113:2702/restrita`, preservando o destino do HTML original fornecido em `docs/pedidos/index.html`. A rota Next `/pedidos` também gera um HTML de fallback com redirecionamento e link para o portal, permitindo conferir a exportação estática fora da Vercel. O destino está em `vercel.json` e `src/content/company.ts`; ambos devem ser atualizados juntos se o endereço do portal mudar.

## Verificação

Build de produção com checagem de TypeScript e HTML estático; navegação por âncoras; imagens e layout em desktop/celular; auditoria de acessibilidade do navegador.

A auditoria npm da instalação inicial não encontrou vulnerabilidades de produção. Há avisos herdados das dependências de desenvolvimento do ESLint sobre `braces`; não foi aplicado `npm audit fix --force`, que sugere trocar a configuração do Next por uma versão incompatível mais antiga.
