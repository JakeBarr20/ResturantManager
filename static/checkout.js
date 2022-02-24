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

var database = firebase.database();

async function addDoc() {
	Num = "1";
	Status = "Waiting"
	Time = Date()
	Food ="Cheeseburger x1"
	database.ref('Orders/' + Num).set({
		OrderNum : Num;
		Status : Status;
		Time : Time;
		food : Food;
	});
}