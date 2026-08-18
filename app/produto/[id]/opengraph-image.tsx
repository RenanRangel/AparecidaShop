import { ImageResponse } from 'next/og';
import { productRepository } from '@/lib/repositories';
import { formatPriceBRL } from '@/lib/utils';

export const alt = 'Produto no AparecidaShop';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
  const product = await productRepository.getById(params.id);

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
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', fontSize: 52, fontWeight: 700, color: '#F1F4EF' }}>
          {product?.name ?? 'Produto no AparecidaShop'}
        </div>
        {product && (
          <>
            <div style={{ display: 'flex', marginTop: 16, fontSize: 26, color: '#D3E5DD' }}>
              {product.storeName} · {product.category}
            </div>
            <div style={{ display: 'flex', marginTop: 24, fontSize: 36, fontWeight: 700, color: '#E8A33D' }}>
              {formatPriceBRL(product.price)}
            </div>
          </>
        )}
      </div>
    ),
    { ...size },
  );
}