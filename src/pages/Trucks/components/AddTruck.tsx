import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { addTruck } from '../../apis/apis';

const AddTruck: React.FC = () => {
    const [truckNumber, setTruckNumber] = useState('');
    const [truckBrand, setTruckBrand] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const admin_id = Number(localStorage.getItem('id'));
    const bearer_token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`
    }


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const input = {
            truck_number: truckNumber,
            truck_brand: truckBrand,
            model_no: modelNumber,
            admin_id: admin_id,
        }
        console.log(input, headers);

        try {
            const response = await axios.post(addTruck(), input, { headers })
            console.log(response);

            if(response.request.status === 201){
                setToastMessage('Truck Added')
                setToastColor('success')
                setShowToast(true)
            }

        } catch (err:any) {
            if (err.response.status === 409) {
                setToastMessage('Already exists')
                setToastColor('danger')
                setShowToast(true)
            }
            console.log(err);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className=' IonToolbar' >
                    <IonButton className='text-white' fill='clear'>
                        <IonBackButton />
                    </IonButton>
                    <IonTitle slot='secondary'>
                        <h4 className='text-blue-600' >Truck Info</h4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='bg-img h-full overflow-auto'>
                    <div className='overlay'></div>
                    <form
                        onSubmit={handleSubmit}
                        className='h-full flex flex-col'>
                        <IonGrid>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <IonCard className='m-3'>
                                        <IonCardContent>
                                            <IonInput
                                                value={truckNumber}
                                                onIonChange={(e) => setTruckNumber(e.detail.value!)}
                                                label='Truck Number'
                                                placeholder='R210'
                                                labelPlacement='floating'
                                                required
                                            ></IonInput>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <IonCard className='m-3'>
                                        <IonCardContent>
                                            <IonInput
                                                value={truckBrand}
                                                onIonChange={(e) => setTruckBrand(e.detail.value!)}
                                                label='Truck Brand'
                                                placeholder='Volvo'
                                                labelPlacement='floating'
                                                required
                                            ></IonInput>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                    <IonCard className='m-3'>
                                        <IonCardContent>
                                            <IonInput
                                                value={modelNumber}
                                                onIonChange={(e) => setModelNumber(e.detail.value!)}
                                                label='Model Number'
                                                placeholder='model no'
                                                labelPlacement='floating'
                                                required
                                            ></IonInput>
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton
                            type='submit'
                            expand='block'
                            className=' w-full bottom-0'
                            size='large'
                        >
                            Add Truck
                        </IonButton>
                    </form>
                    <IonToast
                        isOpen={showToast}
                        message={toastMessage}
                        duration={2000}
                        color={toastColor}
                        position='top'
                        onDidDismiss={() => setShowToast(false)} // Hide toast after it disappears
                    />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddTruck;