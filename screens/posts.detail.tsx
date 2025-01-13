import {Text, View} from 'react-native';
import {Props} from '../types/screens/posts.detail';

import RenderHtml from 'react-native-render-html'; 

export default function ({route}: Props) {
  return (
    <View>
      <Text>{route.params.title}</Text>
      {/* <RenderHtml contentWidth={300} source={{html: route.params.content}}/> */}
    </View>
  );
}
