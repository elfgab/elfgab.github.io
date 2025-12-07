function item(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
}

var items = [];
items[0] = new item(1, "Bandage", 5.99);
items[1] = new item(2, "Blood Pressure Monitor", 19.99);
items[2] = new item(3, "Crutches", 59.99);

items[3] = new item(4, "Elector Shock Machine", 99.99);
items[4] = new item(5, "Glucose Monitor", 25.99);
items[5] = new item(6, "Pill Cutter", 14.99);

//function to update the number of items in our shopping cart
function updateCheckout()
{
    document.getElementById("cart-link").innerHTML = "Checkout (" + sessionStorage.length + ")";
}

//function to get the ID of the item
function getID(arg)
{
    var counter = 0;
    while( items[counter].name != arg)
    {
        counter++;
    }

    return items[counter].id;
}

//function to get the image path for an item
function getImagePath(itemName)
{
    var imageMap = {
        "Bandage": "images/bandage.jpg",
        "Blood Pressure Monitor": "images/bloodpressure.jpg",
        "Crutches": "images/crutches.jpg",
        "Elector Shock Machine": "images/Electroshock.jpg",
        "Glucose Monitor": "images/Glucose Monitor.jpg",
        "Pill Cutter": "images/Pillcutter.jpg"
    };
    
    return imageMap[itemName] || "images/placeholder.jpg";
}

//function to add items to shopping cart
function add(arg)
{
    sessionStorage.setItem(items[arg].name, items[arg].price);
    updateCheckout();
}

//function to remove items from cart
function remove(arg)
{
    sessionStorage.removeItem(arg);
    displayCart(); ///display remaining items in cart
    updateCheckout();
}

//function to display items in cart
function displayCart()
{
    var total = 0;
    var output = "<table class='table table-hover' style='width:100%; margin-bottom: 20px;'>";

    //check to see if the cart is empty
    if(sessionStorage.length == 0)
    {
        document.getElementById("cart").innerHTML = "<h3>Cart is empty!</h3>";  
        document.getElementById("total").innerHTML = "<h3>TOTAL: $0.00</h3>";
    }
    else
    {
        output += "<thead><tr style='background-color: #008080; color: white;'><th>Image</th><th>Name</th><th>Price</th><th>Delete</th></tr></thead><tbody>";
        
        for(var x = 0; x < sessionStorage.length; x++)
        {
            var key = sessionStorage.key(x);//get key
            var imagePath = getImagePath(key);
            output += "<tr><td><img src='" + imagePath + "' width='60px' height='60px' style='border-radius: 8px; border: 2px solid #008080; object-fit: cover;'></td>" //image of item
            output += "<td>" + key + "</td><td>$" + sessionStorage.getItem(key) + "</td>"; // get the name and price item
            output += "<td><input type='button' class='btn btn-danger btn-sm' value='Delete' onclick='remove(\"" + key + "\")'></td></tr>";//get delete button and configure arg for remove function
            total += parseFloat(sessionStorage.getItem(key));
        }
        
        output += "</tbody></table>";
        
        //output
        document.getElementById("cart").innerHTML = output;
        document.getElementById("total").innerHTML = "<h3>TOTAL: $" + total.toFixed(2) + "</h3>";

    }
}


document.addEventListener('DOMContentLoaded', function() {
    if(document.getElementById('cart')) {
        displayCart();
        updateCheckout();
    }
});