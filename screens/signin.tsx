import Auth from '../services/firebase/firebaseAuthService';
import * as Yup from 'yup';
import Icon from '../components/Icon';
import {useState} from 'react';
import type {Props} from '../types/screens/signup';
import {Formik} from 'formik';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('email is invalformDataid').required('email is required'),
  password: Yup.string()
    .min(8, 'password must be minimum 8 characters')
    .max(50, 'password must be maximum characters')
    .required('password is required'),
});

export default function SignUpScreen({navigation}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    const response = await Auth.login('credentials', formData);

    if (response.error) {
      Alert.alert(response.message);
    }
    setLoading(false);
  };

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}>
      {({handleChange, handleBlur, handleSubmit, values, errors}: any) => (
        <SafeAreaView className="px-5 justify-center h-screen">
          <Text className="text-3xl font-bold text-primary text-center mb-5">
            Login here
          </Text>
          <Text className="text-lg font-semibold leading-5 text-gray-800 text-center mb-10">
            Welcome back you've{'\n'}been missed
          </Text>

          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            className="border-2 border-transparent focus:border-primary bg-primary-100 placeholder:text-gray-600 caret-primary font-medium rounded-lg px-3"
          />
          {errors.email && (
            <Text className="text-xs text-primary mt-2">{errors.email}</Text>
          )}

          <TextInput
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder="Password"
            className="border-2 border-transparent focus:border-primary bg-primary-100 placeholder:text-gray-600 caret-primary font-medium rounded-lg mt-5 px-3"
          />
          {errors.password && (
            <Text className="text-xs text-primary mt-2">{errors.password}</Text>
          )}

          <Text className="text-primary font-semibold text-right mt-5">
            Forgot your password?
          </Text>

          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full bg-primary p-3 rounded-lg items-center my-10"
            disabled={loading}
            style={{boxShadow: '0 5 10 0 #DC143C9A'}}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text className="text-white text-lg font-semibold">Sign Up</Text>
            )}
          </TouchableOpacity>

          <Text className="font-semibold text-center text-gray-600" onPress={()=> navigation.replace('Signup')}>
            Already have an account
          </Text>
          <Text className="font-semibold text-center text-primary mt-20">
            or continue with
          </Text>
          <View className="flex flex-row gap-2 mt-5 justify-center">
            <TouchableOpacity className="p-4 bg-gray-300 rounded-lg">
              <Icon icon="logo-google" size={16} />
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-gray-300 rounded-lg">
              <Icon icon="logo-facebook" size={16} />
            </TouchableOpacity>
            <TouchableOpacity className="p-4 bg-gray-300 rounded-lg">
              <Icon icon="logo-github" size={16} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
