import Icon from 'react-native-vector-icons/Ionicons';

export default function ({
  icon,
  size,
  color,
}: {
  icon: string;
  size?: number;
  color?: string;
}) {
  return <Icon name={icon} size={size} color={color} />;
}
