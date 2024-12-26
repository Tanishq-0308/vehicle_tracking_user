import { IonButtons, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { add, map } from 'ionicons/icons';
import React from 'react';
import truckImg from '../../assets/truck1.png'

const Trucks: React.FC = () => {

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
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-top" color={'dark'}>
                {[...Array(14)].map((_)=>(
            <IonGrid>
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
                          <p className='text-black text-[19px] pb-1 tracking-tighter'>GTY 1024</p> 
                         <p className="text-gray-500 font-normal tracking-tighter text-[13px]">SCANIA R730</p>
                        </h2>
                        <span className="text-green-600  font-bold m-0">
                          In Transit
                        </span>
                      </div>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
                ))}

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