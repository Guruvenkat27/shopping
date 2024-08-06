// Database.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBauu0FLMSRvqAGlhl6jSwMXYB0DNNEa9U",
  authDomain: "shopping-fc21f.firebaseapp.com",
  projectId: "shopping-fc21f",
  storageBucket: "shopping-fc21f.appspot.com",
  messagingSenderId: "441636780552",
  appId: "1:441636780552:web:642db4d83e8a2583e96fbd",
  measurementId: "G-9JG86BCEQD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
