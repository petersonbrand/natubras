import type { Metadata } from "next";
import { Brand, ButtonLink } from "@/components/ui";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Pedidos | Natubras",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pedidos" },
};

export default function Orders() {
  return (
    <main className="page-shell py-16">
      <meta httpEquiv="refresh" content={`0;url=${company.ordersUrl}`} />
      <a href="/" aria-label="Natubras — início">
        <Brand />
      </a>
      <h1 className="mt-12">Portal de pedidos</h1>
      <p className="mt-6 mb-8 text-muted">
        Você será redirecionado para o portal de pedidos da Natubras.
      </p>
      <ButtonLink href={company.ordersUrl}>
        Acessar o portal de pedidos
      </ButtonLink>
    </main>
  );
}
