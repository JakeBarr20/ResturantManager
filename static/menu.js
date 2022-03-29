
function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
}

let x = 0;
let items = "";
let orderNo = 100;
/**
 * Increments the subtotal displayed on screen by the amount an item costs
 * @param {string} id the id of the item clicked on 
 */
function increase(id) {
  x = +document.getElementById(id).innerHTML;
  let data = +document.getElementById("counting").innerHTML
  newItem=document.getElementById(id).name

  data = parseFloat(data) + parseFloat(x);
  data=data.toFixed(2)
  document.getElementById("counting").innerText = data;
  items = items + newItem + ",";
}

/**
 * Decreases the subtotal displayed on the screen by the amount an item costs
 * @param {string} id the id of the item clicked on
 */
function decrease(id){
  x= +document.getElementById(id).innerHTML;
  let data = +document.getElementById("counting").innerHTML
  newItem=document.getElementById(id).name

  data = parseFloat(data) - parseFloat(x);
  data=data.toFixed(2);
  if (data <= 0){
    data = 0
  }
  document.getElementById("counting").innerText = data;


}

// Make class to activate a css style class that comes over cards when pressed
$(document).ready(function () {
  $().toggleClass();
  $("#test1").toggleClass("active");
});

/**
 * Removes elements when ran
 */
function availability() {
  document.getElementById("testCard").style.display = "none";
}

/**
 * OWEN
 * @param {} modal 
 */
function openModal(modal) {
  document.getElementById(modal).style.display = "block";
}

/**
 * OWEN
 * @param {} modal 
 */
function closeModal(modal) {
  document.getElementById(modal).style.display = "none";
}

/**
 * Responsible for the initial handling of checkout
 */
async function enterData() {
  let tableNumber = localStorage.tableNum;
  addDoc(tableNumber);
  closeModal('myModal');
  openModal('closeModal');
}

/**
 * Alerts the waiter that the given table number needs help
 * @param {number} tableNo table that needs help
 */
function alertWaiter(tableNo) {
  needsHelp(tableNo.value);
}


function popAllergies() {
  $(".dissappear").toggleClass("active");
  $(".appear").toggleClass("active");
}

/**
 * Responsible for displaying the allergies and calories of each item
 */
$(function item1Appear() {
  $('.item1').click(function(){
      $(".dissappear").toggleClass("active");
      $(".appear").toggleClass("active");      
  });
});


function getStuff() {
  alert("Items = " + items +"\nPrice = " + data)
}

/**
 * Makes sure table number is printed on screen between menus
 */
function getTableNumberFromTextBox(){
  let tabNumber = localStorage.tableNum;
//  let tabNumber = document.getElementById("inputId").value;
  document.getElementById("tableNumber").innerHTML=tabNumber
}
