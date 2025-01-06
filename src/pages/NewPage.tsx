import { CapacitorHttp } from '@capacitor/core';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { getTrips } from './apis/apis';
import { map } from 'leaflet';
import { format } from 'date-fns';

interface Trip {
    current_location: string;
    task_name: string;
    date_time: string;
    ID: any;
    status: string;
    truck: {
      model_no: string;
      truck_brand: string;
      truck_number: string
    }
  }

const NewPage: React.FC = () => {
    const isLoadingRef = useRef(false);
    const id = localStorage.getItem('id')
    const [page, setPage] = useState(1);
    const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(()=>{
        getTrip(page);
        console.log("enter"+page);
    },[page])
    const getTrip = async (page:any) => {
        if (isLoadingRef.current) return; // Prevent multiple calls
    isLoadingRef.current = true;
        console.log("gettrip"+page);
        
          try {
            const response = await CapacitorHttp.request({
              url: getTrips(id, page),
              method: 'GET',
              headers: headers
            })
            console.log(response.data.trips);
            const data= response.data.trips;
            setTrips((prevItems) => [...data,...prevItems]);
    
          } catch (err) {
            console.error("fetching trip data", err);
          } finally {
            isLoadingRef.current = false;
          }
        }

    
    const handleIonInfinite=()=>{
        console.log("inidinte");
        
        setPage((prevPage) => prevPage + 1);
        console.log("scroll"+page);
        
    }



    const formatDateTime = (dateTimeString: any) => {
        if (!dateTimeString) {
          // console.error("Invalid date time string: ", dateTimeString);
          return null; // or any default value you'd like to return
        }
    
        try {
          const date = new Date(dateTimeString);
    
          // Check if the date is valid
          if (isNaN(date.getTime())) {
            throw new RangeError('Invalid date');
          }
    
          return format(date, 'MMMM d, yyyy h:mm a'); // Customize the format as needed
        } catch (err) {
          console.error("Date time error:", err);
          return null; // or any default value you'd like to return
        }
      };

    return (
        <IonPage>
        <IonHeader>
            <IonTitle>
                infinite scroll
            </IonTitle>
        </IonHeader>
        <IonContent className='segmentContent'>
        <IonList className='bg-[#343B45]'>
                  {
                    trips.slice().reverse().map((trip, index) => (
                      //<IonItem>
                      <IonGrid key={index}>
                        <IonRow >
                          <IonCol>
                            <div className='bg-white rounded-lg m-2'>
                              <div className='flex items-center p-2 border-b rounded-t-xl bg-gray-200 '>
                                <div className='h-8 w-9 flex'>
                                  <img
                                    // src={truckImg}
                                    alt="truckimg"
                                    className="rounded-full" />
                                </div>
                                <div className='flex w-full justify-between p-1 mx-2'>
                                  <h2 className="flex items-center text-lg font-bold leading-4 m-0">
                                    {trip.truck.truck_number}
                                    <sub className="text-gray-600 font-normal text-[12px] mx-1 my-0">
                                      {trip.truck.truck_brand} {trip.truck.model_no}
                                    </sub>
                                  </h2>
                                  <span className="text-green-700  font-bold m-0 uppercase">
                                    {trip.status}
                                  </span>
                                </div>
                              </div>
                              <div className='px-3 py-1'>
                                <IonRow>
                                  <IonCol size="5">
                                    <p className='text-gray-700 font-light'>Task</p>
                                    <p className=' text-gray-600 font-normal'>{trip.task_name}</p>
                                  </IonCol>
                                  <IonCol size="">
                                    <p className='text-gray-700 font-light'>Departed</p>
                                    <p className=' text-gray-600 font-normal'>{formatDateTime(trip.date_time)}</p>
                                  </IonCol>
                                </IonRow>
                              </div>
                              <div className='px-3 py-1'>
                                <IonRow>
                                  <IonCol size='9'>
                                    <p className='text-gray-700 font-light'>Current Location</p>
                                    <p className=' text-gray-600 font-normal'>{trip.current_location}</p>
                                  </IonCol>
                                  <IonCol className='flex items-center justify-center '>
                                    <div>
                                      <IonButton fill='clear'>
                                        {/* <IonIcon icon={map} color='primary' className='border-2 p-2 rounded-full'></IonIcon> */}
                                      </IonButton>
                                    </div>
                                  </IonCol>
                                </IonRow>
                              </div>
                            </div>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                      //</IonItem>
                    ))
                  }
                </IonList>
                <IonInfiniteScroll onIonInfinite={(e: CustomEvent<void>) =>handleIonInfinite()}>
                <IonInfiniteScrollContent />
            </IonInfiniteScroll>
       </IonContent>
       </IonPage>
    );
};

export default NewPage;