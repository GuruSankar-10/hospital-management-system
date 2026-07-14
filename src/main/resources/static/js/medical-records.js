/*=========================================================
            HMS PRO DOCTOR MEDICAL RECORDS
=========================================================*/

const RECORD_API = `${API_URL}/records`;

const doctorId = localStorage.getItem("doctorId");
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

/*=========================================================
                SECURITY
=========================================================*/

if (!token || role !== "DOCTOR") {

    alert("Please login as Doctor.");

    window.location.href = "login.html";

}

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadMedicalRecords();

});

/*=========================================================
                LOAD RECORDS
=========================================================*/

async function loadMedicalRecords() {

    try {

        const response = await fetch(RECORD_API, {

            headers: {
                Authorization: "Bearer " + token
            }

        });

        if (!response.ok) {

            throw new Error("Unable to load medical records");

        }

        const records = await response.json();

        renderTable(records);

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

/*=========================================================
                TABLE
=========================================================*/

function renderTable(records) {

    const tbody =
        document.getElementById("recordsTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (records.length === 0) {

        tbody.innerHTML = `

<tr>

<td colspan="7" style="text-align:center">

No Medical Records Found

</td>

</tr>

`;

        return;

    }

    records.forEach(record => {

        tbody.innerHTML += `

<tr>

<td>${record.id}</td>

<td>${record.patient?.name ?? "-"}</td>

<td>${record.diagnosis ?? "-"}</td>

<td>${record.symptoms ?? "-"}</td>

<td>${record.treatment ?? "-"}</td>

<td>${record.visitDate ?? "-"}</td>

<td>

<button
class="editBtn"
onclick="editMedicalRecord(${record.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="deleteBtn"
onclick="deleteMedicalRecord(${record.id})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}

/*=========================================================
                SAVE RECORD
=========================================================*/

async function saveMedicalRecord() {

    const patientId =
        document.getElementById("patientId").value;

    const diagnosis =
        document.getElementById("diagnosis").value.trim();

    const symptoms =
        document.getElementById("symptoms").value.trim();

    const treatment =
        document.getElementById("treatment").value.trim();

    const notes =
        document.getElementById("notes").value.trim();

    if (patientId === "" || diagnosis === "") {

        alert("Patient ID and Diagnosis are required.");

        return;

    }

    const body = {

        patient: {

            id: Number(patientId)

        },

        doctor: {

            id: Number(doctorId)

        },

        diagnosis,

        symptoms,

        treatment,

        notes,

        visitDate:
            new Date().toISOString().split("T")[0]

    };

    try {

        const response = await fetch(RECORD_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify(body)

        });

        if (!response.ok) {

            throw new Error("Unable to save medical record");

        }

        alert("Medical Record Saved Successfully");

        clearForm();

        loadMedicalRecords();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
/*=========================================================
                EDIT RECORD
=========================================================*/

let editingId = null;

function editMedicalRecord(id) {

    const row = [...document.querySelectorAll("#recordsTable tr")]
        .find(r => Number(r.cells[0]?.textContent) === id);

    if (!row) return;

    editingId = id;

    document.getElementById("patientId").value =
        row.cells[1].textContent;

    document.getElementById("diagnosis").value =
        row.cells[2].textContent;

    document.getElementById("symptoms").value =
        row.cells[3].textContent;

    document.getElementById("treatment").value =
        row.cells[4].textContent;

}

/*=========================================================
                UPDATE RECORD
=========================================================*/

async function updateMedicalRecord() {

    if (editingId == null) {

        alert("No record selected.");

        return;

    }

    const body = {

        patient: {

            id: Number(
                document.getElementById("patientId").value
            )

        },

        doctor: {

            id: Number(doctorId)

        },

        diagnosis:
            document.getElementById("diagnosis").value.trim(),

        symptoms:
            document.getElementById("symptoms").value.trim(),

        treatment:
            document.getElementById("treatment").value.trim(),

        notes:
            document.getElementById("notes").value.trim(),

        visitDate:
            new Date().toISOString().split("T")[0]

    };

    try {

        const response = await fetch(

            RECORD_API + "/" + editingId,

            {

                method: "PUT",

                headers: {

                    "Content-Type":"application/json",

                    Authorization:"Bearer " + token

                },

                body:JSON.stringify(body)

            }

        );

        if(!response.ok){

            throw new Error("Unable to update record");

        }

        alert("Medical Record Updated");

        editingId = null;

        clearForm();

        loadMedicalRecords();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/*=========================================================
                DELETE
=========================================================*/

async function deleteMedicalRecord(id){

    if(!confirm("Delete this medical record?")){

        return;

    }

    try{

        const response=await fetch(

            RECORD_API+"/"+id,

            {

                method:"DELETE",

                headers:{

                    Authorization:"Bearer "+token

                }

            }

        );

        if(!response.ok){

            throw new Error("Unable to delete record");

        }

        alert("Medical Record Deleted");

        loadMedicalRecords();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/*=========================================================
                CLEAR FORM
=========================================================*/

function clearForm(){

    editingId=null;

    document.getElementById("patientId").value="";

    document.getElementById("diagnosis").value="";

    document.getElementById("symptoms").value="";

    document.getElementById("treatment").value="";

    document.getElementById("notes").value="";

}

/*=========================================================
                REFRESH
=========================================================*/

setInterval(()=>{

    loadMedicalRecords();

},300000);

window.addEventListener("focus",()=>{

    loadMedicalRecords();

});

console.log("✅ Doctor Medical Records Ready");