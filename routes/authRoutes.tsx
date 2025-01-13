import {RootStackParamList} from '../types/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Dashboard from '../screens/dashboard';
import MainHeadr from '../components/Headers/MainHeadr';
import Posts from '../screens/posts';
import postsDetail from '../screens/posts.detail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
        component={PostsStackNavigator}
        options={{
          header: () => <MainHeadr />,
        }}
      />
    </Drawer.Navigator>
  );
}

function PostsStackNavigator() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false, // Header managed by Drawer
        }}
        />
      <Stack.Screen
        name="Details"
        component={postsDetail}
        options={{
          headerShown: false, // Header managed by Drawer
        }}
      />
    </Stack.Navigator>
  );
}
