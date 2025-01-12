import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import {Props} from '../types/screens/signup';
import Auth from '../services/firebase/firebaseAuthService';
import FirestoreService from '../services/firebase/firebaseStoreService';

export default function SignUpScreen({navigation}: Props) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    errors: {name: '', email: '', password: '', phone: ''},
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const validationErrors: {
      name?: string;
      email?: string;
      password?: string;
      phone?: string;
    } = {};

    if (!formState.name) {
      validationErrors.name = 'Name is required';
    }

    if (!formState.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!formState.password) {
      validationErrors.password = 'Password is required';
    } else if (formState.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }

    if (!formState.phone) {
      validationErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formState.phone)) {
      validationErrors.phone = 'Phone number must be 10 - 15 digits';
    }

    setFormState((prevState: any) => ({
      ...prevState,
      errors: validationErrors,
    }));

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    const response = await Auth.register('credentials', formState);

    if (!response.error) {
      const {name, email, phone} = formState;
      FirestoreService.collection('profiles').addDocumentWithId(
        response.user.uid,
        {name, email, phone},
      );
    } else {
      Alert.alert(response.message);
    }
    setLoading(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Sign Up</Text>

      {/* Name Input */}
      <View className="w-full mb-4">
        <Text className="text-lg text-gray-700 mb-2">Name</Text>
        <TextInput
          className="px-4 bg-white border text-gray-900 border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your name"
          value={formState.name}
          onChangeText={text => handleChange('name', text)}
        />
        {formState.errors.name && (
          <Text className="text-red-600 text-sm mt-1">
            {formState.errors.name}
          </Text>
        )}
      </View>

      {/* Email Input */}
      <View className="w-full mb-4">
        <Text className="text-lg text-gray-700 mb-2">Email</Text>
        <TextInput
          className="p-4 bg-white border text-gray-900 border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={formState.email}
          onChangeText={text => handleChange('email', text)}
        />
        {formState.errors.email && (
          <Text className="text-red-600 text-sm mt-1">
            {formState.errors.email}
          </Text>
        )}
      </View>

      {/* Password Input */}
      <View className="w-full mb-4">
        <Text className="text-lg text-gray-700 mb-2">Password</Text>
        <TextInput
          className="p-4 bg-white border text-gray-900 border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your password"
          secureTextEntry
          value={formState.password}
          onChangeText={text => handleChange('password', text)}
        />
        {formState.errors.password && (
          <Text className="text-red-600 text-sm mt-1">
            {formState.errors.password}
          </Text>
        )}
      </View>

      {/* Phone Input */}
      <View className="w-full mb-6">
        <Text className="text-lg text-gray-700 mb-2">Phone Number</Text>
        <TextInput
          className="p-4 bg-white border text-gray-900 border-gray-300 rounded-lg shadow-sm"
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={formState.phone}
          onChangeText={text => handleChange('phone', text)}
        />
        {formState.errors.phone && (
          <Text className="text-red-600 text-sm mt-1">
            {formState.errors.phone}
          </Text>
        )}
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-blue-600 p-4 rounded-lg items-center"
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        onPress={() => navigation.pop()}
        className="mt-4">
        <Text className="text-blue-600 text-lg">
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
