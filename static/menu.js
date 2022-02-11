function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
}

let data = 0;
let x = 0;

function increase(id) {
  console.log("Called the increase function")
  console.log(data);
  document.getElementById("counting").innerText = data;
  x = document.getElementById(id).value;
  console.log(document.getElementById(id).value)
  console.log(x);
  data = parseFloat(data) + parseFloat(x);
  document.getElementById("counting").innerText = data;
}
