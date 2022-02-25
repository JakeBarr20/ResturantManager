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

<<<<<<< HEAD
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
=======
function getStuff() {
  alert("Items = " + items +"\nPrice = " + data)
}
>>>>>>> c73545ce8c839c68dc1c59acbdf75dfb676bb297
