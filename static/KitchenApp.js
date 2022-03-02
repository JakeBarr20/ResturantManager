import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { doc, updateDoc, getFirestore, orderBy, collection, getDocs, query, where, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

// TODO: fix duplication glitch in onSnapshot, improve search bar by making it auto-search and disable non-number entries

// Config
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

let curStatus = 'Preparing';
let cardContainer;


// Execute commands when window is opened
window.onload = function () {
    document.getElementById('refresh').addEventListener('click', function () { rst() });
    document.getElementById('multi-select1').addEventListener('click', function () { toggleViewStatus('Preparing'); });
    document.getElementById('multi-select2').addEventListener('click', function () { toggleViewStatus('Ready'); });
    document.getElementById('searchBtn').addEventListener('click', function () { searchOrder(this.form); });
    initOrderList();
}


// Toggle icon button on card, changes color and unhides button
function toggleOrder(iconID) {
    if (document.getElementById(iconID)) {
        let ordNum = iconID.substring(2);
        if (document.getElementById(iconID).className == "fa fa-toggle-on fa-2x") {
            document.getElementById(iconID).className = "fa fa-toggle-off fa-2x";
            document.getElementById("card-head" + ordNum).className = 'card-header todo';
            document.getElementById("deliver-btn" + ordNum).style.display = "none";
        } else {
            document.getElementById(iconID).className = "fa fa-toggle-on fa-2x";
            document.getElementById("card-head" + ordNum).className = 'card-header prep';
            document.getElementById("deliver-btn" + ordNum).style.display = "block";
        }
    }
}


// Toggle of View through Navbar
function toggleViewStatus(toView) {
    let prep = document.getElementById('multi-select1');
    let ready = document.getElementById('multi-select2');

    if (toView === 'Preparing') {
        prep.className = 'btn btn-secondary';
        ready.className = 'btn btn-outline-dark';
    }
    else if (toView === 'Ready') {
        prep.className = 'btn btn-outline-dark';
        ready.className = 'btn btn-secondary';
        
    }
    curStatus = toView;
    initOrderList();
}


// Searches and outputs orders which match input field
function searchOrder(form) {
    // If Order Number is an Integer ...
    let orderNum = parseInt(form.inputbox.value);
    // If Order Number is a String ...
    //let orderNum = form.inputbox.value;
    initOrderList(orderNum);
}


// Create a card with all its content
/*
        <div class="card">
 
            <div id="card-head1" class="card-header todo">
                <h5 class="card-title">Order #</h5>
                <button class="btn right btn-primary-outline">
                    <i onclick="toggleOrder('tg1')" id="tg1" class="fa fa-toggle-off fa-2x"></i>
                </button>
            </div>
            
 
            <div class="card-body">
                <ul class="list-group" id="smaller">
                    <li class="list-group-item">3x Burito</li>
                    <li class="list-group-item">1x Margarita</li>
                    <li class="list-group-item">1x Donut</li>
                    <li class="list-group-item">1x Apple</li>
                    <li class="list-group-item">3x Burito</li>
                    <li class="list-group-item">1x Margarita</li>
                    <li class="list-group-item">1x Donut</li>
                    <li class="list-group-item">1x Apple</li>
                </ul>
            </div>
 
 
            <div style="display: none" id="deliver-btn1" class="card-footer border-0">
                <a style="background-color: green;" href="#" class="btn btn-primary-outline"><i class="fa fa-bell"></i>
                    Deliver</a>
            </div>
 
            <small class="left">5 minutes ago</small>
 
        </div>
*/


// Creation of Card
async function createOrderCard(doc) {
    let isPrep = curStatus === 'Preparing';
    let orderNum = doc.data().OrderNum;
    
    // Card Head
    let cardHead = document.createElement('div');
    cardHead.className = isPrep ? 'card-header todo' : 'card-header ready';
    cardHead.setAttribute('id', 'card-head' + orderNum);

    let title = document.createElement('h5');
    title.innerText = 'Order #' + orderNum;

    // Toggle button
    let button = document.createElement('button');
    button.className = 'btn right btn-primary-outline'

    let iconBtn = document.createElement('i');
    iconBtn.setAttribute('id', 'tg' + orderNum);
    iconBtn.className = 'fa fa-toggle-off fa-2x'
    button.appendChild(iconBtn);

    // Card Body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let itemList = document.createElement('ul')
    itemList.className = 'list-group';
    itemList.setAttribute('id', 'smaller');
    createItemList(itemList, doc);

    // Card Footer
    let cardFooter = document.createElement('div');
    cardFooter.className = 'card-footer border-0';
    cardFooter.setAttribute('id', 'deliver-btn' + orderNum);
    cardFooter.style.display = 'none';

    let deliverBtn = document.createElement('a');
    deliverBtn.style.backgroundColor = 'green';
    deliverBtn.setAttribute('href', '#');
    deliverBtn.setAttribute('id', 'db' + orderNum);
    deliverBtn.className = 'btn btn-primary-outline';
    deliverBtn.innerText = 'Deliver';

    let bellIcon = document.createElement('i');
    bellIcon.className = 'fa fa-bell';
    deliverBtn.appendChild(bellIcon);

    // Time
    let time = document.createElement('small');
    time.className = 'left';
    const confTime = doc.data().Time;
    if (confTime) {
        let timeElapsed = timeSince(confTime.toDate());
        time.innerText = timeElapsed + ' ago';
    }

    // Card Assembly
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('id', doc.id)

    cardHead.appendChild(title);

    cardBody.appendChild(itemList);

    if (isPrep) {
        cardHead.appendChild(button);
        cardFooter.appendChild(deliverBtn);
    }

    card.appendChild(cardHead);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    card.appendChild(time);

    cardContainer.appendChild(card);

    // Toggle Button Event Listener
    if (iconBtn) {
        let tg = iconBtn.id;
        iconBtn.addEventListener('click', function () { toggleOrder(tg); });
    }

    // Deliver Button Event Listener
    if (deliverBtn) {
        deliverBtn.addEventListener('click', function () { changeStatus(deliverBtn.id) });
    }
}


// Add list-group-items to the unordered list (from database)
function createItemList(list, doc) {
    // Sorting food map by alphabetical order
    let food = doc.data().food;

    for (var key in food) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(food[key] + 'x ' + key));
        list.appendChild(li);
    }
}


