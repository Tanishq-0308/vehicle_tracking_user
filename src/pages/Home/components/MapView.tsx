import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet/dist/leaflet.css';
import { useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';  // Correct hook imports
import iconUrl from '../../../assets/car.png';
import { CapacitorHttp } from '@capacitor/core';
import { gpsData } from '../../apis/apis';

const MapView: React.FC = () => {
  // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null); // Reference for the polyline
  const lineCoordinates = useRef<Array<{ lat: number; lng: number }>>([]); // Store line coordinates
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  const truckId=16;

 useEffect(()=>{
        const getGpsData=async()=>{
          try{
            const response= await CapacitorHttp.request({
              url:gpsData(truckId,id),
              method:'GET',
              headers:headers
            })
            console.log("latitude: ",response.data.latitude + "longitude", response.data.longitude);
            setMarkerPosition({
              lat: response.data.latitude,
              lng: response.data.longitude,
            });
          }catch(err){
            console.error(err);
          }
        }
        const inter= setInterval(() => {
          getGpsData();
          
        }, 1000);
        console.log('enter');
        

        return(()=>{
          console.log('exit');
          
          clearInterval(inter);
        })
      },[])


  // map loading 
  useEffect(() => {
    if (mapRef.current && markerPosition) {
        if (!mapInstance.current) {
            mapInstance.current = L.map(mapRef.current, {
                center: [markerPosition.lat, markerPosition.lng],
                zoom: 10,
                zoomControl: true,
            });

            const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            });
            googleStreets.addTo(mapInstance.current);

            
        } else {
            mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);

        // Remove the previous marker if it exists
        if (markerRef.current) {
            mapInstance.current.removeLayer(markerRef.current);
        }
            // Update the map's center
            const customIcon = L.icon({
                iconUrl: iconUrl, // Replace with the path to your image
                iconSize: [36, 38], // Size of the icon
                iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
                popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
              });
                // mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);
                markerRef.current= L.marker([markerPosition.lat,markerPosition.lng],{icon:customIcon})
                .addTo(mapInstance.current)
                .bindPopup("Your location").openPopup();

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
