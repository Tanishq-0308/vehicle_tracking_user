import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet/dist/leaflet.css';
import { useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';  // Correct hook imports
import iconUrl from '../../../assets/locate.png';
import icon2Url from '../../../assets/pin.png'

interface MapRouteProps {
    start_latitude: number;
    start_longitude: number;
    dest_lat: number;
    dest_long: number;
}

const MapRoute: React.FC<MapRouteProps> = ({start_latitude,start_longitude,dest_lat,dest_long}) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
  
    useEffect(() => {
      const getCurrentLocation = async () => {
        try {
          const position = await Geolocation.getCurrentPosition();
        //   setLocation({
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude,
        //   });
          setLocation({
            lat:start_latitude,
            lng:start_longitude
          })
          
          
        } catch (error) {
          console.error('Error getting location', error);
          alert('Unable to retrieve location. Please enable location services.');
        }
      };
      console.log(start_latitude);
      console.log(start_longitude);
      console.log(dest_lat);
      console.log(dest_long);
      
      
      
      
  
      getCurrentLocation();
    }, []);
  
    useEffect(() => {
      if (location && mapRef.current) {
        console.log(location);
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
  
          const customIcon = L.icon({
            iconUrl: iconUrl, // Replace with the path to your image
            iconSize: [36, 38], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
          });
          const customIcon2 = L.icon({
            iconUrl: icon2Url, // Replace with the path to your image
            iconSize: [36, 38], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
          });
  
          // Add marker for the user's current location
          L.marker([start_latitude,start_longitude],{icon:customIcon})
            .addTo(mapInstance.current)
            .bindPopup('Your location');
            L.marker([dest_lat,dest_long],{icon:customIcon2})
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

export default MapRoute;