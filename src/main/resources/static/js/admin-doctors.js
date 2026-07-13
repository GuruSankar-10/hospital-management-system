console.log("Admin Doctor JS Loaded");

// =====================================
// API URL
// =====================================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const DOCTOR_API = BASE_URL + "/doctors";
const ADMIN_DOCTOR_API = BASE_URL + "/admin/doctor";

let deleteDoctorId = null;

// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadDoctors();

});

// =====================================
// LOAD ALL DOCTORS
// =====================================

async function loadDoctors(){

    try{

        const response = await fetch(DOCTOR_API);

        if(!response.ok){

            throw new Error("Unable to load doctors");

        }

        const doctors = await response.json();

        let rows = "";

        let cardio = 0;
        let neuro = 0;
        let general = 0;

        doctors.forEach(doctor=>{

            switch(doctor.specialization){

                case "Cardiology":
                    cardio++;
                    break;

                case "Neurology":
                    neuro++;
                    break;

                default:
                    general++;

            }

            rows += `

            <tr>

                <td>${doctor.id}</td>

                <td>${doctor.name}</td>

                <td>${doctor.email}</td>

                <td>${doctor.specialization ?? "-"}</td>

                <td>${doctor.phone ?? "-"}</td>

                <td>

                    <button
                    class="btn"
                    onclick="editDoctor(${doctor.id})">

                    <i class="fa-solid fa-pen"></i>

                    </button>

                    <button
                    class="deleteBtn"
                    onclick="deleteDoctor(${doctor.id})">

                    <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById("doctorTable").innerHTML = rows;

        document.getElementById("doctorCount").textContent =
        doctors.length;

        document.getElementById("cardiologyCount").textContent =
        cardio;

        document.getElementById("neurologyCount").textContent =
        neuro;

        document.getElementById("generalCount").textContent =
        general;

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

// =====================================
// SEARCH DOCTOR
// =====================================

function searchDoctor(){

    const keyword =
    document
    .getElementById("searchDoctor")
    .value
    .toLowerCase();

    const rows =
    document.querySelectorAll("#doctorTable tr");

    rows.forEach(row=>{

        row.style.display =
        row.innerText.toLowerCase().includes(keyword)
        ? ""
        : "none";

    });

}
// =====================================
// OPEN DOCTOR MODAL
// =====================================

function openDoctorModal() {

    document.getElementById("modalTitle").textContent = "Add Doctor";

    document.getElementById("doctorId").value = "";
    document.getElementById("doctorName").value = "";
    document.getElementById("doctorEmail").value = "";
    document.getElementById("doctorPassword").value = "";
    document.getElementById("doctorPhone").value = "";
    document.getElementById("doctorSpecialization").value = "";

    document.getElementById("doctorModal").style.display = "flex";

}

// =====================================
// CLOSE MODAL
// =====================================

function closeDoctorModal(){

    document.getElementById("doctorModal").style.display = "none";

}

// =====================================
// SAVE DOCTOR
// =====================================

async function saveDoctor(){

    const id =
    document.getElementById("doctorId").value;

    const doctor = {

        name:
        document.getElementById("doctorName").value.trim(),

        email:
        document.getElementById("doctorEmail").value.trim(),

        phone:
        document.getElementById("doctorPhone").value.trim(),

        specialization:
        document.getElementById("doctorSpecialization").value

    };

    if(id===""){

        doctor.password =
        document.getElementById("doctorPassword").value.trim();

    }

    if(

        doctor.name===""

        ||

        doctor.email===""

        ||

        doctor.phone===""

        ||

        doctor.specialization===""

        ||

        (id==="" && doctor.password==="")

    ){

        alert("Please fill all required fields.");

        return;

    }

    try{

        const url =
        id===""

        ?

        ADMIN_DOCTOR_API

        :

        DOCTOR_API + "/" + id;

        const method =
        id===""

        ?

        "POST"

        :

        "PUT";

        const response =
        await fetch(url,{

            method:method,

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(doctor)

        });

        if(!response.ok){

            const message =
            await response.text();

            throw new Error(message);

        }

        alert(

            id===""

            ?

            "Doctor Added Successfully"

            :

            "Doctor Updated Successfully"

        );

        closeDoctorModal();

        loadDoctors();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}
// =====================================
// EDIT DOCTOR
// =====================================

async function editDoctor(id){

    try{

        const response = await fetch(DOCTOR_API + "/" + id);

        if(!response.ok){

            throw new Error("Unable to load doctor");

        }

        const doctor = await response.json();

        document.getElementById("modalTitle").textContent = "Edit Doctor";

        document.getElementById("doctorId").value = doctor.id;

        document.getElementById("doctorName").value =
        doctor.name ?? "";

        document.getElementById("doctorEmail").value =
        doctor.email ?? "";

        document.getElementById("doctorPassword").value = "";

        document.getElementById("doctorPhone").value =
        doctor.phone ?? "";

        document.getElementById("doctorSpecialization").value =
        doctor.specialization ?? "";

        document.getElementById("doctorModal").style.display = "flex";

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

// =====================================
// DELETE DOCTOR
// =====================================

function deleteDoctor(id){

    deleteDoctorId = id;

    document.getElementById("deleteModal").style.display = "flex";

}

// =====================================
// CLOSE DELETE MODAL
// =====================================

function closeDeleteModal(){

    document.getElementById("deleteModal").style.display = "none";

}

// =====================================
// CONFIRM DELETE
// =====================================

async function confirmDelete(){

    try{

        const response = await fetch(

            DOCTOR_API + "/" + deleteDoctorId,

            {

                method:"DELETE"

            }

        );

        if(!response.ok){

            throw new Error("Delete Failed");

        }

        alert("Doctor Deleted Successfully");

        closeDeleteModal();

        loadDoctors();

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

// =====================================
// TOGGLE PASSWORD
// =====================================

function togglePassword(){

    const password =
    document.getElementById("doctorPassword");

    const icon =
    document.getElementById("togglePassword");

    if(password.type==="password"){

        password.type="text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else{

        password.type="password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}

// =====================================
// GLOBAL FUNCTIONS
// =====================================

window.searchDoctor = searchDoctor;

window.openDoctorModal = openDoctorModal;

window.closeDoctorModal = closeDoctorModal;

window.saveDoctor = saveDoctor;

window.editDoctor = editDoctor;

window.deleteDoctor = deleteDoctor;

window.closeDeleteModal = closeDeleteModal;

window.confirmDelete = confirmDelete;

window.togglePassword = togglePassword;