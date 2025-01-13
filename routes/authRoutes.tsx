import {RootStackParamList} from '../types/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';
import MainHeadr from '../components/Headers/MainHeadr';
import Posts from '../screens/posts';

export default function () {
  const Drawer = createDrawerNavigator<RootStackParamList>();
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          header: () => <MainHeadr />,
        }}
      />
      <Drawer.Screen
        name="Posts"
        component={Posts}
        options={{
          header: () => <MainHeadr />,
        }}
      />
    </Drawer.Navigator>
  );
}
