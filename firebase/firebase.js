import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBh1M-BQ6HN_PPgBVQuDkZJ8-2aTmK0irU",
	authDomain: "budgetoria.firebaseapp.com",
	projectId: "budgetoria",
	storageBucket: "budgetoria.appspot.com",
	messagingSenderId: "713558167556",
	appId: "1:713558167556:web:c53ad4c5831146d8502551",
	measurementId: "G-M6W75TVEXP",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
