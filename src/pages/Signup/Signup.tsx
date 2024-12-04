import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useState } from 'react';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [doctype, setDoctype] = useState('');
    const [docId,setDocId]=useState('');

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        const inputs={
            name:name,
            phone_no:number,
            email:email,
            password:password,
            address:address,
            document_type:doctype,
            document_id:docId
        };
        console.log(inputs);
        
    }

    return (
        <IonPage>
            <IonHeader className='bg-transparent'>
                <IonToolbar className=' IonToolbar' >
                    <div className='flex items-center'>
                        <IonButton className='text-white' fill='clear' routerLink='/signin'>
                            <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                        </IonButton>
                        <IonTitle className='text-white'>
                            <span className='flex items-center w-full'>
                                Sign up
                            </span>
                        </IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen >
                <div className='bg-img overflow-auto h-full'>
                    <div className='overlay'></div>
                    <div className='pt-5 relative z-[9999] text-center'>
                        <form onSubmit={handleSubmit}>
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
                                                    value={email}
                                                    onIonChange={(e)=> setEmail(e.detail.value!)}
                                                ></IonInput>
                                            </IonItem>
                                            <IonItem lines="none" className="m-4 rounded-md">
                                                <IonInput
                                                    type="number"
                                                    label='Phone number'
                                                    labelPlacement='floating'
                                                    placeholder="Phone number"
                                                    minlength={10}
                                                    aria-label="Phone Number"
                                                    value={number}
                                                    onIonChange={(e)=> setNumber(e.detail.value!)}
                                                ></IonInput>
                                            </IonItem>
                                            <IonItem lines="none" className="m-4 rounded-md">
                                                <IonInput
                                                    type="password"
                                                    label='Password'
                                                    labelPlacement='floating'
                                                    placeholder="Password"
                                                    aria-label="Password"
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
                                                    aria-label="Company Name"
                                                    value={address}
                                                    onIonChange={(e)=> setAddress(e.detail.value!)}
                                                ></IonInput>
                                            </IonItem>
                                            <IonItem lines="none" className="m-4 rounded-md">
                                                <IonSelect
                                                    placeholder="Document Type"
                                                    aria-label="Document Type"
                                                    value={doctype}
                                                    onIonChange={(e)=> setDoctype(e.detail.value!)}
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
                                                    value={docId}
                                                    onIonChange={(e)=> setDocId(e.detail.value!)}
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
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Signup;