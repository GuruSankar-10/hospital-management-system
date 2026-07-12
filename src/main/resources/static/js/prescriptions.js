const doctorId = localStorage.getItem("doctorId");

const API =
"http://localhost:8080/prescriptions/doctor/" + doctorId;

const SAVE_API =
"http://localhost:8080/prescriptions";

const PATIENT_API =
"http://localhost:8080/patients/doctor/" + doctorId;

let prescriptions = [];

let deleteId = null;

// =========================
// Page Load
// =========================

window.onload = function(){

    loadPatients();

    loadPrescriptions();

    document
    .getElementById("searchPrescription")
    .addEventListener("keyup",searchPrescription);

};

// =========================
// Load Prescriptions
// =========================

async function loadPrescriptions(){

    const response = await fetch(API);

    prescriptions = await response.json();

    displayPrescriptions(prescriptions);

    updateCards(prescriptions);

}

// =========================
// Display
// =========================

function displayPrescriptions(list){

    let rows="";

    list.forEach(p=>{

        rows+=`

        <tr>

        <td>${p.id}</td>

        <td>${p.patient ? p.patient.name : "-"}</td>

        <td>${p.medicine}</td>

        <td>${p.notes}</td>

        <td>

        <button class="editBtn"

        onclick="editPrescription(${p.id})">

        <i class="fas fa-edit"></i>

        </button>

        <button class="deleteBtn"

        onclick="deletePrescription(${p.id})">

        <i class="fas fa-trash"></i>

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("prescriptionTable").innerHTML =
    rows;

}

// =========================
// Dashboard Cards
// =========================

function updateCards(list){

    document.getElementById("prescriptionCount").innerHTML =
    list.length;

    const patients =
    new Set();

    list.forEach(p=>{

        if(p.patient)

            patients.add(p.patient.id);

    });

    document.getElementById("patientCount").innerHTML =
    patients.size;

    document.getElementById("todayCount").innerHTML =
    list.length;

    document.getElementById("medicineCount").innerHTML =
    list.length;

}

// =========================
// Load Patients
// =========================

async function loadPatients(){

    const response =
    await fetch(PATIENT_API);

    const patients =
    await response.json();

    const select =
    document.getElementById("patientSelect");

    select.innerHTML =
    "<option value=''>Select Patient</option>";

    patients.forEach(patient=>{

        select.innerHTML +=

        `<option value="${patient.id}">

        ${patient.name}

        </option>`;

    });

}

// =========================
// Search
// =========================

function searchPrescription(){

    const keyword =
    document
    .getElementById("searchPrescription")
    .value
    .toLowerCase();

    const filtered =
    prescriptions.filter(p=>

        p.medicine.toLowerCase().includes(keyword)

        ||

        p.notes.toLowerCase().includes(keyword)

        ||

        (p.patient?.name || "")
        .toLowerCase()
        .includes(keyword)

    );

    displayPrescriptions(filtered);

}

// =========================
// Open Modal
// =========================

function openPrescriptionModal(){

    document.getElementById("modalTitle").innerHTML =
    "New Prescription";

    document.getElementById("prescriptionId").value="";

    document.getElementById("patientSelect").value="";

    document.getElementById("medicine").value="";

    document.getElementById("instructions").value="";

    document.getElementById("prescriptionModal").style.display =
    "block";

}

function closePrescriptionModal(){

    document.getElementById("prescriptionModal").style.display =
    "none";

}

// =========================
// Save
// =========================

async function savePrescription(){

    const id =
    document.getElementById("prescriptionId").value;

    const prescription={

        medicine:
        document.getElementById("medicine").value,

        notes:
        document.getElementById("instructions").value,

        doctor:{

            id:doctorId

        },

        patient:{

            id:
            document.getElementById("patientSelect").value

        }

    };

    if(

        !prescription.medicine ||

        !prescription.notes ||

        !prescription.patient.id

    ){

        alert("Please fill all fields");

        return;

    }

    const url =
    id ? SAVE_API+"/"+id : SAVE_API;

    const method =
    id ? "PUT" : "POST";

    await fetch(url,{

        method:method,

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(prescription)

    });

    closePrescriptionModal();

    loadPrescriptions();

}

// =========================
// Edit
// =========================

function editPrescription(id){

    const p =
    prescriptions.find(x=>x.id==id);

    if(!p) return;

    document.getElementById("modalTitle").innerHTML =
    "Edit Prescription";

    document.getElementById("prescriptionId").value =
    p.id;

    document.getElementById("patientSelect").value =
    p.patient ? p.patient.id : "";

    document.getElementById("medicine").value =
    p.medicine;

    document.getElementById("instructions").value =
    p.notes;

    document.getElementById("prescriptionModal").style.display =
    "block";

}

// =========================
// Delete
// =========================

function deletePrescription(id){

    deleteId=id;

    document.getElementById("deleteModal").style.display =
    "block";

}

function closeDeleteModal(){

    document.getElementById("deleteModal").style.display =
    "none";

}

async function confirmDelete(){

    await fetch(SAVE_API+"/"+deleteId,{

        method:"DELETE"

    });

    closeDeleteModal();

    loadPrescriptions();

}