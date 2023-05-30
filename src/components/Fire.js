import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAU4_65IgnZtuMrywyWCQYESqPprZjoV0I",
  authDomain: "database-bd677.firebaseapp.com",
  projectId: "database-bd677",
  storageBucket: "database-bd677.appspot.com",
  messagingSenderId: "532341151182",
  appId: "1:532341151182:web:430b847d2a6cf39dc8c79f"
};
  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
