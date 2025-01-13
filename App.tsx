import React, {useLayoutEffect, useState} from 'react';
import Auth from './services/firebase/firebaseAuthService';
import GuestRoutes from './routes/guestRoutes';
import AuthRoutes from './routes/authRoutes';
import FullpageLoader from './components/loaders/fullpageLoader';
import config from './config';

import {store} from './store';
import {Provider} from 'react-redux';
import {User} from './types/services/firebase';
import {NavigationContainer} from '@react-navigation/native';

import './global.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App(): React.JSX.Element {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);
  const queryClient = new QueryClient();

  function onAuthStateChanged(user: User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useLayoutEffect(() => Auth.onAuthStateChanged(onAuthStateChanged), []);

  if (initializing) {
    return <FullpageLoader />;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {user ? <AuthRoutes /> : <GuestRoutes />}
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

config();
export default App;
