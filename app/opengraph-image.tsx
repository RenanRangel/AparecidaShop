import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AparecidaShop — comércio local de Aparecida-SP';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
          background: '#1F5C4A',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 72,
              height: 72,
              borderRadius: 18,
              background: '#F1F4EF',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: '#1F5C4A',
            }}
          >
            📍
          </div>
          <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#F1F4EF' }}>
            Aparecida<span style={{ color: '#E8A33D' }}>Shop</span>
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 24, fontSize: 28, color: '#D3E5DD' }}>
          Comércio local de Aparecida-SP
        </div>
      </div>
    ),
    { ...size },
  );
}