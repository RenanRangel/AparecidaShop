import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { prisma } from '@/lib/prisma';

const SESSION_COOKIE = 'asid';
const DEDUPE_WINDOW_MINUTES = 30;
const VALID_TYPES = [
  'STORE_VIEW',
  'PRODUCT_VIEW',
  'WHATSAPP_CLICK',
  'ADD_TO_LIST',
  'LIST_WHATSAPP_SENT',
] as const;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || !VALID_TYPES.includes(body.type) || typeof body.storeId !== 'string') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { type, storeId, productId, origin } = body as {
    type: (typeof VALID_TYPES)[number];
    storeId: string;
    productId?: string;
    origin?: string;
  };

  let sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  const response = NextResponse.json({ ok: true });

  if (!sessionId) {
    sessionId = randomUUID();
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 180, // 180 dias
      path: '/',
    });
  }

  try {
    // Evita contar a mesma sessão várias vezes na mesma janela curta
    // (ex: refresh repetido) só pra visualizações — cliques/adições/envios
    // são sempre ações deliberadas, contam sempre.
    if (type === 'STORE_VIEW' || type === 'PRODUCT_VIEW') {
      const since = new Date(Date.now() - DEDUPE_WINDOW_MINUTES * 60 * 1000);
      const recent = await prisma.analyticsEvent.findFirst({
        where: { type, storeId, productId: productId ?? null, sessionId, createdAt: { gte: since } },
        select: { id: true },
      });
      if (recent) return response;
    }

    await prisma.analyticsEvent.create({
      data: { type, storeId, productId: productId ?? null, sessionId, origin },
    });
  } catch (error) {
    // Analytics nunca pode derrubar a experiência do site.
    console.error('Falha ao registrar evento de analytics:', error);
  }

  return response;
}