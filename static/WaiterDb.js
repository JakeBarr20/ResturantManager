// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  where,
  deleteField,
  deleteDoc,
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
<<<<<<< HEAD
  measurementId: "G-5PQJ0CN4YQ"
=======
  measurementId: "G-5PQJ0CN4YQ",
>>>>>>> WaiterUI
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(app);

window.removeOrder = removeOrder;
window.confirmOrder = confirmOrder;
window.deliverToTable = deliverToTable;
window.helpToTable = helpToTable;
window.AddItemToDb = AddItemToDb;
window.RemoveItemFromDb = RemoveItemFromDb;
window.waiterChange = waiterChange;
window.pay = pay;

let unsubscribe;

/**
 * When cancel button is pressed deletes the order from the database using this method
 * @async
 * @method
 * @param {String} id - The ID used to determine which order to delete
 */
async function removeOrder(id) {
  let Order = 0;
  const q = query(
    collection(db, "Orders"),
    where("OrderNum", "==", Number(id))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    Order = doc.id;
  });
  await deleteDoc(doc(db, "Orders", `${Order}`));
}

/**
 * When the confirm button is pressed, the order status is changed to alert kitchen
 * @method
 * @async
 * @param {String} id - The ID used to determine which order to confirm
 */
async function confirmOrder(id) {
  let Order = 0;
  const q = query(
    collection(db, "Orders"),
    where("OrderNum", "==", Number(id))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    Order = doc.id;
  });
  const orderRef = doc(db, "Orders", `${Order}`);
  await updateDoc(orderRef, {
    Status: "Preparing",
  });
}

let cardContainer;
let orderNum = 1;

/**
 * Creates a card html element
 * @async
 * @method
 * @param {doc firebase Object} doc - Doc Firebase Object
 */
async function createOrderCard(doc) {
  // Card Head
  let cardHead = document.createElement("div");
  cardHead.className = "card-header todo";
  cardHead.setAttribute("id", "card-head" + `${doc.data().OrderNum}`);

  let title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = "Order #" + `${doc.data().OrderNum}`;

  // Card Body
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let itemList = document.createElement("ul");
  itemList.className = "list-group small";
  itemList.setAttribute("id", `${doc.data().OrderNum}`);
  createItemList(itemList, doc);

  // Card Footer

  let buttongroup = document.createElement("div");
  buttongroup.class = "btn-group";

  let confirmbutton = document.createElement("button");
  confirmbutton.className = "confirm-button close";
  confirmbutton.type = "button";
  confirmbutton.style.backgroundColor = "green";
  confirmbutton.innerText = "Confirm ";
  confirmbutton.setAttribute("data-dismiss", "alert");
  confirmbutton.setAttribute("data-target", "#card" + `${doc.data().OrderNum}`);
  confirmbutton.setAttribute(
    "onclick",
    "confirmOrder(" + `${doc.data().OrderNum}` + ")"
  );
  let tickIcon = document.createElement("i");
  tickIcon.className = "fa fa-check";
  confirmbutton.appendChild(tickIcon);

  let removebutton = document.createElement("button");
  removebutton.className = "cancel-button close";
  removebutton.type = "button";
  removebutton.style.backgroundColor = "red";
  removebutton.innerText = "Cancel ";
  removebutton.setAttribute("data-dismiss", "alert");
  removebutton.setAttribute("data-target", "#card" + `${doc.data().OrderNum}`);
  removebutton.setAttribute(
    "onclick",
    "removeOrder(" + `${doc.data().OrderNum}` + ")"
  );
  let timesIcon = document.createElement("i");
  timesIcon.className = "fa fa-times";
  removebutton.appendChild(timesIcon);

  let time = document.createElement("small");
  time.className = "left";
  const confTime = doc.data().Time;
  if (confTime) {
    let timeElapsed = timeSince(confTime.toDate());
    time.innerText = timeElapsed + " ago";
  }

  let card = document.createElement("div");
  card.className = "card";
  card.setAttribute("id", "card" + `${doc.data().OrderNum}`);

  //Structure
  cardHead.appendChild(title);
  cardBody.appendChild(itemList);
  buttongroup.appendChild(removebutton);
  buttongroup.appendChild(confirmbutton);
  card.appendChild(cardHead);
  card.appendChild(cardBody);
  card.appendChild(buttongroup);
  card.appendChild(time);
  cardContainer.appendChild(card);

  if (confirmbutton) {
    confirmbutton.addEventListener("click", function () {
      confirmOrder(confirmbutton.id);
    });
  }
}

