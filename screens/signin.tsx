import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Props} from '../types/screens/signup';
import Auth from '../services/firebase/firebaseAuthService';

export default function SignUpScreen({navigation}: Props) {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    errors: {email: '', password: ''},
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const validationErrors: {
      email?: string;
      password?: string;
    } = {};

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
    const response = await Auth.login('credentials', formState);

    if (response.error) {
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
    <View className="flex-1 justify-center items-center bg-gray-100 p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-6">Sign Up</Text>

      {/* Email Input */}
      <View className="w-full mb-4">
        <Text className="text-lg text-gray-700 mb-2">Email</Text>
        <TextInput
          className="p-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm"
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
          className="p-4 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm"
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

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="w-full bg-blue-600 p-4 rounded-lg items-center"
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        className="mt-4">
        <Text className="text-blue-600 text-lg">
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
