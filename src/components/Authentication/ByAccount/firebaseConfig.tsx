import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyB4i6k2R3_h4l3TGgPrYvwCsZPxmsG0VXY',
  authDomain: 'learn-firebase-e9f67.firebaseapp.com',
  projectId: 'learn-firebase-e9f67',
  storageBucket: 'learn-firebase-e9f67.appspot.com',
  messagingSenderId: '161376696658',
  appId: '1:161376696658:web:7c3b26ffed8ca965de228b',
  measurementId: 'G-SZCN3KW3NC',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
// const analytics = getAnalytics(app)
