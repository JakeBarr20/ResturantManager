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

/**
 * From the enterData function updates the tables status to waiting once they press checkout moving it to the waiters screen
 */
window.addDoc = addDoc;
window.displayTableOrder=displayTableOrder;
window.createItemList=createItemList;
async function addDoc(tableNumber) {
  let id = localStorage.OrderId;
  
  const tablesRef = doc(db, "Orders", `${id}`);
  console.log(id);
  await updateDoc(tablesRef, {
    Status: 'Waiting',
  });
}

/**
 * Gets the recent ongoing order of a table and presents it to the customer
 * @param {number} tabNumber the table your displaying the order for
 */
async function displayTableOrder(tabNumber) {
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tabNumber), where("Status", "==", "Building")
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    createItemList(doc);
  });
}

/**
 * Shows the user what they have on their order
 * @param {doc} doc the list of items on the users order
 */
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

$(function displayOrderForTable() {
  $("#getOrder").click(function () {
    let tableNum = +document.getElementById("tableNumber").innerHTML;
    displayTableOrder(tableNum);
  });
});
displayTableOrder(Number(localStorage.tableNum))
