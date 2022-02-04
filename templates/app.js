function AddToOrder(){
    tableID = document.getElementById("validationDefault01").value;
    item = document.getElementById("validationDefault02").value;
    if (document.getElementById("AddCheckbutton").checked){ 
        var node = document.createElement('li');
        node.className = 'list-group-item';
        node.appendChild(document.createTextNode(item));
        document.getElementById(tableID).appendChild(node);
    }else{
        var l = document.getElementById(tableID).value;
        l.removeChild(l.childNodes[l.indexOf(item)]);
    }
   
}