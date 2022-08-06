import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// const app = initializeApp({
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// });

const firebaseConfig = {
  apiKey: "AIzaSyBiO4NTttc68zMHFkRFXyK5qLsU9zXsJmg",
  authDomain: "moonlight-40ecf.firebaseapp.com",
  projectId: "moonlight-40ecf",
  storageBucket: "moonlight-40ecf.appspot.com",
  messagingSenderId: "1043878072437",
  appId: "1:1043878072437:web:0fd78f6e64f3cfbe2d283c",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCLS10J6gw0Y9DqN8qXxowfI65foIKI38g",
//   authDomain: "hotfilm-2f853.firebaseapp.com",
//   projectId: "hotfilm-2f853",
//   storageBucket: "hotfilm-2f853.appspot.com",
//   messagingSenderId: "340211892931",
//   appId: "1:340211892931:web:ee03785323293f6ea95876",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyC5V0Pm-YJV9h0kyX9aBgrKrs3_J3R2Foo",
//   authDomain: "pvt-comments.firebaseapp.com",
//   databaseURL: "https://pvt-comments-default-rtdb.firebaseio.com",
//   projectId: "pvt-comments",
//   storageBucket: "pvt-comments.appspot.com",
//   messagingSenderId: "700353567702",
//   appId: "1:700353567702:web:f36bbbae9c78ac1e3ea277",
// };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
