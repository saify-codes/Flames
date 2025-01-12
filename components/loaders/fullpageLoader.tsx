import {Image, View} from 'react-native';

export default function () {
  return (
    <View className='bg-black h-screen justify-center'>
      <Image className='w-full' source={require('../../assets/loader.gif')} />
    </View>
  );
}
