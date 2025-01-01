import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import truckImg from '../../../assets/truck1.png'
import { CapacitorHttp } from '@capacitor/core';
import { getHelper } from '../../apis/apis';

interface Helper {
    name: string;
    phone_number: string
}

const Helpers: React.FC = () => {
    const [helpers, setHelpers] = useState<Helper[]>([]);
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(false)
    const id = localStorage.getItem('id')
    const bearer_token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`
    }
    useEffect(() => {
        const getHelpers = async (id: any) => {
            try {
                const response = await CapacitorHttp.request({
                    url: getHelper(id),
                    headers: headers,
                    method: 'GET'
                })
                console.log(response);
                console.log(response.data.helpers.length);

                if (response.data.helpers.length >= 0) {
                    setEmpty(false)
                    setHelpers(response.data.helpers);
                }
            } catch (err) {
                console.error("fetching Helper data", err);
                setEmpty(true)
            }
        }
        getHelpers(id);

        return () => {
            setHelpers([])
        }
    }, [id, loading]);

    const doRefresh = (ev: any) => {
        ev.detail.complete();
        setLoading(prev => !prev)
    }
    return (
        <>
                <IonRefresher slot='fixed' onIonRefresh={(ev) => doRefresh(ev)}>
                    <IonRefresherContent />
                </IonRefresher>
            <IonSegmentContent id='helpers'>
                {
                    helpers.map((helper,index) => (
                        <IonGrid key={index}>
                            <IonRow>
                                <IonCol>
                                    <div className='bg-white rounded-lg m-1 mx-2'>
                                        <div className='flex items-center p-3 border-b rounded-xl  '>
                                            <div className='h-[52px] w-16 flex'>
                                                <img
                                                    src={truckImg}
                                                    alt="truckimg"
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className='flex w-full justify-between p-1 mx-2'>
                                                <div className=" text-lg font-bold leading-4 mt-1">
                                                    <p className='text-black text-[17px] pb-1 '>{helper.name}</p>
                                                    <p className="text-gray-500 font-normal  text-[13px]">{helper.phone_number}</p>
                                                </div>
                                                <div className=''>
                                                    <p className="text-green-600 text-end font-bold m-0">In Transit</p>
                                                    <p className="text-gray-500 font-normal  text-[13px]">
                                                        In Truck num <span className='font-bold text-black'>GTY 1024</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    ))
                }
            </IonSegmentContent>
            <IonFab horizontal='end' vertical='bottom' slot='' className='ion-padding'>
                <IonFabButton routerLink='/add-helper'>
                    <IonIcon icon={add}></IonIcon>
                </IonFabButton>
            </IonFab>
        </>
    );
};

export default Helpers;