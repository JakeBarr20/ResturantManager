function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
}

let data = 0;
let x = 0;
let items = "";

function increase(id) {
  x = document.getElementById(id).innerHTML;
  newItem=document.getElementById(id).name
  data = parseFloat(data) + parseFloat(x);
  document.getElementById("counting").innerText = data;
  items = items + newItem + ",";
}

function makeUID() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for ( let i = 0; i < 20; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength)); 
  }
  return result;
}

function enterData() {
  if (confirm('Are you sure you want to checkout this order?') == true) {
    const result = makeUID();
    addDoc(result);
    alert('OK, your meal has been sent to the database');
  } else {
    alert('You Cancelled Your Order');
  }
}

// Make class to activate a css style class that comes over cards when pressed
$(document).ready(function () {
  console.log("hello world");
  $().toggleClass();
  $("#test1").toggleClass("active");
});

function availability() {
  document.getElementById("testCard").style.display = "none";
}

function popAllergies() {
  console.log("its running");
  $(".dissappear").toggleClass("active");
  $(".appear").toggleClass("active");
}

$(function testParams() {
    $('#dissappear').click(function(){
        let x = $(this).attr('value');
        console.log(x);
    });
});
