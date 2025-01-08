import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { getTruck, gpsData } from '../apis/apis';
import { CapacitorHttp } from '@capacitor/core';
import iconUrl from '../../assets/locate.png'

interface Truck {
  name: string;
  truck:{
    truck_brand: string;
    model_no: string;
    truck_number: string
  }
  gps_data:{
    status:string;
    latitude:number;
    longitude:number;
  }
}

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
    const markerRef = useRef<L.Marker<any>[]>([]);
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);

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


    // useEffect(()=>{
    //     const getGpsData=async()=>{
    //       try{
    //         const response= await CapacitorHttp.request({
    //           url:gpsData(truckId,id),
    //           method:'GET',
    //           headers:headers
    //         })
    //         console.log("latitude: ",response.data.latitude + "longitude", response.data.longitude);
    //         setMarkerPosition({
    //           lat: 20.5937,
    //           lng: 78.9629,
    //         });
    //       }catch(err){
    //         console.error(err);
    //       }
    //     }
    //     // setInterval(() => {
    //       getGpsData();
          
    //     // }, 100);
    //   },[])
      
      useEffect(() => {
        if (mapRef.current && markerPosition && trucks) {
          console.log(trucks);
          
            if (!mapInstance.current) {
              console.log("marler",markerPosition);
              
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

                
            } else {
                mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);

            // Remove the previous marker if it exists
            if (markerRef.current) {
              markerRef.current.forEach(marker => {
                  mapInstance.current.removeLayer(marker);
              });
          }
                // Update the map's center
                const customIcon = L.icon({
                    iconUrl: iconUrl, // Replace with the path to your image
                    iconSize: [36, 38], // Size of the icon
                    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
                    popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
                  });
                  mapInstance.current.setView([markerPosition.lat, markerPosition.lng]);

            if(mapInstance.current && markerRef.current){
              markerRef.current= trucks.map((truck)=>{
                const marker= L.marker([truck.gps_data.latitude, truck.gps_data.longitude],{icon:customIcon})
                .addTo(mapInstance.current)
                .bindPopup(truck.truck.truck_number)
                // .openPopup();
                return marker;
              })

            }

                    // markerRef.current= L.marker([markerPosition.lat,markerPosition.lng],{icon:customIcon})
                    // .addTo(mapInstance.current)
                    // .bindPopup("Your location")
            }
    
            // Ensure the map resizes correctly if necessary
            
            mapInstance.current.invalidateSize();
        }
    }, [mapRef, markerPosition, trucks]);
    
    // useIonViewWillEnter(() => {
    //     console.log('Map view will enter');
    //     if (mapInstance.current && markerPosition) {
    //       // You can initialize or refresh map here if needed
    //       mapInstance.current.setView([markerPosition.lat, markerPosition.lng], 10);
    //     }
    //   });
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