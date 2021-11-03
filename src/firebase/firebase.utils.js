import firebase from 'firebase/compat/app'

import 'firebase/compat/firestore'

import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyCviRpT2mcQ3mGIpgljL_5PTRSm3-bCRFM",
    authDomain: "crown-db-c007f.firebaseapp.com",
    projectId: "crown-db-c007f",
    storageBucket: "crown-db-c007f.appspot.com",
    messagingSenderId: "913815716066",
    appId: "1:913815716066:web:d3965ae8b5712029889ebb",
    measurementId: "G-TE30CYQG2Q"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists){
        const {displayName, email } = userAuth;

        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
        } catch (error){
            console.log('error creating user ', error.message)
        }
    }
    console.log(userRef)
    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

