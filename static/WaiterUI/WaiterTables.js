// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  orderBy,
  getDocs,
  updateDoc,
  getDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";
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
  measurementId: "G-5PQJ0CN4YQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(app);

let unsubscribe;
let counter = 0;
let tables;
let box;
let waiterReload;

window.deliverToTable = deliverToTable;
window.helpToTable = helpToTable;
window.waiterChange = waiterChange;
window.pay = pay;

/**
 * If the customer has payed than this function is called to set table status back to default
 * @async
 * @method
 * @param {String} tablen - The ID of the table number used to identify html element
 * @param {String} tableid - The ID of the table used to identify table in database
 */
async function pay(tablen, tableid) {
  const tablesRef = doc(db, "Table", `${tableid}`);
  await updateDoc(tablesRef, {
    havePayed: true,
  });
  let table = document.getElementById("T" + tablen);
  table.className = "circle-table";
}

/**
 * If the customer has not payed then notifies the waiter by changing table colour
 * @async
 * @method
 * @param {String} tablen - The ID of the table number used to identify html element
 * @param {String} tableid - The ID of the table used to identify table in database
 */
async function havepayed(tablen, tableid) {
  const tablesRef = doc(db, "Table", `${tableid}`);
  const docSnap = await getDoc(tablesRef);
  if (docSnap.data().havePayed == false) {
    let table = document.getElementById("T" + tablen);
    table.className = "circle-table circle-payed";
    table.setAttribute(
      "onclick",
      "pay(" + `${docSnap.data().TableNum}` + ', "' + `${docSnap.id}` + '")'
    );
  }
}

/**
 * Is called when the food has been delivered to the table to set table status back to default
 * @async
 * @method
 * @param {String} tablen - The ID of the table number used to identify html element
 * @param {String} tableid - The ID of the table used to identify table in database
 */
async function deliverToTable(tablen, tableid) {
  let table = document.getElementById("T" + tablen);
  table.className = "circle-table";
  const tablesRef = doc(db, "Table", `${tableid}`);
  await updateDoc(tablesRef, {
    isReady: false,
  });
  havepayed(tablen, tableid);
}

/**
 * If the customers needs have been furfilled then this function sets table back to default
 * @async
 * @method
 * @param {String} tablen - The ID of the table number used to identify html element
 * @param {String} tableid - The ID of the table used to identify table in database
 */
async function helpToTable(tablen, tableid) {
  let table = document.getElementById("T" + tablen);
  table.className = "circle-table";
  const tablesRef = doc(db, "Table", `${tableid}`);
  await updateDoc(tablesRef, {
    needHelp: false,
  });
}

/**
 * Creates a table element in the table manager
 * @async
 * @method
 * @param {doc Firebase Object} doc - Single table from database
 * @param {String} ready - The status of the table
 */
async function createTables(doc, ready) {
  let thistable = document.createElement("button");

  thistable.innerText = `${doc.data().TableNum}`;
  thistable.setAttribute("id", "T" + `${doc.data().TableNum}`);
  thistable.setAttribute("type", "button");
  console.log(thistable.id);
  //r means ready
  if (ready == "r") {
    thistable.className = "circle-table circle-ready";
    thistable.setAttribute(
      "onclick",
      "deliverToTable(" + `${doc.data().TableNum}` + ', "' + `${doc.id}` + '")'
    );
    //h means help
  } else if (ready == "h") {
    thistable.className = "circle-table circle-clean";
    thistable.setAttribute(
      "onclick",
      "helpToTable(" + `${doc.data().TableNum}` + ', "' + `${doc.id}` + '")'
    );
  } else {
    thistable.className = "circle-table";
  }
  tables.appendChild(box);
  box.appendChild(thistable);
}

/**
 * Decides what the status of the table is and passes it to the createTables
 * @async
 * @method
 */
export async function initTablesStatus() {
  tables = document.getElementById("Tables");
  box = document.getElementById("Box");
  let waiter = document.getElementById("waiter").value;

  if (unsubscribe) unsubscribe();

  const q1 = query(
    collection(db, "Table"),
    where("isReady", "==", true),
    orderBy("TableNum", "desc")
  );
  const querySnapshot = await getDocs(q1);

  querySnapshot.forEach((doc) => {
    if (doc.data().Waiter == waiter || waiter == 0) {
      createTables(doc, "r");
    }
    console.log(doc.id, " => ", doc.data());
  });

  const q2 = query(
    collection(db, "Table"),
    where("isReady", "==", false),
    where("needHelp", "==", false),
    orderBy("TableNum", "desc")
  );
  const querySnapshot2 = await getDocs(q2);

  querySnapshot2.forEach((doc) => {
    if (doc.data().Waiter == waiter || waiter == 0) {
      createTables(doc, "None");
    }
    console.log(doc.id, " => ", doc.data());
  });

  const q3 = query(
    collection(db, "Table"),
    where("needHelp", "==", true),
    orderBy("TableNum", "desc")
  );
  const querySnapshot3 = await getDocs(q3);

  querySnapshot3.forEach((doc) => {
    if (doc.data().Waiter == waiter || waiter == 0) {
      createTables(doc, "h");
    }
    console.log(doc.id, " => ", doc.data());
  });

  const q4 = query(collection(db, "Table"));

  unsubscribe = onSnapshot(q4, (querySnapshot) => {
    let changes = querySnapshot.docChanges();
    changes.forEach((change) => {
      let cngData = change.doc.data();
      counter = counter + 1;
      //counter ignore initial load of tables
      if (counter > 10 && waiterReload == false) {
        if (cngData.needHelp == true || cngData.isReady == true) {
          location.reload();
        }
      }
    });
  });
}

/**
 * Changes tables displayed depending on waiter
 * @method
 */
function waiterChange() {
  waiterReload = true;
  const table = Array.from(document.getElementsByClassName("circle-table"));
  table.forEach((t) => {
    t.remove();
  });
  initTablesStatus();
}



