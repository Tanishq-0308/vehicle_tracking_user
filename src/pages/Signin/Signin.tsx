import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import './Signin.css'
import axios from 'axios';
import { login } from '../apis/apis.js'
import { useHistory } from 'react-router';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [toastMessage,setToastMessage]=useState('')
  const history = useHistory();
  const [toast,setToast]=useState(false);
  const [toastColor, setToastColor] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = {
      email: email,
      password: password
    }


    // Basic validation
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setError('');
    console.log('Email:', email);
    console.log('Password:', password);

    setEmail('');
    setPassword('')

    try {
      const response = await axios.post(login(), inputs)
      const access_token = response.data.token;
      const adminId= response.data.id;
      console.log(response.request.status);
      console.log(response.data.id);

      localStorage.setItem('token', access_token);
      localStorage.setItem('id',adminId)
      if (response.request.status === 200) {
        history.push('/app')
      } else {
        setToastMessage("User is not registered");
        setToastColor('danger')
        setToast(true)
      }
    } catch (err:any) {
      if(err.request.status === 400){
        setToastMessage("Login details are incorrect");
        setToastColor('danger')
        setToast(true)
      }
      else if(err.request.status === 401){
        setToastMessage("Login details are incorrect");
        setToastColor('danger')
        setToast(true)
      }
      console.log(err);

    }
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="bg-img h-full overflow-auto">
          <div className="overlay"></div>
          <div className="w-full flex h-[280px] overflow-hidden items-center justify-center">
            <h2 className="text-white text-[2.1rem] z-50 font-light">
              Trucks<span className="font-bold">Up</span>
            </h2>
          </div>
          <div className="text-white pt-5 relative z-50 text-center">
            <h2 className="text-2xl font-normal m-0 mb-9 relative welcome">Welcome</h2>
            <h3 className='font-normal text-lg'>
              Enter your phone number to <br /> sign in
            </h3>
            <IonGrid >
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <form 
                    onSubmit={handleSubmit}
                  >
                    <IonList lines="none" className="bg-transparent">
                      <IonItem lines="none" className="m-4 rounded-md">
                        <IonInput
                          type="text"
                          value={email}
                          onIonChange={(e) => setEmail(e.detail.value!)}
                          placeholder="Phone number"
                          // required
                        />
                      </IonItem>
                      <IonItem lines="none" className="m-4 rounded-md">
                        <IonInput
                          type="password"
                          value={password}
                          onIonChange={(e) => setPassword(e.detail.value!)}
                          placeholder="Password"
                          // required
                        />
                      </IonItem>
                      <IonButton 
                      type='submit' 
                      // routerLink='/app' 
                      expand="block" size="large" className="text-sm mx-4">
                        Continue
                      </IonButton>
                    </IonList>
                  </form>
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className='mt-[2rem]'>
              <IonButton expand="block" size="large" routerLink='/signup' color={'success'} className="text-sm m-4  ">
                Create my account
              </IonButton>
            </div>
          </div>
          <IonToast 
            message={toastMessage}
            color={toastColor}
            isOpen={toast}
            duration={2000}
            onDidDismiss={() => setToast(false)}
            position='top'
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signin;