import {RootStackParamList} from '../types/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';

export default function () {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}
