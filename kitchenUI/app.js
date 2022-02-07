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
function createOrderCard(orderID) {
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
    iconBtn.setAttribute('onclick', `toggleOrder('tg' + ${orderNum})`);
    iconBtn.className = 'fa fa-toggle-off fa-2x'
    button.appendChild(iconBtn);

    // Card Body
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let itemList = document.createElement('ul')
    itemList.className = 'list-group';
    itemList.setAttribute('id', 'smaller');
    createItemList(itemList, orderID);

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
    time.innerText = '5 minutes ago';

    // Card Assembly
    let card = document.createElement('div');
    card.className = 'card';

    cardHead.appendChild(title);
    cardHead.appendChild(button);

    cardBody.appendChild(itemList);

    cardFooter.appendChild(deliverBtn);

    card.appendChild(cardHead);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    card.appendChild(time);

    cardContainer.appendChild(card);
}

// Add list-group-items to the unordered list (from database)
function createItemList(list, orderID) {
    // TO DO: PULL DATA FROM DATABASE TO FILL UP THE LIST
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(order.qnt + order.food));
    list.appendChild(li);
}

// Initialise the card list as soon as window is loaded
window.onload = initOrderList = () => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');
    order.forEach((ord) => {
        // TO DO: PARSE SOME SORT OF ORDER ID SO THAT FOOD MAP CAN BE PULLED
        createOrderCard(ord);
        orderNum += 1;
    });
};


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

