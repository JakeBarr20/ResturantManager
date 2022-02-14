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
queryTables();

//Query
async function queryTables() {
    const q1 = query(collection(db, "Orders"), where("Status", "==", "Preparing"));
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        //tyhfghgdfgd
        console.log(doc.id, " => ", doc.data().food);
    });
}

async function queryGetMenu(){
    let count = 1;
    const q2 = query(collection(db, "Item"))
    const querySnapshot = await getDocs(q2);
    querySnapshot.forEach((doc) => {
        let button = document.createElement("button");
        button.id = count.toString();
        button.innerHTML = doc.data().ItemName;
        button.onclick = function() {
            var Order = document.getElementById(button.id).innerHTML;
            var listNode = document.getElementById('OrderList');
            var newNode = document.createElement("LI");
            var textNode = document.createTextNode(Order);
            newNode.appendChild(textNode);
            listNode.appendChild(newNode);
            return false;
        }
        document.body.appendChild(button);
        count++;
    });
}