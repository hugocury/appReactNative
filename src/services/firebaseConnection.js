import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDP81hN5uk3UPykJ0HB9P-qUSou0wEXSpY",
    authDomain: "meuapp-d7568.firebaseapp.com",
    databaseURL: "https://meuapp-d7568-default-rtdb.firebaseio.com",
    projectId: "meuapp-d7568",
    storageBucket: "meuapp-d7568.appspot.com",
    messagingSenderId: "364316936485",
    appId: "1:364316936485:web:194575751da4cec3a732cc",
    measurementId: "G-FES2HYN7BJ"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    // Abrir conexao
   firebase.initializeApp(firebaseConfig);
  }

  export default firebase;