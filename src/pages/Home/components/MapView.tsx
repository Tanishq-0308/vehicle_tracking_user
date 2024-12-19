import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet/dist/leaflet.css';
import { useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';  // Correct hook imports

const MapView: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      } catch (error) {
        console.error('Error getting location', error);
        alert('Unable to retrieve location. Please enable location services.');
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      // Initialize map only when location is available
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current, {
          center: [location.lat, location.lng],
          zoom: 16,
          zoomControl: false,
        });

        // Add Google Streets Tile Layer
        const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        });
        googleStreets.addTo(mapInstance.current);

        // Add marker for the user's current location
        L.marker([location.lat, location.lng])
          .addTo(mapInstance.current)
          .bindPopup('Your location');
      } else {
        // Reposition the map if the location changes
        mapInstance.current.setView([location.lat, location.lng], 16);
      }
    }

    if (mapInstance.current) {
      mapInstance.current.invalidateSize(); // Forces Leaflet to recalculate map size
    }

    // Cleanup map instance when component unmounts or before re-initializing
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, [location]);

  // Handling view lifecycle with Ionic hooks
  useIonViewWillEnter(() => {
    console.log('Map view will enter');
    if (mapInstance.current && location) {
      // You can initialize or refresh map here if needed
      mapInstance.current.setView([location.lat, location.lng], 16);
    }
  });

  useIonViewDidLeave(() => {
    console.log('Map view did leave');
    if (mapInstance.current) {
      // Clean up map when the page is left
      mapInstance.current.remove();
      mapInstance.current = null; // Reset the map instance
    }
  });

  return (
    <IonPage>
      <IonContent>
        <div
          ref={mapRef}
          className="map-container"
          style={{ height: '100%' }} // Ensure the map fills the container height
        ></div>
      </IonContent>
    </IonPage>
  );
};

export default MapView;
