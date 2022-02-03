
function toggleOrder(iconID) {
    console.log('hellog')
    let orderNum = iconID.substring(2);
    if(document.getElementById(iconID).className=="fa fa-toggle-on fa-2x"){
        document.getElementById(iconID).className = "fa fa-toggle-off fa-2x";
        document.getElementById("card-head"+orderNum).className = 'card-header todo';
        document.getElementById("deliver-btn"+orderNum).style.display = "none";
    }else{
        document.getElementById(iconID).className = "fa fa-toggle-on fa-2x";
        document.getElementById("card-head"+orderNum).className = 'card-header prep';
        document.getElementById("deliver-btn"+orderNum).style.display = "block";
    }
}
