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
        console.log(x);2
    });
});

$(function item1Appear() {
  $('.item1').click(function(){
      $(".dissappear").toggleClass("active");
      $(".appear").toggleClass("active");      
  });
});


function getStuff() {
  alert("Items = " + items +"\nPrice = " + data)
}

function sendUserInfo(){
  let userInfo={
    'name': 'John Brown',
    'type': 'admin',
  }
  console.log(userInfo)
  const request = new XMLHttpRequest()
  console.log(userInfo)
  request.open('POST', '/processUserInfo/${JSON.stringify(userInfo)}')
  console.log(userInfo)
  request.onload = () => {
    const flaskMessage = request.responseText
    console.log(flaskMessage)
  }
  console.log(userInfo)
  request.send();
  console.log(userInfo)
}
