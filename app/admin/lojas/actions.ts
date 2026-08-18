'use server';

import { sendEmail } from '@/lib/email';
import { storeApprovedEmail, storeRejectedEmail } from '@/lib/email-templates';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect('/login');
  if (session.user.role !== 'ADMIN') redirect('/painel');
  return session.user;
}

export async function approveStore(storeId: string): Promise<void> {
  const admin = await requireAdmin();

  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) return;

  await prisma.$transaction([
    prisma.store.update({ where: { id: storeId }, data: { status: 'APPROVED' } }),
    prisma.storeStatusHistory.create({
      data: {
        storeId,
        fromStatus: store.status,
        toStatus: 'APPROVED',
        changedByUserId: admin.id,
        reason: 'Aprovada pelo administrador',
      },
    }),
  ]);

  const owner = await prisma.storeMember.findFirst({
    where: { storeId, role: 'OWNER' },
    include: { user: true },
  });

  if (owner?.user.email) {
    const { subject, html } = storeApprovedEmail(store.name);
    await sendEmail({ to: owner.user.email, subject, html });
  }

  revalidatePath('/admin/lojas');
}

export async function rejectStore(storeId: string, reason: string): Promise<void> {
  const admin = await requireAdmin();

  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) return;

  await prisma.$transaction([
    prisma.store.update({ where: { id: storeId }, data: { status: 'REJECTED' } }),
    prisma.storeStatusHistory.create({
      data: {
        storeId,
        fromStatus: store.status,
        toStatus: 'REJECTED',
        changedByUserId: admin.id,
        reason: reason || 'Rejeitada pelo administrador',
      },
    }),
  ]);

  const owner = await prisma.storeMember.findFirst({
    where: { storeId, role: 'OWNER' },
    include: { user: true },
  });

  if (owner?.user.email) {
    const { subject, html } = storeRejectedEmail(store.name, reason);
    await sendEmail({ to: owner.user.email, subject, html });
  }

  revalidatePath('/admin/lojas');
}