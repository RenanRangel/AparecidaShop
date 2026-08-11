import { prisma } from '@/lib/prisma';
import type { AnalyticsEventType } from '@prisma/client';

export type PeriodKey = 'today' | '7d' | '30d' | 'all';

interface PeriodRange {
  start: Date | null; // null = período total, sem limite inferior
  end: Date;
  previousStart: Date | null;
  previousEnd: Date | null;
}

export const PERIOD_LABELS: Record<PeriodKey, string> = {
  today: 'Hoje',
  '7d': 'Últimos 7 dias',
  '30d': 'Últimos 30 dias',
  all: 'Período total',
};

function resolvePeriodRange(period: PeriodKey): PeriodRange {
  const end = new Date();

  if (period === 'today') {
    const start = new Date(end);
    start.setHours(0, 0, 0, 0);
    const previousEnd = new Date(start);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - 1);
    return { start, end, previousStart, previousEnd };
  }

  if (period === '7d') {
    const start = new Date(end);
    start.setDate(start.getDate() - 7);
    const previousEnd = new Date(start);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - 7);
    return { start, end, previousStart, previousEnd };
  }

  if (period === '30d') {
    const start = new Date(end);
    start.setDate(start.getDate() - 30);
    const previousEnd = new Date(start);
    const previousStart = new Date(previousEnd);
    previousStart.setDate(previousStart.getDate() - 30);
    return { start, end, previousStart, previousEnd };
  }

  return { start: null, end, previousStart: null, previousEnd: null };
}

async function countEvents(
  storeId: string,
  type: AnalyticsEventType,
  start: Date | null,
  end: Date,
): Promise<number> {
  return prisma.analyticsEvent.count({
    where: {
      storeId,
      type,
      createdAt: start ? { gte: start, lte: end } : { lte: end },
    },
  });
}

async function countDistinctSessions(
  storeId: string,
  type: AnalyticsEventType,
  start: Date | null,
  end: Date,
): Promise<number> {
  const rows = await prisma.analyticsEvent.findMany({
    where: {
      storeId,
      type,
      createdAt: start ? { gte: start, lte: end } : { lte: end },
    },
    select: { sessionId: true },
    distinct: ['sessionId'],
  });
  return rows.length;
}

export interface MetricValue {
  current: number;
  previous: number | null; // null = sem período anterior pra comparar (ex: "Período total")
  changePercent: number | null; // null = sem dado suficiente pra uma comparação confiável
}

export interface StoreAnalyticsSummary {
  period: PeriodKey;
  storeViews: MetricValue;
  productViews: MetricValue;
  whatsappClicks: MetricValue;
  addToList: MetricValue;
  listsSent: MetricValue;
  conversionRate: { current: number | null; previous: number | null };
}

function buildMetric(current: number, previous: number | null): MetricValue {
  if (previous === null) return { current, previous: null, changePercent: null };
  if (previous === 0) {
    // Sem base pra calcular %; ainda assim mostramos o crescimento em termos absolutos.
    return { current, previous, changePercent: current > 0 ? null : 0 };
  }
  return { current, previous, changePercent: ((current - previous) / previous) * 100 };
}

/**
 * Calcula o resumo de métricas de uma loja pro período pedido, com
 * comparação vs. o período anterior equivalente (exceto em "período total",
 * que não tem um "anterior" que faça sentido).
 *
 * Fórmula de conversão (item 35 do briefing): sessões únicas que clicaram no
 * WhatsApp da loja ÷ sessões únicas que visualizaram a loja, no período. É
 * uma taxa de conversão para CONTATO, não de vendas — o sistema não sabe se
 * o contato virou venda.
 */
export async function getStoreAnalyticsSummary(
  storeId: string,
  period: PeriodKey,
): Promise<StoreAnalyticsSummary> {
  const range = resolvePeriodRange(period);
  const types: AnalyticsEventType[] = [
    'STORE_VIEW',
    'PRODUCT_VIEW',
    'WHATSAPP_CLICK',
    'ADD_TO_LIST',
    'LIST_WHATSAPP_SENT',
  ];

  const currentCounts = await Promise.all(types.map((t) => countEvents(storeId, t, range.start, range.end)));
  const previousCounts = range.previousStart
    ? await Promise.all(types.map((t) => countEvents(storeId, t, range.previousStart!, range.previousEnd!)))
    : types.map(() => null);

  const [storeViewsC, productViewsC, whatsappC, addC, sentC] = currentCounts;
  const [storeViewsP, productViewsP, whatsappP, addP, sentP] = previousCounts;

  const [viewSessions, clickSessions] = await Promise.all([
    countDistinctSessions(storeId, 'STORE_VIEW', range.start, range.end),
    countDistinctSessions(storeId, 'WHATSAPP_CLICK', range.start, range.end),
  ]);

  let previousConversion: number | null = null;
  if (range.previousStart) {
    const [pViewSessions, pClickSessions] = await Promise.all([
      countDistinctSessions(storeId, 'STORE_VIEW', range.previousStart, range.previousEnd!),
      countDistinctSessions(storeId, 'WHATSAPP_CLICK', range.previousStart, range.previousEnd!),
    ]);
    previousConversion = pViewSessions > 0 ? (pClickSessions / pViewSessions) * 100 : null;
  }

  return {
    period,
    storeViews: buildMetric(storeViewsC, storeViewsP),
    productViews: buildMetric(productViewsC, productViewsP),
    whatsappClicks: buildMetric(whatsappC, whatsappP),
    addToList: buildMetric(addC, addP),
    listsSent: buildMetric(sentC, sentP),
    conversionRate: {
      current: viewSessions > 0 ? (clickSessions / viewSessions) * 100 : null,
      previous: previousConversion,
    },
  };
}