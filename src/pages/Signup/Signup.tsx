import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import axios from 'axios';
import { chevronBackSharp } from 'ionicons/icons';
import React, { useState } from 'react';
import { signup } from '../apis/apis';
import { useHistory } from 'react-router';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    // const [doctype, setDoctype] = useState('');
    const [companyName,setComapnyName]=useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const history=useHistory();

    const handleSubmit=async(e:any)=>{
        e.preventDefault();
        const inputs={
            name:name,
            phone_number:number,
            email:email,
            password:password,
            address:address,
            company_name:companyName
        };
        // console.log(inputs);
        try{
            const response=await axios.post(signup(),inputs)
            console.log(response);
            // const isAccountCreated= response.data;
            if (response.request.status === 201) {
                setToastMessage('Account created');
                setToastColor('success');
                setShowToast(true)
                history.push('/signin');
              } else {
                setToastMessage('Account creation failed!');
                setToastColor('danger');
                setShowToast(true)
              }
        }catch(err:any){
            if(err.request.status === 409){
                setToastMessage("User already Existed");
                setToastColor('danger')
                setShowToast(true)
              }
            console.log(err);
        }
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
                                                    value={address}
                                                    onIonChange={(e)=> setAddress(e.detail.value!)}
                                                ></IonInput>
                                            </IonItem>
                                            <IonItem lines="none" className="m-4 rounded-md">
                                                <IonInput
                                                    type="text"
                                                    label='Company_name'
                                                    labelPlacement='floating'
                                                    placeholder="company name"
                                                    value={companyName}
                                                    onIonChange={(e)=> setComapnyName(e.detail.value!)}
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
                    <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={2000}
            color={toastColor}
            onDidDismiss={() => setShowToast(false)} // Hide toast after it disappears
          />
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Signup;