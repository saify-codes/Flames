import {Text} from 'react-native';
import {Props} from '../types/screens/signin';

export default function ({navigation}: Props) {
  return (
    <Text
      onPress={() => {
        navigation.replace('Signup');
      }}>
      signin
    </Text>
  );
}
