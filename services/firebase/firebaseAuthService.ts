import auth, { CallbackOrObserver, FirebaseAuthTypes } from '@react-native-firebase/auth';
import type { Credentials, Provider } from '../../types/services/firebase';

export default class Auth {

    constructor() {

    }

    static login(provider: Provider, credentials: Credentials) {

        switch (provider) {
            case 'credentials':
                const { email, password } = credentials
                const response: any = { message: null, error: false, user: null }

                return auth().signInWithEmailAndPassword(email, password)
                    .then(({ user }: FirebaseAuthTypes.UserCredential) => {
                        response.user = user
                        response.message = 'account logged in'
                        return response
                    })
                    .catch((error: any) => {

                        response.error = true
                        response.message = 'something went wrong'

                        if (error.code == 'auth/invalid-credential') response.message = 'invalid email or password'
                        return response
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
                const response: any = { message: null, error: false, user: null }

                return auth().createUserWithEmailAndPassword(email, password)
                    .then(({ user }: FirebaseAuthTypes.UserCredential) => {
                        response.user = user
                        response.message = 'account created'
                        return response
                    })
                    .catch((error: any) => {

                        response.error = true
                        response.message = 'something went wrong'

                        if (error.code === 'auth/email-already-in-use') response.message = 'That email address is already in use!'
                        if (error.code === 'auth/invalid-email') response.message = 'That email address is invalid!'
                        return response
                    })

            default:
                throw Error('invalid provider')
        }
    }

    static onAuthStateChanged(fn: CallbackOrObserver<FirebaseAuthTypes.AuthListenerCallback>) {
        return auth().onAuthStateChanged(fn)
    }

}