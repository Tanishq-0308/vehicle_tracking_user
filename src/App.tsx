import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';
import '../tailwind.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Signin from './pages/Signin/Signin';
import Sidebar from './pages/Home/components/Sidebar';
import Signup from './pages/Signup/Signup';
import CreateTrip from './pages/create-trip/CreateTrip';
import AddTripInfor from './pages/Add-trip-info/AddTripInfo';
import TripContextProvider from './pages/contexts/TripContext/TripContextProvider';
import AddTruck from './pages/Trucks/components/AddTruck';
import addDriver from './pages/Drivers/Components/Add-Driver';
import AddHelper from './pages/Drivers/Components/AddHelper';
import AdminContextProvider from './pages/contexts/AdminContext/AdminContextProvider';
import TruckInfo from './pages/Trucks/components/TruckInfo';
import DriverInfo from './pages/Drivers/Components/DriverInfo';
import HelperInfo from './pages/Drivers/Components/HelperInfo';
import Maps from './pages/Map/Maps'
import AuthContextProvider from './pages/contexts/Authentication/AuthenticationProvider';
import { AuthProvider } from './pages/contexts/Auth';
import { AuthRedirect, ProtectedRoute } from './pages/Route/ProtectedRoute';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
    <AuthContextProvider>
    <AdminContextProvider>
    <TripContextProvider>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* <Route exact component={Home} path='/home'/> */}
        <Route exact path="/" render={() => <Redirect to="/signin" />} />
                
                {/* /signin route with AuthRedirect to prevent logged-in users from accessing it */}
                <Route
                  path="/signin"
                  render={() => (
                    <AuthRedirect>
                      <Signin />
                    </AuthRedirect>
                  )}
                />

                {/* Protected /app route, only accessible to authenticated users */}
                <Route
                  path="/app"
                  render={() => (
                    <ProtectedRoute>
                      <Sidebar /> {/* Render Sidebar (dashboard) only if authenticated */}
                    </ProtectedRoute>
                  )}
                />

        {/* <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact component={Signin} path='/signin'/> */}
        <Route component={Sidebar} path='/app'/>
        <Route component={Signup} path='/signup'/>
        <Route component={CreateTrip} path="/create-trip"/>
        <Route component={AddTripInfor} path="/add-trip-infor"/>
        <Route component={AddTruck} path="/add-truck"/>
        <Route component={addDriver} path="/add-driver"/>
        <Route component={AddHelper} path="/add-helper"/>
        <Route component={TruckInfo} path="/truck-info"/>
        <Route component={DriverInfo} path="/driver-info"/>
        <Route component={HelperInfo} path="/helper-info"/>
        <Route component={Maps} path="/maps"/>
        
      </IonRouterOutlet>
    </IonReactRouter>
    </TripContextProvider>
    </AdminContextProvider>
    </AuthContextProvider>
    </AuthProvider>
  </IonApp>
);

export default App;
