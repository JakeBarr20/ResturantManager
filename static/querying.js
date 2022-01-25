// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
    authDomain: "restaurant-database-92c17.firebaseapp.com",
    projectId: "restaurant-database-92c17",
    storageBucket: "restaurant-database-92c17.appspot.com",
    messagingSenderId: "673538791861",
    appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
    measurementId: "G-5PQJ0CN4YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(app);
queryGetMenu();
// document.getElementById("button1").addEventListener("onclick", queryGetMenu());
//Query
async function queryTables() {
    const q1 = query(collection(db, "Table"), where("isAvailable", "==", true));
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}

async function queryGetMenu(){
    let count = 1;
    const q2 = query(collection(db, "Item"))
    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().ItemName);
        document.getElementById(count.toString()).innerHTML = doc.data().ItemName;
        count++;
    });
}