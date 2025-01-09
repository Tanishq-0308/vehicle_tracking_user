import { IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react';
import { add, map } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import truckImg from '../../assets/truck1.png'
import { CapacitorHttp } from '@capacitor/core';
import { getTruck } from '../apis/apis';
import AdminContext from '../contexts/AdminContext/AdminContext';

interface Truck {
  name: string;
  truck:{
    truck_brand: string;
    model_no: string;
    truck_number: string
  }
  gps_data:{
    status:string
  }
}

const Trucks: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [empty, setEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const id = localStorage.getItem('id')
  const bearer_token = localStorage.getItem('token');
  const [search, setSearch] = useState('');
  const [selectSegment, setSelectSegment] = useState('All')
  type AdminContextType = /*unresolved*/ any
  const {setTruckDetails}= useContext<AdminContextType | undefined>(AdminContext);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${bearer_token}`
  }
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
          setEmpty(false)
          setTrucks(response.data.trucks);
        }
      } catch (err) {
        console.error("fetching truck data", err);
        setEmpty(true)
      }
    }
    getTrucks(id);

    return () => {
      setTrucks([])
    }
  }, [id, loading]);

  const doRefresh = (ev: any) => {
    ev.detail.complete();
    setLoading(prev => !prev)
  }

  const handleInput = (event: Event) => {
    let query = '';
    const target = event.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();
    setSearch(query);
  }

  const handleSegmentChange= (event: CustomEvent)=>{
    setSelectSegment(event.detail.value)
  }
  const router= useIonRouter();
  return (
    <IonPage>
      <IonHeader className=''>
        <IonToolbar className=' IonToolbar'>
          <div className='flex items-center'>
            <IonButtons>
              <IonMenuButton color={'light'} />
            </IonButtons>
            <IonTitle>
              <span className='flex items-center text-lg w-full text-[#adacac]'>
                My Trucks
              </span>
            </IonTitle>
            <IonSearchbar className='text-white search-bar' placeholder='Search' debounce={1000} onIonInput={(event) => handleInput(event)} ></IonSearchbar>
        
          </div>
        </IonToolbar>
        {/* <IonToolbar className='IonToolbar'>
          </IonToolbar> */}
        <div className='tab2'>
          <IonSegment scrollable={true} color={'warning'} value={selectSegment} onIonChange={handleSegmentChange}
          >
            <IonSegmentButton value='All'>
              All
            </IonSegmentButton>
            <IonSegmentButton value='Running'>
              Running
            </IonSegmentButton>
            <IonSegmentButton value='Stopped'>
              Stopped
            </IonSegmentButton>
            <IonSegmentButton value='Offline'>
              Offline
            </IonSegmentButton>
            <IonSegmentButton value='Idle'>
              Idle
            </IonSegmentButton>
          </IonSegment>
        </div>
      </IonHeader>
      <IonContent className="ion-padding-top" color={'dark'}>
        <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)}>
          <IonRefresherContent />
        </IonRefresher>
        {
          empty ? (
            <div className=' text-center text-xl'>No truck added</div>
          ) : (
            trucks
              .filter((truck) => {
                return search.toLowerCase() === ''
                  ? truck
                  : (
                    (truck.truck.truck_number.toLowerCase()).includes(search)
                  )
              })
              .filter((truck)=>{
                switch (selectSegment){
                  case 'Running':
                    return truck.gps_data.status=== 'Running';
                  case 'Stopped':
                    return truck.gps_data.status=== 'Stopped';
                  case 'Offline':
                    return truck.gps_data.status=== 'Offline';
                  case 'Idle':
                    return truck.gps_data.status=== 'Idle';
                  case 'All':
                  return true;
                }
              })
              .map((truck, index) => (
                <IonGrid key={index} onClick={(e)=>{
                  setTruckDetails(truck)
                  router.push('/truck-info')
                }
                 }>
                  <IonRow>
                    <IonCol>
                      <div className='bg-white rounded-lg m-1 mx-2'>
                        <div className='flex items-center p-3 border-b rounded-xl  '>
                          <div className='h-[62px] w-20 flex'>
                            <img
                              src={truckImg}
                              alt="truckimg"
                              className="rounded-full"
                            />
                          </div>
                          <div className='flex w-full justify-between p-1 mx-2'>
                            <h2 className=" text-lg font-bold leading-4 m-0">
                              <p className='text-black text-[19px] pb-1 tracking-tighter'>{truck.truck.truck_number}</p>
                              <p className="text-gray-500 font-normal tracking-tighter text-[13px]">{truck.truck.truck_brand} {truck.truck.model_no}</p>
                            </h2>
                            <span className="text-green-600  font-bold m-0">
                              {truck.gps_data.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              ))
              )}

        <IonFab horizontal='end' vertical='bottom' slot='fixed' className='ion-padding'>
          <IonFabButton routerLink='/add-truck'>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Trucks;