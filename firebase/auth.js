import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth();

function createUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(`New user created: ${user}`)
            return true
        })
        .catch((error) => {
            // https://firebase.google.com/docs/reference/js/auth#autherrorcodes <-- list of error codes for firebase auth
            console.error(error.message)
            return error.code
        });
}

function signInUser(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return resolve(userCredential.user)
        })
        .catch((error) => {
            return reject(error.message);
        });
    });
}

function getUser() {
    return auth.currentUser
}

export {
    createUser, signInUser, getUser
}