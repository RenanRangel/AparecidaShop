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

export function resolvePeriodRange(period: PeriodKey): PeriodRange {
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
export type MetricKey = 'storeViews' | 'productViews' | 'whatsappClicks' | 'addToList' | 'listsSent';

const METRIC_TYPE_MAP: Record<MetricKey, AnalyticsEventType> = {
  storeViews: 'STORE_VIEW',
  productViews: 'PRODUCT_VIEW',
  whatsappClicks: 'WHATSAPP_CLICK',
  addToList: 'ADD_TO_LIST',
  listsSent: 'LIST_WHATSAPP_SENT',
};

export const METRIC_LABELS: Record<MetricKey, string> = {
  storeViews: 'Visualizações da loja',
  productViews: 'Visualizações de produtos',
  whatsappClicks: 'Cliques no WhatsApp',
  addToList: 'Adições à lista',
  listsSent: 'Listas enviadas',
};

export interface TimeSeriesPoint {
  label: string;
  value: number;
}

function formatDayLabel(date: Date): string {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

/**
 * Agrupa uma lista de timestamps em "baldes" (por hora, se for o período
 * "hoje"; por dia, nos outros). Pré-preenche todos os baldes com 0 pra não
 * deixar buraco no gráfico (ex: um dia sem nenhum evento aparece como 0,
 * não como um ponto ausente).
 */
function bucketEvents(dates: Date[], byHour: boolean, start: Date | null, end: Date): TimeSeriesPoint[] {
  const buckets = new Map<string, number>();

  if (byHour) {
    for (let h = 0; h < 24; h++) {
      buckets.set(`${String(h).padStart(2, '0')}:00`, 0);
    }
  } else {
    // "all" não tem start fixo — usa a data do evento mais antigo, se houver.
    const rangeStart = start ?? (dates[0] ?? end);
    const cursor = new Date(rangeStart);
    cursor.setHours(0, 0, 0, 0);
    const endDay = new Date(end);
    endDay.setHours(0, 0, 0, 0);

    while (cursor <= endDay) {
      buckets.set(formatDayLabel(cursor), 0);
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  for (const date of dates) {
    const key = byHour ? `${String(date.getHours()).padStart(2, '0')}:00` : formatDayLabel(date);
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  return Array.from(buckets.entries()).map(([label, value]) => ({ label, value }));
}

/**
 * Série temporal das 5 métricas, pro gráfico de evolução. Busca os eventos
 * do período e agrupa em memória — simples e suficiente pro volume atual.
 * Se o volume crescer muito (milhares de eventos por loja/mês), trocar por
 * uma agregação via SQL (`date_trunc` + `GROUP BY`) é o próximo passo, sem
 * mudar a assinatura desta função.
 */
export async function getStoreTimeSeries(
  storeId: string,
  period: PeriodKey,
): Promise<Record<MetricKey, TimeSeriesPoint[]>> {
  const range = resolvePeriodRange(period);
  const byHour = period === 'today';

  const entries = await Promise.all(
    (Object.keys(METRIC_TYPE_MAP) as MetricKey[]).map(async (key) => {
      const events = await prisma.analyticsEvent.findMany({
        where: {
          storeId,
          type: METRIC_TYPE_MAP[key],
          createdAt: range.start ? { gte: range.start, lte: range.end } : { lte: range.end },
        },
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' },
      });

      return [key, bucketEvents(events.map((e) => e.createdAt), byHour, range.start, range.end)] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<MetricKey, TimeSeriesPoint[]>;
}
// --- Funil de interesse -----------------------------------------------

export interface FunnelStage {
  label: string;
  value: number;
  percentOfPrevious: number | null; // null = sem etapa anterior, ou anterior = 0
}

/**
 * Funil de INTERAÇÃO, não de vendas — o sistema não sabe se um contato
 * virou venda. Cada etapa conta sessões (visitantes) únicas que realizaram
 * aquela ação no período, não o total de eventos.
 */
export async function getStoreFunnel(storeId: string, period: PeriodKey): Promise<FunnelStage[]> {
  const range = resolvePeriodRange(period);

  async function distinctSessionCount(types: AnalyticsEventType[]): Promise<number> {
    const rows = await prisma.analyticsEvent.findMany({
      where: {
        storeId,
        type: { in: types },
        createdAt: range.start ? { gte: range.start, lte: range.end } : { lte: range.end },
      },
      select: { sessionId: true },
      distinct: ['sessionId'],
    });
    return rows.length;
  }

  const visitors = await distinctSessionCount(['STORE_VIEW']);
  const productViewers = await distinctSessionCount(['PRODUCT_VIEW']);
  const listAdders = await distinctSessionCount(['ADD_TO_LIST']);
  const contacted = await distinctSessionCount(['LIST_WHATSAPP_SENT', 'WHATSAPP_CLICK']);

  function pct(current: number, previous: number): number | null {
    return previous > 0 ? (current / previous) * 100 : null;
  }

  return [
    { label: 'Visitantes', value: visitors, percentOfPrevious: null },
    { label: 'Visualizações de produtos', value: productViewers, percentOfPrevious: pct(productViewers, visitors) },
    { label: 'Produtos adicionados à lista', value: listAdders, percentOfPrevious: pct(listAdders, productViewers) },
    { label: 'Listas enviadas / contato via WhatsApp', value: contacted, percentOfPrevious: pct(contacted, listAdders) },
  ];
}

// --- Ranking de produtos -------------------------------------------------

export interface ProductRankingEntry {
  productId: string;
  name: string;
  views: number;
  addToListCount: number;
  score: number;
}

/**
 * Score do ranking: views × 1 + adições à lista × 3. Peso maior pra adição
 * à lista porque é um sinal de interesse mais forte que uma visualização
 * passageira. Fórmula simples de propósito — troque os pesos aqui se quiser
 * recalibrar, sem precisar mexer em mais nada.
 *
 * Limitação conhecida: não inclui cliques de WhatsApp nem listas enviadas
 * porque esses dois eventos são registrados por loja, não por produto (não
 * existe botão de WhatsApp individual por produto, nem a mensagem de lista
 * enviada referencia produtos específicos no evento).
 */
export async function getProductRanking(
  storeId: string,
  period: PeriodKey,
  limit = 10,
): Promise<ProductRankingEntry[]> {
  const range = resolvePeriodRange(period);
  const createdAt = range.start ? { gte: range.start, lte: range.end } : { lte: range.end };

  const [viewGroups, addGroups, products] = await Promise.all([
    prisma.analyticsEvent.groupBy({
      by: ['productId'],
      where: { storeId, type: 'PRODUCT_VIEW', productId: { not: null }, createdAt },
      _count: { _all: true },
    }),
    prisma.analyticsEvent.groupBy({
      by: ['productId'],
      where: { storeId, type: 'ADD_TO_LIST', productId: { not: null }, createdAt },
      _count: { _all: true },
    }),
    prisma.product.findMany({ where: { storeId }, select: { id: true, name: true } }),
  ]);

  const nameById = new Map(products.map((p) => [p.id, p.name]));
  const viewsById = new Map(viewGroups.map((g) => [g.productId!, g._count._all]));
  const addsById = new Map(addGroups.map((g) => [g.productId!, g._count._all]));

  const productIds = new Set([...viewsById.keys(), ...addsById.keys()]);

  const entries: ProductRankingEntry[] = Array.from(productIds)
    .filter((id) => nameById.has(id)) // ignora eventos de produtos já apagados
    .map((productId) => {
      const views = viewsById.get(productId) ?? 0;
      const addToListCount = addsById.get(productId) ?? 0;
      return {
        productId,
        name: nameById.get(productId)!,
        views,
        addToListCount,
        score: views * 1 + addToListCount * 3,
      };
    });

  return entries.sort((a, b) => b.score - a.score).slice(0, limit);
}
// --- Origem dos visitantes -------------------------------------------

export interface OriginBreakdown {
  origin: string;
  count: number;
  percent: number;
}

export async function getStoreOriginBreakdown(storeId: string, period: PeriodKey): Promise<OriginBreakdown[]> {
  const range = resolvePeriodRange(period);

  const groups = await prisma.analyticsEvent.groupBy({
    by: ['origin'],
    where: {
      storeId,
      type: 'STORE_VIEW',
      createdAt: range.start ? { gte: range.start, lte: range.end } : { lte: range.end },
    },
    _count: { _all: true },
  });

  const total = groups.reduce((sum, g) => sum + g._count._all, 0);
  if (total === 0) return [];

  return groups
    .map((g) => ({
      origin: g.origin ?? 'direto',
      count: g._count._all,
      percent: (g._count._all / total) * 100,
    }))
    .sort((a, b) => b.count - a.count);
}

// --- Valor estimado das listas -----------------------------------------

/**
 * Soma o preço dos produtos presentes em listas ENVIADAS (evento
 * LIST_WHATSAPP_SENT) no período. Como o evento de envio não carrega quais
 * produtos estavam na lista (a lista vive no localStorage do visitante, não
 * no banco), a aproximação usada é: para cada envio, considera os produtos
 * que tiveram ADD_TO_LIST da MESMA sessão, na janela de tempo até o envio.
 * Isso é uma estimativa, não uma reconstrução exata da lista.
 */
export async function getEstimatedListValue(storeId: string, period: PeriodKey): Promise<number> {
  const range = resolvePeriodRange(period);
  const createdAt = range.start ? { gte: range.start, lte: range.end } : { lte: range.end };

  const sentEvents = await prisma.analyticsEvent.findMany({
    where: { storeId, type: 'LIST_WHATSAPP_SENT', createdAt },
    select: { sessionId: true, createdAt: true },
  });

  if (sentEvents.length === 0) return 0;

  const sessionIds = [...new Set(sentEvents.map((e) => e.sessionId))];

  const addEvents = await prisma.analyticsEvent.findMany({
    where: { storeId, type: 'ADD_TO_LIST', sessionId: { in: sessionIds }, productId: { not: null } },
    select: { sessionId: true, productId: true },
  });

  const productIds = [...new Set(addEvents.map((e) => e.productId!))];
  if (productIds.length === 0) return 0;

  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, price: true },
  });
  const priceById = new Map(products.map((p) => [p.id, p.price ?? 0]));

  // Um produto por sessão conta uma vez por envio dessa sessão nesse período
  // (aproximação — não tenta separar "lista 1" de "lista 2" da mesma sessão).
  const bySession = new Map<string, Set<string>>();
  for (const event of addEvents) {
    if (!bySession.has(event.sessionId)) bySession.set(event.sessionId, new Set());
    bySession.get(event.sessionId)!.add(event.productId!);
  }

  let total = 0;
  for (const sessionId of sessionIds) {
    const productSet = bySession.get(sessionId);
    if (!productSet) continue;
    for (const productId of productSet) {
      total += priceById.get(productId) ?? 0;
    }
  }

  return total; // centavos
}

// --- Catálogo (ativos/inativos) -----------------------------------------

export interface CatalogSummary {
  total: number;
  active: number;
  inactive: number;
}

export async function getCatalogSummary(storeId: string): Promise<CatalogSummary> {
  const [total, active] = await Promise.all([
    prisma.product.count({ where: { storeId } }),
    prisma.product.count({ where: { storeId, status: 'ACTIVE' } }),
  ]);

  return { total, active, inactive: total - active };
}