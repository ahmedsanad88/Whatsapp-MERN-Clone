import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBviFWoY2TwzSG9apW42Dth6FIEXb9SWog",
  authDomain: "whatapp-full-mern.firebaseapp.com",
  projectId: "whatapp-full-mern",
  storageBucket: "whatapp-full-mern.appspot.com",
  messagingSenderId: "37985441149",
  appId: "1:37985441149:web:ce2001e2dc0c1168c36814"
};

// initialize firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);
// create our storage access
const db = firebaseApp.firestore();
// initialize our authentication
const auth = firebase.auth();
// provider will assist in login by google
const provider = new firebase.auth.GoogleAuthProvider();


export { auth, provider };
export default db;


