/*=========================================================
                HMS PRO DOCTOR PRESCRIPTIONS
=========================================================*/

const doctorId = localStorage.getItem("doctorId");
const doctorName = localStorage.getItem("name") || "Doctor";

const PRESCRIPTION_API =
API_URL + "/prescriptions/doctor/" + doctorId;

const PATIENT_API =
API_URL + "/patients/doctor/" + doctorId;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("doctorName").innerHTML =
        doctorName;

    loadPatients();

    loadPrescriptions();

});


/*=========================================================
                LOAD PATIENTS
=========================================================*/

async function loadPatients() {

    try {

        const response = await fetch(PATIENT_API);

        const patients = await response.json();

        const select =
        document.getElementById("patientSelect");

        select.innerHTML =
        '<option value="">Select Patient</option>';

        patients.forEach(patient => {

            select.innerHTML += `

<option value="${patient.id}">

${patient.name}

</option>

`;

        });

    }

    catch(error){

        console.error(error);

    }

}
/*=========================================================
                LOAD PRESCRIPTIONS
=========================================================*/

async function loadPrescriptions(){

    try{

        const response =
        await fetch(PRESCRIPTION_API);

        const prescriptions =
        await response.json();

        updateCards(prescriptions);

        renderTable(prescriptions);

    }

    catch(error){

        console.error(error);

    }

}


/*=========================================================
                UPDATE CARDS
=========================================================*/

function updateCards(prescriptions){

    document.getElementById("prescriptionCount").innerHTML =
    prescriptions.length;

    document.getElementById("todayPrescriptionCount").innerHTML =
    prescriptions.length;

    document.getElementById("patientServedCount").innerHTML =
    prescriptions.length;

    let medicineCount=0;

    prescriptions.forEach(p=>{

        if(p.medicine){

            medicineCount++;

        }

    });

    document.getElementById("medicineCount").innerHTML =
    medicineCount;

}
/*=========================================================
                TABLE
=========================================================*/

function renderTable(prescriptions){

const table =
document.getElementById("prescriptionTable");

table.innerHTML="";

if(prescriptions.length===0){

table.innerHTML=`

<tr>

<td colspan="6"
style="text-align:center">

No Prescriptions Found

</td>

</tr>

`;

return;

}

prescriptions.forEach(p=>{

table.innerHTML+=`

<tr>

<td>${p.id}</td>

<td>${p.patient?.name || "-"}</td>

<td>${p.diagnosis || "-"}</td>

<td>${p.medicine || "-"}</td>

<td>${p.date || "-"}</td>

<td>

<button class="btn">

<i class="fas fa-eye"></i>

</button>

<button class="btn">

<i class="fas fa-print"></i>

</button>

</td>

</tr>

`;

});

}
/*=========================================================
                SAVE PRESCRIPTION
=========================================================*/

async function savePrescription() {

    try {

        const prescription = {

            doctor: {
                id: doctorId
            },

            patient: {
                id: document.getElementById("patientSelect").value
            },

            medicine:
            document.getElementById("medicine").value,

            notes:
            document.getElementById("notes").value

        };

        const response = await fetch(API_URL + "/prescriptions", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(prescription)

        });

        if (!response.ok) {

            throw new Error("Failed to Save Prescription");

        }

        closePrescriptionModal();

        loadPrescriptions();

    }

    catch (error) {

        console.error(error);

        alert("Unable to Save Prescription");

    }

}


/*=========================================================
                SEARCH
=========================================================*/

document.getElementById("searchPrescription")
.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document
.querySelectorAll("#prescriptionTable tr")
.forEach(row=>{

row.style.display=

row.innerText
.toLowerCase()
.includes(value)

?

""

:

"none";

});

});


/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(loadPrescriptions,30000);

console.log("Doctor Prescriptions Loaded");