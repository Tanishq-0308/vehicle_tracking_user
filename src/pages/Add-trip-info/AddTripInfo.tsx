import { IonButton, IonCol, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { chevronBackSharp, ellipseOutline, locate } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import TripContext from '../contexts/TripContext/TripContext';
import { CapacitorHttp } from '@capacitor/core';
import { addTrip, getDriver, getHelper, getTruck } from '../apis/apis';
import { useHistory } from 'react-router';
interface Driver {
    Name: string;
    PhoneNumber: string;
    ID: string
}

interface Truck {
  truck:{
    truck_brand: string;
    model_no: string;
    truck_number: string
    id:string;
  }
  gps_data:{
    status:string
  }
}

interface Helper {
    name: string;
    ID: string;
}
const AddTripInfor: React.FC = () => {
    type TripContextType = /*unresolved*/ any
    const { current, destination } = useContext<TripContextType | undefined>(TripContext);
    const [datetime, setDatetime] = useState<string>('2025-01-01T00:00:00');
    const [tripTask, setTripTask] = useState<string>('');      // State for trip task
    const [assignHelper, setAssignHelper] = useState('');
    const [assignDriver, setAssignDriver] = useState(''); // State for assigned driver
    const [assignTruck, setAssignTruck] = useState('');   // State for assigned truck
    const [loadCarrying, setLoadCarrying] = useState<string>(''); // State for load carrying
    const id = Number(localStorage.getItem('id'))
    const bearer_token = localStorage.getItem('token');
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [helpers, setHelpers] = useState<Helper[]>([]);
    const [trucks, setTrucks] = useState<Truck[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState('');
    const history= useHistory();
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer_token}`
    }

    const handleDatetimeChange = (event: any) => {
        setDatetime(event.target.value);
        console.log(datetime) // Update the state with the new datetime value
    };

    const handleForm = async (e: any) => {
        e.preventDefault();

        const formattedDatetime = datetime.endsWith('Z') ? datetime : datetime + 'Z';
        const inputs = {
            start_location: current.display_name,
            destination: destination.display_name,
            task_name: tripTask,
            load_carrying: loadCarrying,
            date_time: formattedDatetime,
            truck_id: assignTruck,
            driver_id: assignDriver,
            helper_id: assignHelper,
            current_location: 'delhi',
            status: 'Pending',
            admin_id:id,
            start_latitude:Number(current.lat),
            start_longitude:Number(current.lon),
            dest_latitude:Number(destination.lat),
            dest_longitude:Number(destination.lon)
        }
        console.log(inputs, headers);

        try {
            const response = await CapacitorHttp.request({
                url: addTrip(),
                method: 'POST',
                headers: headers,
                data: inputs
            })
            // const response = await axios.post(driverInfo(), input, { headers })
            console.log(response);

            if (response.status === 201) {
                setToastMessage('Trip Added')
                setToastColor('success')
                setShowToast(true)
                history.push('/app','root')
            }
        } catch (err: any) {
            // if (err.response.status === 409) {
            //     setToastMessage('Already exists')
            //     setToastColor('danger')
            //     setShowToast(true)
            // }
            console.log(err);
        }
    }
    useEffect(() => {
        console.log("current location",current);
        console.log("end location",destination);
        
        
        const getDrivers = async (id: any) => {
            try {
                const response = await CapacitorHttp.request({
                    url: getDriver(id),
                    headers: headers,
                    method: 'GET'
                })
                console.log(response);
                console.log(response.data.drivers.length);

                if (response.data.drivers.length >= 0) {
                    setDrivers(response.data.drivers);
                }
            } catch (err) {
                console.error("fetching driver data", err);
            }
        }
        getDrivers(id);

        const getTrucks = async (id: any) => {
            try {
                const response = await CapacitorHttp.request({
                    url: getTruck(id),
                    headers: headers,
                    method: 'GET'
                })
                console.log(response);
                console.log(response.data.trucks.length);

                if (response.data.trucks.length >= 0) {
                    setTrucks(response.data.trucks);
                }
            } catch (err) {
                console.error("fetching truck data", err);
            }
        }
        getTrucks(id);

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
                    setHelpers(response.data.helpers);
                }
            } catch (err) {
                console.error("fetching Helper data", err);
            }
        }
        getHelpers(id);

        return () => {
            setDrivers([])
            setTrucks([])
            setHelpers([])
        }
    }, [id]);
    return (
        <IonPage>
            <IonHeader >
                <IonToolbar className=' IonToolbar' >
                    <div className='flex items-center'>
                        <IonButton routerLink='/create-trip' className='text-white' fill='clear'>
                            <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'dark'}>
                <form className='form mt-10 mx-2' onSubmit={handleForm}>
                    <IonList className='border-2 rounded-xl m-1'>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-4' />
                            <IonLabel position='stacked'>Trip start location</IonLabel>
                            <IonInput
                                placeholder='Current location'
                                className='text-xl'
                                value={current.display_name}
                            />
                            <IonIcon icon={locate} slot='end' className='mt-5' />
                        </IonItem>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-6' />
                            <IonLabel position='stacked'>Trip end location</IonLabel>
                            <IonInput
                                placeholder='Destination location'
                                className='text-xl'
                                value={destination.display_name}
                            />
                        </IonItem>
                    </IonList>
                    <IonList className='border-2 rounded-xl m-1'>
                        <IonItem className='m-1'>
                            {/* <IonLabel position='stacked'>Add Trip Task</IonLabel> */}
                            <IonInput
                                label='Add Trip Task'
                                labelPlacement='floating'
                                type='text'
                                className='text-xl'
                                placeholder='Chemical delivery'
                                value={tripTask}
                                onIonChange={(e) => setTripTask(e.detail.value!)}
                            ></IonInput>
                        </IonItem>
                        <IonItem className='m-1'>
                            {/* <IonLabel position='stacked'>Enter Load Carrying (optional)</IonLabel> */}
                            <IonInput
                                label='Enter Load Carrying'
                                labelPlacement='floating'
                                type='text'
                                className='text-xl'
                                placeholder='16.2kg'
                                value={loadCarrying}
                                onIonChange={(e) => setLoadCarrying(e.detail.value!)}
                            ></IonInput>
                        </IonItem>

                        <IonItem className=' m-1 text-[19px] ' >
                            <IonLabel position='stacked' className='m-1'>Select Data & Time</IonLabel>
                            <IonDatetimeButton datetime='datetime' className='mx-16 my-6'></IonDatetimeButton>
                            <IonModal keepContentsMounted={true} >
                                <IonDatetime
                                    id='datetime'
                                    value={datetime}
                                    onIonChange={handleDatetimeChange}
                                ></IonDatetime>
                            </IonModal>
                        </IonItem>

                        <IonItem className='m-1 w-full'>
                            {/* <IonLabel >Assign truck</IonLabel> */}
                            <IonSelect mode='md' interface='popover'
                                label='Assign Truck'
                                labelPlacement='floating'
                                className='text-lg '
                                value={assignTruck}
                                onIonChange={(e) => setAssignTruck(e.detail.value!)}

                            >
                                {
                                    trucks.map((truck, index) => (
                                        <IonSelectOption value={truck.truck.id} key={index}>{truck.truck.truck_number}</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>

                        <IonItem className='m-1 w-full'>
                            {/* <IonLabel>Assign driver</IonLabel> */}
                            <IonSelect
                                interface='popover'
                                mode='md'
                                label='Assign Driver'
                                labelPlacement='floating'
                                className='text-lg'
                                value={assignDriver}
                                onIonChange={(e) => setAssignDriver(e.detail.value!)}
                            >
                                {/* <IonSelectOption value="">Select Driver</IonSelectOption> */}
                                {drivers.map((driver, index) => (
                                    <IonSelectOption value={driver.ID} key={index}>{driver.Name}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>

                        <IonItem className='m-1 w-full'>
                            {/* <IonLabel>Assign driver</IonLabel> */}
                            <IonSelect
                                interface='popover'
                                mode='md'
                                label='Assign Helper'
                                labelPlacement='floating'
                                className='text-lg'
                                value={assignHelper}
                                onIonChange={(e) => setAssignHelper(e.detail.value!)}
                            >
                                {/* <IonSelectOption value="">Select Driver</IonSelectOption> */}
                                {helpers.map((helper, index) => (
                                    <IonSelectOption value={helper.ID} key={index}>{helper.name}</IonSelectOption>
                                ))}
                            </IonSelect>
                        </IonItem>
                    </IonList>
                    <IonButton expand='block' type='submit' className='absolute bottom-0 left-0 right-0  m-1' size='large'>
                        Continue
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
            </IonContent>
        </IonPage>
    );
};

export default AddTripInfor;