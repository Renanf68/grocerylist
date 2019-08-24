import firebase from "firebase";

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
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth()
export const database = firebaseApp.database()
//export default firebaseApp