console.log("Admin Medicines JS Loaded");


// =====================================
// API
// =====================================

const MEDICINE_API = API_URL + "/medicines";

let deleteMedicineId = null;



// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadMedicines();

});



// =====================================
// LOAD MEDICINES
// =====================================

async function loadMedicines(){

    try{

        const response = await fetch(MEDICINE_API);


        if(!response.ok){

            throw new Error("Unable to load medicines");

        }


        const medicines = await response.json();


        let rows = "";

        let lowStock = 0;

        let expired = 0;

        let available = 0;


        const today = new Date();



        medicines.forEach(medicine => {


            const expiry = medicine.expiryDate
                ? new Date(medicine.expiryDate)
                : null;



            if(medicine.stock < 10){

                lowStock++;

            }


            if(expiry && expiry < today){

                expired++;

            }


            if(medicine.stock > 0){

                available++;

            }



            rows += `

<tr>

<td>${medicine.id}</td>

<td>${medicine.name}</td>

<td>${medicine.strength ?? "-"}</td>

<td>${medicine.category ?? "-"}</td>

<td>${medicine.manufacturer ?? "-"}</td>

<td>₹${medicine.price}</td>

<td>${medicine.stock}</td>

<td>${medicine.expiryDate ?? "-"}</td>


<td>


<button 
class="btn"
onclick="editMedicine(${medicine.id})">

<i class="fa-solid fa-pen"></i>

</button>



<button
class="deleteBtn"
onclick="deleteMedicine(${medicine.id})">

<i class="fa-solid fa-trash"></i>

</button>


</td>


</tr>

`;

        });



        document.getElementById("medicineTable").innerHTML = rows;



        document.getElementById("medicineCount").innerText =
        medicines.length;


        document.getElementById("lowStockCount").innerText =
        lowStock;


        document.getElementById("expiredCount").innerText =
        expired;


        document.getElementById("availableCount").innerText =
        available;


    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}




// =====================================
// SEARCH
// =====================================

function searchMedicine(){


    const keyword =
    document
    .getElementById("searchMedicine")
    .value
    .toLowerCase();



    document
    .querySelectorAll("#medicineTable tr")
    .forEach(row=>{


        row.style.display =
        row.innerText
        .toLowerCase()
        .includes(keyword)

        ?

        ""

        :

        "none";


    });

}




// =====================================
// OPEN ADD MODAL
// =====================================

function openMedicineModal(){


    document.getElementById("modalTitle").innerText =
    "Add Medicine";



    document.getElementById("medicineId").value="";

    document.getElementById("medicineName").value="";

    document.getElementById("medicineStrength").value="";

    document.getElementById("medicineCategory").value="";

    document.getElementById("medicineManufacturer").value="";

    document.getElementById("medicinePrice").value="";

    document.getElementById("medicineStock").value="";

    document.getElementById("medicineExpiry").value="";

    document.getElementById("medicineDescription").value="";



    document.getElementById("medicineModal")
    .style.display="flex";


}




// =====================================
// CLOSE MODAL
// =====================================

function closeMedicineModal(){

    document.getElementById("medicineModal")
    .style.display="none";

}





// =====================================
// SAVE MEDICINE
// =====================================

async function saveMedicine(){


    const id =
    document.getElementById("medicineId").value;



    const medicine = {


        name:
        document.getElementById("medicineName")
        .value.trim(),



        strength:
        document.getElementById("medicineStrength")
        .value.trim(),



        category:
        document.getElementById("medicineCategory")
        .value,



        manufacturer:
        document.getElementById("medicineManufacturer")
        .value.trim(),



        price:
        Number(
        document.getElementById("medicinePrice").value
        ),



        stock:
        Number(
        document.getElementById("medicineStock").value
        ),



        expiryDate:
        document.getElementById("medicineExpiry").value,



        description:
        document.getElementById("medicineDescription")
        .value.trim()

    };





    if(

        medicine.name === "" ||

        medicine.strength === "" ||

        medicine.category === "" ||

        medicine.manufacturer === ""

    ){

        alert("Please fill all required fields");

        return;

    }





    const url =
    id === ""

    ?

    MEDICINE_API

    :

    MEDICINE_API + "/" + id;





    const method =
    id === ""

    ?

    "POST"

    :

    "PUT";




    try{


        const response =
        await fetch(url,{

            method,

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(medicine)

        });



        if(!response.ok){

            throw new Error(
            await response.text()
            );

        }



        alert(
            id === ""
            ?
            "Medicine Added Successfully"
            :
            "Medicine Updated Successfully"
        );



        closeMedicineModal();

        loadMedicines();



    }


    catch(error){

        console.error(error);

        alert(error.message);

    }


}





// =====================================
// EDIT
// =====================================

async function editMedicine(id){


    try{


        const response =
        await fetch(MEDICINE_API+"/"+id);



        const medicine =
        await response.json();




        document.getElementById("modalTitle").innerText =
        "Edit Medicine";



        document.getElementById("medicineId").value =
        medicine.id;



        document.getElementById("medicineName").value =
        medicine.name || "";



        document.getElementById("medicineStrength").value =
        medicine.strength || "";



        document.getElementById("medicineCategory").value =
        medicine.category || "";



        document.getElementById("medicineManufacturer").value =
        medicine.manufacturer || "";



        document.getElementById("medicinePrice").value =
        medicine.price || "";



        document.getElementById("medicineStock").value =
        medicine.stock || "";



        document.getElementById("medicineExpiry").value =
        medicine.expiryDate || "";



        document.getElementById("medicineDescription").value =
        medicine.description || "";




        document.getElementById("medicineModal")
        .style.display="flex";


    }

    catch(error){

        console.error(error);

        alert(error.message);

    }


}





// =====================================
// DELETE
// =====================================

function deleteMedicine(id){

    deleteMedicineId=id;

    document.getElementById("deleteModal")
    .style.display="flex";

}





function closeDeleteModal(){

    document.getElementById("deleteModal")
    .style.display="none";

}





async function confirmDelete(){


    try{


        await fetch(

            MEDICINE_API+"/"+deleteMedicineId,

            {

                method:"DELETE"

            }

        );


        alert("Medicine Deleted Successfully");


        closeDeleteModal();


        loadMedicines();


    }


    catch(error){

        console.error(error);

        alert(error.message);

    }


}





// =====================================
// GLOBAL
// =====================================

window.openMedicineModal=openMedicineModal;

window.closeMedicineModal=closeMedicineModal;

window.saveMedicine=saveMedicine;

window.editMedicine=editMedicine;

window.deleteMedicine=deleteMedicine;

window.confirmDelete=confirmDelete;

window.closeDeleteModal=closeDeleteModal;

window.searchMedicine=searchMedicine;