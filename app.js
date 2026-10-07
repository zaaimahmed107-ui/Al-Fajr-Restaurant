const foodForm = document.getElementById("foodForm");

foodForm.addEventListener("submit", async function(e){

    e.preventDefault();


    const foodData = {

        name: document.getElementById("foodName").value,

        price: document.getElementById("price").value,

        category: document.getElementById("category").value,

        description: document.getElementById("description").value,

        image: document.getElementById("image").value

    };


    try{

        const response = await fetch("http://localhost:5000/foods",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(foodData)

        });


        const result = await response.json();


        document.getElementById("message").classList.remove("d-none");


        foodForm.reset();


        console.log(result);


    }

    catch(error){

        console.log(error);

        alert("Server Error");

    }


});