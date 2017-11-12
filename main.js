
/*Global Variables*/

/*paths for replacing images*/
var strawPath = "assets/colors/straw.png";
var camoPath = "assets/colors/camo.png";
var crazyPath = "assets/colors/crazyberry.png";
var blackPath = "assets/colors/blackberry.png";
var moonPath = "assets/colors/moon.png";
var firePath = "assets/colors/fire.png";
var cartImgPath = strawPath;
var cartItem = null;
/*temp storage for size selected before put into local storge*/
var sizeSelected = "Tiny";
var colorSelected = "Strawberry";
/*html to insert into cell for selector in cart*/
var quantSelect = "<td> <select id=\"quantity-select\"> \<" +
    "option value=\"1\">1</option> <" +
    "option value=\"2\">2</option> <" +
    "option value=\"3\">3</option> <" +
    "option value=\"4\">4</option> <" +
    "option value=\"5\">6</option> <" +
    "option value=\"6\">6</option> " +
    "<option value=\"7\">7</option> " +
    "<option value=\"8\">8</option> " +
    "<option value=\"9\">9</option> " +
    "</select>" +
    "</td>";

/*DOC READY*/
$(document).ready(function() {

    updateCartNum();

    /* set default color*/
    var cartImgPath = strawPath;
    $(".color-btn").css("color","black")
    $("#straw").css("color", "red");
    /* set default size*/
    $(".size-btn").css("color","black")
    $("#tiny").css("color", "red");

    /* changes image when cart button clicked*/
    $(".color-btn").click(changeImage);

    /* highlight selected color on button and set color variable*/
    $(".color-btn").click(function(){
        /* highlight selection*/
        $(".color-btn").css("color","black")
        $(this).css("color", "red");
        colorSelected = $(this).html();
    });

    /* highlight selected size on button and set size variable*/
    $(".size-btn").click(function(){
        /* highlight selection*/
        $(".size-btn").css("color","black")
        $(this).css("color", "red");
        sizeSelected = $(this).html();
    });
    $("#add-to-cart").click(function () {
        copyText();
        updateCartNum();
    });
});

function changeImage() {
    if ($(this).attr('id') == "crazy") {
        $("#hero-image").attr("src", crazyPath);
        cartImgPath = crazyPath;
    } else if ($(this).attr('id') == "straw") {
        $("#hero-image").attr("src", strawPath);
        cartImgPath = strawPath;
    } else if ($(this).attr('id') == "camo") {
        $("#hero-image").attr("src", camoPath);
        cartImgPath = camoPath;
    } else if ($(this).attr('id') == "moon") {
        $("#hero-image").attr("src", moonPath);
        cartImgPath = moonPath;
    } else if ($(this).attr('id') == "black") {
        $("#hero-image").attr("src", blackPath);
        cartImgPath = blackPath;
    } else if ($(this).attr('id') == "fire") {
        cartImgPath = firePath;
        $("#hero-image").attr("src", firePath);
    }
}
/*Pass info on page to local storage*/
function copyText() {
    /*pull out all of your page's data into variables*/
    var pageTitle = $("#nycTitle").html();
    var pagePrice = $("#nycPrice").html();
    var pageDesc = $("#nycDesc").html();
    var pageColor = colorSelected;
    var pageSize  = sizeSelected;
    /*put those variables into a generic object*/
    var cartItem = {
        title: pageTitle,
        price: pagePrice,
        desc: pageDesc,
        color: pageColor,
        size: pageSize,
        path: cartImgPath
    }
 if (localStorage.storageCart !== undefined){
     console.log("copy text storage cart is there");
        var cartInStorage = JSON.parse(localStorage.getItem("storageCart"));
        cartInStorage.push(cartItem);
        localStorage.setItem("storageCart", JSON.stringify(cartInStorage));
 }
 if (localStorage.storageCart == undefined){
        console.log("copy text storage cart is undef");
        var cartArray = [];
        cartArray.push(cartItem);
        localStorage.setItem("storageCart", JSON.stringify(cartArray));
    }
};
/*function to draw a table on the cart screen*/
function makeTable() {

    if (localStorage.storageCart !== undefined) {
        console.log("make table:  not Undefined");

        /*take out array of objects from storage and parse into variable*/
        var cartInStorage = JSON.parse(localStorage.getItem("storageCart"));
        var rows = cartInStorage.length; //here's your number of rows

        for (var i = 0; i < rows; i++) {   //for loop to create a row then put a cell in for each column
            var table = document.getElementById("cart-table");
            var row = table.insertRow(i);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            //populate cells with info from copyText()
            cell1.innerHTML = '<img id= cart-image class="galleryImages" src=' + cartInStorage[i].path + '></img>'
            cell2.innerHTML = cartInStorage[i].title +'<br> <br>' + "<b>Size: </b> " + cartInStorage[i].size + '<br>' + '<b>Color: </b>' + cartInStorage[i].color + '<br> <br> <br>' +  "<button class= 'remove'> Remove </button>";
            cell3.innerHTML = cartInStorage[i].price;
            cell4.innerHTML = quantSelect; //add selector to cell for selecting quantity
        }

        var row = table.insertRow(0); // add error handling for header on unedefined table

        var head1 = row.insertCell(0);
        var head2 = row.insertCell(1);
        var head3 = row.insertCell(2);
        var head4 = row.insertCell(3);

        head1.innerText = '<th></th>';
        head2.innerHTML = '<th></th>';
        head1.innerHTML = '<th></th>';
        head3.innerHTML = '<th>Price</th>';
        head4.innerHTML = '<th>Quantity</th>';
    }
    else {
        console.log("undefined");
        alert("nothing in cart");
    }

    /*remove item from car*/
    $(".remove").click(function () {
        var row = $(this).parent().parent().index("tr");
        var tabel = $("#cart-table")
        table.deleteRow(row);

        var cartFromStorage = JSON.parse(localStorage.getItem("storageCart"));
        cartFromStorage.splice(row-1,1);
        localStorage.setItem("storageCart", JSON.stringify(cartFromStorage));

        if (localStorage.length = 0) {

            localStorage.clear();
        }
    });

}
function updateCartNum(){
    console.log("update num");
    $("#cart-num").empty();
    var cartFromStorage = JSON.parse(localStorage.getItem("storageCart"));
    var length = cartFromStorage.length;
    $("#cart-num").append('('+length+ ')');

}
