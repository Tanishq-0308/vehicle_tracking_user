import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { camera } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import AdminContext from '../../contexts/AdminContext/AdminContext';
import truckImg from '../../../assets/truck1.png';
import driverImg from '../../../assets/driver_pic.png';

const HelperInfo: React.FC = () => {
    type AdminContextType = /*unresolved*/ any
    const { helperDetail } = useContext<AdminContextType | undefined>(AdminContext);

    const [selectedSegment, setSelectedSegment] = useState('about_driver');

    // Handle segment change
    const handleSegmentChange = (event: CustomEvent) => {
        setSelectedSegment(event.detail.value);
    };

    useEffect(() => {
        console.log(helperDetail);
    }, [helperDetail]);

    return (
        <IonPage>
            <IonHeader className='bg-[#2e363b]' >
                <IonToolbar color={'transparent'}>
                    <IonButton slot='start' fill='clear' color={'light'}>
                        <IonBackButton />
                    </IonButton>
                    <IonTitle color={'light'}>Helper Info</IonTitle>
                </IonToolbar>
                <div className=' bg-[#2e363b] text-white'>
                    <div className='flex items-center justify-center pb-4 ml-6'>
                        <div className='min-w-24 max-w-24 h-20 relative overflow-hidden mr-6'>
                            <div className=' min-w-20 max-w-20 h-20 rounded-full flex'>
                                <img src={truckImg} alt="" className='rounded-full' />
                            </div>
                            <IonIcon icon={camera} className='absolute top-0 right-0 bottom-0 m-auto text-center z-50 rounded-3xl w-6 h-6 text-sm leading-6' color='primary'></IonIcon>
                        </div>
                    </div>
                    <IonSegment mode='md' value={selectedSegment} onIonChange={handleSegmentChange}>
                        <IonSegmentButton className='ion-text-center' contentId='about_driver' value='about_driver'>
                            My Info
                        </IonSegmentButton>
                        <IonSegmentButton className='ion-text-center' value='trip_history' contentId='trip_history'>
                            Helper History
                        </IonSegmentButton>
                    </IonSegment>
                </div>
            </IonHeader>
            <IonContent>
                <div className='bg-img h-full'>
                    <div className='overlay'></div>
                    <IonSegmentView>
                        {selectedSegment === 'about_driver' && (
                            <IonSegmentContent id='about_driver' className=' h-full'>
                                <form action="" className='h-full flex flex-col'>
                                    <IonGrid>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                                <IonCard className='m-3'>
                                                    <IonCardContent>
                                                        <IonInput label='Driver Name' placeholder='Peter Williamson' labelPlacement='floating'></IonInput>
                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                                <IonCard className='m-3'>
                                                    <IonCardContent>
                                                        <IonInput label='Phone Number' placeholder='+91 9998887771' labelPlacement='floating'></IonInput>
                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow className='ion-justify-content-center'>
                                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                                <IonCard className='m-3'>
                                                    <IonCardContent>
                                                        <IonInput label='License Number' placeholder='R730' labelPlacement='floating'></IonInput>
                                                    </IonCardContent>
                                                </IonCard>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                    <IonButton expand='block' className=' w-full bottom-0' size='large'>
                                        Update Profile
                                    </IonButton>
                                </form>
                            </IonSegmentContent>
                        )}
                        {selectedSegment === 'trip_history' && (
                            <IonSegmentContent id='trip_history' className='mb-0 relative rounded-xl z-50 w-[100% -27px] mx-2 mt-3 bg-none'>
                                {
                                    [...Array(6)].map((_, index) => (
                                        <IonGrid key={index}>
                                            <IonRow >
                            <IonCol>
                              <div className='bg-white rounded-lg m-2'>
                                <div className='flex items-center p-4 border-b rounded-t-xl bg-gray-200 '>
                                  <div className='h-8 w-9 flex'>
                                    <img
                                      src={driverImg}
                                      alt="truckimg"
                                      className="rounded-full" />
                                  </div>
                                  <div className='flex w-full justify-between p-1 mx-2'>
                                    <h2 className="flex items-center text-lg font-bold leading-4 m-0">
                                      Gty 1024
                                      <sub className="text-gray-600 font-normal text-[12px] mx-1 my-0">
                                        SCANIA R730
                                      </sub>
                                    </h2>
                                    <span className="text-green-700  font-bold m-0 uppercase">
                                      Dest. Loc.
                                    </span>
                                  </div>
                                </div>
                                <div className='px-4 py-2'>
                                  <IonRow>
                                    <IonCol size="7">
                                      <p className='text-gray-700 font-light'>Task</p>
                                      <p className=' text-gray-600  font-normal'>Chemical Delivery</p>
                                    </IonCol>
                                    <IonCol size="">
                                      <p className='text-gray-700 font-light'>Trip Completed</p>
                                      <p className=' text-gray-600  font-normal'>20 June, 02:05pm</p>
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
                </div>

            </IonContent>
        </IonPage>
    );
};

export default HelperInfo;