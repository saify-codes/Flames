import {NavigationContainer} from '@react-navigation/native';

import GuestStack from './guestRoutes';
import AuthDrawer from './authRoutes';

export default function () {
  return (
    <NavigationContainer>
      <GuestStack />
    </NavigationContainer>
  );
}
