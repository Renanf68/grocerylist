import firebase from "firebase/app";
import 'firebase/database'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "XXXXXXXX",
  authDomain: "grocerylist-web.firebaseapp.com",
  databaseURL: "https://grocerylist-web.firebaseio.com",
  projectId: "grocerylist-web",
  storageBucket: "",
  messagingSenderId: "00000000",
  appId: "0:000000000000:web:0000000000"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const database = firebase.database()
