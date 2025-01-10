import { Text } from "react-native";
import {Props} from '../types/screens/signup';

export default function ({navigation}: Props) {
  return (
    <Text
      onPress={() => {
        navigation.replace('Signin');
      }}>
      sign UP
    </Text>
  );
}