console.log("STAFF JS LOADED");

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const STAFF_API_URL = BASE_URL + "/staff";

let deleteId = null;


// ==========================
// Page Load
// ==========================

document.addEventListener("DOMContentLoaded", function () {

    loadStaff();

});



// ==========================
// Open Staff Modal
// ==========================

function openStaffModal(){

    document.getElementById("staffModal").style.display = "flex";

}



// ==========================
// Close Staff Modal
// ==========================

function closeStaffModal(){

    document.getElementById("staffModal").style.display = "none";

    clearForm();

}



// ==========================
// Clear Form
// ==========================

function clearForm(){

    document.getElementById("staffId").value = "";

    document.getElementById("staffName").value = "";

    document.getElementById("staffEmail").value = "";

    document.getElementById("staffPassword").value = "";

    document.getElementById("staffPhone").value = "";

    document.getElementById("staffDepartment").value = "";

}



// ==========================
// Register Staff
// ==========================

function registerStaff(){


    let staff = {


        fullName:
        document.getElementById("staffName").value,


        email:
        document.getElementById("staffEmail").value,


        password:
        document.getElementById("staffPassword").value,


        phone:
        document.getElementById("staffPhone").value,


        department:
        document.getElementById("staffDepartment").value


    };



    if(
        staff.fullName === "" ||
        staff.email === "" ||
        staff.password === "" ||
        staff.phone === "" ||
        staff.department === ""
    ){

        alert("Please fill all fields");

        return;

    }



    fetch(STAFF_API_URL + "/register",{


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(staff)



    })



    .then(response=>response.text())


    .then(data=>{


        alert(data);


        closeStaffModal();


        loadStaff();



    })


    .catch(error=>{


        console.error(error);


        alert("Staff Registration Failed");


    });



}






// ==========================
// Load Staff List
// ==========================

function loadStaff(){


    fetch(STAFF_API_URL)


    .then(response=>response.json())


    .then(data=>{


        let table = "";

        let nurse = 0;

        let reception = 0;

        let other = 0;



        data.forEach(staff=>{


            if(staff.department === "Nurse"){

                nurse++;

            }

            else if(staff.department === "Reception"){

                reception++;

            }

            else{

                other++;

            }




            table += `


            <tr>


            <td>${staff.id}</td>


            <td>${staff.name}</td>


            <td>${staff.phone}</td>


            <td>${staff.department}</td>



            <td>


            <button 
            class="deleteBtn"
            onclick="deleteStaff(${staff.id})">


            Delete


            </button>


            </td>


            </tr>


            `;


        });




        document.getElementById("staffTable").innerHTML = table;



        document.getElementById("staffCount").innerHTML = data.length;


        document.getElementById("nurseCount").innerHTML = nurse;


        document.getElementById("receptionCount").innerHTML = reception;


        document.getElementById("otherCount").innerHTML = other;



    })


    .catch(error=>{


        console.log("Load Staff Error:",error);


    });



}







// ==========================
// Search Staff
// ==========================

function searchStaff(){


    let value =
    document.getElementById("searchStaff")
    .value
    .toLowerCase();



    let rows =
    document.querySelectorAll("#staffTable tr");



    rows.forEach(row=>{


        row.style.display =

        row.innerText
        .toLowerCase()
        .includes(value)

        ?

        ""

        :

        "none";


    });



}






// ==========================
// Delete Staff
// ==========================

function deleteStaff(id){


    deleteId=id;


    document.getElementById("deleteModal")
    .style.display="flex";


}






// ==========================
// Confirm Delete
// ==========================

function confirmDelete(){


    fetch(STAFF_API_URL+"/"+deleteId,{


        method:"DELETE"


    })


    .then(response=>response.text())


    .then(data=>{


        alert(data);


        closeDeleteModal();


        loadStaff();


    });



}






// ==========================
// Close Delete Modal
// ==========================

function closeDeleteModal(){


    document.getElementById("deleteModal")
    .style.display="none";


}






// ==========================
// Outside Click Close
// ==========================

window.onclick=function(event){


    let staffModal =
    document.getElementById("staffModal");


    let deleteModal =
    document.getElementById("deleteModal");



    if(event.target === staffModal){


        closeStaffModal();


    }



    if(event.target === deleteModal){


        closeDeleteModal();


    }



};