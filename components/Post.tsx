import {View, Text, TouchableOpacity} from 'react-native';
import {Post} from '../types/api/post';
import {stripTags} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RootStackParamList} from '../types/routes';

export default function (props: Post) {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  return (
    <View className="p-4 rounded bg-gray-200">
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-xl font-bold mb-3">
        {props.title}
      </Text>
      <Text>{stripTags(props.content)}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', {...props})}>
        <Text className="bg-primary px-3 py-2 rounded text-white text-center mt-2">
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
}
