import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './profile.css'
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar className=' IonToolbar'>
                    <div className='flex items-center'>
                        <IonButtons>
                            <IonMenuButton className='text-[#e9b818]' />
                        </IonButtons>
                        <IonTitle>
                            <span className='flex items-center text-lg w-full text-[#e9b818]'>
                                My Account
                                <span className='ml-auto mr-2 block text-lg'>Logout</span>
                            </span>
                        </IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className='bg-img h-full overflow-auto'>
                    <div className='overlay'></div>
                    <form action="" className='h-full flex flex-col'>
                    <IonGrid>
                        <IonRow className='ion-justify-content-center'>
                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                <IonCard className='m-3'>
                                    <IonCardContent>
                                        <IonInput label='Full Name' placeholder='Peter Williamson' labelPlacement='floating'></IonInput>
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
                                        <IonInput label='Email Address' placeholder='regorgepole@mail.com' labelPlacement='floating'></IonInput>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        <IonRow className='ion-justify-content-center'>
                            <IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
                                <IonCard className='m-3'>
                                    <IonCardContent>
                                        <IonInput label='Company Name' placeholder='Saven Star Transportations' labelPlacement='floating'></IonInput>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton expand='block' className=' w-full bottom-0' size='large'>
                        Update Profile
                    </IonButton>
                </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Profile;