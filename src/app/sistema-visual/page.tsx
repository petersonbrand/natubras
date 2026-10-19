import type { Metadata } from "next";
import { Brand, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Sistema visual | Natubras",
  robots: { index: false, follow: false },
  alternates: { canonical: "/sistema-visual" },
};
const colors = [
  { name: "Verde Natubras", value: "#006B3D", role: "Marca, links e botões" },
  { name: "Vermelho", value: "#C83236", role: "Detalhes e foco" },
  { name: "Papel", value: "#FAF8F3", role: "Fundo de apoio" },
  { name: "Tinta", value: "#17362A", role: "Texto principal" },
  { name: "Verde profundo", value: "#073E2D", role: "Seção de contato" },
];
export default function DesignSystem() {
  return (
    <main>
      <header className="guide-header">
        <div className="page-shell">
          <a href="/" aria-label="Voltar ao site">
            <Brand />
          </a>
          <p className="eyebrow mt-12">Sistema visual · Versão inicial</p>
          <h1 className="mt-6">
            A identidade
            <br />
            <em>Natubras.</em>
          </h1>
          <p className="mt-6 max-w-xl text-muted">
            Uma base visual para a página institucional: cores da marca,
            fotografia real e tipografia com personalidade.
          </p>
          <div className="mt-8">
            <ButtonLink href="/">Ver a página institucional</ButtonLink>
          </div>
        </div>
      </header>
      <div className="page-shell">
        <section className="guide-section">
          <h2 className="guide-title">Cores</h2>
          <div className="guide-grid">
            {colors.map((color) => (
              <div key={color.value}>
                <div className="swatch" style={{ background: color.value }} />
                <p className="font-semibold">{color.name}</p>
                <p className="text-sm text-muted">{color.value}</p>
                <p className="mt-2 text-sm text-muted">{color.role}</p>
              </div>
            ))}
          </div>
          <p className="guide-note">
            Contraste: branco sobre verde 6,62:1; branco sobre vermelho 5,30:1;
            texto principal sobre papel 12,39:1. O vermelho funciona como
            acento, sem competir com a fotografia.
          </p>
        </section>
        <section className="guide-section">
          <h2 className="guide-title">Tipografia</h2>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted mb-5">
                Lora · títulos · 500 / itálico 400
              </p>
              <h2>
                O sabor faz
                <br />
                <em>a diferença.</em>
              </h2>
            </div>
            <div>
              <p className="text-sm text-muted mb-5">
                Source Sans 3 · textos e interface · 400 / 600
              </p>
              <p className="max-w-md">
                A Natubras Pescados Ltda. atua no beneficiamento e congelamento
                de pescados em Balneário Piçarras, Santa Catarina.
              </p>
              <p className="eyebrow mt-6">
                Informação clara. Leitura confortável.
              </p>
            </div>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="py-3">Uso</th>
                  <th>Desktop</th>
                  <th>Celular</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3">Título principal</td>
                  <td>Até 88 px</td>
                  <td>50–64 px</td>
                </tr>
                <tr>
                  <td className="py-3">Título de seção</td>
                  <td>Até 58 px</td>
                  <td>35–48 px</td>
                </tr>
                <tr>
                  <td className="py-3">Texto</td>
                  <td>18 px / 1,6</td>
                  <td>17 px / 1,6</td>
                </tr>
                <tr>
                  <td className="py-3">Botões / navegação</td>
                  <td>15 px</td>
                  <td>13–15 px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="guide-section">
          <h2 className="guide-title">Espaçamento e forma</h2>
          <p className="max-w-2xl text-muted">
            Base de 4 px. Escala: 4, 8, 12, 16, 24, 32, 48, 64, 80 e 112 px.
            Conteúdo de até 1280 px, com margens laterais de 20 px no celular.
            Cantos discretos de 4 px.
          </p>
          <div className="mt-8 flex items-end gap-5 overflow-x-auto pb-4">
            {[8, 16, 24, 32, 48, 64].map((size) => (
              <div
                key={size}
                className="flex flex-col items-center gap-3 text-sm text-muted"
              >
                <span
                  className="block bg-brand"
                  style={{ width: size, height: size }}
                />
                {size}
              </div>
            ))}
          </div>
        </section>
        <section className="guide-section">
          <h2 className="guide-title">Ações e estados</h2>
          <div className="flex flex-wrap gap-6">
            <ButtonLink href="/#empresa">Conheça a Natubras</ButtonLink>
            <a href="/#contato" className="text-link">
              Ver contato →
            </a>
          </div>
          <div className="mt-6 rounded bg-[var(--deep-green)] p-8">
            <ButtonLink href="/#contato" variant="light">
              Ver endereço
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            Foco visível, botões com altura mínima de 52 px e movimento reduzido
            conforme a preferência do dispositivo.
          </p>
        </section>
        <section className="guide-section">
          <h2 className="guide-title">Conteúdo e materiais</h2>
          <p className="max-w-3xl text-muted">
            Fotografias originais da Natubras, extraídas dos arquivos de
            produção. O prato pronto aparece no destaque; a foto aérea
            identifica a empresa; peixes e frutos do mar apoiam a apresentação.
          </p>
          <p className="guide-note">
            Revisão antes da publicação: confirmar endereço, WhatsApp
            e e-mail de atendimento. A identidade empresarial e o CNPJ foram
            vinculados ao domínio pelo Registro.br. A marca tipográfica desta
            prévia é provisória; o logotipo original em curvas precisa de
            exportação para SVG ou PNG limpo.
          </p>
        </section>
        <div className="py-10">
          <ButtonLink href="/">Voltar para a página</ButtonLink>
        </div>
      </div>
    </main>
  );
}
