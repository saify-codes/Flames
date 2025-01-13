import React, {useState} from 'react';
import Icon from '../Icon';
import Auth from '../../services/firebase/firebaseAuthService';

import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Props} from '../../types/screens/dashboard';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export default function () {
  const navigation = useNavigation<DrawerNavigationProp<Props>>();
  const [notifications, setNotifications] = useState(5); // Mock notification count
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-2 shadow-md">
      {/* Drawer Toggle */}
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text className="text-lg font-bold"><Icon icon='menu' size={20} color='#DC143C'/></Text>
      </TouchableOpacity>

      {/* Notifications and Avatar */}
      <View className="flex-row items-center">
        {/* Notification Icon */}
        <TouchableOpacity className="relative mr-4">
          <Text className="text-xl">🔔</Text>
          {notifications > 0 && (
            <View className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
              <Text className="text-xs text-white">{notifications}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Avatar Menu */}
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          className="relative">
          <Image
            source={{uri: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'}}
            className="h-10 w-10 rounded-full"
          />
          {menuVisible && (
            <View className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
              <TouchableOpacity
                className="px-4 py-2 border-b border-gray-200"
                onPress={() => {
                  setMenuVisible(false);
                  // Add your profile navigation logic here
                }}>
                <Text className="text-sm">Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2 border-b border-gray-200"
                onPress={() => {
                  setMenuVisible(false);
                  // Add your notifications navigation logic here
                }}>
                <Text className="text-sm">Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-2"
                onPress={() => {
                  Auth.logout()
                  setMenuVisible(false);
                }}>
                <Text className="text-sm text-red-500">Logout</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
