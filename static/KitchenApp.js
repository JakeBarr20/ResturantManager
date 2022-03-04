import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { doc, updateDoc, getFirestore, orderBy, collection, getDocs, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

/* Additional Features: 

    - disable non-number entries for search
    - improve search bar by making it auto-search
    - implementation of giving orders priority
    - ability to review delivery history
*/

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
    authDomain: "restaurant-database-92c17.firebaseapp.com",
    projectId: "restaurant-database-92c17",
    storageBucket: "restaurant-database-92c17.appspot.com",
    messagingSenderId: "673538791861",
    appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
    measurementId: "G-5PQJ0CN4YQ"
};

// Firebase Initialization
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(app);

// Global Variables
let currentStatus = 'Preparing';
let unsubscribe;
let cardContainer;


// Executes commands when window is opened
// Appends EventListeners to buttons
window.onload = function () {
    document.getElementById('multi-select1').addEventListener('click', function () { toggleViewStatus('Preparing'); });
    document.getElementById('multi-select2').addEventListener('click', function () { toggleViewStatus('Ready'); });
    document.getElementById('searchBtn').addEventListener('click', function () { searchOrder(this.form); });
    initOrderList();
}



/**
 * Toggles toggle icon button on card, changes color and unhides deliver button
 * @param  {String} iconID ID of toggle-icon, card specific
 */
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


/**
 * Toggles the View through Navbar buttons
 * @param  {String} toView The status of the cards that are to be displayed
 */
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
    currentStatus = toView;
    initOrderList();
}


/**
 * Searches and outputs orders which match input field
 * @param  {form} form Reference to the form that contains input box
 */
function searchOrder(form) {
    // Store orderNum in Integer format
    let orderNum = parseInt(form.inputbox.value);
    initOrderList(orderNum);
}


/**
 * Renders card on screen based on data in database
 * @param  {doc} doc Refernce to a document pulled from Firestore db
 */
async function createOrderCard(doc) {
    let isPrep = currentStatus === 'Preparing';
    let orderNum = doc.data().OrderNum;

    // Card Head
    let cardHead = document.createElement('div');
    cardHead.className = isPrep ? 'card-header todo' : 'card-header ready';
    cardHead.setAttribute('id', 'card-head' + orderNum);

    let title = document.createElement('h5');
    title.innerText = 'Order #' + orderNum;

    // Toggle Button
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

    // Delivery Button
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


/**
 * Adds food items to an unordered list (from database)
 * @param  {ul} list Reference to an unordered list
 * @param  {doc} doc Refernce to the Order document from db
 */
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


/**
 * Initialises the card list
 * @param  {number} orderNum Optional parameter used for Search queries
 */
async function initOrderList(orderNum) {
    // If card deck contains data, clears it, used upon re-initialization of cardContainer
    if (cardContainer) removeAllChildNodes(document.getElementById('card-container'));
    // Closes data stream of onSnapshot in order ot avoid data duplication, used upon re-initialization of onSnaphsot
    if (unsubscribe) unsubscribe();

    cardContainer = document.getElementById('card-container');

    // If orderNum is a parmeter, the query type is switched to Search
    let q1;
    let search = false;
    if (orderNum) {
        q1 = query(collection(db, "Orders"), where("Status", "==", currentStatus), where("OrderNum", "==", orderNum));
        search = true;
    } else {
        q1 = query(collection(db, "Orders"), where("Status", "==", currentStatus), orderBy("Time"));
    }

    // Creates a listener which is used for the implementation of live updates
    unsubscribe = onSnapshot(q1, (querySnapshot) => {
        // Search Dependent Display Condition (if search failed, display ...)
        if (search === true && querySnapshot.empty) {
            generateWarning(orderNum);
        } else {
            // Status Dependent Order Display
            let changes = querySnapshot.docChanges();
            changes.forEach((change) => {
                let cngData = change.doc.data();
                
                if (cngData.Status == currentStatus) {
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
};


/**
 * Notifies Kitchen staff if the query is unsucsessful by displaying alerts
 * @param  {number} orderNum Order Number used to give more detail regarding query
 */
function generateWarning(orderNum) {
    let warning = document.createElement('div');
    warning.className = "alert alert-warning alert-dismissable fade show";
    warning.innerHTML = `Order #${orderNum} does not exist 😕`;

    document.body.appendChild(warning);
    setTimeout (
        function () {
        document.body.removeChild(warning);    
        },2000)
}

/**
 * Clears card deck by iteratively removing all children
 * @param  {Element} parent Reference to the parent element which needs to be cleared
 */
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


/**
 * Changes status of order in DB - Delivery Button
 * @param  {String} childID ID of an element withing a card the Status of which needs to be changed
 */
async function changeStatus(childID) {
    let cardID = getCardID(childID);
    const orderRef = doc(db, "Orders", cardID);
    await updateDoc(orderRef, {
        Status: "Ready"
    });
}


/**
 * Gets the ID of card that contains the child element
 * @param  {String} childID ID of an element withing a card the Status of which needs to be changed
 */
function getCardID(childID) {
    const child = document.getElementById(childID);
    // if child exists get the parent node
    let parent = child ? child.parentNode : {};
    // keep getting the parent node until you reach the card div
    do {
        parent = parent.parentNode;
    } while (parent.className != 'card');
    return parent.id;
}


/**
 * Calculates time elapsed since a date (order time)
 * @param  {Date} date Date/Time of order
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


// Mock-Up of Card in HTML
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
