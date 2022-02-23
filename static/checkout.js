import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, collection, query, where, orderBy, deleteDoc, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
    authDomain: "restaurant-database-92c17.firebaseapp.com",
    projectId: "restaurant-database-92c17",
    storageBucket: "restaurant-database-92c17.appspot.com",
    messagingSenderId: "673538791861",
    appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
    measurementId: "G-5PQJ0CN4YQ"
};
items = "";
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(app);

async function addToDatabase() {
	//Add to database here
}

function addToList() {
	var Order = document.getElementById('Order').value;
	items = items + Order + ","
	var listNode = document.getElementById('OrderList');
	var newNode = document.createElement("LI");
	var textNode = document.createTextNode(Order);
	newNode.appendChild(textNode);
	listNode.appendChild(newNode);
	}

