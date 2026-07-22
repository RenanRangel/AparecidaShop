'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { isValidCNPJ, isValidEmail, isValidPhone } from '@/lib/validation';
import { slugify } from '@/lib/utils';

export interface CreateStoreState {
  errors?: Record<string, string>;
}

export async function createStore(
  _prevState: CreateStoreState,
  formData: FormData,
): Promise<CreateStoreState> {
  const session = await auth();

  if (!session?.user) redirect('/login');

  // Regra de negócio atual: um lojista administra uma loja por vez.
  // O schema (StoreMember N:N) já suporta várias — isso é só a regra do
  // formulário de auto-cadastro, não uma limitação do banco.
  const existing = await prisma.storeMember.findFirst({ where: { userId: session.user.id } });
  if (existing) redirect('/painel');

  const name = String(formData.get('name') ?? '').trim();
  const description = String(formData.get('description') ?? '').trim();
  const location = String(formData.get('location') ?? '').trim();
  const cnpj = String(formData.get('cnpj') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const whatsapp = String(formData.get('whatsapp') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const instagram = String(formData.get('instagram') ?? '').trim();
  const gallery = String(formData.get('gallery') ?? '').trim();
  const categoryIds = formData.getAll('categoryIds').map(String);

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Informe o nome da loja.';
  if (!description) errors.description = 'Descreva brevemente a loja.';
  if (!location) errors.location = 'Informe o endereço da loja.';
  if (categoryIds.length === 0) errors.categoryIds = 'Selecione ao menos uma categoria.';
  if (!phone || !isValidPhone(phone)) errors.phone = 'Telefone inválido. Inclua o DDD.';
  if (!whatsapp || !isValidPhone(whatsapp)) errors.whatsapp = 'WhatsApp inválido. Inclua o DDD.';
  if (email && !isValidEmail(email)) errors.email = 'E-mail inválido.';
  if (cnpj && !isValidCNPJ(cnpj)) errors.cnpj = 'CNPJ inválido.';

  if (Object.keys(errors).length > 0) return { errors };

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let attempt = 2;
  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${attempt++}`;
  }

  const logoInitials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

  await prisma.$transaction(async (tx) => {
    const store = await tx.store.create({
      data: {
        name,
        slug,
        description,
        location,
        cnpj: cnpj || null,
        phone: phone || null,
        whatsapp: whatsapp || null,
        email: email || null,
        instagram: instagram || null,
        gallery: gallery || null,
        logoInitials,
        categories: { create: categoryIds.map((categoryId) => ({ categoryId })) },
      },
    });

    await tx.storeMember.create({
      data: { storeId: store.id, userId: session.user.id, role: 'OWNER' },
    });

    await tx.storeStatusHistory.create({
      data: {
        storeId: store.id,
        toStatus: 'PENDING',
        changedByUserId: session.user.id,
        reason: 'Loja criada pelo lojista via /painel/cadastrar-loja',
      },
    });
  });

  redirect('/painel');
}