import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { gpsData } from '../apis/apis';
import { CapacitorHttp } from '@capacitor/core';
import iconUrl from '../../assets/locate.png'

const Maps: React.FC = () => {
    const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  const truckId=16;
    const mapRef= useRef<HTMLDivElement | null>(null);
    const mapInstance= useRef<L.Map | null>(null);
    const markerRef = useRef<L.Marker | null>(null);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

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
        // setInterval(() => {
          getGpsData();
          
        // }, 100);
      },[])
      
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
                    mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);
                    markerRef.current= L.marker([markerPosition.lat,markerPosition.lng],{icon:customIcon})
                    .addTo(mapInstance.current)
                    .bindPopup("Your location")
            }
    
            // Ensure the map resizes correctly if necessary
            
            mapInstance.current.invalidateSize();
        }
    }, [mapRef, markerPosition]);
    
    useIonViewWillEnter(() => {
        console.log('Map view will enter');
        if (mapInstance.current && markerPosition) {
          // You can initialize or refresh map here if needed
          mapInstance.current.setView([markerPosition.lat, markerPosition.lng], 10);
        }
      });
    return (
        <IonPage>
            <IonHeader>
                <IonTitle>
                    maps
                </IonTitle>
            </IonHeader>
            <IonContent className="ion-padding">
                <div
                ref={mapRef}
                className="map-container"
                style={{ height: '100%' }}>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Maps;