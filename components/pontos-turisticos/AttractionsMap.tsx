'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import type { Attraction } from '@/types/attractions';
import { mapClustersFixture } from '@/data/fixtures/map-clusters.fixtures';

const pineIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:16px;height:16px;border-radius:50%;
    background:#1F5C4A;border:3px solid white;
    box-shadow:0 2px 8px rgba(0,0,0,0.35);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function AttractionsMap({ attractions }: { attractions: Attraction[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-sand">
      <MapContainer
        center={[-22.853, -45.244]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: '420px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapClustersFixture.map((cluster) => {
          const points = attractions.filter((a) => a.mapClusterId === cluster.id);
          return (
            <Marker key={cluster.id} position={[cluster.lat, cluster.lng]} icon={pineIcon}>
              <Popup maxWidth={260}>
                <p className="font-display text-[13.5px] font-semibold text-ink">{cluster.name}</p>
                <p className="mt-0.5 text-[11.5px] text-ink-soft">{points.length} pontos nesta área</p>
                <ul className="mt-2 flex max-h-40 flex-col gap-1 overflow-y-auto text-[12px]">
                  {points.map((p) => (
                    <li key={p.id}>{p.emoji} {p.name}</li>
                  ))}
                </ul>
                {points[0]?.mapSearchQuery && (
                  <Link
                    href={mapsSearchUrl(cluster.name + ', Aparecida - SP')}
                    target="_blank"
                    className="mt-2 inline-block text-[12px] font-semibold text-pine hover:underline"
                  >
                    Abrir no Google Maps →
                  </Link>
                )}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}