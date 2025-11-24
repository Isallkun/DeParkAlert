'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Report } from '@/lib/mock-data';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const greenIcon = createCustomIcon('#10b981');
const orangeIcon = createCustomIcon('#f97316');
const redIcon = createCustomIcon('#ef4444');

interface MapViewProps {
  reports: Report[];
  center?: [number, number];
  zoom?: number;
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapView({ reports, center = [-6.2088, 106.8456], zoom = 12 }: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-[#1a1a24] rounded-2xl flex items-center justify-center">
        <p className="text-slate-400">Loading map...</p>
      </div>
    );
  }

  const getMarkerIcon = (report: Report) => {
    if (report.type === 'parking') {
      if (report.category === 'Tersedia') return greenIcon;
      if (report.category === 'Penuh' || report.category === 'Ilegal') return redIcon;
    } else {
      if (report.category === 'Lancar') return greenIcon;
      if (report.category === 'Padat') return orangeIcon;
      if (report.category === 'Macet Total') return redIcon;
    }
    return greenIcon;
  };

  const getStatusColor = (report: Report) => {
    if (report.status === 'verified') return 'text-emerald-400';
    if (report.status === 'pending') return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
      className="z-0"
    >
      <MapUpdater center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.location.lat, report.location.lng]}
          icon={getMarkerIcon(report)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold uppercase ${getStatusColor(report)}`}>
                  {report.status}
                </span>
                <span className="text-xs text-gray-500">
                  {report.type === 'parking' ? '🅿️' : '🚗'}
                </span>
              </div>
              <h3 className="font-bold text-sm mb-1">{report.category}</h3>
              <p className="text-xs text-gray-600 mb-2">{report.location.address}</p>
              {report.description && (
                <p className="text-xs text-gray-500 italic">{report.description}</p>
              )}
              {report.reward && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <span className="text-xs font-semibold text-violet-600">
                    +{report.reward.toFixed(1)} $DPARK
                  </span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
