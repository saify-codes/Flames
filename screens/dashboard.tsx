import {Text} from 'react-native';
import Auth from '../services/firebase/firebaseAuthService';
import auth, { CallbackOrObserver, FirebaseAuthTypes } from '@react-native-firebase/auth';


export default function () {

  console.log("==========>", auth().currentUser);
  
  return <Text onPress={() => Auth.logout()}>logout</Text>;
}
