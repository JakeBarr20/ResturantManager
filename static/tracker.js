// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, collection, onSnapshot, query, where, deleteField, deleteDoc, doc, orderBy, getDocs, updateDoc,getDoc } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
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
let unsubscribe;
let TiD;

const btnR = document.getElementById("redo");
const btnH = document.getElementById("help");
btnR.addEventListener("click", orderAgain);
btnH.addEventListener("click", needsHelp);


async function getStatus(orderid){  
  if (unsubscribe) unsubscribe();

  const q = query(collection(db, "Orders"),where("TableNum", "==", Number(orderid)));
  const querySnapshot = await getDocs(q);

  unsubscribe = onSnapshot(q, (querySnapshot) => {
    // Search Dependent Display Condition (if search failed, display ...)
    if (querySnapshot.empty) {
      generateWarning(orderNum);
    } else {
      // Status Dependent Order Display
      let changes = querySnapshot.docChanges();
      changes.forEach((change) => {
        const tb = document.getElementById("textbox");
        tb.innerHTML = "Order Status: " + change.doc.data().Status;  

      });
    }
  });
}

async function needsHelp() {
  let id = 0;
  const q = query(
    collection(db, "Table"),
    where("TableNum", "==", Number(TiD))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    id = doc.id;
    console.log(doc);
  });
  const tablesRef = doc(db, "Table", `${id}`);
  await updateDoc(tablesRef, {
    needHelp: true,
  });
}

function orderAgain(){
  location.replace("menu.html");
} 

window.onload = function(){
  TiD = localStorage.tableNum
  getStatus(TiD);
}
