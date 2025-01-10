import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/routes';

import Signin from '../screens/signin';
import Signup from '../screens/signup';

export default function () {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator initialRouteName="Signin">
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
