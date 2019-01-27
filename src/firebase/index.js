const firebase = require("firebase/app");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAmVnTqHww15a21oTpq6xJQgHu0opeJ3_M",
  authDomain: "slovnifotbal-23fed.firebaseapp.com",
  databaseURL: "https://slovnifotbal-23fed.firebaseio.com",
  projectId: "slovnifotbal-23fed",
  storageBucket: "slovnifotbal-23fed.appspot.com",
  messagingSenderId: "912034632142"
};
export default firebase.initializeApp(config);
