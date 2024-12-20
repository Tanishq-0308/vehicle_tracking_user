import { IonButton, IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { add, camera, chevronBackSharp, chevronForward, map } from 'ionicons/icons';
import { useRef, useState } from 'react';
import MapView from './components/MapView';
import truckImg from '../../assets/truck1.png'
import { Opacity } from '@mui/icons-material';

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('trip_history');
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSegmentChange = (event: CustomEvent) => {
    setSelectedSegment(event.detail.value);
  };

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
          <IonContent className="ion-padding">
            <MapView />
          </IonContent>
          <IonContent>
            <IonHeader className='bg-[#e4dede] rounded-t-2xl ion-no-border' >
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
                <IonSegment mode='md'>
                  <IonSegmentButton className='ion-text-center text-xs' contentId='about_driver' value='about_driver'>
                    About Trip
                  </IonSegmentButton>
                  <IonSegmentButton className='ion-text-center text-xs' value='trip_history' contentId='trip_history'>
                    Vehicle Info
                  </IonSegmentButton>
                </IonSegment>
              </div>
            </IonHeader>
            <IonContent>
              <div className='px-5 pt-2'>
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
              <div>
              </div>
            </IonContent>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
