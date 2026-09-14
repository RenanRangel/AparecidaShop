'use client';

import { useMemo, useState } from 'react';
import { LocateFixed, X } from 'lucide-react';
import { StoreCard } from '@/components/shared/StoreCard';
import { STORE_CATEGORIES } from '@/lib/constants/categories';
import { STORE_ZONES, STORE_ZONE_LABELS, type StoreZoneValue } from '@/lib/constants/zones';
import type { Store, StoreCategory } from '@/types';

type CategoryOption = StoreCategory | 'Todas';
type ZoneOption = StoreZoneValue | 'Toda Aparecida';

function haversineDistanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export function StoreDirectoryFilters({ stores }: { stores: Store[] }) {
  const [activeCategory, setActiveCategory] = useState<CategoryOption>('Todas');
  const [activeZone, setActiveZone] = useState<ZoneOption>('Toda Aparecida');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  function handleSortByDistance() {
    if (userLocation) {
      setUserLocation(null); // clicar de novo desativa a ordenação
      return;
    }

    if (!navigator.geolocation) {
      setLocationError('Seu navegador não suporta localização.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        setIsLocating(false);
      },
      () => {
        setLocationError('Não foi possível acessar sua localização.');
        setIsLocating(false);
      },
      { timeout: 8000 },
    );
  }

  const filtered = useMemo(() => {
    let result = stores;

    if (activeCategory !== 'Todas') {
      result = result.filter((store) => store.category === activeCategory);
    }
    if (activeZone !== 'Toda Aparecida') {
      result = result.filter((store) => store.zone === activeZone);
    }

    if (userLocation) {
      result = [...result].sort((a, b) => {
        if (!a.latitude || !a.longitude) return 1;
        if (!b.latitude || !b.longitude) return -1;
        const distA = haversineDistanceKm(userLocation, { lat: a.latitude, lng: a.longitude });
        const distB = haversineDistanceKm(userLocation, { lat: b.latitude, lng: b.longitude });
        return distA - distB;
      });
    }

    return result;
  }, [stores, activeCategory, activeZone, userLocation]);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {(['Todas', ...STORE_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              activeCategory === cat
                ? 'border-pine bg-pine text-bg'
                : 'border-sand bg-white text-ink-soft hover:border-pine hover:text-pine'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {(['Toda Aparecida', ...STORE_ZONES] as const).map((zone) => (
          <button
            key={zone}
            type="button"
            onClick={() => setActiveZone(zone)}
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
              activeZone === zone
                ? 'border-pine-deep bg-pine-50 text-pine'
                : 'border-sand bg-white text-ink-soft hover:border-pine hover:text-pine'
            }`}
          >
            {zone === 'Toda Aparecida' ? zone : STORE_ZONE_LABELS[zone]}
          </button>
        ))}

        <span className="mx-1 h-4 w-px bg-sand" aria-hidden />

        <button
          type="button"
          onClick={handleSortByDistance}
          disabled={isLocating}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors disabled:opacity-60 ${
            userLocation
              ? 'border-pine-deep bg-pine-50 text-pine'
              : 'border-sand bg-white text-ink-soft hover:border-pine hover:text-pine'
          }`}
        >
          {userLocation ? <X size={13} /> : <LocateFixed size={13} />}
          {isLocating ? 'Localizando...' : userLocation ? 'Ordenado por distância' : 'Ordenar por distância'}
        </button>
      </div>

      {locationError && <p className="mt-2 text-[12px] text-red-600">{locationError}</p>}

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-[14px] text-ink-soft">
          Nenhuma loja encontrada com esses filtros.
        </p>
      )}
    </>
  );
}