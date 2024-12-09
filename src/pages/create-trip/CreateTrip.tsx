import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { atCircle, chevronBackSharp, ellipseOutline, locate } from 'ionicons/icons';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import TripContext from '../context/TripContext';

const CreateTrip: React.FC = () => {
    const history=useHistory();
    const {setCurrent, setDestination} = useContext<TripContextType | undefined>(TripContext)
    const [currentLocation,setCurrentLocation]=useState<string>('');
    const [destinationLocation,setDestinationLocation]=useState('');
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        console.log(currentLocation, destinationLocation);
        setCurrent(currentLocation)
        setDestination(destinationLocation)
        history.push('/add-trip-infor')
        setCurrentLocation('');
        setDestinationLocation('');
    }
    return (
        <IonPage>
           <IonHeader>
                <IonToolbar className=' IonToolbar' >
                    <div className='flex items-center'>
                        <IonButton className='text-white' fill='clear' routerLink='/app'>
                            <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'dark'}>
                <form className='form mt-10 mx-2' onSubmit={handleSubmit}>
                    <IonList className='border-2 rounded-xl m-1'>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-4'/>
                            <IonLabel position='stacked'>Trip start location</IonLabel>
                            <IonInput 
                            placeholder='Current location' 
                            className='text-xl'
                            value={currentLocation}
                            onIonChange={(e)=>setCurrentLocation(e.detail.value!)}
                            />
                            <IonIcon icon={locate} slot='end' className='mt-5'/>
                        </IonItem>
                    </IonList>
                    <IonList className='border-2 rounded-xl m-1 mt-3'>
                        <IonItem>
                        <IonIcon slot='start' icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-6'/>
                            <IonLabel position='stacked'>Trip end location</IonLabel>
                            <IonInput placeholder='Destination location' className='text-xl'
                                 value={destinationLocation}
                                 onIonChange={(e) => setDestinationLocation(e.detail.value!)}
                            />
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

export default CreateTrip;