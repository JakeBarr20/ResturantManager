function popupAllergies() {
  let Cal = "(Calories here)";
  let Allergy = "(Allergies here)";
  let message = "KCal: " + Cal + "\nAllergies: " + Allergy;
  alert(message);
}
let data = 0;
let x = 0;

function increase(id) {
  x = document.getElementById(id).innerHTML;
  data = parseFloat(data) + parseFloat(x);
 document.getElementById("counting").innerText = data;
}
