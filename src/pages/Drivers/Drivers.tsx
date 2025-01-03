import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonLabel, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { add, map } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import truckImg from '../../assets/truck1.png'
import { CapacitorHttp } from '@capacitor/core';
import { getDriver } from '../apis/apis';
import Helpers from './Components/Helpers';

interface Driver {
  Name: string;
  PhoneNumber: string
}

const Drivers: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('drivers');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
  useEffect(() => {
    const getDrivers = async (id: any) => {
      try {
        const response = await CapacitorHttp.request({
          url: getDriver(id),
          headers: headers,
          method: 'GET'
        })
        console.log(response);
        console.log(response.data.drivers.length);

        if (response.data.drivers.length >= 0) {
          setEmpty(false)
          setDrivers(response.data.drivers);
        }
      } catch (err) {
        console.error("fetching driver data", err);
        setEmpty(true)
      }
    }
    getDrivers(id);

    return () => {
      setDrivers([])
    }
  }, [id, loading]);

  const doRefresh = (ev: any) => {
    ev.detail.complete();
    setLoading(prev => !prev)
  }

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
        {/* <div className='tab2'>
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
        </div> */}
      </IonHeader>
      <IonContent className="ion-padding-top" color={'dark'} >
        <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>
        <IonSegmentView>
          {selectedSegment === 'drivers' && (
            <>
              <IonSegmentContent id='drivers'>
                {
                  empty ? (
                    <div className=' text-center text-xl'>No truck added</div>
                  ) : (
                    drivers.map((driver, index) => (
                      <IonGrid key={index}>
                        <IonRow>
                          <IonCol>
                            <div className='bg-white rounded-lg m-1 mx-2'>
                              <div className='flex items-center p-3 border-b rounded-xl  '>
                                <div className='h-[52px] w-16 flex'>
                                  <img
                                    src={truckImg}
                                    alt="truckimg"
                                    className="rounded-full"
                                  />
                                </div>
                                <div className='flex w-full justify-between p-1 mx-2'>
                                  <div className=" text-lg font-bold leading-4 mt-1">
                                    <p className='text-black text-[17px] pb-1 '>{driver.Name}</p>
                                    <p className="text-gray-500 font-normal  text-[13px]">{driver.PhoneNumber}</p>
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
                    )))
                }
              </IonSegmentContent>
              <IonFab horizontal='end' vertical='bottom' slot='' className='ion-padding'>
                <IonFabButton routerLink='/add-driver'>
                  <IonIcon icon={add}></IonIcon>
                </IonFabButton>
              </IonFab>
            </>
          )}
          {selectedSegment === 'helpers' && (
            <Helpers />
            // <div>helper</div>
          )}
        </IonSegmentView>
      </IonContent>
    </IonPage>
  );
};

export default Drivers;