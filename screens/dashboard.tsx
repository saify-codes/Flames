import {Text} from 'react-native';
import Auth from '../services/firebase/firebaseAuthService';


export default function () {
  return <Text onPress={() => Auth.logout()}>logout</Text>;
}
