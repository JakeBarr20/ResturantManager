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

// Executes commands when window is opened
// Appends EventListeners to login button
window.onload = function () {
    logout();
    var log = document.getElementById('loginBtn');
    log.addEventListener('click', function () { login(); });
}

/**
 * Checks if the user is signed in, if so, ensures that the signed in user stays logged in
 * @param  {} auth Authentication information for client requesting data    
 * @param  {} user User account that has signed in
 */
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

/**
 * Gets username and password from the input form
 */
function getUserInput() {
    username = document.getElementById('usrnm').value;
    password = document.getElementById('psw').value;
}

/**
 * Attempts to log in the user, if unsuccessfull throws error
 */
function login() {
    getUserInput();
    console.log(document.getElementById('usrnm').required)
    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            if (user.email.includes('kitchen')) {
                location.href = '/templates/kitchenUI.html';
            } else if (user.email.includes('waiter')) {
                location.href = '/templates/waiterUI.html';
            } else {
                window.alert('no such man exists');
            }
            generateWarning(false);
        })
        .catch((error) => {
            generateWarning(true)
            const errorCode = error.code;
            const errorMessage = error.message;
            //window.alert('Error: ' + errorMessage);
        });
}
/**
 * Logs out the user
 */
function logout() {
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

/**
 * Notifies Kitchen staff if the query is unsucsessful by displaying alerts
 * @param  {number} orderNum Order Number used to give more detail regarding query
 */
 function generateWarning(isWarning) {
    let warning = document.createElement('div');
    if (isWarning) {
        warning.className = "alert alert-danger d-flex align-items-center fade show";
        warning.innerHTML = `Username or Password incorrect`;
    } else {
        warning.className = "alert alert-success d-flex align-items-center fade show";
        warning.innerHTML = `Sign In successfull!`;
    }

    document.body.appendChild(warning);
    setTimeout (
        function () {
        document.body.removeChild(warning);    
        },2000)
}