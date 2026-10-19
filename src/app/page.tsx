import Image from "next/image";
import { ArrowIcon, Brand, ButtonLink } from "@/components/ui";
import { company } from "@/content/company";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="page-shell flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5">
          <a href="#inicio" aria-label="Natubras — início">
            <Brand />
          </a>
          <nav
            aria-label="Navegação principal"
            className="main-nav flex items-center gap-6 md:gap-9"
          >
            <a href="#empresa">A Natubras</a>
            <a href="#pescados">Pescados</a>
            <a className="nav-contact" href="#contato">
              Contato <ArrowIcon />
            </a>
          </nav>
        </div>
      </header>
      <main id="conteudo">
        <section id="inicio" className="hero-section">
          <div className="hero-grid page-shell">
            <div className="hero-copy reveal">
              <p className="eyebrow">
                <span className="brand-dot" /> Pescados · Santa Catarina
              </p>
              <h1>
                O sabor faz
                <br />a <em>diferença.</em>
              </h1>
              <p className="hero-description">
                Beneficiamento e congelamento de pescados em Balneário Piçarras,
                Santa Catarina.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <ButtonLink href="#empresa">Conheça a Natubras</ButtonLink>
                <a className="text-link" href="#contato">
                  Onde estamos <ArrowIcon />
                </a>
              </div>
              <div className="hero-origin">
                <span className="origin-line" />
                <span>
                  Natubras Pescados Ltda.
                  <br />
                  <strong>Do litoral de Santa Catarina.</strong>
                </span>
              </div>
            </div>
            <figure className="hero-image reveal">
              <Image
                src="/images/prato-natubras.webp"
                alt="Prato com filé de peixe, camarões, molho e vegetais, em uma louça com a marca Natubras."
                width={2000}
                height={1456}
                sizes="(max-width: 767px) 100vw, 60vw"
                preload
                className="dish-photo"
              />
              <figcaption>
                <span className="caption-line" /> Pescados e frutos do mar
              </figcaption>
            </figure>
          </div>
          <div className="hero-foot page-shell">
            <span>Peixes, camarões e frutos do mar</span>
            <a href="#empresa">
              Conheça nossa empresa <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <section id="empresa" className="company-section section-space">
          <div className="page-shell company-grid">
            <figure className="company-photo">
              <Image
                src="/images/empresa-natubras.webp"
                alt="Vista aérea das instalações da Natubras, com galpões, pátio e caminhões."
                width={908}
                height={603}
                sizes="(max-width: 767px) 100vw, 44vw"
              />
              <figcaption>Balneário Piçarras · Santa Catarina</figcaption>
            </figure>
            <div className="company-copy">
              <p className="eyebrow">A Natubras</p>
              <h2>
                Uma empresa de
                <br />
                <em>Santa Catarina.</em>
              </h2>
              <p>
                A Natubras Pescados Ltda. atua no beneficiamento e congelamento
                de pescados em Balneário Piçarras, no litoral de Santa Catarina.
              </p>
              <p>
                Peixes, camarões e outros frutos do mar fazem parte da nossa
                atividade.
              </p>
              <dl className="company-facts">
                <div>
                  <dt>Nossa atividade</dt>
                  <dd>Beneficiamento e congelamento</dd>
                </div>
                <div>
                  <dt>Nossa localização</dt>
                  <dd>Balneário Piçarras, SC</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section id="pescados" className="products-section section-space">
          <div className="page-shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Pescados</p>
                <h2>
                  O mar em
                  <br />
                  <em>diferentes formas.</em>
                </h2>
              </div>
              <p>Peixes e frutos do mar na apresentação da Natubras.</p>
            </div>
            <div className="products-grid">
              <article className="product-card">
                <div className="product-image">
                  <Image
                    src="/images/peixes-natubras.webp"
                    alt="Composição de peixes inteiros sobre gelo, acompanhados de folhas e vegetais."
                    width={1200}
                    height={800}
                    sizes="(max-width: 767px) 100vw, 44vw"
                  />
                </div>
                <div className="product-label">
                  <h3>Peixes</h3>
                  <span className="small-line" />
                </div>
              </article>
              <article className="product-card">
                <div className="product-image">
                  <Image
                    src="/images/frutos-do-mar-natubras.webp"
                    alt="Composição de camarões e outros frutos do mar sobre gelo, com folhas e limão."
                    width={1200}
                    height={738}
                    sizes="(max-width: 767px) 100vw, 44vw"
                  />
                </div>
                <div className="product-label">
                  <h3>Camarões e frutos do mar</h3>
                  <span className="small-line" />
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="contato" className="contact-section section-space">
          <div className="page-shell contact-grid">
            <div>
              <p className="eyebrow">Onde estamos</p>
              <h2>
                A Natubras,
                <br />
                <em>mais perto de você.</em>
              </h2>
              <p className="contact-intro">
                Estamos em Balneário Piçarras,
                <br />
                no litoral de Santa Catarina.
              </p>
            </div>
            <div className="contact-details">
              <p className="contact-label">Nosso endereço</p>
              <address>
                {company.address.street}
                <br />
                {company.address.district}
                <br />
                {company.address.city} · {company.address.state}
                <br />
                CEP {company.address.postalCode}
              </address>
              <ButtonLink href={company.mapUrl} variant="light" external>
                Ver endereço no mapa
              </ButtonLink>
              {company.contact.whatsapp && (
                <a
                  className="contact-channel"
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fale pelo WhatsApp <ArrowIcon />
                </a>
              )}
              {company.contact.email && (
                <a
                  className="contact-channel"
                  href={`mailto:${company.contact.email}`}
                >
                  {company.contact.email} <ArrowIcon />
                </a>
              )}
              {company.contact.phone && (
                <a
                  className="contact-channel"
                  href={`tel:${company.contact.phone.replace(/[^\d+]/g, "")}`}
                >
                  {company.contact.phone} <ArrowIcon />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-shell footer-grid">
          <a href="#inicio" aria-label="Voltar ao início">
            <Brand compact />
          </a>
          <div className="legal-details">
            <p>{company.legalName}</p>
            <p>CNPJ {company.cnpj}</p>
          </div>
          <p className="copyright">
            © {new Date().getFullYear()} Natubras.
            <br />
            Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
