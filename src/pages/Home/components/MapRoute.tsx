import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';
import 'leaflet/dist/leaflet.css';
import { useIonViewWillEnter, useIonViewDidLeave } from '@ionic/react';  // Correct hook imports
import iconUrl from '../../../assets/locate.png';
import icon2Url from '../../../assets/startlocate.png'
import icon3Url from '../../../assets/box-truck.png'
import "leaflet-routing-machine";
import { CapacitorHttp } from '@capacitor/core';
import { gpsData } from '../../apis/apis';

interface MapRouteProps {
    start_latitude: number;
    start_longitude: number;
    dest_lat: number;
    dest_long: number;
}

const MapRoute: React.FC<MapRouteProps> = ({start_latitude,start_longitude,dest_lat,dest_long}) => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<L.Map | null>(null);
     const markerRef = useRef<L.Marker | null>(null);
    const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  const truckId=16;
    
  useIonViewWillEnter(() => {
    console.log('Map view will enter');
    if (mapInstance.current) {
      // You can initialize or refresh map here if needed
      mapInstance.current.setView([20.5937,78.9629], 5);
    }
    console.log("map enter valie", markerPosition);
  });
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
    
    useEffect(()=>{
      const setLoc=async()=>{
        try {
          setLocation({
            lat:start_latitude,
            lng:start_longitude
          })
          console.log("markerpostions",markerPosition);
          
          
        } catch (error) {
          console.error('Error getting location', error);
          alert('Unable to retrieve location. Please enable location services.');
        }
      }
      setLoc();
    },[])
  
    useEffect(() => {
      if (location && mapRef.current && markerPosition) {
        console.log(markerPosition);
        
        // Initialize map only when location is available
        if (!mapInstance.current) {
          mapInstance.current = L.map(mapRef.current, {
            center: [20.5937,78.9629],
            zoom: 5,
            zoomControl: true,
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
          L.marker([start_latitude,start_longitude],{icon:customIcon2})
            .addTo(mapInstance.current)
            .bindPopup('Start').openPopup();
            L.marker([dest_lat,dest_long],{icon:customIcon})
            .addTo(mapInstance.current)
            .bindPopup('Destination').openPopup();
            
            
            const routingControl = L.Routing.control({
              waypoints: [
                L.latLng(start_latitude, start_longitude),
                L.latLng(dest_lat, dest_long),
              ],
              routeWhileDragging: false,
              lineOptions: {
                styles: [{ color: "#6FA1EC", weight: 4 }],
              },
              createMarker:function(){ return null;},
              draggbleWaypoints:false,
              itineraryOptions:{
                summaryTemplate:''
              },
              instructions:false,
              routeSummaryTemplate: '',
            }).addTo(mapInstance.current);
            routingControl.getContainer().style.display = 'none';
            // mapInstance.current.removeControl(routingControl);
        } else {
          // Reposition the map if the location changes
          mapInstance.current.setView([markerPosition.lat,markerPosition.lng]);

          if (markerRef.current) {
            mapInstance.current.removeLayer(markerRef.current);
        }
          const customIcon3 = L.icon({
            iconUrl: icon3Url, // Replace with the path to your image
            iconSize: [36, 38], // Size of the icon
            iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -30] // Point from which the popup should open relative to the iconAnchor
          });
          markerRef.current=L.marker([markerPosition.lat,markerPosition.lng],{icon:customIcon3})
                            .addTo(mapInstance.current)
                            .bindPopup("Your location").openPopup();
        }
      }
  
      if (mapInstance.current) {
        mapInstance.current.invalidateSize(); // Forces Leaflet to recalculate map size
      }
  
    }, [mapRef,markerPosition]);
  
    // Handling view lifecycle with Ionic hooks
   
  
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