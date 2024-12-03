import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import {ellipse} from 'ionicons/icons'

const TnC: React.FC = () => {

    return (
        <IonPage>
           <IonHeader>
                <div className='bg-img h-[300px] '>
                    <div className='overlay'></div>
                    <IonHeader className='ion-no-border '>
                        <IonToolbar color={'transparent'}>
                            <IonButton slot='start' fill='clear' color={'light'}>
                                <IonMenuButton />
                            </IonButton>
                            <IonTitle color={'light'}>Terms & Conditions</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <div className='w-full h-[200px] flex overflow-hidden items-center justify-center'>
                        <h2 className='text-white text-[2.1rem] z-50 font-light'>Trucks<span className='font-bold'>Driver</span></h2>
                    </div>
                </div>
            </IonHeader>
            <IonContent>
                <div className="terms-container overflow-hidden ">
                    <h2 className='text-xl m-3'>Terms of Use</h2>
                    <p className='m-3'>  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    <IonList>
                        {[...Array(8)].map((_, index) => (
                            <IonItem key={index}>
                                <IonIcon icon={ellipse} color="primary" />
                                <p className='m-3'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </IonItem>
                        ))}
                    </IonList>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default TnC;