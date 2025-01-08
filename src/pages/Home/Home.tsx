import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { add, call, camera, chevronBackSharp, chevronForward, chevronUp, ellipseOutline, locationOutline, map } from 'ionicons/icons';
import {useContext, useEffect, useRef, useState } from 'react';
import MapView from './components/MapView';
import truckImg from '../../assets/truck1.png'
import { CapacitorHttp } from '@capacitor/core';
import { getTrips } from '../apis/apis';
import { format } from 'date-fns';
import { App } from '@capacitor/app';
import { useHistory } from 'react-router';
import MapRoute from './components/MapRoute';
import AuthContext from '../contexts/Authentication/AuthContext';
import { useAuth } from '../contexts/Auth';

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

const Home: React.FC = () => {
  const isLoadingRef = useRef(false);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedSegment, setSelectedSegment] = useState('trip_history');
  const [selectedModalSegment, setSelectedModalSegment] = useState('about_trip');
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const id = localStorage.getItem('id')
  const [loading, setLoading] = useState(false)
  const [get, setGet] = useState('');
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [selectSecondSegment, setSelectSecondSegment] = useState('All')
  const bearer_token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  const {isAuthenticated}= useAuth();

  console.log("Authenticate", isAuthenticated);
  

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const handleModalSegmentChange = (event: CustomEvent) => {
    setSelectedModalSegment(event.detail.value)
  }

  // get trip details 
  useEffect(() => {

    const getTrip = async (page: any) => {
      if (isLoadingRef.current) return; // Prevent multiple calls
      isLoadingRef.current = true;
      try {
        const response = await CapacitorHttp.request({
          url: getTrips(id, page),
          method: 'GET',
          headers: headers
        })
        console.log(response.data.trips);
        console.log(response.data.trips.length);

        setGet(response.data.trips.length);

        const data = response.data.trips;
        setTrips((prevItems) => [...prevItems, ...data]);

      } catch (err) {
        console.error("fetching trip data", err);
      } finally {
        isLoadingRef.current = false;
      }
    }
    getTrip(page);
  }, [id, page])

  // Date time formatting
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

  // Refresh page 
  // const doRefresh = (ev: any) => {
  //   ev.detail.complete();
  //   setLoading(prev => !prev)
    
  // }

  const ionRouter = useIonRouter();
  document.addEventListener('ionBackButton', async (event: any) => {
    const pass = localStorage.getItem('id')

    event.detail.register(-1, async () => {
      if (pass) {
        console.log("pass valuedd", pass);

        const ans = window.confirm("Are you sure to exit ?")
        if (ans) {
          // await Preferences.remove({key:'signin'});
          App.exitApp();

        }
        else {
          history.push('/app');
        }
      }
    });
  });

  useIonViewWillEnter(() => {
    console.log("started");

    const backbutton = () => {
      const pass = localStorage.getItem('id');
      if (pass) {
        console.log("pass valued", pass);
        console.log(window.localStorage);
      }
    }
    backbutton();
  })

  const handleIonInfinite = (e: any) => {
    if (get == '0') {
      (e.target as HTMLIonInfiniteScrollElement).disabled = true;
    }
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      e.target.complete()
    }, 2000);
  }
  const handleSecondSegmentChange = (event: CustomEvent) => {
    setSelectSecondSegment(event.detail.value)
  }
  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar className=" bg-[#343b45]" color={'transparent'}>
          <IonButton slot="start" fill='clear' color={'medium'}>
            <IonMenuButton />
            <div className='flex text-center tab_btn'>
              <IonSegment color={'warning'} mode='md' value={selectedSegment} onIonChange={handleSegmentChange} >
                <IonSegmentButton value='trip_history' contentId='trip_history'>
                  <IonLabel >List view</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='map_location' contentId='map_location'>
                  <IonLabel >Map view</IonLabel>
                </IonSegmentButton>
              </IonSegment>
            </div>
          </IonButton>
        </IonToolbar>
        <div className='tab2'>
          <IonSegment scrollable={true} color={'warning'} value={selectSecondSegment} onIonChange={handleSecondSegmentChange}>
          <IonSegmentButton value='All'>
              All
            </IonSegmentButton>
            <IonSegmentButton value='Pending'>
              Pending
            </IonSegmentButton>
            <IonSegmentButton value='Moving'>
              In Transit
            </IonSegmentButton>
            <IonSegmentButton value='Stopped'>
              Stopped
            </IonSegmentButton>
            <IonSegmentButton value='Idle'>
              Idle
            </IonSegmentButton>
            <IonSegmentButton value='In Garage'>
              In Garage
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonHeader>
      <IonContent className='content'>
        {/* <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher> */}
        <IonSegmentView>
          {selectedSegment === 'trip_history' && (
            <>
              <IonSegmentContent id='trip_history'>
                <IonContent className='segmentContent'>
                  <IonList className='bg-[#343B45]'>
                    {
                      trips
                      .filter((trip)=>{
                        switch (selectSecondSegment){
                          case 'Pending':
                            return trip.status=== 'Pending';
                          case 'Moving':
                            return trip.status=== 'Moving';
                          case 'Stopped':
                            return trip.status=== 'Stopped';
                          case 'Idle':
                            return trip.status=== 'Idle';
                          case 'In Garage':
                            return trip.status=== 'In Garage';
                          case 'All':
                          return true;
                        }
                      })
                      .map((trip, index) => (
                        <IonGrid key={index} onClick={() => setSelectedUser(trip)}>
                          <IonRow >
                            <IonCol>
                              <div className='bg-white rounded-lg m-2'>
                                <div className='flex items-center p-2 border-b rounded-t-xl bg-gray-200 '>
                                  <div className='h-8 w-9 flex'>
                                    <img
                                      src={truckImg}
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
                                    <IonCol size="6">
                                      <p className='text-gray-700 font-light'>Task</p>
                                      <p className=' text-gray-600 text-[15px] font-normal'>{trip.task_name}</p>
                                    </IonCol>
                                    <IonCol size="">
                                      <p className='text-gray-700 font-light'>Departed</p>
                                      <p className=' text-gray-600 text-[15px] font-normal'>{formatDateTime(trip.date_time)}</p>
                                    </IonCol>
                                  </IonRow>
                                </div>
                                <div className='px-3 py-1'>
                                  <IonRow>
                                    <IonCol size='9'>
                                      <p className='text-gray-700 font-light'>Current Location</p>
                                      <p className=' text-gray-600 text-[15px] font-normal'>{trip.current_location}</p>
                                    </IonCol>
                                    <IonCol className='flex items-center justify-center '>
                                      <div>
                                        <IonButton fill='clear'>
                                          <IonIcon icon={map} color='primary' className='border-2 p-2 rounded-full'></IonIcon>
                                        </IonButton>
                                      </div>
                                    </IonCol>
                                  </IonRow>
                                </div>
                              </div>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      ))
                    }
                  </IonList>
                  <IonInfiniteScroll threshold='50px'
                    onIonInfinite={(event) => {
                      handleIonInfinite(event)
                    }}
                  >
                    <IonInfiniteScrollContent loadingText="Loading items" loadingSpinner="bubbles" />
                  </IonInfiniteScroll>
                </IonContent>
              </IonSegmentContent>
              <IonFab horizontal='end' vertical='bottom' slot='' className='ion-padding'>
                <IonFabButton routerLink='/create-trip'>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </>
          )}
          {selectedSegment === 'map_location' && (
            <IonSegmentContent id='map_location' className='h-screen'>
              <MapView />
            </IonSegmentContent>
          )}
        </IonSegmentView>
        <IonModal ref={modal} isOpen={selectedUser !== null}
          onIonModalDidDismiss={() => setSelectedUser(null)}
        >
          <IonHeader className='ion-no-border'>
            <IonToolbar className='IonToolbar'>
              <div className='flex items-center'>
                <IonButton fill='clear' onClick={() => modal.current?.dismiss()}>
                  <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                </IonButton>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" >
            <MapRoute 
            start_latitude={selectedUser?.start_latitude}
            start_longitude={selectedUser?.start_longitude}
            dest_lat={selectedUser?.dest_latitude}
            dest_long={selectedUser?.dest_longitude}
            />
          </IonContent>
          <IonFooter className={`h-[45px] absolute transition-all ease-in-out duration-700 bottom-0 w-full`} id='upcoming-task-modal'>
            <div id='openModal' className="ion-text-center pt-2 pb-4 px-0 bg-[#222428] text-gray-400 overflow-hidden rounded-t-xl w-[calc(100%-25px)] h-[75px] m-auto">
              <IonIcon icon={chevronUp} className="block m-auto text-2xl mb-2" color="light"></IonIcon>
            </div>
          </IonFooter>
          <IonModal isOpen={true} trigger='openModal' initialBreakpoint={0.5} breakpoints={[0.25, 0.5, 0.75]}>
            <IonHeader className='bg-[#e4dede] ion-no-border' >
              <div className=''>
                <div className='flex justify-between px-5 pt-4 items-center pb-1'>
                  <div className='flex gap-3'>
                    <div className=' min-w-11 max-w-14 '>
                      <img src={truckImg} alt="" className='rounded-[100%] bg-contain w-14 h-12' />
                    </div>
                    <div>
                      <p className='font-bold text-lg'>{selectedUser?.truck.truck_number}
                      </p>
                      <p className='text-gray-600 font-light text-xs'>
                        {selectedUser?.truck.truck_brand} {selectedUser?.truck.model_no}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2 className='m-0 text-sm font-bold leading-4 pb-2 text-[#27bd2e]' >In Transist</h2>
                  </div>
                </div>
                <IonSegment mode='md' value={selectedModalSegment} onIonChange={handleModalSegmentChange}>
                  <IonSegmentButton className='ion-text-center text-xs font-bold text-black' contentId='about_trip' value='about_trip'>
                    About Trip
                  </IonSegmentButton>
                  <IonSegmentButton className='ion-text-center text-xs font-bold text-black' value='vehicle_info' contentId='vehicle_info'>
                    Vehicle Info
                  </IonSegmentButton>
                </IonSegment>
              </div>
            </IonHeader>
            <IonContent>
              <IonSegmentView>
                {selectedModalSegment == 'about_trip' && (
                  <IonSegmentContent>
                    <div className='px-7 py-5'>
                      <IonRow>
                        <IonCol size="6">
                          <p className='text-gray-500 font-light text-sm'>Task</p>
                          <p className=' text-gray-600 font-normal'>{selectedUser?.task_name}</p>
                        </IonCol>
                        <IonCol size="">
                          <p className='text-gray-500 font-light text-sm'>Departed</p>
                          <p className=' text-gray-600 font-normal'>{formatDateTime(selectedUser?.date_time)}</p>
                        </IonCol>
                      </IonRow>
                    </div>
                    <div className='px-5 pt-2'>
                      <IonGrid>
                        <IonRow className='my-5'>
                          <IonIcon icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-2' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Trip start location</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.start_location}</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='my-5'>
                          <IonIcon icon={locationOutline} className=' rounded-full text-lg  mr-4 mt-4' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Current location</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.current_location}</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='my-5'>
                          <IonIcon icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-5' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Trip end location</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.destination}</p>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </div>
                  </IonSegmentContent>
                )}

                {selectedModalSegment == 'vehicle_info' && (
                  <IonSegmentContent>
                    <div className='py-2'>
                      <IonGrid>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="8">
                            <p className='text-gray-500 font-light text-sm'>Vehicle Model</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.truck.truck_brand} {selectedUser?.truck.model_no}</p>
                          </IonCol>
                          <IonCol size="">
                            <p className='text-gray-500 font-light text-sm'>Vehicle Number</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.truck.truck_number}</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="8">
                            <p className='text-gray-500 font-light text-sm'>Max.Load Capacity</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.load_carrying}</p>
                          </IonCol>
                          <IonCol size="">
                            <p className='text-blue-500 font-semibold'>Edit Vehicle info</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="9">
                            <p className='text-gray-500 font-light text-sm'>Driver</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.driver.name} ({selectedUser?.driver.phone_number})</p>
                          </IonCol>
                          <IonCol size="">
                            <IonButton fill='clear'>
                              <a href="tel:+1-1800-555-5555" className='text-xl '>
                                <IonIcon icon={call} color='primary' className='border-2 p-2 rounded-full'></IonIcon>
                              </a>
                            </IonButton>
                          </IonCol>
                        </IonRow>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="9">
                            <p className='text-gray-500 font-light text-sm'>Helper</p>
                            <p className=' text-gray-600 font-normal'>{selectedUser?.helper.name} ({selectedUser?.helper.phone_number})</p>
                          </IonCol>
                          <IonCol size="">
                            <IonButton fill='clear'>
                              <a href="tel:+1-1800-555-5555" className='text-xl '>
                                <IonIcon icon={call} color='primary' className='border-2 p-2 rounded-full'></IonIcon>
                              </a>
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </div>
                  </IonSegmentContent>
                )}
              </IonSegmentView>
            </IonContent>
          </IonModal>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
