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


$(function displayOrderForTable() {
  $("#getOrder").click(async function () {
    let tableNum = +document.getElementById("tableNumber").innerHTML;
    await getSubTotal(tableNum)
  });
});

async function getSubTotal(tableNumber) {
  let sTotal
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tableNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    sTotal = doc.data().Subtotal;
  });
  document.getElementById("counting").innerHTML = sTotal
}

async function getTableOrder(tabNumber) {
  let tempStore;
  const q1 = query(
    collection(db, "Orders"),
    where("TableNum", "==", tabNumber)
  );
  const querySnapshot = await getDocs(q1);
  querySnapshot.forEach((doc) => {
    tempStore = new Map(Object.entries(doc.data().food));
  });
  return tempStore;
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

async function pushItemList(orderID, order) {
  const tablesRef = doc(db, "Orders", orderID);
  await updateDoc(tablesRef, {
    food: Object.fromEntries(order.entries()),
  });
}

async function pushSubTotal(tableNumber) {
  let id = await getTableIdFromNumber(tableNumber);
  let sTotal = +document.getElementById("counting").innerHTML
  const tablesRef = doc(db, "Orders", id);
  await updateDoc(tablesRef, {
    Subtotal: sTotal,
  });
}

$(function addItem() {
  $(".buttonAdd").click(async function () {
    let tableNumber = +document.getElementById("tableNumber").innerHTML;
    let orderId;
    order2 = await getTableOrder(tableNumber);
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

$(function removeItem() {
  $(".buttonRemove").click(async function () {
    let tableNumber = +document.getElementById("tableNumber").innerHTML;
    let orderId;
    order2 = await getTableOrder(tableNumber);
    let x = $(this).attr("value");
    console.log(x)
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
    const q = query(collection(db, "Table"), where("TableNum","==",Number(tableNo)));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function(doc) {
        id=doc.id;
    });
	const tablesRef = doc(db, "Table", `${id}`);
	await updateDoc(tablesRef, {
		needHelp: true,
	});
}

async function getTableStatus(tableNumber){
    let Status;
    const qq = query(
        collection(db,"Orders"),
        where("TableNum","==", tableNumber)
    );
    const querySnapshot = await getDocs(qq);
    querySnapshot.forEach((doc)=>{
        Status=doc.Status;
    });
    return Status
}

function makeUID() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for ( let i = 0; i < 20; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
  }
  return result;
}

async function addOrder(tableNumber){
  let initialOrder
  const q1=query(collection(db, "Orders"),
  orderBy("Time", "desc"), limit(1));
  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach((doc) => {
    initialOrder=doc.data().OrderNum
  });
  initialOrder=initialOrder+1;
  // Make new local storage 
  

  let id = makeUID();
  localStorage.setItem("OrderId", id);
  const q = query(collection(db, "Orders"),
  where("Status", "==" ,"Building" ), where("TableNum", "==", tableNumber)
  );
  let time = Timestamp.fromDate(new Date());
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty){
    await setDoc(doc (db,"Orders",id), {
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
