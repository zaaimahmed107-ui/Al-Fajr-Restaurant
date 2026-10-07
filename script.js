let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================
// ADD TO CART
// ==========================

function addToCart(id, name, price, image){

    let item = cart.find(product => product.id === id);


    if(item){

        item.quantity++;

    }else{

        cart.push({

            id:id,
            name:name,
            price:Number(price),
            image:image,
            quantity:1

        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));


    alert(name + " added to cart!");

}





// ==========================
// LOAD CART
// ==========================

function loadCart(){


    let cartItems = document.getElementById("cart-items");
    let total = document.getElementById("total");


    if(!cartItems){
        return;
    }


    cartItems.innerHTML="";


    let totalPrice = 0;



    if(cart.length === 0){

        cartItems.innerHTML = `

        <h5 class="text-center text-muted">

        Your cart is empty

        </h5>

        `;

        if(total){
            total.innerHTML="0";
        }

        return;

    }




    cart.forEach((item,index)=>{


        cartItems.innerHTML += `


        <div class="food-card mb-3">


        <div class="row align-items-center w-100">


        <div class="col-md-3 text-center">

        <img src="${item.image}"

        class="cart-food-image">


        </div>




        <div class="col-md-5">


        <div class="food-info">


        <h5>${item.name}</h5>


        <p>

        Rs. ${item.price}

        </p>


        </div>


        </div>





        <div class="col-md-4 text-center">


        <button class="btn btn-dark"

        onclick="decreaseQty(${index})">

        -

        </button>



        <span class="mx-3 fw-bold">

        ${item.quantity}

        </span>



        <button class="btn btn-warning"

        onclick="increaseQty(${index})">

        +

        </button>



        <button class="btn btn-danger ms-2"

        onclick="removeItem(${index})">

        🗑

        </button>


        </div>


        </div>


        </div>


        `;


        totalPrice += item.price * item.quantity;


    });



    if(total){

        total.innerHTML = totalPrice;

    }


}







// ==========================
// QUANTITY
// ==========================


function increaseQty(index){

    cart[index].quantity++;

    saveCart();

}



function decreaseQty(index){


    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }


    saveCart();

}




function removeItem(index){


    cart.splice(index,1);

    saveCart();

}







function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );


    loadCart();

    loadOrderSummary();

}








// ==========================
// CHECKOUT SUMMARY
// ==========================


function loadOrderSummary(){


    let summary = document.getElementById("order-summary");


    if(!summary){

        return;

    }



    summary.innerHTML="";


    let total = 0;



    cart.forEach(item=>{


        summary.innerHTML += `


        <div class="order-item">


        <div>


        <h5>${item.name}</h5>

        <p>

        Quantity: ${item.quantity}

        </p>


        </div>



        <b>

        Rs. ${item.price * item.quantity}

        </b>


        </div>


        `;



        total += item.price * item.quantity;



    });





    summary.innerHTML += `


    <hr>


    <h4>

    Total: Rs. ${total}

    </h4>


    `;


}








// ==========================
// PLACE ORDER
// ==========================


function placeOrder(){


    let name = document.getElementById("customerName").value;

    let phone = document.getElementById("customerPhone").value;

    let address = document.getElementById("customerAddress").value;



    if(!name || !phone || !address){

        alert("Please fill all details");

        return;

    }



    fetch("http://localhost:5000/orders",{


        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            customerName:name,

            customerPhone:phone,

            customerAddress:address,

            items:cart,

            total:cart.reduce(

            (sum,item)=>sum+(item.price*item.quantity),0

            )


        })


    })


    .then(res=>res.json())


    .then(()=>{


        alert("Order Placed Successfully 🎉");


        localStorage.removeItem("cart");


        window.location.href="index.html";


    })


    .catch(()=>{


        alert("Order Failed");


    });


}







// ==========================
// PAGE LOAD
// ==========================


window.onload=function(){

    loadCart();

    loadOrderSummary();

};