// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, collection, query, where, orderBy, deleteDoc, doc, setDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
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

window.removeDoc = removeDoc;
window.confirmOrder = confirmOrder;

async function removeDoc(id){
    let Order = 0;
    const q = query(collection(db, "Orders"), where("OrderNum","==", Number(id)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function(doc) {
        Order = doc.id;
    });
    await deleteDoc(doc(db, "Orders", `${Order}`));
}

async function confirmOrder(id){
    let Order = 0;
    const q = query(collection(db, "Orders"), where("OrderNum","==", Number(id)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function(doc) {
        Order = doc.id;
    });
    const orderRef = doc(db, "Orders", `${Order}`);
    await updateDoc(orderRef, {
        Status: "Preparing"
    });
}

