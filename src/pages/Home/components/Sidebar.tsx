import { IonContent, IonHeader, IonIcon, IonItem, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import React, { useContext } from 'react';
import driverPic from '../../../assets/logo-light.png'
import { Redirect, Route } from 'react-router';
import Home from '../Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { AirlineSeatReclineNormal, ContactMail, ContentPasteOutlined, Logout } from '@mui/icons-material';
import TnC from '../../TnC/TnC';
import Contactus from '../../ContactUs/Contactus';
import Trucks from '../../Trucks/Trucks';
import Drivers from '../../Drivers/Drivers';
import Profile from '../../Profile/Profile';
import { useAuth } from '../../contexts/Auth';

const paths = [
    {
        name: 'Home',
        path: '/app/home',
        icon: <HomeIcon/>
    },
    {
        name: 'My Trucks',
        path: '/app/my-trucks',
        icon: <LocalShippingIcon/>
    },
    {
        name:'My Drivers',
        path:'/app/my-drivers',
        icon: <AirlineSeatReclineNormal/>
    },
    {
        name: 'My Profile',
        path: '/app/my-profile',
        icon: <PersonIcon/>
    },
    {
        name: 'Terms & Conditions',
        path: '/app/terms-&-conditions',
        icon: <ContentPasteOutlined/>
    },
    {
        name: 'Contact us',
        path: '/app/contact-us',
        icon: <ContactMail/>
    },
    {
        name: 'Logout',
        path: '/signin',
        icon: <Logout/>
    }

];
const Sidebar: React.FC = () => {

    const {logout}= useAuth();

    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        logout();
    }
    return (
        <IonPage>
            <IonSplitPane contentId='main'>
                <IonMenu contentId='main'>
                <IonHeader className=''>
                        <IonToolbar >
                            <div className='flex flex-col items-center justify-center bg-blue-500'>
                                <div className='my-10 border p-2 rounded-3xl'>
                                <img src={driverPic} alt="" className='h-[40px] w-[180px]' />
                                </div>
                                {/* <p className='text-xl font-bold'>{adminName}</p>
                                <p>{companyName}</p> */}
                            </div>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        {paths.map((items, index) => (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem routerDirection='none' routerLink={items.path} className='ion-margin-top' onClick={items.name === 'Logout' ? handleLogout: undefined}>
                                    <span className='text-[#0054e9]'>{items.icon}</span>
                                    <p className='ml-3 text-lg font-semibold'>{items.name}</p>
                                </IonItem>
                            </IonMenuToggle>
                        ))}
                    </IonContent>
                </IonMenu>
                <IonRouterOutlet id='main'>
                    <Route exact path="/app/home" component={Home}/>
                    <Route path='/app/terms-&-conditions' component={TnC}/>
                    <Route path='/app/contact-us' component={Contactus}/>
                    <Route path='/app/my-trucks' component={Trucks}/>
                    <Route path='/app/my-drivers' component={Drivers}/>
                    <Route path='/app/my-profile' component={Profile}/>
                    <Route exact path='/app'>
                        <Redirect to='/app/home'/>
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonPage>
    );
};

export default Sidebar;