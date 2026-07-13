// ==========================================
// Doctor Prescription Management
// ==========================================

console.log("Doctor Prescription Loaded");

// ==========================================
// API URLs
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const PRESCRIPTION_API =
BASE_URL + "/prescriptions";

const PATIENT_API =
BASE_URL + "/patients/doctor/" +
localStorage.getItem("doctorId");

const MEDICINE_API =
BASE_URL + "/medicines";

// ==========================================
// Variables
// ==========================================

const doctorId =
localStorage.getItem("doctorId");

let medicineList = [];

let selectedMedicines = [];

let deletePrescriptionId = null;

// ==========================================
// Session Check
// ==========================================

if(!doctorId){

    alert("Session Expired");

    window.location.href="login.html";

}

// ==========================================
// Doctor Name
// ==========================================

const doctorName =
localStorage.getItem("name") || "Doctor";

document.getElementById("doctorName").innerHTML =
"Dr. " +
doctorName.replace(/^Dr\.?\s*/i,"");

// ==========================================
// Page Load
// ==========================================

document.addEventListener("DOMContentLoaded",()=>{

    loadPatients();

    loadMedicines();

    loadPrescriptions();

});

// ==========================================
// Load Patients
// ==========================================

function loadPatients(){

fetch(PATIENT_API)

.then(response=>{

if(!response.ok){

throw new Error("Unable to load patients");

}

return response.json();

})

.then(patients=>{

let options =
'<option value="">Select Patient</option>';

patients.forEach(patient=>{

options +=

`<option value="${patient.id}">

${patient.name}

</option>`;

});

document.getElementById("patientSelect").innerHTML =
options;

document.getElementById("patientCount").innerHTML =
patients.length;

})

.catch(error=>{

console.log(error);

});

}

// ==========================================
// Load Medicines
// ==========================================

function loadMedicines(){

fetch(MEDICINE_API)

.then(response=>{

if(!response.ok){

throw new Error("Unable to load medicines");

}

return response.json();

})

.then(medicines=>{

medicineList = medicines;

let options =

'<option value="">Select Medicine</option>';

medicines.forEach(medicine=>{

options +=

`<option value="${medicine.id}">

${medicine.medicineName}

(${medicine.strength})

</option>`;

});

document.getElementById("medicine").innerHTML =
options;

document.getElementById("medicineCount").innerHTML =
medicines.length;

})

.catch(error=>{

console.log(error);

});

}
// ==========================================
// Add Medicine to Prescription
// ==========================================

function addMedicineRow() {

    const medicineId =
    document.getElementById("medicine").value;

    if (medicineId === "") {

        alert("Please select a medicine.");

        return;

    }

    const medicine =
    medicineList.find(m => m.id == medicineId);

    if (!medicine) {

        alert("Medicine not found.");

        return;

    }

    const dosage =
    document.getElementById("dosage").value;

    const days =
    document.getElementById("days").value;

    const food =
    document.getElementById("food").value;

    const morning =
    document.getElementById("morning").checked;

    const afternoon =
    document.getElementById("afternoon").checked;

    const night =
    document.getElementById("night").checked;

    selectedMedicines.push({

        id: medicine.id,

        name: medicine.medicineName,

        strength: medicine.strength,

        dosage: dosage,

        days: days,

        food: food,

        morning: morning,

        afternoon: afternoon,

        night: night

    });

    renderMedicineTable();

    clearMedicineInputs();

}

// ==========================================
// Render Medicine Table
// ==========================================

function renderMedicineTable() {

    let rows = "";

    selectedMedicines.forEach((medicine,index)=>{

        rows += `

<tr>

<td>

${medicine.name}

<br>

<small>${medicine.strength}</small>

</td>

<td>

${medicine.dosage}

</td>

<td>

${medicine.morning ? "✔" : "-"}

</td>

<td>

${medicine.afternoon ? "✔" : "-"}

</td>

<td>

${medicine.night ? "✔" : "-"}

</td>

<td>

${medicine.days}

</td>

<td>

${medicine.food}

</td>

<td>

<button

class="deleteBtn"

onclick="removeMedicine(${index})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

    });

    document.getElementById("medicineRows").innerHTML =
    rows;

}

// ==========================================
// Remove Medicine
// ==========================================

function removeMedicine(index){

    selectedMedicines.splice(index,1);

    renderMedicineTable();

}

// ==========================================
// Clear Medicine Inputs
// ==========================================

function clearMedicineInputs(){

    document.getElementById("medicine").value="";

    document.getElementById("dosage").selectedIndex=0;

    document.getElementById("days").value=5;

    document.getElementById("food").selectedIndex=0;

    document.getElementById("morning").checked=false;

    document.getElementById("afternoon").checked=false;

    document.getElementById("night").checked=false;

}
// ==========================================
// Load Prescriptions
// ==========================================

function loadPrescriptions() {

    fetch(PRESCRIPTION_API + "/doctor/" + doctorId)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load prescriptions");

        }

        return response.json();

    })

    .then(data => {

        let rows = "";

        document.getElementById("prescriptionCount").innerHTML =
        data.length;

        document.getElementById("todayCount").innerHTML =
        data.length;

        data.forEach(p => {

            rows += `

<tr>

<td>${p.id}</td>

<td>${p.patient ? p.patient.name : "-"}</td>

<td>${p.notes || "-"}</td>

<td>${p.medicine || "-"}</td>

<td>-</td>

<td>

<button
class="btn"
onclick="viewPrescription(${p.id})">

<i class="fas fa-eye"></i>

</button>

<button
class="deleteBtn"
onclick="deletePrescription(${p.id})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

        });

        document.getElementById("prescriptionTable").innerHTML =
        rows;

    })

    .catch(error => {

        console.log(error);

        alert(error.message);

    });

}

