// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVsn_zyO_UU171kxtfHXMHS6mRrYjx1LQ",
  authDomain: "solker-312.firebaseapp.com",
  projectId: "solker-312",
  storageBucket: "solker-312.appspot.com",
  messagingSenderId: "339551566074",
  appId: "1:339551566074:web:652a7a534dbc6fa49cf143",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };
