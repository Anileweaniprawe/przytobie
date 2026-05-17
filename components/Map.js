'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { PT } from '@/lib/theme';

// A beautiful custom marker using standard HTML/CSS, matching our theme
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="
        background-color: ${PT.salmon};
        width: 32px;
        height: 32px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #fff;
        box-shadow: 0 4px 10px rgba(58,42,63,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background-color: #fff;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });
};

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function FacilitiesMap({ clinics, userLocation = [51.7592, 19.4560] }) { // Default to Łódź
  const lodzBounds = [
    [51.65, 19.30], // South-West
    [51.85, 19.60]  // North-East
  ];

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
      <MapContainer 
        center={userLocation} 
        zoom={12} 
        minZoom={11}
        maxBounds={lodzBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" 
        />
        {clinics.map((clinic, idx) => {
          if (!clinic.lat || !clinic.lng) return null;
          return (
            <Marker key={idx} position={[clinic.lat, clinic.lng]} icon={createCustomIcon()}>
              <Popup className="custom-popup">
                <div style={{ 
                  fontFamily: 'var(--font-manrope), system-ui',
                  color: PT.plum,
                  padding: '4px'
                }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{clinic.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(58,42,63,0.6)', marginBottom: 12 }}>{clinic.city} • {clinic.dist} od Ciebie</div>
                  <a href={`tel:${clinic.phone}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px 12px',
                    background: PT.plum,
                    color: '#fff',
                    borderRadius: 16,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    width: '100%'
                  }}>
                    Zadzwoń
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <style jsx global>{`
        .leaflet-container {
          background-color: #f7f5f8;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(58,42,63,0.1);
          padding: 8px;
        }
        .custom-popup .leaflet-popup-tip {
          box-shadow: 0 4px 16px rgba(58,42,63,0.1);
        }
      `}</style>
    </div>
  );
}
