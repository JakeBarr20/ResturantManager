import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  where,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
  authDomain: "restaurant-database-92c17.firebaseapp.com",
  projectId: "restaurant-database-92c17",
  storageBucket: "restaurant-database-92c17.appspot.com",
  messagingSenderId: "673538791861",
  appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
  measurementId: "G-5PQJ0CN4YQ",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


window.addDoc = addDoc;
window.displayTableOrder=displayTableOrder;
window.createItemList=createItemList;
window.pushSubTotal=pushSubTotal;
window.getSubTotal=getSubTotal;
window.getTableIdFromNumber=getTableIdFromNumber;
async function addDoc(tableNumber) {
  let id = localStorage.OrderId;
  
  const tablesRef = doc(db, "Orders", `${id}`);
  await updateDoc(tablesRef, {
    Status: 'Waiting',
  });
}
async function displayTableOrder(tabNumber) {
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tabNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    createItemList(doc);
  });
}

function createItemList(doc) {
  let x = document.getElementById("order");
  let food = doc.data().food;
  for (var key in food) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(food[key] + " x " + key));
    document.getElementById("order").appendChild(li);
  }
  let buttonSpace = document.createElement("li");
  buttonSpace.className = "list-group-item";
  buttonSpace.id = "checkout-space";
  document.getElementById("order").appendChild(buttonSpace);
  let button = document.createElement("button");
  button.className = "btn btn-primary";
  button.id = "Checkout";
  button.type = "button";
  button.addEventListener("click", () => openModal("myModal"), false);
  button.appendChild(document.createTextNode("Checkout Order"));
  document.getElementById("checkout-space").appendChild(button);
}

async function pushSubTotal(tableNumber) {
  let id = getTableIdFromNumber(tableNumber);
  let sTotal = +document.getElementById("counting").innerHTML;
  const tablesRef = doc(db, "Table", `${id}`);
  await updateDoc(tablesRef, {
    subtotal: sTotal,
  });
}

async function getSubTotal(tableNumber) {
  let sTotal;
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tableNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    sTotal = doc.data().Subtotal;

  });
  document.getElementById("counting").innerHTML = sTotal;
}

async function getTableIdFromNumber(tabNumber) {
  let test;
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tabNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    test = doc.id;
  });
  return test;
}

$(function displayOrderForTable() {
  $("#getOrder").click(function () {
    let tableNum = +document.getElementById("tableNumber").innerHTML;
    displayTableOrder(tableNum);
  });
});
displayTableOrder(Number(localStorage.tableNum))
