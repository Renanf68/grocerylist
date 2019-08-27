import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyCTej5j5pXWvoWJDQQdCqfLvWwkUhKYiBU",
  authDomain: "grocerylist-web.firebaseapp.com",
  databaseURL: "https://grocerylist-web.firebaseio.com",
  projectId: "grocerylist-web",
  storageBucket: "",
  messagingSenderId: "1068505924100",
  appId: "1:1068505924100:web:93b901a7414b82d5"
};
// Initialize Firebase
console.log('Iniciando firebase')
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const database = firebase.database()
