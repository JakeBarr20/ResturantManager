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

window.removeOrder = removeOrder;
window.confirmOrder = confirmOrder;

async function removeOrder(id){
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


let cardContainer;
let orderNum = 1;

async function createOrderCard(doc) {
  
    // Card Head
    let cardHead = document.createElement('div');
    cardHead.className = 'card-header todo';
    cardHead.setAttribute('id', 'card-head' + `${doc.data().OrderNum}`);

    let title = document.createElement('h5');
    title.className = 'card-title';
    title.innerText = 'Order #' + `${doc.data().OrderNum}`;

    // Card Body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let itemList = document.createElement('ul')
    itemList.className = 'list-group small';
    itemList.setAttribute('id', `${doc.data().OrderNum}`);
    createItemList(itemList, doc);

    // Card Footer
    
    let buttongroup = document.createElement('div');
    buttongroup.class = 'btn-group';

    let confirmbutton = document.createElement('button');
    confirmbutton.className = 'confirm-button close';
    confirmbutton.type = 'button';
    confirmbutton.style.backgroundColor = 'green';
    confirmbutton.innerText = "Confirm ";
    confirmbutton.setAttribute('data-dismiss', 'alert');
    confirmbutton.setAttribute('data-target', '#card' + `${doc.data().OrderNum}`);
    confirmbutton.setAttribute('onclick', 'confirmOrder(' + `${doc.data().OrderNum}` + ')');
    let tickIcon = document.createElement('i');
    tickIcon.className = 'fa fa-check';
    confirmbutton.appendChild(tickIcon);


    let removebutton = document.createElement('button');
    removebutton.className = 'cancel-button close';
    removebutton.type = 'button';
    removebutton.style.backgroundColor = 'red';
    removebutton.innerText = "Cancel ";
    removebutton.setAttribute('data-dismiss', 'alert');
    removebutton.setAttribute('data-target', '#card' + `${doc.data().OrderNum}`);
    removebutton.setAttribute('onclick', 'removeOrder(' + `${doc.data().OrderNum}` + ')');
    let timesIcon = document.createElement('i');
    timesIcon.className = 'fa fa-times';
    removebutton.appendChild(timesIcon);
    
    // Time
    // TO DO: PULL TIME FROM ORDER USING ORDER ID
    let time = document.createElement('small');
    time.className = 'left';
    const confTime = doc.data().Time;
    if (confTime) {
        //let timeElapsed = timeSince(new Date(Date.now() - confTime.seconds));
        let timeElapsed = timeSince(confTime.toDate());
        time.innerText = timeElapsed + ' ago';
    }

    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('id', 'card' + `${doc.data().OrderNum}`);

    cardHead.appendChild(title);
    cardBody.appendChild(itemList);
    buttongroup.appendChild(removebutton);
    buttongroup.appendChild(confirmbutton);
    card.appendChild(cardHead);
    card.appendChild(cardBody);
    card.appendChild(buttongroup);
    card.appendChild(time);
    cardContainer.appendChild(card);

    if(confirmbutton){
        confirmbutton.addEventListener('click',function(){
            confirmOrder(confirmbutton.id);
        })
    }
}

async function initOrderList(){
    
    if (cardContainer){
        document.getElementById('card-container').replaceWith(cardContainer);
        return;        
    }
    
    cardContainer = document.getElementById('card-container');
    const q1 = query(collection(db,"Orders"),where("Status","==","Waiting"));
    const querySnapshot = await getDocs(q1);
    
    querySnapshot.forEach((doc) => {
        createOrderCard(doc);
        orderNum += 1;
        console.log(doc.id, " => ", doc.data());
    });
}

window.onload = function(){
    initOrderList();
}


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

function createItemList(list, doc) {
    let food = doc.data().food;
    for (var key in food) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(food[key] + 'x ' + key));
        list.appendChild(li);
    }
}


window.AddItemToDb = async function(item,orderID,quantity){

    let Order = 0;
    const q = query(collection(db, "Orders"), where("OrderNum","==", orderID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function(doc) {
        Order = doc.id;
    });
    const orderRef = doc(db, "Orders", `${Order}`);
    await updateDoc(orderRef, {
        [`food.${item}`]: quantity  //should get the item value from above 
    }, {merge:true});
    
}
