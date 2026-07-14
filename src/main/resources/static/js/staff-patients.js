/*=========================================================
            HMS PRO STAFF PATIENTS
=========================================================*/

const STAFF_PATIENT_API = `${API_URL}/patients`;

let patients = [];
let filteredPatients = [];

/*=========================================================
            PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializePatients();

});

/*=========================================================
            INITIALIZE
=========================================================*/

async function initializePatients() {

    showLoading();

    loadStaffName();

    await loadPatients();

    hideLoading();

}

/*=========================================================
            LOAD STAFF NAME
=========================================================*/

function loadStaffName() {

    const name = localStorage.getItem("name") || "Staff";

    const element = document.getElementById("staffName");

    if (element) {

        element.textContent = name;

    }

}

/*=========================================================
            LOAD PATIENTS
=========================================================*/

async function loadPatients() {

    try {

        const response = await fetch(STAFF_PATIENT_API);

        if (!response.ok) {

            throw new Error("Unable to fetch patients");

        }

        patients = await response.json();

        filteredPatients = [...patients];

        updateStatistics();

        renderPatients();

    }

    catch (error) {

        console.error(error);

        showToast("Failed to load patients", "error");

    }

}

/*=========================================================
            UPDATE STATISTICS
=========================================================*/

function updateStatistics() {

    const total = document.getElementById("patientCount");

    if (total) {

        total.textContent = patients.length;

    }

    const active = document.getElementById("activePatients");

    if (active) {

        active.textContent = patients.length;

    }

    const doctors = new Set();

    patients.forEach(patient => {

        if (patient.doctor && patient.doctor.name) {

            doctors.add(patient.doctor.name);

        }

    });

    const assigned = document.getElementById("doctorAssigned");

    if (assigned) {

        assigned.textContent = doctors.size;

    }

    const today = document.getElementById("todayPatients");

    if (today) {

        today.textContent = patients.length;

    }

    const visits = document.getElementById("todayVisits");

    if (visits) {

        visits.textContent = patients.length;

    }

}

console.log("👥 HMS Staff Patients Loaded");
/*=========================================================
            RENDER PATIENT TABLE
=========================================================*/

function renderPatients() {

    const table = document.getElementById("patientTable");

    if (!table) return;

    table.innerHTML = "";

    if (filteredPatients.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="8" class="text-center">

                No Patients Found

            </td>

        </tr>

        `;

        return;

    }

    filteredPatients.forEach(patient => {

        table.innerHTML += `

        <tr>

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.age}</td>

            <td>${patient.disease}</td>

            <td>${patient.phone}</td>

            <td>${patient.doctor?.name ?? "Not Assigned"}</td>

            <td>

                <span class="badge badge-success">

                    Active

                </span>

            </td>

            <td>

                <button
                    class="table-btn view"
                    onclick="viewPatient(${patient.id})">

                    <i class="fas fa-eye"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/*=========================================================
            SEARCH PATIENT
=========================================================*/

function searchPatients() {

    const keyword = document
        .getElementById("searchPatient")
        .value
        .toLowerCase();

    filteredPatients = patients.filter(patient =>

        patient.name.toLowerCase().includes(keyword) ||

        patient.phone.toLowerCase().includes(keyword) ||

        patient.disease.toLowerCase().includes(keyword)

    );

    applyDiseaseFilter();

}

/*=========================================================
            FILTER BY DISEASE
=========================================================*/

function applyDiseaseFilter() {

    const disease = document
        .getElementById("filterDisease")
        ?.value;

    if (disease && disease !== "") {

        filteredPatients = filteredPatients.filter(patient =>

            patient.disease === disease

        );

    }

    renderPatients();

}

/*=========================================================
            VIEW PATIENT
=========================================================*/

function viewPatient(id) {

    const patient = patients.find(p => p.id === id);

    if (!patient) return;

    document.getElementById("patientDetails").innerHTML = `

        <div class="profile-details">

            <h2>

                ${patient.name}

            </h2>

            <hr>

            <p>

                <strong>ID :</strong>

                ${patient.id}

            </p>

            <p>

                <strong>Age :</strong>

                ${patient.age}

            </p>

            <p>

                <strong>Disease :</strong>

                ${patient.disease}

            </p>

            <p>

                <strong>Phone :</strong>

                ${patient.phone}

            </p>

            <p>

                <strong>Doctor :</strong>

                ${patient.doctor?.name ?? "Not Assigned"}

            </p>

        </div>

    `;

    document
        .getElementById("patientModal")
        .style.display = "flex";

}

/*=========================================================
            CLOSE MODAL
=========================================================*/

function closePatientModal() {

    document
        .getElementById("patientModal")
        .style.display = "none";

}
/*=========================================================
                LOADING
=========================================================*/

function showLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="none";

    }

}

/*=========================================================
                TOAST
=========================================================*/

function showToast(message,type="success"){

    const container=document.getElementById("toastContainer");

    if(!container) return;

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <i class="fas ${
            type==="success"
            ? "fa-check-circle"
            : "fa-times-circle"
        }"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*=========================================================
                REFRESH
=========================================================*/

async function refreshPatients(){

    showLoading();

    await loadPatients();

    hideLoading();

    showToast("Patient list refreshed");

}

/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(()=>{

    loadPatients();

},300000);

/*=========================================================
                CLOSE MODAL ON OUTSIDE CLICK
=========================================================*/

window.onclick=function(event){

    const modal=document.getElementById("patientModal");

    if(event.target===modal){

        closePatientModal();

    }

};

/*=========================================================
                ESC KEY CLOSE
=========================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closePatientModal();

    }

});

/*=========================================================
                DISEASE FILTER
=========================================================*/

const diseaseFilter=document.getElementById("filterDisease");

if(diseaseFilter){

    diseaseFilter.addEventListener("change",()=>{

        filteredPatients=[...patients];

        applyDiseaseFilter();

    });

}

/*=========================================================
                WINDOW FOCUS
=========================================================*/

window.addEventListener("focus",()=>{

    loadPatients();

});

/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        loadPatients();

    }

});

/*=========================================================
                READY
=========================================================*/

console.log("👥 HMS PRO Staff Patients Ready");