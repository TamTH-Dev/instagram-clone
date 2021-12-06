import { initializeApp } from 'firebase/app'
import { getFirestore, FieldValue } from 'firebase/firestore'

// import { seedDatabase } from '../seed'

const config = {
  apiKey: 'AIzaSyCZzl6yzhmsnpgHL4DJrvavgxjNn_xRB7M',
  authDomain: 'instagram-clone-85b46.firebaseapp.com',
  projectId: 'instagram-clone-85b46',
  storageBucket: 'instagram-clone-85b46.appspot.com',
  messagingSenderId: '163885684198',
  appId: '1:163885684198:web:ad029081ec730968f9b227'
}

const firebaseApp = initializeApp(config)

const firebaseDb = getFirestore(firebaseApp)

// Call seed db only once
// seedDatabase()

export { firebaseApp, FieldValue, firebaseDb }
