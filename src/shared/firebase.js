import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCLVrKuII4UY1Wd5K0c8V1lInBDPDWww3s",
    authDomain: "caloriesprofile.firebaseapp.com",
    projectId: "caloriesprofile",
    storageBucket: "caloriesprofile.appspot.com",
    messagingSenderId: "574672714203",
    appId: "1:574672714203:web:a3629ff7a106fd24fbcffe",
    measurementId: "G-XZH1DZV8W8"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage};