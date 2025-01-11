import { FirebaseAuthTypes } from "@react-native-firebase/auth"

export type Provider = 'google' | 'credentials'
export type Credentials = any
export type User = FirebaseAuthTypes.User | null