/** 
 * Initialises the cards per amount in the database
 * @async
 * @method
*/
async function initOrderList() {
  if (cardContainer) {
    removeAllChildNodes(document.getElementById('card-container'));
  }

  if (unsubscribe) unsubscribe();

  cardContainer = document.getElementById("card-container");
  const q1 = query(collection(db, "Orders"), where("Status", "==", "Waiting"));
  const querySnapshot = await getDocs(q1);

  //querySnapshot.forEach((doc) => {
    //createOrderCard(doc);
    //orderNum += 1;
    //console.log(doc.id, " => ", doc.data());
  //});

  // Creates a listener which is used for the implementation of live updates
  unsubscribe = onSnapshot(q1, (querySnapshot) => {
    // Search Dependent Display Condition (if search failed, display ...)
    if (querySnapshot.empty) {
        generateWarning(orderNum);
    } else {
        // Status Dependent Order Display
        let changes = querySnapshot.docChanges();
        changes.forEach((change) => {
            let cngData = change.doc.data();
            
            if (cngData.Status == "Waiting") {
                if (change.type == 'added') {
                    createOrderCard(change.doc)
                } else if (change.type == 'removed') {
                    let card = document.getElementById(change.doc.id);
                    cardContainer.removeChild(card);
                }
            }
        });
    }
});
}

/**
 * Used to calculate the time since the creation of the order
 * @method
 * @param {Time Object} date - Date used
 * @returns The amount of time since the creation of the object
 */
function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

/**
 * Creates a list object from the map of food in the database
 * @param {html ul element} list - html list that will be appended to
 * @param {doc Firebase Object} doc - Single order 
 */
function createItemList(list, doc) {
  let food = doc.data().food;
  for (var key in food) {
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(food[key] + "x " + key));
    list.appendChild(li);
  }
}

/**
 * Adds food item to the database along with the quantity
 * @async
 * @method
 * @param {String} item - The food item
 * @param {String} orderID - The ID to determine an order
 * @param {String} quantity - The amount of food items
 */
async function AddItemToDb(item, orderID, quantity) {
  let Order = 0;
  let database_quant = quantity;
  const q = query(
    collection(db, "Orders"),
    where("OrderNum", "==", Number(orderID))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    Order = doc.id;
    let food = doc.data().food;
    for (var key in food) {
      if (key == item) {
        database_quant = Number(food[item]) + Number(quantity);
      }
    }
  });

  const orderRef = doc(db, "Orders", `${Order}`);
  await updateDoc(
    orderRef,
    {
      [`food.${item}`]: database_quant.toString(),
    },
    { merge: true }
  );
};

/**
 * Removes a food item from order in the database
 * @param {String} item - The food item
 * @param {String} orderID - The ID to determine an order
 * @param {String} quantity - The amount of food items
 */
async function RemoveItemFromDb(item, orderID, quantity) {
  let Order = 0;
  let food = 0;
  let database_quant = quantity;
  const q = query(
    collection(db, "Orders"),
    where("OrderNum", "==", Number(orderID))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(function (doc) {
    Order = doc.id;
    food = doc.data().food;
    for (var key in food) {
      if (key == item) {
        database_quant = Number(food[item]) - Number(quantity);
        console.log(food[item]);
      }
    }
  });
  const orderRef = doc(db, "Orders", `${Order}`);
  if (Number(food[item]) <= 1) {
    await updateDoc(
      orderRef,
      {
        [`food.${item}`]: deleteField(),
      },
      { merge: true }
    );
  } else {
    await updateDoc(
      orderRef,
      {
        [`food.${item}`]: database_quant.toString(),
      },
      { merge: true }
    );
  }
};

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

let tables;
let box;

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

let counter = 0;
/**
 * Decides what the status of the table is and passes it to the createTables
 * @async
 * @method  
 */
async function initTablesStatus() {
  console.log("yes");
  tables = document.getElementById("Tables");
  box = document.getElementById("Box");
  let waiter = document.getElementById("waiter").value;

  if(unsubscribe) unsubscribe();

  const q1 = query(
    collection(db, "Table"),
    where("isReady", "==", true),
    orderBy("TableNum", "desc")
  );
  const querySnapshot = await getDocs(q1);

  querySnapshot.forEach((doc) => {
    if(doc.data().Waiter == waiter || waiter == 0){
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
    if(doc.data().Waiter == waiter || waiter == 0){
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
    if(doc.data().Waiter == waiter || waiter == 0){
      createTables(doc, "h");
    }
    console.log(doc.id, " => ", doc.data());
  });

  const q4 = query(
    collection(db, "Table")
  );

  unsubscribe = onSnapshot(q4, (querySnapshot) => {
    let changes = querySnapshot.docChanges();
    changes.forEach((change) => {
      counter = counter + 1;
      //counter ignore initial load of tables
      if(counter > 10){
        location.reload();
      }
    });
});


//  unsubscribe = onSnapshot(q4, (querySnapshot) => {
//    let changes = querySnapshot.docChanges();
//    changes.forEach((change) => {
//        let cngData = change.doc.data();
//        if (cngData.isReady == true) {
//          const table = Array.from(document.getElementsByClassName('circle-table'));
//          table.forEach(t => {t.remove();})
//          createTables(change.doc, "r");
//        } 
//    });
//});
}

/**
 * Changes tables displayed depending on waiter
 * @method
 */
 function waiterChange(){
  const table = Array.from(document.getElementsByClassName('circle-table'));
  table.forEach(t => {
    t.remove();
  })
  initTablesStatus();
}
<<<<<<< HEAD
=======

/**
 * Creates the orders from the database when the window loads
 */
window.onload = function () {
  initTablesStatus();
  initOrderList();
};
>>>>>>> WaiterUI
