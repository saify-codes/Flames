import React, {useLayoutEffect, useState} from 'react';
import Auth from './services/firebase/firebaseAuthService';
import GuestRoutes from './routes/guestRoutes';
import AuthRoutes from './routes/authRoutes';

import {store} from './store';
import {Provider} from 'react-redux';
import {Text} from 'react-native';
import {User} from './types/services/firebase';
import {NavigationContainer} from '@react-navigation/native';

import './global.css';
import FullpageLoader from './components/loaders/fullpageLoader';

function App(): React.JSX.Element {
  const [user, setUser] = useState<User>(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: User) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useLayoutEffect(() => Auth.onAuthStateChanged(onAuthStateChanged), []);

  if (initializing) {
    return <FullpageLoader/>
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <AuthRoutes /> : <GuestRoutes />}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
