import { IonButton, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackSharp, ellipseOutline, locate } from 'ionicons/icons';
import React, { useContext } from 'react';
import TripContext from '../contexts/TripContext/TripContext';

const AddTripInfor: React.FC = () => {
    type TripContextType = /*unresolved*/ any
    const {current,destination}= useContext<TripContextType | undefined>(TripContext);
    return (
        <IonPage>
             <IonHeader >
                <IonToolbar className=' IonToolbar' >
                    <div className='flex items-center'>
                        <IonButton routerLink='/create-trip' className='text-white' fill='clear'>
                            <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'dark'}>
                <form className='form mt-10 mx-2'>
                    <IonList className='border-2 rounded-xl m-1'>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-4'/>
                            <IonLabel position='stacked'>Trip start location</IonLabel>
                            <IonInput 
                            placeholder='Current location' 
                            className='text-xl'
                            value={current}
                            />
                            <IonIcon icon={locate} slot='end' className='mt-5'/>
                        </IonItem>
                        <IonItem>
                        <IonIcon slot='start' icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-6'/>
                            <IonLabel position='stacked'>Trip end location</IonLabel>
                            <IonInput 
                            placeholder='Destination location' 
                            className='text-xl'
                            value={destination}
                            />
                        </IonItem>
                    </IonList>
                    <IonList  className='border-2 rounded-xl m-1'>
                        <IonItem className='m-1'>
                            {/* <IonLabel position='stacked'>Add Trip Task</IonLabel> */}
                            <IonInput 
                            label='Add Trip Task'
                                    labelPlacement='floating'
                            type='text'
                            className='text-xl'
                            placeholder='Chemical delivery'
                            ></IonInput>
                        </IonItem>
                        <IonItem className='m-1'>
                                    {/* <IonLabel position='stacked'>Enter Load Carrying (optional)</IonLabel> */}
                                    <IonInput
                                    label='Enter Load Carrying'
                                    labelPlacement='floating'
                                    type='number'
                                        className='text-xl'
                                        placeholder='16.2kg'
                                    ></IonInput>
                                </IonItem>
                       
                        <IonItem className=' m-1 text-[19px] ' >
                            <IonLabel position='stacked' className='m-1'>Select Data & Time</IonLabel>
                            <IonDatetimeButton datetime='datetime' className='mx-16 my-6'></IonDatetimeButton>
                                <IonModal keepContentsMounted={true} >
                                    <IonDatetime id='datetime'></IonDatetime>
                                </IonModal>
                        </IonItem>

                        <IonItem className='m-1 w-full'>
                            {/* <IonLabel >Assign truck</IonLabel> */}
                            <IonSelect mode='md' interface='popover' label='Assign Truck' labelPlacement='floating' className='text-lg '>
                                <IonSelectOption value='1'>gty 1012</IonSelectOption>
                                <IonSelectOption>gty 1234</IonSelectOption>
                                <IonSelectOption>gty 1224</IonSelectOption>
                            </IonSelect>
                        </IonItem>

                        <IonItem className='m-1 w-full'>
                            {/* <IonLabel>Assign driver</IonLabel> */}
                            <IonSelect interface='popover' mode='md' label='Assign Driver' labelPlacement='floating' className='text-lg'>
                                <IonSelectOption>peter </IonSelectOption>
                                <IonSelectOption>george</IonSelectOption>
                                <IonSelectOption>tonny</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonList>
                <IonButton expand='block' type='submit' className='bottom-5 left-0 right-0 absolute m-2' size='large'>
                    Continue
                </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default AddTripInfor;