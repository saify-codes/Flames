import auth, { CallbackOrObserver, FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Credentials, Provider } from './firebaseAuthService.d';

export default class Auth {

    constructor() {

    }

    static login(provider: Provider, credentials: Credentials) {

        switch (provider) {
            case 'credentials':
                const { email, password } = credentials

                return auth().signInWithEmailAndPassword(email, password)
                    .then(() => null)
                    .catch((error: any) => {
                        if (error.code == 'auth/invalid-credential') return 'invalid email or password'
                        return 'something went wrong'
                    })

            default:
                throw Error('invalid provider')
        }
    }

    static logout() {
        auth().signOut()
    }

    static register(provider: Provider, credentials: Credentials) {

        switch (provider) {
            case 'credentials':
                const { email, password } = credentials

                return auth().createUserWithEmailAndPassword(email, password)
                    .then(() => null)
                    .catch((error: any) => {

                        if (error.code === 'auth/email-already-in-use') return 'That email address is already in use!'
                        if (error.code === 'auth/invalid-email') return 'That email address is invalid!'
                        return 'something went wrong'
                    })

            default:
                throw Error('invalid provider')
        }
    }

    static onAuthStateChanged(fn: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>) {
        return auth().onAuthStateChanged(fn)
    }

}