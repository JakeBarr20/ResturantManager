import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  collection,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
  setDoc,
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
let order2 = new Map([]);

/**
 * Gets the subtotal for the given table number and presents it onto the screen
 * @param {number} tableNumber describes where the customer is sat
 */
async function getSubTotal(tableNumber) {
  let sTotal
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", Number(tableNumber))
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    sTotal = doc.data().Subtotal;
  });
  document.getElementById("counting").innerHTML = sTotal
}

/**
 * Obtains the table order stored as a map from a given order ID
 * @param {string} orderId the id to identify a specific order on a given table
 * @returns{string} their order stored as a Map object to be used for adding and removing from an order
 */
async function getTableOrder(orderId) {
  let customerOrder;
  const q1 = query(
    collection(db, "Orders"),
    where("", "==", orderId)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    customerOrder = new Map(Object.entries(doc.data().food));
  });
  return customerOrder;
}

/**
 * Gets the id of a specific table number from the given table number
 * @param {number} tabNumber the table number of a table in the resturaunt
 * @returns {string} the id of the given table 
 */
async function getTableIdFromNumber(tabNumber) {
  let orderID;
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tabNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    orderID = doc.id;
  });
  return orderID;
}

/**
 * Updates an order with a given orderID with the correct map of their order
 * @param {string} orderID - id of the order being changed
 * @param {Map} order - the customers food and drink order
 */
async function pushItemList(orderID, order) {
  const tablesRef = doc(db, "Orders", orderID);
  await updateDoc(tablesRef, {
    food: Object.fromEntries(order.entries()),
  });
}

/**
 * Takes the updated local subtotal and pushes it to the database
 * @param {number} tableNumber - the table number that the subtotal belongs to
 */
async function pushSubTotal(tableNumber) {
  let id = await getTableIdFromNumber(tableNumber);
  let sTotal = +document.getElementById("counting").innerHTML
  const tablesRef = doc(db, "Orders", id);
  await updateDoc(tablesRef, {
    Subtotal: sTotal,
  });
}

/**
 * Checks if an item is on an order list and if it is then increment its count otherwise add it to the order
 *  to the order belonging to the most recent order on the table number stored in local storage
 */
$(function addItem() {
  $(".buttonAdd").click(async function () {
    let orderId;
    let orderDet;
    let tableNumber = Number(localStorage.tableNum)
    const q = query(collection(db, "Orders"),
      where("Status", "==", "Building"), where("TableNum", "==", Number(tableNumber))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      orderDet = new Map(Object.entries(doc.data().food));
    });
    order2=orderDet;
    let x = $(this).attr("value");
    if (order2.has(x)) {
      let count = order2.get(x);
      count++;
      order2.set(x, count);
    } else {
      order2.set(x, 1);
    }
    orderId = await getTableIdFromNumber(tableNumber);
    await pushSubTotal(tableNumber);
    await getSubTotal(tableNumber);
    await pushItemList(orderId, order2);
  });
});

/**
 * Checks if an item is on an order and if it is then decrease the count of that item by 1 and if its the last item
 * of that specific food then remove it from the list 
 */
$(function removeItem() {
  $(".buttonRemove").click(async function () {
    let orderId;
    let orderDet;
    let tableNumber = Number(localStorage.tableNum)
    const q = query(collection(db, "Orders"),
      where("Status", "==", "Building"), where("TableNum", "==", Number(tableNumber))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      orderDet = new Map(Object.entries(doc.data().food));
    });
    order2=orderDet;
    let x = $(this).attr("value");
    if (order2.has(x)) {
      let count = order2.get(x)
      if (count <= 1) {
        order2.delete(x)
      } else {
        count = count - 1
        order2.set(x, count)
      }
    }
    orderId = await getTableIdFromNumber(tableNumber);
    await pushSubTotal(tableNumber);
    await getSubTotal(tableNumber);
    await pushItemList(orderId, order2);
  });
});

async function needsHelp(tableNo) {
  let id = 0;
  const q = query(collection(db, "Table"), where("TableNum", "==", Number(tableNo)));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    id = doc.id;
  });
  const tablesRef = doc(db, "Table", `${id}`);
  await updateDoc(tablesRef, {
    needHelp: true,
  });
}

/**
 * Checks how an order is coming along given  
 * @param {number} tableNumber 
 * @returns The status of an order i.e. building, waiting, preparing, ready
 */
async function getTableStatus(tableNumber) {
  let Status;
  const qq = query(
    collection(db, "Orders"),
    where("TableNum", "==", tableNumber)
  );
  const querySnapshot = await getDocs(qq);
  querySnapshot.forEach((doc) => {
    Status = doc.Status;
  });
  return Status
}

/**
 * Generates a random order ID for new IDs that are needed on the menu
 * @returns a string of random characters to represent an order
 */
function makeUID() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Just reloads the page if the subtotal isnt correctly working
 */
function reloadPageFix(){
  if (document.getElementById("counting").innerHTML=="undefined"){
    location.reload(true)
  }
}

/**
 * Creates an appendable order for a customer to order with a random UID and a new order number
 * @param {number} tableNumber 
 */
async function addOrder(tableNumber) {
  let initialOrder
  const q1 = query(collection(db, "Orders"),
    orderBy("Time", "desc"), limit(1));
  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach((doc) => {
    initialOrder = doc.data().OrderNum
  });
  initialOrder = initialOrder + 1;
  
  const q = query(collection(db, "Orders"),
    where("Status", "==", "Building"), where("TableNum", "==", Number(tableNumber))
  );
  let time = Timestamp.fromDate(new Date());
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  });
  if (querySnapshot.empty) {
    let id = makeUID(); 
    localStorage.setItem("OrderId", id);
    await setDoc(doc(db, "Orders", id), {
      OrderNum: initialOrder,
      Status: "Building",
      Subtotal: 0,
      TableNum: Number(tableNumber),
      Time: time,
      food: {}

    });
  }
}


addOrder(localStorage.tableNum)
getSubTotal(Number(localStorage.tableNum))

setTimeout(function(){
  reloadPageFix()
}, 500);

