import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDYdyShXsH9AYMOsP45ogHvxvVYsRnyM8k",
    authDomain: "trainingclimb-dcb7a.firebaseapp.com",
    databaseURL: "https://trainingclimb-dcb7a-default-rtdb.firebaseio.com",
    projectId: "trainingclimb-dcb7a",
    storageBucket: "trainingclimb-dcb7a.appspot.com",
    messagingSenderId: "574860519887",
    appId: "1:574860519887:web:caeffdf42ce3ab73b18aba",
    measurementId: "G-5TN1Y0L9R8"
  };
  // Initialize Firebase
  const firebs = firebase.initializeApp(firebaseConfig);
  export default firebs;