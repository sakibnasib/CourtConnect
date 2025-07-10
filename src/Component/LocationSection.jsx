import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Optional: custom marker icon setup (Leaflet default marker doesn't always render properly without this)
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
const LocationSection = () => {
    return (
        <section className="bg-white py-16 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-4"> Our Location</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
          Visit our club for a world-class sports experience.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Address */}
          <div className="text-left space-y-4">
            <h3 className="text-xl font-semibold text-secondary">Address</h3>
            <p className="text-gray-700">
              CourtConnect Club<br />
              House 55, Road 9/A, Dhanmondi<br />
              Dhaka-1209, Bangladesh
            </p>
            <p className="text-gray-700">
              📞 Phone: +880 1234-567890<br />
              📧 Email: contact@courtconnect.club
            </p>
          </div>

          {/* Embedded Google Map */}
         <div className="">
             <MapContainer
        center={[23.7896, 90.3785]}
        zoom={16}
        scrollWheelZoom={false}
        className="h-72 w-full z-0"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.7896, 90.3785]} icon={customIcon}>
          <Popup>
            <strong>CourtConnect</strong><br />
            House 55, Road 9/A, Dhanmondi<br />
            Dhaka-1209, Bangladesh
          </Popup>
        </Marker>
      </MapContainer>
         </div>
        </div>
      </div>
    </section>
    );
};

export default LocationSection;