'use client';

import { useEffect } from 'react';
import { track, classifyOrigin } from '@/lib/analytics/track-client';

export function TrackStoreView({ storeId }: { storeId: string }) {
  useEffect(() => {
    track({ type: 'STORE_VIEW', storeId, origin: classifyOrigin() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  return null;
}