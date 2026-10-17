import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyCNxlWkDS3cZopQa_f0ZDuPO1-0-Ao9Pc4",
  authDomain: "sahayatri-c6696.firebaseapp.com",
  projectId: "sahayatri-c6696",
  storageBucket: "sahayatri-c6696.firebasestorage.app",
  messagingSenderId: "905331250802",
  appId: "1:905331250802:web:3a58b6fc4ad79234d594eb",
  measurementId: "G-E2JE490CHP"

};

export const firebaseReady = true;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
  export const auth = getAuth(app);

