function popupAllergies(Cal, Allergy) {
    var message = "KCal: " + Cal + "\nAllergies: " + Allergy;
    alert(message);
  }
  var data = 0;
  var x = 0;
  function increase(id) {
    document.getElementById("counting").innerText = data;
    x = document.getElementById(id).value;
    data = parseFloat(data) + parseFloat(x);
    document.getElementById("counting").innerText = data;
  }