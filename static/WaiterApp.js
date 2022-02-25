function AddToOrder(){
    let quantity = document.getElementById("quant").value;
    let orderID = document.getElementById("validationDefault01").value;
    let item = document.getElementById("validationDefault02").value;
    if (document.getElementById("AddCheckbutton").checked){ 
        add(orderID, item, quantity);
        window.parent.AddItemToDb(item,orderID,quantity); //calls the function for interacting with database
    }else if (document.getElementById("RemoveCheckbutton").checked){
        remove(orderID, item, quantity);
    }
}

function add(orderID, item, quantity){
    var list = document.getElementById(orderID);
    let count = false;
    const lis = document.getElementById(orderID).getElementsByClassName('list-group-item');
        for(var i = 0; i <= lis.length-1; i++) {;
            count = false;
            if((lis[i].innerHTML).substring(3) == item){;
                quantCard = Number((lis[i].innerHTML).substring(0,1));
                let q = quantCard + Number(quantity);
                list.removeChild(list.childNodes[i]);
                //call update outside loop
                update(orderID, item, q);
                count = true;
                break;
            }

        }
        if (count == false){update(orderID, item, quantity);}
}

function update(orderID, item, quant){
    console.log(quant);
    var node = document.createElement('li');
    node.className = 'list-group-item';
    node.appendChild(document.createTextNode(quant + "x " + item));
    document.getElementById(orderID).appendChild(node);
}

function remove(orderID, item, quantity){
    var list = document.getElementById(orderID);
    let count = false;
    const lis = document.getElementById(orderID).getElementsByClassName('list-group-item');
        for(var i = 0; i <= lis.length-1; i++) {;
            count = false;
            if(((lis[i].innerHTML).substring(3) == item) && ((lis[i].innerHTML).substring(0,1) == quantity)){
                list.removeChild(list.childNodes[i]);
                count = true;
            }
            else if((lis[i].innerHTML).substring(3) == item){
                quantCard = Number((lis[i].innerHTML).substring(0,1));
                let q = quantCard - Number(quantity);
                list.removeChild(list.childNodes[i]);
                update(orderID, item, q);
                count = true;
                break;
            }
        }
        if (count == false){alert("Item not in list");}
}       



