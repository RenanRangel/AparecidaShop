import { ImageResponse } from 'next/og';
import { storeRepository } from '@/lib/repositories';

export const runtime = 'edge';
export const alt = 'Loja no AparecidaShop';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TONE_BG: Record<string, string> = {
  pine: '#1F5C4A',
  marigold: '#E8A33D',
  sand: '#E7E1D2',
};

const TONE_TEXT: Record<string, string> = {
  pine: '#F1F4EF',
  marigold: '#16241D',
  sand: '#16241D',
};

export default async function Image({ params }: { params: { storeSlug: string } }) {
  const store = await storeRepository.getBySlug(params.storeSlug);

  const background = store ? TONE_BG[store.coverTone] ?? '#1F5C4A' : '#1F5C4A';
  const textColor = store ? TONE_TEXT[store.coverTone] ?? '#F1F4EF' : '#F1F4EF';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background,
          fontFamily: 'sans-serif',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 96,
            height: 96,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.18)',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
            color: textColor,
            marginBottom: 32,
          }}
        >
          {store?.logoInitials ?? 'AS'}
        </div>
        <div style={{ display: 'flex', fontSize: 56, fontWeight: 700, color: textColor }}>
          {store?.name ?? 'Loja no AparecidaShop'}
        </div>
        {store && (
          <div style={{ display: 'flex', marginTop: 16, fontSize: 26, color: textColor, opacity: 0.85 }}>
            {store.category} · Aparecida-SP
          </div>
        )}
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 22,
            color: textColor,
            opacity: 0.7,
          }}
        >
          AparecidaShop
        </div>
      </div>
    ),
    { ...size },
  );
}