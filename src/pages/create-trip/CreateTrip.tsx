import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { atCircle, chevronBackSharp, ellipseOutline, locate, search } from 'ionicons/icons';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TripContext from '../contexts/TripContext/TripContext';
import axios from 'axios';
import { Geolocation } from '@capacitor/geolocation';

const CreateTrip: React.FC = () => {
    const history = useHistory();
    type TripContextType = any
    const { setCurrent, setDestination } = useContext<TripContextType | undefined>(TripContext)
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const [destinationLocation, setDestinationLocation] = useState<string>('');
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [endSuggestions, setEndSuggestions] = useState<any[]>([]);
    const [present,dismiss]= useIonLoading();

    // Form submit 
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(currentLocation);
        console.log(destinationLocation);

        // setCurrent(currentLocation)
        // setDestination(destinationLocation)
        history.push('/add-trip-infor')
        setCurrentLocation('');
        setDestinationLocation('');
    }

    // Fetch the suggestions for start location 
    const handleStartLocation = async (e: any) => {
        const value = e.target.value;
        setCurrentLocation(value)

        if (value.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
                setSuggestions(response.data);
                console.log(response);

            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    // Suggestion Handler for start location
    const handleSuggestionClick = (name: any) => {
        // setCurrentLocation(name)
        console.log(name);
        setCurrentLocation(name.display_name)
        setCurrent(name)
        setSuggestions([]);
    };

    // Fetch the suggestions for end location
    const handleEndLocation = async (e: any) => {
        const value = e.target.value;
        setDestinationLocation(value)
        console.log(value);
        if (value.length > 2) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
                setEndSuggestions(response.data);
                console.log(response);

            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setEndSuggestions([]);
        }
    };

    // Suggestion Handler for end location
    const handleSuggestion = (name: any) => {
        setDestinationLocation(name.display_name)
        setDestination(name)
        setEndSuggestions([]);
    };

    // Gets the Current location's long and lat
    const getCurrentLocation = async () => {
        try {
            const position = await Geolocation.getCurrentPosition();
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        } catch (error) {
            console.error('Error getting location', error);
            alert('Unable to retrieve location. Please enable location services.');
        }
        present('Getting Location...')
        setTimeout(() => {
            dismiss();
            getLocation();
        }, 500);
    };
    
    // Converts the long and lat in address
    const getLocation=async()=>{
        console.log("current location",location);
        try {
            const response = await axios.get(`https://geocode.maps.co/reverse?lat=${location?.lat}&lon=${location?.lng}&api_key=6776781c0d0d1650050003kwef82204`);
            console.log("current location",response.data);
            setCurrent(response.data)
            setCurrentLocation(response.data.display_name)

        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className=' IonToolbar' >
                    <div className='flex items-center'>
                        <IonButton className='text-white' fill='clear' routerLink='/app'>
                            <IonIcon icon={chevronBackSharp} className='text-white'></IonIcon>
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonHeader>
            <IonContent color={'dark'}>
                <form className='form mt-10 mx-2' onSubmit={handleSubmit}>
                    <IonList className='border-2 rounded-xl m-1'>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-green-500 bg-green-500 rounded-full text-lg  mr-4 mt-4' />
                            <IonLabel position='stacked'>Trip start location</IonLabel>
                            <IonInput
                                required
                                placeholder='Current location'
                                className='text-xl'
                                value={currentLocation}
                                onIonChange={handleStartLocation}
                            />
                            <IonIcon icon={search} slot='end' className='mt-[35px]' onClick={handleStartLocation}/>
                        </IonItem>
                        <IonButton className='m-2' expand='full' onClick={getCurrentLocation}>
                        <IonIcon icon={locate}  className='text-3xl' />
                        </IonButton>
                    </IonList>
                    <div className='m-2'>
                        {suggestions.length > 0 && (
                            <ul className="suggestions h-[100px] overflow-auto" >
                                {suggestions.map((suggestion) => (
                                    <li className=' bg-white text-black p-1 border-b ' key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <IonList className='border-2 rounded-xl m-1 mt-3'>
                        <IonItem>
                            <IonIcon slot='start' icon={ellipseOutline} className='text-red-500 bg-red-500 rounded-full text-lg  mr-4 mt-6' />
                            <IonLabel position='stacked'>Trip end location</IonLabel>
                            <IonInput
                                required
                                placeholder='Destination location'
                                className='text-xl'
                                value={destinationLocation}
                                onIonChange={handleEndLocation}
                            />
                            <IonIcon icon={search} slot='end' className='mt-[33px]' onClick={handleEndLocation}/>
                        </IonItem>
                    </IonList>
                    <div className='m-2'>
                        {endSuggestions.length > 0 && (
                            <ul className="suggestions h-[100px] overflow-auto" >
                                {endSuggestions.map((suggestion) => (
                                    <li className=' bg-white text-black p-1 border-b ' key={suggestion.place_id} onClick={() => handleSuggestion(suggestion)}>
                                        {suggestion.display_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <IonButton expand='block' type='submit' className='bottom-5 left-0 right-0 absolute m-2' size='large'>
                        Continue
                    </IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default CreateTrip;