import { TextInput, View } from 'react-native';
import Icon from '../Icon';

export default function ({ icon, iconColor = '#DC143C', className, ...rest }: any) {

  console.log(rest);

  return (
    <View className="flex flex-row items-center gap-1 px-2 border border-gray-300 rounded">
      <Icon icon={icon} size={20} color={iconColor} />
      <TextInput className={`flex-1 caret-gray-300 ${className}`} {...rest}    />
    </View>
  );
}