// ==========================================
// Save Prescription
// ==========================================

function savePrescription() {

    const patientId =
    document.getElementById("patientSelect").value;

    const diagnosis =
    document.getElementById("diagnosis").value;

    const instructions =
    document.getElementById("instructions").value;

    if (patientId === "") {

        alert("Please select patient.");

        return;

    }

    if (selectedMedicines.length === 0) {

        alert("Please add at least one medicine.");

        return;

    }

    // Current backend supports one medicine string
    let medicineText = "";

    selectedMedicines.forEach(m => {

        medicineText +=

        m.name +

        " (" +

        m.dosage +

        ") , ";

    });

    const prescription = {

        medicine: medicineText,

        notes: diagnosis + "\n\n" + instructions,

        doctor: {

            id: doctorId

        },

        patient: {

            id: patientId

        }

    };

    fetch(PRESCRIPTION_API, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(prescription)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save prescription");

        }

        return response.json();

    })

    .then(() => {

        alert("Prescription Saved Successfully");

        selectedMedicines = [];

        renderMedicineTable();

        document.getElementById("patientSelect").value = "";

        document.getElementById("diagnosis").selectedIndex = 0;

        document.getElementById("instructions").value = "";

        loadPrescriptions();

        closePrescriptionModal();

    })

    .catch(error => {

        console.log(error);

        alert(error.message);

    });

}

// ==========================================
// Search Prescription
// ==========================================

function searchPrescription() {

    const keyword =

    document.getElementById("searchPrescription")

    .value

    .toLowerCase();

    const rows =

    document.querySelectorAll("#prescriptionTable tr");

    rows.forEach(row => {

        row.style.display =

        row.innerText.toLowerCase().includes(keyword)

        ? ""

        : "none";

    });

}
// ==========================================
// Open Prescription Modal
// ==========================================

function openPrescriptionModal() {

    document.getElementById("modalTitle").innerHTML =
        "New Prescription";

    document.getElementById("prescriptionModal").style.display =
        "flex";

}

// ==========================================
// Close Prescription Modal
// ==========================================

function closePrescriptionModal() {

    document.getElementById("prescriptionModal").style.display =
        "none";

}

// ==========================================
// View Prescription
// ==========================================

function viewPrescription(id){

    alert("Prescription ID : " + id);

}

// ==========================================
// Delete Prescription
// ==========================================

function deletePrescription(id){

    deletePrescriptionId = id;

    document.getElementById("deleteModal").style.display =
        "flex";

}

// ==========================================
// Close Delete Modal
// ==========================================

function closeDeleteModal(){

    document.getElementById("deleteModal").style.display =
        "none";

}

// ==========================================
// Confirm Delete
// ==========================================

function confirmDelete(){

    fetch(PRESCRIPTION_API + "/" + deletePrescriptionId,{

        method:"DELETE"

    })

    .then(response=>{

        if(!response.ok){

            throw new Error("Delete Failed");

        }

        return response.text();

    })

    .then(message=>{

        alert(message);

        closeDeleteModal();

        loadPrescriptions();

    })

    .catch(error=>{

        console.log(error);

        alert(error.message);

    });

}

// ==========================================
// Print Prescription
// ==========================================

function printPrescription(){

    window.print();

}

// ==========================================
// Download PDF
// ==========================================

function downloadPDF(){

    alert("PDF Download feature will be connected next.");

}

// ==========================================
// Close Modal on Outside Click
// ==========================================

window.addEventListener("mousedown",function(e){

    const prescriptionModal =
    document.getElementById("prescriptionModal");

    const deleteModal =
    document.getElementById("deleteModal");

    if(

        prescriptionModal &&
        prescriptionModal.style.display==="flex" &&
        e.target===prescriptionModal

    ){

        closePrescriptionModal();

    }

    if(

        deleteModal &&
        deleteModal.style.display==="flex" &&
        e.target===deleteModal

    ){

        closeDeleteModal();

    }

});

// ==========================================
// Global Functions
// ==========================================

window.openPrescriptionModal =
openPrescriptionModal;

window.closePrescriptionModal =
closePrescriptionModal;

window.savePrescription =
savePrescription;

window.addMedicineRow =
addMedicineRow;

window.removeMedicine =
removeMedicine;

window.searchPrescription =
searchPrescription;

window.viewPrescription =
viewPrescription;

window.deletePrescription =
deletePrescription;

window.confirmDelete =
confirmDelete;

window.closeDeleteModal =
closeDeleteModal;

window.printPrescription =
printPrescription;

window.downloadPDF =
downloadPDF;

// ==========================================
// Initial Load
// ==========================================

loadPatients();

loadMedicines();

loadPrescriptions();