import { IonBackButton, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { useState } from 'react';
import { addTruck, driverInfo } from '../../apis/apis';
import { CapacitorHttp } from '@capacitor/core';

const addDriver: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [doctype, setDoctype] = useState('');
    const [docId, setDocId] = useState('');
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
            name:name,
            email:email,
            phone_number:number,
            password:password,
            address:address,
            doc_type:doctype,
            doc_id:docId,
            admin_id:admin_id
        }
        console.log(input, headers);

        try {
            const response=await CapacitorHttp.request({
                    url: driverInfo(),
                    method: 'POST',
                    headers:headers,
                    data: input
                  })
            // const response = await axios.post(driverInfo(), input, { headers })
            console.log(response);

            if (response.status === 201) {
                setToastMessage('Driver Added')
                setToastColor('success')
                setShowToast(true)
            }
            setName('')
            setNumber('')
            setAddress('')
            setEmail('')
            setPassword('')
            setDocId('')
            setDoctype('')

        } catch (err: any) {
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
                        <h4 className='text-blue-600' >Driver Info</h4>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='bg-img h-full overflow-auto'>
                    <div className='overlay'></div>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <IonGrid >
                            <IonRow className='ion-justify-content-center'>
                                <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>

                                    <IonList lines="none" className="bg-transparent">
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="text"
                                                label='Full Name'
                                                labelPlacement='floating'
                                                placeholder="Full Name"
                                                aria-label="Full Name"
                                                required
                                                value={name}
                                                onIonChange={(e) => setName(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="email"
                                                label='Email'
                                                labelPlacement='floating'
                                                placeholder="Email Address"
                                                aria-label="Email Address"
                                                required
                                                value={email}
                                                onIonChange={(e) => setEmail(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="number"
                                                label='Phone number'
                                                labelPlacement='floating'
                                                placeholder="Phone number"
                                                required
                                                minlength={10}
                                                aria-label="Phone Number"
                                                value={number}
                                                onIonChange={(e) => setNumber(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="password"
                                                label='Password'
                                                labelPlacement='floating'
                                                placeholder="Password"
                                                aria-label="Password"
                                                required
                                                value={password}
                                                onIonChange={(e) => setPassword(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="text"
                                                label='Address'
                                                labelPlacement='floating'
                                                placeholder="Address"
                                                required
                                                value={address}
                                                onIonChange={(e) => setAddress(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonSelect
                                                placeholder="Document Type"
                                                aria-label="Document Type"
                                                value={doctype}
                                                onIonChange={(e) => setDoctype(e.detail.value!)}
                                            >
                                                <IonSelectOption value="Pan">Pan</IonSelectOption>
                                                <IonSelectOption value="Aadhar">Aadhar</IonSelectOption>
                                            </IonSelect>
                                        </IonItem>
                                        <IonItem lines="none" className="m-4 rounded-md">
                                            <IonInput
                                                type="text"
                                                label='Document ID'
                                                labelPlacement='floating'
                                                placeholder="ID"
                                                required
                                                value={docId}
                                                onIonChange={(e) => setDocId(e.detail.value!)}
                                            ></IonInput>
                                        </IonItem>
                                        <IonButton
                                            type="submit"
                                            expand="block"
                                            size="large"
                                            className="text-sm mx-4"
                                        >
                                            Submit
                                        </IonButton>
                                    </IonList>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
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

export default addDriver;