function AddToOrder(){
    orderID = document.getElementById("validationDefault01").value;
    item = document.getElementById("validationDefault02").value;
    if (document.getElementById("AddCheckbutton").checked){ 
        var node = document.createElement('li');
        node.className = 'list-group-item';
        node.appendChild(document.createTextNode(item));
        document.getElementById(orderID).appendChild(node);
    }else if (document.getElementById("RemoveCheckbutton").checked){
        var list = document.getElementById(orderID);
        var index = getIndex();
        list.removeChild(list.childNodes[index]);
    }
}

function getIndex(){
    const lis = document.getElementById(orderID).getElementsByClassName('list-group-item');
        for(var i = 0; i <= lis.length-1; i++) {;
            if(lis[i].innerHTML == item){
                return i;
            }
        }
        alert("Item not in list");
}



