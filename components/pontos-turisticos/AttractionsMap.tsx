'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Attraction } from '@/types/attractions';
import { mapClustersFixture } from '@/data/fixtures/map-clusters.fixtures';

function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function AttractionsMap({
  attractions,
}: {
  attractions: Attraction[];
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeMap() {
      if (!mapRef.current || leafletMapRef.current) {
        return;
      }

      const L = await import('leaflet');

      if (!mounted || !mapRef.current) {
        return;
      }

      const map = L.map(mapRef.current, {
        center: [-22.853, -45.244],
        zoom: 14,
        scrollWheelZoom: false,
      });

      leafletMapRef.current = map;

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      ).addTo(map);

      const pineIcon = L.divIcon({
        className: '',
        html: `
          <div style="
            width:16px;
            height:16px;
            border-radius:50%;
            background:#1F5C4A;
            border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.35);
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      mapClustersFixture.forEach((cluster) => {
        const points = attractions.filter(
          (a) => a.mapClusterId === cluster.id
        );

        const marker = L.marker(
          [cluster.lat, cluster.lng],
          {
            icon: pineIcon,
          }
        ).addTo(map);

        const pointsHtml = points
          .map(
            (point) =>
              `<li>${point.emoji} ${point.name}</li>`
          )
          .join('');

        const googleMapsLink = points[0]?.mapSearchQuery
          ? `
            <a
              href="${mapsSearchUrl(
                `${cluster.name}, Aparecida - SP`
              )}"
              target="_blank"
              rel="noopener noreferrer"
              style="
                display:inline-block;
                margin-top:8px;
                color:#1F5C4A;
                font-size:12px;
                font-weight:600;
                text-decoration:none;
              "
            >
              Abrir no Google Maps →
            </a>
          `
          : '';

        marker.bindPopup(`
          <div>
            <p style="
              margin:0;
              font-weight:600;
              font-size:13.5px;
            ">
              ${cluster.name}
            </p>

            <p style="
              margin:2px 0 0;
              font-size:11.5px;
              color:#666;
            ">
              ${points.length} pontos nesta área
            </p>

            <ul style="
              margin:8px 0 0;
              padding-left:18px;
              max-height:160px;
              overflow-y:auto;
              font-size:12px;
            ">
              ${pointsHtml}
            </ul>

            ${googleMapsLink}
          </div>
        `);
      });
    }

    initializeMap();

    return () => {
      mounted = false;

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [attractions]);

  return (
    <div
      ref={mapRef}
      className="overflow-hidden rounded-2xl border border-sand"
      style={{
        height: '420px',
        width: '100%',
      }}
    />
  );
}