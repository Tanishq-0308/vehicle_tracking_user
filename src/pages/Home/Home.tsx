import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { add, call, camera, chevronBackSharp, chevronForward, chevronUp, ellipseOutline, locateOutline, locationOutline, map, phoneLandscape } from 'ionicons/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import MapView from './components/MapView';
import truckImg from '../../assets/truck1.png'
import AdminContext from '../contexts/AdminContext/AdminContext';
import { CapacitorHttp } from '@capacitor/core';
import { getProfile } from '../apis/apis';

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('trip_history');
  const [selectedModalSegment, setSelectedModalSegment] = useState('about_trip');
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  type AdminContextType = /*unresolved*/ any
  const {setAdminName,setCompanyName}= useContext<AdminContextType | undefined>(AdminContext);
  const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`
    }

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

  const handleModalSegmentChange = (event: CustomEvent) => {
    setSelectedModalSegment(event.detail.value)
  }

  useEffect(()=>{
    const getAdminDetails=async()=>{
    try{
      const response=await CapacitorHttp.request({
              url: getProfile(id),
              method: 'GET',
              headers:headers,
            })
      setAdminName(response.data.profile.Name)
      setCompanyName(response.data.profile.CompanyName)
      console.log(response.data.profile.Name);
      console.log(response.data.profile.CompanyName);
      
    }catch(err){
      console.error("fetching admin data ",err);
    }
  }
  getAdminDetails();
  },[id])
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
          <IonSegment scrollable={true} color={'warning'} value='default'>
            <IonSegmentButton value='default'>
              In Transit
            </IonSegmentButton>
            <IonSegmentButton>
              Stopped
            </IonSegmentButton>
            <IonSegmentButton>
              Idle
            </IonSegmentButton>
            <IonSegmentButton>
              In Garage
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonHeader>
      <IonContent className='content'>
        <IonSegmentView>
          {selectedSegment === 'trip_history' && (
            <>
              <IonSegmentContent id='trip_history'>
                {
                  [...Array(9)].map((_, index) => (
                    <IonGrid key={index} onClick={() => setSelectedUser(index)}>
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
                                  GTY 1024
                                  <sub className="text-gray-600 font-normal text-[12px] mx-1 my-0">
                                    SCANIA R730
                                  </sub>
                                </h2>
                                <span className="text-green-700  font-bold m-0">
                                  In Transit
                                </span>
                              </div>
                            </div>
                            <div className='px-3 py-1'>
                              <IonRow>
                                <IonCol size="8">
                                  <p className='text-gray-700 font-light'>Task</p>
                                  <p className=' text-gray-600 font-normal'>Chemical Delivery</p>
                                </IonCol>
                                <IonCol size="">
                                  <p className='text-gray-700 font-light'>Departed</p>
                                  <p className=' text-gray-600 font-normal'>20 June, 02:05pm</p>
                                </IonCol>
                              </IonRow>
                            </div>
                            <div className='px-3 py-1'>
                              <IonRow>
                                <IonCol size='9'>
                                  <p className='text-gray-700 font-light'>Current Location</p>
                                  <p className=' text-gray-600 font-normal'>1141, Hemiltone tower, Newyork, USA</p>
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
            <MapView />
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
                      <p className='font-bold text-lg'>GTY 1024
                      </p>
                      <p className='text-gray-600 font-light text-xs'>
                        SCANIA R730
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
                        <IonCol size="8">
                          <p className='text-gray-500 font-light text-sm'>Task</p>
                          <p className=' text-gray-600 font-normal'>Chemical Delivery</p>
                        </IonCol>
                        <IonCol size="">
                          <p className='text-gray-500 font-light text-sm'>Departed</p>
                          <p className=' text-gray-600 font-normal'>20 June, 02:05pm</p>
                        </IonCol>
                      </IonRow>
                    </div>
                    <div className='px-5 pt-2'>
                      <IonGrid>
                        <IonRow className='my-5'>
                          <IonIcon icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-2' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Trip start location</p>
                            <p className=' text-gray-600 font-normal'>B11 Opera Tower, IDSR Bank, New York, USA</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='my-5'>
                          <IonIcon icon={locationOutline} className=' rounded-full text-lg  mr-4 mt-4' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Current location</p>
                            <p className=' text-gray-600 font-normal'>1141, Hemiltone tower, New York, USA</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='my-5'>
                          <IonIcon icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-5' />
                          <IonCol>
                            <p className='text-gray-500 font-light text-sm'>Trip end location</p>
                            <p className=' text-gray-600 font-normal'>Neuro Chemical Factory, New York, USA</p>
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
                            <p className=' text-gray-600 font-normal'>SCAINIA R730</p>
                          </IonCol>
                          <IonCol size="">
                            <p className='text-gray-500 font-light text-sm'>Vehicle Number</p>
                            <p className=' text-gray-600 font-normal'>GTY 1024</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="8">
                            <p className='text-gray-500 font-light text-sm'>Max.Load Capacity</p>
                            <p className=' text-gray-600 font-normal'>16.2 tonnes</p>
                          </IonCol>
                          <IonCol size="">
                            <p className='text-blue-500 font-semibold'>Edit Vehicle info</p>
                          </IonCol>
                        </IonRow>
                        <IonRow className='px-7 py-4'>
                          <IonCol size="9">
                            <p className='text-gray-500 font-light text-sm'>Driver</p>
                            <p className=' text-gray-600 font-normal'>George Jackson (+91 9998887711)</p>
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
                            <p className=' text-gray-600 font-normal'>Tonny Willamson (+91 9998887711)</p>
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
