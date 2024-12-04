import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { add, map } from 'ionicons/icons';
import React, { useState } from 'react';

const Drivers: React.FC = () => {
    const [selectedSegment, setSelectedSegment] = useState('drivers');

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
              <IonSegment color={'warning'} mode='md' value={selectedSegment} onIonChange={handleSegmentChange}>
                <IonSegmentButton value='drivers' contentId='drivers'>
                  <IonLabel >Drivers</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value='helpers' contentId='helpers'>
                  <IonLabel >Helpers</IonLabel>
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
            <IonContent className="ion-padding-top" color={'dark'} >
            <IonSegmentView>
          {selectedSegment === 'drivers' && (
            <>
          <IonSegmentContent id='drivers'>
            {
              [...Array(9)].map((_) => (
                <IonGrid>
                <IonRow>
                  <IonCol>
                    <div className='bg-white rounded-lg m-1 mx-2'>
                      <div className='flex items-center p-3 border-b rounded-xl  '>
                        <div className='h-[52px] w-16 flex'>
                          <img
                            src="src/assets/images/driver_pic.png"
                            alt="truckimg"
                            className="rounded-full"
                          />
                        </div>
                        <div className='flex w-full justify-between p-1 mx-2'>
                          <div className=" text-lg font-bold leading-4 mt-1">
                            <p className='text-black text-[17px] pb-1 '>Peter Williamson</p> 
                           <p className="text-gray-500 font-normal  text-[13px]">+91 999 888 7711</p>
                          </div>
                          <div className=''>
                              <p className="text-green-600 text-end font-bold m-0">In Transit</p>
                              <p className="text-gray-500 font-normal  text-[13px]">
                                  In Truck num <span className='font-bold text-black'>GTY 1024</span>
                              </p>
                          </div>
                        </div>
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
          {selectedSegment === 'helpers' && (
            <>
            <IonSegmentContent id='helpers'>
            {
              [...Array(3)].map((_) => (
                <IonGrid>
              <IonRow>
                <IonCol>
                  <div className='bg-white rounded-lg m-1 mx-2'>
                    <div className='flex items-center p-3 border-b rounded-xl  '>
                      <div className='h-[52px] w-16 flex'>
                        <img
                          src="src/assets/images/driver_pic.png"
                          alt="truckimg"
                          className="rounded-full"
                        />
                      </div>
                      <div className='flex w-full justify-between p-1 mx-2'>
                        <div className=" text-lg font-bold leading-4 mt-1">
                          <p className='text-black text-[17px] pb-1 '>Peter Williamson</p> 
                         <p className="text-gray-500 font-normal  text-[13px]">+91 999 888 7711</p>
                        </div>
                        <div className=''>
                            <p className="text-green-600 text-end font-bold m-0">In Transit</p>
                            <p className="text-gray-500 font-normal  text-[13px]">
                                In Truck num <span className='font-bold text-black'>GTY 1024</span>
                            </p>
                        </div>
                      </div>
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
        </IonSegmentView>
            </IonContent>
        </IonPage>
    );
};

export default Drivers;