// app/painel/page.tsx
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/shared/Container";

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  PENDING: { label: "🟡 Em análise", className: "bg-marigold-light text-marigold-dark" },
  APPROVED: { label: "🟢 Aprovada", className: "bg-pine-50 text-pine" },
  REJECTED: { label: "🔴 Rejeitada", className: "bg-red-50 text-red-600" },
  SUSPENDED: { label: "⚪ Suspensa", className: "bg-sand text-ink-soft" },
};

export default async function PainelPage() {
  const session = await auth();

  if (!session?.user) return null; // o middleware já barra isso antes; é só defensivo

  const membership = await prisma.storeMember.findFirst({
    where: { userId: session.user.id },
    include: {
      store: { include: { _count: { select: { products: true } } } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <h1 className="font-display text-[28px] font-semibold text-ink">
          Olá, {session.user.name}
        </h1>

        {!membership ? (
          <div className="mt-8 rounded-2xl border border-dashed border-sand bg-white p-8 text-center">
            <p className="text-[14.5px] text-ink-soft">Você ainda não tem uma loja cadastrada.</p>
            <Link
              href="/painel/cadastrar-loja"
              className="mt-4 inline-flex rounded-full bg-pine px-6 py-3 text-[14px] font-semibold text-bg"
            >
              Cadastrar minha loja
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-sand bg-white p-6 sm:col-span-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
                Minha loja
              </span>
              <h2 className="mt-1 font-display text-[20px] font-semibold text-ink">
                {membership.store.name}
              </h2>
              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-[12.5px] font-semibold ${STATUS_LABEL[membership.store.status].className}`}
              >
                {STATUS_LABEL[membership.store.status].label}
              </span>
            </div>

            <div className="rounded-2xl border border-sand bg-white p-6">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
                Produtos
              </span>
              <p className="mt-2 font-display text-[28px] font-semibold text-ink">
                {membership.store._count.products}
              </p>
            </div>

            <div className="rounded-2xl border border-sand bg-white p-6">
              <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-soft">
                Visualizações
              </span>
              <p className="mt-2 font-display text-[28px] font-semibold text-ink">—</p>
              <p className="mt-1 text-[12px] text-ink-soft">Contagem ainda não implementada.</p>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}