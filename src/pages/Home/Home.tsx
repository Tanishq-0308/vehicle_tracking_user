import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { add, map } from 'ionicons/icons';
import { useState } from 'react';

const Home: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('trip_history');

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
              [...Array(9)].map((_) => (
            <IonGrid>
                  <IonRow>
                    <IonCol>
                      <div className='bg-white rounded-lg m-2'>
                        <div className='flex items-center p-2 border-b rounded-t-xl bg-gray-200 '>
                          <div className='h-8 w-9 flex'>
                            <img
                              src="src/assets/images/truck1.png"
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
                        <div className='px-3 py-2'>
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
                        <div className='px-3 py-2'>
                          <IonRow>
                            <IonCol size='9'>
                              <p className='text-gray-700 font-light'>Current Location</p>
                              <p className=' text-gray-600 font-normal'>1141, Hemiltone tower, Newyork, USA</p>
                            </IonCol>
                            <IonCol className='flex items-center justify-center '>
                              <div className='border-2 p-2 text-xl rounded-3xl flex items-center justify-center'>
                                <IonIcon icon={map} color='primary'></IonIcon>
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
                    <IonFabButton>
                      <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab>
                  </>
          )}
          {selectedSegment === 'map_location' && (
            <IonSegmentContent id='map_location'>
            {
              [...Array(3)].map((_) => (
            <IonGrid>
              <IonRow>
                <IonCol>
                  <div className='bg-white rounded-xl m-2'>
                    <div className='flex items-center p-2 border-b rounded-t-xl bg-gray-200 '>
                      <div className='h-8 w-9 flex'>
                        <img
                          src="src/assets/images/truck1.png"
                          alt="truckimg"
                          className="rounded-full"
                        />
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
                    <div className='p-2'>
                      <IonRow>
                        <IonCol size="8">
                            <p className='text-gray-700'>Task</p>
                            <p className=' text-gray-500'>Chemical Delivery</p>
                        </IonCol>
                        <IonCol size="">
                            <p className='text-gray-700'>Trip Completed</p>
                            <p className=' text-gray-500'>20 June, 02:05pm</p>
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
          )}
        </IonSegmentView>
        {/* <IonFab horizontal='end' vertical='bottom' slot='fixed'>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
