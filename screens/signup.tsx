import Auth from '../services/firebase/firebaseAuthService';
import * as Yup from 'yup';
import Icon from '../components/Icon';
import {useState} from 'react';
import {Formik} from 'formik';
import firebaseStoreService from '../services/firebase/firebaseStoreService';
import {withLoader} from '../utils';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import type {Props} from '../types/screens/signup';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
  password: Yup.string()
    .min(8, 'password must be minimum 8 characters')
    .max(50, 'password must be maximum characters')
    .required('password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords must match')
    .required('confirm password is required'),
});

export default function SignUpScreen({navigation}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    const response = await withLoader(
      setLoading,
      Auth.register('credentials', formData),
    );

    if (!response.error) {
      firebaseStoreService
        .collection('profiles')
        .addDocumentWithId(response.user.uid, {
          name: null,
          email: formData.email,
          phone: null,
        });
    } else {
      Alert.alert(response.message);
    }
  };

  return (
    <Formik
      initialValues={{email: '', password: '', confirmPassword: ''}}
      onSubmit={handleSubmit}
      validationSchema={ValidationSchema}
      validateOnChange={false}
      validateOnBlur={false}>
      {({handleChange, handleBlur, handleSubmit, values, errors}: any) => (
        <SafeAreaView className="flex gap-10 px-5 justify-center h-screen">
          {/* Title */}
          <View className="flex gap-5">
            <Text className="text-3xl font-bold text-primary text-center">
              Create Account
            </Text>
            <Text className="text-lg leading-5 text-gray-800 text-center">
              Create an account so you can explore all the existing features
            </Text>
          </View>

          {/* Fields */}
          <View className="flex gap-5">
            <View>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                className="border-2 border-transparent focus:border-primary bg-primary-100 placeholder:text-gray-600 text-gray-600 caret-primary font-medium rounded-lg px-3"
              />
              {errors.email && (
                <Text className="text-xs text-primary mt-2">
                  {errors.email}
                </Text>
              )}
            </View>

            <View>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Password"
                secureTextEntry
                className="border-2 border-transparent focus:border-primary bg-primary-100 placeholder:text-gray-600 text-gray-600 caret-primary font-medium rounded-lg px-3"
              />
              {errors.password && (
                <Text className="text-xs text-primary mt-2">
                  {errors.password}
                </Text>
              )}
            </View>

            <View>
              <TextInput
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                secureTextEntry
                className="border-2 border-transparent focus:border-primary bg-primary-100 placeholder:text-gray-600 text-gray-600 caret-primary font-medium rounded-lg px-3"
              />
              {errors.confirmPassword && (
                <Text className="text-xs text-primary mt-2">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full bg-primary p-3 rounded-lg items-center"
              disabled={loading}
              style={{boxShadow: '0 5 10 0 #DC143C9A'}}>
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text className="text-white text-lg font-semibold">
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>

            <Text
              className="font-semibold text-center text-gray-600"
              onPress={() => navigation.pop()}>
              Already have an account
            </Text>
          </View>

          {/* Socials logins */}
          <View className="flex gap-5">
            <Text className="font-semibold text-center text-primary">
              or continue with
            </Text>

            <View className="flex flex-row gap-2 justify-center">
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
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
