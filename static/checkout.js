import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import { getFirestore, doc, setDoc, getDocs, query, collection, where } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD_-a7AcOzc2g4awLO2PeneU8enHKBw7cU",
    authDomain: "restaurant-database-92c17.firebaseapp.com",
    projectId: "restaurant-database-92c17",
    storageBucket: "restaurant-database-92c17.appspot.com",
    messagingSenderId: "673538791861",
    appId: "1:673538791861:web:3eb8b2c76a041fa64be1fc",
    measurementId: "G-5PQJ0CN4YQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log(app);

window.addDoc=addDoc;
async function addDoc(result, orderNo) {
	await setDoc(doc (db, "Orders", result), {
		OrderNum: orderNo,
		Status: "Waiting",
		Time: new Date().getTime(),
		food: {cheeseburger: '1', hamburger: '2'}
	});
}

async function displayTableOrder(tabNumber){
    const q1 = query(collection(db, "Orders"), where("TableNum", "==", 9));
    const querySnapshot = await getDocs(q1);
    querySnapshot.forEach((doc) => {
        createItemList(doc)
    });
    
}

function createItemList(doc){
    console.log("ran")
    let food = doc.data().food
    for (var key in food){
        var li = document.createElement('li');
        li.className='list-group-item';
        li.appendChild(document.createTextNode(food[key] + ' x '+ key));
        document.getElementById("order").appendChild(li);
    }
    let buttonSpace = document.createElement('li');
    buttonSpace.className='list-group-item';
    buttonSpace.id='checkout-space'
    document.getElementById("order").appendChild(buttonSpace);
    let button = document.createElement('button')
    button.className='btn btn-primary';
    button.id='Checkout';
    button.type='button';
    button.addEventListener("click", () => openModal('myModal'), false);
    button.appendChild(document.createTextNode('Checkout Order'))
    document.getElementById("checkout-space").appendChild(button)
}

displayTableOrder(9);