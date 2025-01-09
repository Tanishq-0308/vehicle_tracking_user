import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from '../../../assets/car.png';
import { CapacitorHttp } from '@capacitor/core';
import { getTruck, gpsData } from '../../apis/apis';

interface Truck {
  name: string;
  truck: {
    truck_brand: string;
    model_no: string;
    truck_number: string
  }
  gps_data: {
    status: string;
    latitude: number;
    longitude: number;
  }
}
const MapView: React.FC = () => {

  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker<any>[]>([]);
  const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  const truckId = 16;

  useEffect(() => {
    const getTrucks = async (id: any) => {
      try {
        const response = await CapacitorHttp.request({
          url: getTruck(id),
          headers: headers,
          method: 'GET'
        })
        console.log(response);
        console.log(response.data.trucks.length);

        if (response.data.trucks.length >= 0) {
          setTrucks(response.data.trucks);
        }
        setMarkerPosition({
          lat: 20.5937,
          lng: 78.9629,
        })
      } catch (err) {
        console.error("fetching truck data", err);
      }
    }
    getTrucks(id);

    return () => {
      setTrucks([])
    }
  }, [id]);


  // map loading 
  useEffect(() => {
    if (mapRef.current && markerPosition && trucks) {
      console.log(trucks);
      if (!mapInstance.current) {
        console.log("marler", markerPosition);
        mapInstance.current = L.map(mapRef.current, {
          center: [markerPosition.lat, markerPosition.lng],
          zoom: 5,
          zoomControl: true,
        });

        const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        });
        googleStreets.addTo(mapInstance.current);
        console.log("map loaded");
        if (markerRef.current) {
          markerRef.current.forEach(marker => {
            mapInstance.current.removeLayer(marker);
          });
        }

        console.log("custom icon");
        
        const customIcon = L.icon({
          iconUrl: iconUrl, // Replace with the path to your image
          iconSize: [36, 38], // Size of the icon
          iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
          popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
        });
        mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);

        if (mapInstance.current && markerRef.current) {
          markerRef.current = trucks.map((truck) => {
            const marker = L.marker([truck.gps_data.latitude, truck.gps_data.longitude], { icon: customIcon })
              .addTo(mapInstance.current)
              .bindPopup(truck.truck.truck_number);
              console.log(truck.truck.truck_number+" : "+truck.gps_data.latitude);
              
            // .openPopup();
            return marker;
          })
        }
        console.log('exit');

      } else {
        console.log('else statement');
        mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);
      }


      mapInstance.current.invalidateSize();
    }
  }, [mapRef, markerPosition]);


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
