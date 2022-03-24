import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
    authDomain: "restaurant-database-92c17.firebaseapp.com",
    projectId: "restaurant-database-92c17",
    storageBucket: "restaurant-database-92c17.appspot.com",
    messagingSenderId: "673538791861",
    appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
    measurementId: "G-5PQJ0CN4YQ"
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let username;
let password;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        console.log('hello mr user');
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });

window.onload = function () {
    logout();
    var log = document.getElementById('loginBtn');
    log.addEventListener('click', function () { login(); });
}

function getUserInput() {
    username = document.getElementById('usrnm').value;
    password = document.getElementById('psw').value;
}

function login() {
    getUserInput();
    console.log(document.getElementById('usrnm').required)
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            if (user.email.includes('kitchen')) {
                window.location.href = 'kitchen_staff';
            } else if (user.email.includes('waiter')) {
                window.location.href = 'waiter';
            } else {
                window.alert('no such man exists');
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            window.alert('Error: ' + errorMessage);
        });
}

function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}