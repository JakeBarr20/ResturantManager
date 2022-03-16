function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
}

let x = 0;
let items = "";
let orderNo = 100;

function increase(id) {
  x = +document.getElementById(id).innerHTML;
  let data = +document.getElementById("counting").innerHTML
  console.log("This is the items value", x)
  console.log("This is the total before", data)
  newItem=document.getElementById(id).name

  data = parseFloat(data) + parseFloat(x);
  console.log(`Set to ${data}`)
  document.getElementById("counting").innerText = data;
  console.log(data);
  console.log(document.getElementById("counting").innerText)
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

function openModal(modal) {
  document.getElementById(modal).style.display = "block";
}

function closeModal(modal) {
  document.getElementById(modal).style.display = "none";
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



async function enterData() {
  let tableNumber = +document.getElementById("tableNumber").innerHTML
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

//$(function testParams() {
  //  $('.buttonAdd').click(function(){
    //    let x = $(this).attr('value');
      //  console.log(x);
    //});
//});

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
  request.open('POST', `/processUserInfo/${JSON.stringify(userInfo)}`)
  console.log(userInfo)
  request.onload = () => {
    const flaskMessage = request.responseText
    console.log(flaskMessage)
  }
  console.log(userInfo)
  request.send();
  console.log(userInfo)
}

function getTableNumberFromTextBox(){
  let tabNumber = document.getElementById("inputId").value;
  document.getElementById("tableNumber").innerHTML=tabNumber
}
