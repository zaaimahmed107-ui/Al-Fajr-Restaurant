const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();


app.use(cors());

app.use(express.json());




// ==========================
// MONGODB CONNECTION
// ==========================


mongoose.connect("mongodb://127.0.0.1:27017/alfajr")

.then(()=>{

    console.log("✅ MongoDB Connected");

})

.catch((err)=>{

    console.log(err);

});









// ==========================
// FOOD SCHEMA
// ==========================


const foodSchema = new mongoose.Schema({


    name:String,


    price:Number,


    category:String,


    image:String



});



const Food = mongoose.model("Food", foodSchema);









// ==========================
// ORDER SCHEMA (UPDATED)
// ==========================


const orderSchema = new mongoose.Schema({


    customerName:String,


    customerPhone:String,


    customerAddress:String,



    items:Array,



    total:Number,



    status:{


        type:String,


        default:"Pending"


    },



    date:{


        type:Date,


        default:Date.now


    }



});




const Order = mongoose.model("Order", orderSchema);









// ==========================
// HOME ROUTE
// ==========================


app.get("/",(req,res)=>{


    res.send("🍔 Al Fajr Restaurant Server Running");


});


// ==========================
// FOOD ROUTES
// ==========================



// GET ALL FOODS

app.get("/foods", async(req,res)=>{


    try{


        const foods = await Food.find();


        res.json(foods);



    }catch(err){


        res.status(500).json({

            message:err.message

        });


    }


});







// ADD FOOD


app.post("/foods", async(req,res)=>{


    try{


        const food = new Food(req.body);


        await food.save();



        res.json({


            message:"Food Added Successfully",


            food


        });



    }catch(err){


        res.status(500).json({

            message:err.message

        });


    }


});








// DELETE FOOD


app.delete("/foods/:id", async(req,res)=>{


try{


const food = await Food.findByIdAndDelete(req.params.id);



if(!food){


return res.status(404).json({

message:"Food not found"

});


}



res.json({

message:"Food Deleted Successfully"

});



}catch(err){


res.status(500).json({

message:err.message

});


}


});









// UPDATE FOOD


app.put("/foods/:id", async(req,res)=>{


try{


const food = await Food.findByIdAndUpdate(


req.params.id,


req.body,


{new:true}


);



if(!food){


return res.status(404).json({

message:"Food not found"

});


}



res.json({

message:"Food Updated Successfully",

food


});



}catch(err){


res.status(500).json({

message:err.message

});


}



});









// ==========================
// ORDER ROUTES
// ==========================





// SAVE ORDER


app.post("/orders", async(req,res)=>{


try{


const order = new Order(req.body);


await order.save();



res.json({


message:"Order Saved Successfully",


order



});



}catch(err){


res.status(500).json({

message:err.message

});


}


});









// GET ALL ORDERS


app.get("/orders", async(req,res)=>{


try{


const orders = await Order.find().sort({

date:-1

});



res.json(orders);



}catch(err){


res.status(500).json({

message:err.message

});


}


});

// GET SINGLE ORDER BY ID (TRACK ORDER)

app.get("/orders/:id", async(req,res)=>{

try{

const order = await Order.findById(req.params.id);


if(!order){

return res.status(404).json({

message:"Order not found"

});

}


res.json(order);


}catch(err){


res.status(500).json({

message:err.message

});


}


});







// UPDATE ORDER STATUS


app.put("/orders/:id", async(req,res)=>{


try{


const order = await Order.findByIdAndUpdate(


req.params.id,


{

status:req.body.status

},


{

new:true

}


);



if(!order){


return res.status(404).json({

message:"Order not found"

});


}



res.json({


message:"Status Updated Successfully",


order


});



}catch(err){


res.status(500).json({

message:err.message

});


}



});












// ==========================
// SERVER START
// ==========================



app.listen(5000,()=>{


console.log("🚀 Server running on http://localhost:5000");


});