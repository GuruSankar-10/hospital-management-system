console.log("Admin Medicines JS Loaded");

// ==========================
// API URL
// ==========================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const MEDICINE_API = BASE_URL + "/medicines";

let deleteMedicineId = null;

// ==========================
// PAGE LOAD
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    loadMedicines();

});

// ==========================
// LOAD MEDICINES
// ==========================

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

        medicines.forEach(medicine=>{

            const expiry =
            medicine.expiryDate
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

        document.getElementById("medicineCount").textContent =
        medicines.length;

        document.getElementById("lowStockCount").textContent =
        lowStock;

        document.getElementById("expiredCount").textContent =
        expired;

        document.getElementById("availableCount").textContent =
        available;

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

// ==========================
// SEARCH
// ==========================

function searchMedicine(){

    const keyword =
    document
    .getElementById("searchMedicine")
    .value
    .toLowerCase();

    const rows =
    document.querySelectorAll("#medicineTable tr");

    rows.forEach(row=>{

        row.style.display =
        row.innerText.toLowerCase().includes(keyword)
        ? ""
        : "none";

    });

}
// ==========================
// OPEN MEDICINE MODAL
// ==========================

function openMedicineModal() {

    document.getElementById("modalTitle").innerHTML = "Add Medicine";

    document.getElementById("medicineId").value = "";
    document.getElementById("medicineName").value = "";
    document.getElementById("medicineCategory").value = "";
    document.getElementById("medicineManufacturer").value = "";
    document.getElementById("medicinePrice").value = "";
    document.getElementById("medicineStock").value = "";
    document.getElementById("medicineExpiry").value = "";
    document.getElementById("medicineDescription").value = "";

    document.getElementById("medicineModal").style.display = "flex";

}

// ==========================
// CLOSE MODAL
// ==========================

function closeMedicineModal() {

    document.getElementById("medicineModal").style.display = "none";

}

// ==========================
// SAVE MEDICINE
// ==========================

async function saveMedicine() {

    const id = document.getElementById("medicineId").value;

    const medicine = {

        name:
        document.getElementById("medicineName").value.trim(),

        category:
        document.getElementById("medicineCategory").value,

        manufacturer:
        document.getElementById("medicineManufacturer").value.trim(),

        price:
        parseFloat(document.getElementById("medicinePrice").value),

        stock:
        parseInt(document.getElementById("medicineStock").value),

        expiryDate:
        document.getElementById("medicineExpiry").value,

        description:
        document.getElementById("medicineDescription").value.trim()

    };

    // Validation

    if (

        medicine.name === "" ||

        medicine.category === "" ||

        medicine.manufacturer === "" ||

        isNaN(medicine.price) ||

        isNaN(medicine.stock)

    ) {

        alert("Please fill all required fields.");

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

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(medicine)

        });

        if (!response.ok) {

            const error = await response.text();

            throw new Error(error);

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

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
// ==========================
// EDIT MEDICINE
// ==========================

async function editMedicine(id) {

    try {

        const response = await fetch(MEDICINE_API + "/" + id);

        if (!response.ok) {

            throw new Error("Unable to load medicine");

        }

        const medicine = await response.json();

        document.getElementById("modalTitle").innerHTML = "Edit Medicine";

        document.getElementById("medicineId").value = medicine.id;
        document.getElementById("medicineName").value = medicine.name || "";
        document.getElementById("medicineCategory").value = medicine.category || "";
        document.getElementById("medicineManufacturer").value = medicine.manufacturer || "";
        document.getElementById("medicinePrice").value = medicine.price || "";
        document.getElementById("medicineStock").value = medicine.stock || "";
        document.getElementById("medicineExpiry").value = medicine.expiryDate || "";
        document.getElementById("medicineDescription").value = medicine.description || "";

        document.getElementById("medicineModal").style.display = "flex";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================
// DELETE MEDICINE
// ==========================

function deleteMedicine(id) {

    deleteMedicineId = id;

    document.getElementById("deleteModal").style.display = "flex";

}

// ==========================
// CLOSE DELETE MODAL
// ==========================

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display = "none";

}

// ==========================
// CONFIRM DELETE
// ==========================

async function confirmDelete() {

    try {

        const response = await fetch(

            MEDICINE_API + "/" + deleteMedicineId,

            {

                method: "DELETE"

            }

        );

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        alert("Medicine Deleted Successfully");

        closeDeleteModal();

        loadMedicines();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ==========================
// GLOBAL FUNCTIONS
// ==========================

window.openMedicineModal = openMedicineModal;

window.closeMedicineModal = closeMedicineModal;

window.saveMedicine = saveMedicine;

window.editMedicine = editMedicine;

window.deleteMedicine = deleteMedicine;

window.confirmDelete = confirmDelete;

window.closeDeleteModal = closeDeleteModal;

window.searchMedicine = searchMedicine;