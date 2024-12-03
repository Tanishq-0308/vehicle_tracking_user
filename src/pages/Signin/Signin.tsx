import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './Signin.css'

const Signin: React.FC = () => {

    return (
        <IonPage>
        <IonContent fullscreen>
          <div className="bg-img h-full overflow-auto">
            <div className="overlay"></div>
            <div className="w-full flex h-[320px] overflow-hidden items-center justify-center">
              <h2 className="text-white text-[2.1rem] z-50 font-light">
                Trucks<span className="font-bold">Up</span>
              </h2>
            </div>
            <div className="text-white pt-5 relative z-50 text-center">
              <h2 className="text-2xl font-normal m-0 mb-9 relative welcome">Welcome</h2>
              <h3 className='font-normal text-lg'>
                Enter your phone number to <br /> sign in
              </h3>
              <IonGrid>
                <IonRow className="ion-justify-content-center">
                  <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                    {/* <form > */}
                      <IonList lines="none" className="bg-transparent">
                        <IonItem lines="none" className="m-4 rounded-md">
                          <IonInput
                             type="text"
                             placeholder="Phone number"
                            //  required
                          />
                        </IonItem>
                        <IonItem lines="none" className="m-4 rounded-md">
                          <IonInput
                             type="password"
                             placeholder="Password"
                            //  required
                          />
                        </IonItem>
                        <IonButton routerLink='/app' expand="block" size="large" className="text-sm mx-4">
                          Continue
                        </IonButton>
                      </IonList>
                    {/* </form> */}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
};

export default Signin;