// Initialise the card list
async function initOrderList(orderNum) {
    // If card deck contains data, clear it
    if (cardContainer) {
        removeAllChildNodes(document.getElementById('card-container'));
    }

    cardContainer = document.getElementById('card-container');

    let q1;
    if (orderNum) {
        q1 = query(collection(db, "Orders"), where("Status", "==", curStatus), where("OrderNum", "==", orderNum));
    } else {
        q1 = query(collection(db, "Orders"), where("Status", "==", curStatus), orderBy('OrderNum'));   
    }
    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
        let changes = querySnapshot.docChanges();

        changes.forEach((change) => {
            let cngStatus = change.doc.data().Status;
            if (cngStatus == curStatus) {
                if (change.type == 'added') {
                    createOrderCard(change.doc)
                } else if (change.type == 'removed') {
                    let card = document.getElementById(change.doc.id);
                    cardContainer.removeChild(card);
                }
            } 
        });
    });
};


// Used to clear card deck
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


// Change status of order in DB - Delivery Button
async function changeStatus(childID) {
    console.log(childID);
    let cardID = getCardID(childID);
    const orderRef = doc(db, "Orders", cardID);
    await updateDoc(orderRef, {
        Status: "Ready"
    });
}


// Get the id of card
function getCardID(childID) {
    const child = document.getElementById(childID);
    let parent = child ? child.parentNode : {};
    do {
        parent = parent.parentNode;
    } while (parent.className != 'card');
    console.log(parent.id);
    return parent.id;
}


// Calculate time elapsed since a date
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


// Reset all orders to Preparing for testing purposes
async function rst() {
    let refs = [];
    const ordersRef = await getDocs(collection(db, "Orders"));
    ordersRef.forEach((doc) => {
        updOrder(doc.id);
    });
}
async function updOrder(ref) {
    const orderRef = doc(db, "Orders", ref);
    await updateDoc(orderRef, {
        Status: "Preparing"
    });
}


