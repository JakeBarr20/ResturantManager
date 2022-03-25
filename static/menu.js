
function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
}

let x = 0;
let items = "";
let orderNo = 100;
// This function is for when a user clicks on an item and itd price is added to the counter
//Counter still refreshes when we change submenus so this needs modifyin
function increase(id) {
  x = +document.getElementById(id).innerHTML;
  let data = +document.getElementById("counting").innerHTML
  newItem=document.getElementById(id).name

  data = parseFloat(data) + parseFloat(x);
  data=data.toFixed(2)
  document.getElementById("counting").innerText = data;
  items = items + newItem + ",";
}

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

function availability() {
  document.getElementById("testCard").style.display = "none";
}

function openModal(modal) {
  document.getElementById(modal).style.display = "block";
}

function closeModal(modal) {
  document.getElementById(modal).style.display = "none";
}

async function enterData() {
  let tableNumber = localStorage.tableNum;
  // let tableNumber = +document.getElementById("tableNumber").innerHTML
  addDoc(tableNumber);
  closeModal('myModal');
  openModal('closeModal');
}

function alertWaiter(tableNo) {
  needsHelp(tableNo.value);
}

function popAllergies() {
  $(".dissappear").toggleClass("active");
  $(".appear").toggleClass("active");
}


$(function item1Appear() {
  $('.item1').click(function(){
      $(".dissappear").toggleClass("active");
      $(".appear").toggleClass("active");      
  });
});


function getStuff() {
  alert("Items = " + items +"\nPrice = " + data)
}

function getTableNumberFromTextBox(){
  let tabNumber = localStorage.tableNum;
//  let tabNumber = document.getElementById("inputId").value;
  document.getElementById("tableNumber").innerHTML=tabNumber
}
