import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import './profile.css'
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { getProfile } from '../apis/apis';
import PersonIcon from '@mui/icons-material/Person';
import { Logout } from '@mui/icons-material';

interface Admin{
    Name:string;
    PhoneNumber:string;
    CompanyName:string;
    Address:string;
    Drivers:string;
    Helpers:string;
    Trucks:string;
    Email:string;
}

const Profile: React.FC = () => {
    const [data,setData]=useState<Admin | null>(null);
    const bearer_token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`
    }
    const id = localStorage.getItem('id')

    useIonViewWillEnter(()=>{
        const getAdminDetails = async () => {
            try {
                const response = await CapacitorHttp.request({
                    url: getProfile(id),
                    method: 'GET',
                    headers: headers,
                })
                setData(response.data.profile)
                console.log("admin data", response.data.profile);
            } catch (err) {
                console.error("fetching admin data ", err);
            }
        }
        getAdminDetails();
    })
    const router= useIonRouter();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        router.push('/signin')
    }
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar className=' IonToolbar'>
                    <div className='flex items-center'>
                        <IonButtons>
                            <IonMenuButton className='text-[#378CE7]' />
                        </IonButtons>
                        <IonTitle>
                            <span className='flex items-center text-lg w-full text-[#378CE7]'>
                                My Account
                            </span>
                        </IonTitle>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h1 className='text-center font-serif'>My Profile</h1>
                <IonCard className='mx-6 my-5 rounded-3xl'>
                    <IonCardHeader className='text-2xl py-1 text-[#378CE7] font-bold text-center font-sans'>{data?.Name}</IonCardHeader>
                    <IonCardContent className='text-[16px] text-black text-center font-sans'>Contact No: {data?.PhoneNumber} <br />
                    Email: {data?.Email}</IonCardContent>
                </IonCard>
                <IonCard className='mx-6 my-5 rounded-3xl'>
                    <IonCardHeader className='text-xl py-1 text-[#378CE7] font-bold text-center font-sans'>{data?.CompanyName}</IonCardHeader>
                    <IonCardContent className='text-[16px] text-black text-center font-sans'>{data?.Address}</IonCardContent>
                </IonCard>
                <IonCard className='flex mx-6 gap-3 justify-evenly p-3 rounded-3xl'>
                    <IonCard className='p-4 px-[23px] bg-green-400 rounded-2xl flex flex-col items-center text-white'>
                        <p className='font-sans'>Trucks</p>
                        <p className='text-[22px] font-sans font-semibold'>{data?.Trucks}</p>
                    </IonCard>
                    <IonCard className='p-4 px-[23px] bg-yellow-400 rounded-2xl flex flex-col items-center text-white'>
                        <p className='font-sans'>Drivers</p>
                        <p className='text-[22px] font-sans font-semibold'>{data?.Drivers}</p>
                    </IonCard>
                    <IonCard className='p-4 px-[23px] bg-red-400 rounded-2xl flex flex-col items-center text-white'>
                        <p className='font-sans'>Helpers</p>
                        <p className='text-[22px] font-sans font-semibold'>{data?.Helpers}</p>
                    </IonCard>
                </IonCard>
                <IonCard className='mx-6 flex my-7 p-3 rounded-3xl items-center '>
                    <PersonIcon className='text-black border border-black rounded-full mx-3'></PersonIcon>
                    <p className='ml-3 font-semibold text-lg text-black font-sans'>Edit your profile</p>
                </IonCard>
                <IonCard className='mx-6 flex my-7 p-3 rounded-3xl items-center ' onClick={handleLogout}>
                    <Logout className='text-black mx-3'></Logout>
                    <p className='ml-3 font-semibold text-lg text-black font-sans'>Logout</p>
                </IonCard>

                {/* <form action="" className='h-full flex flex-col'>
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

                </form> */}
            </IonContent>
            {/* <IonFooter>
                <IonButton expand='full' className=' w-full bottom-0' size='large'>
                    Update Profile
                </IonButton>
            </IonFooter> */}
        </IonPage>
    );
};

export default Profile;