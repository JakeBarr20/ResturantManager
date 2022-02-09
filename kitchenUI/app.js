import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

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

let orderNum = 1;
let cardContainer;
var order = [{},{},{},{}];

// Create a card with all its content
async function createOrderCard(doc) {
    // Card Head
    let cardHead = document.createElement('div');
    cardHead.className = 'card-header todo';
    cardHead.setAttribute('id', 'card-head' + orderNum);

    let title = document.createElement('h5');
    title.innerText = 'Order #' + orderNum;

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
    deliverBtn.className = 'btn btn-primary-outline';
    deliverBtn.innerText = 'Deliver';

    let bellIcon = document.createElement('i');
    bellIcon.className = 'fa fa-bell';
    deliverBtn.appendChild(bellIcon);

    // Time
    // TO DO: PULL TIME FROM ORDER USING ORDER ID
    let time = document.createElement('small');
    time.className = 'left';
    const confTime = doc.data().Time;
    if (confTime) {
        
        //let timeElapsed = timeSince(new Date(Date.now() - confTime.seconds));
        let timeElapsed = timeSince(confTime.toDate());
        time.innerText = timeElapsed +' ago';
    }


    // Card Assembly
    let card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('id', doc.id)

    cardHead.appendChild(title);
    cardHead.appendChild(button);

    cardBody.appendChild(itemList);

    cardFooter.appendChild(deliverBtn);

    card.appendChild(cardHead);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    card.appendChild(time);

    cardContainer.appendChild(card);

    // Toggle Button Event Listener
    if (iconBtn) {
        let tg = iconBtn.id;
        iconBtn.addEventListener('click', function() { toggleOrder(tg); });
    }
}

// Add list-group-items to the unordered list (from database)
function createItemList(list, doc) {
    let food = doc.data().food;
    for (var key in food) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(food[key] + 'x ' + key));
        list.appendChild(li);
    }
}

// Initialise the card list as soon as window is loaded
async function initOrderList() {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');

    const q1 = query(collection(db, "Orders"), where("Status", "==", "Preparing"));
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        createOrderCard(doc);
        orderNum += 1;
        console.log(doc.id, " => ", doc.data());
    });
}; 

window.onload = function() {
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


// Mock Up: Card

/*
        <div class="card">
 
            <div id="card-head1" class="card-header todo">
                <h5 class="card-title">Order #78</h5>
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

