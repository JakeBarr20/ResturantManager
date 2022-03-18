import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";

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


window.onload = function() {
    var log = document.getElementById('loginBtn');
    log.addEventListener('click', function () { login(); });
}

function login() {
    var username = document.getElementById('usrnm').value;
    var password = document.getElementById('psw').value;

    console.log(username + ' pass ' + password);
}