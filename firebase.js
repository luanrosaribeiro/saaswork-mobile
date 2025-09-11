import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// STRING DE CONEXÃO
const firebaseConfig = {
  apiKey: "AIzaSyCGL1lzYXAx2G0SUAlsLQ4sC4jvTlLOvf4",
  authDomain: "fir-80afb.firebaseapp.com",
  projectId: "fir-80afb",
  storageBucket: "fir-80afb.firebasestorage.app",
  messagingSenderId: "218106508152",
  appId: "1:218106508152:web:d4512a4e3fc6d2f1af0e8d",
  measurementId: "G-18TJMND460"
};
  
  
// INICIALIZAR O FIREBASE
let app;
if (firebase.apps.length == 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };