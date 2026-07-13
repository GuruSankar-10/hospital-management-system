console.log("Admin Doctor JS Loaded");

// ==========================
// API URLs
// ==========================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const DOCTOR_API = `${BASE_URL}/doctors`;
const ADMIN_DOCTOR_API = `${BASE_URL}/admin/doctor`;

let deleteDoctorId = null;

// ==========================
// Page Load
// ==========================

window.onload = function () {

    loadDoctors();

};

// ==========================
// Load Doctors
// ==========================

function loadDoctors() {

    fetch(DOCTOR_API)

    .then(response => {

        if (!response.ok)

            throw new Error("Unable to load doctors");

        return response.json();

    })

    .then(doctors => {

        let rows = "";

        let cardio = 0;
        let neuro = 0;
        let general = 0;

        doctors.forEach(doctor => {

            if (doctor.specialization === "Cardiology")

                cardio++;

            else if (doctor.specialization === "Neurology")

                neuro++;

            else

                general++;

            rows += `
<tr>

<td>${doctor.id}</td>

<td>${doctor.name}</td>

<td>${doctor.email}</td>

<td>${doctor.specialization || "-"}</td>

<td>${doctor.phone || "-"}</td>

<td>

<button class="btn"
onclick="editDoctor(${doctor.id})">

<i class="fas fa-pen"></i>

</button>

<button class="deleteBtn"
onclick="deleteDoctor(${doctor.id})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>
`;

        });

        document.getElementById("doctorTable").innerHTML = rows;

        document.getElementById("doctorCount").innerHTML =
        doctors.length;

        document.getElementById("cardiologyCount").innerHTML =
        cardio;

        document.getElementById("neurologyCount").innerHTML =
        neuro;

        document.getElementById("generalCount").innerHTML =
        general;

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Load Doctors");

    });

}

// ==========================
// Search Doctor
// ==========================

function searchDoctor(){

    let keyword =
    document.getElementById("searchDoctor")
    .value
    .toLowerCase();

    let rows =
    document.querySelectorAll("#doctorTable tr");

    rows.forEach(row=>{

        row.style.display =
        row.innerText.toLowerCase().includes(keyword)
        ? ""
        : "none";

    });

}

// ==========================
// Open Modal
// ==========================

function openDoctorModal() {

    document.getElementById("modalTitle").innerHTML = "Add Doctor";

    document.getElementById("doctorId").value = "";
    document.getElementById("doctorName").value = "";
    document.getElementById("doctorEmail").value = "";
    document.getElementById("doctorPassword").value = "";
    document.getElementById("doctorPhone").value = "";
    document.getElementById("doctorSpecialization").value = "";

    const modal = document.getElementById("doctorModal");
    modal.style.display = "flex";
}
// ==========================
// Close Modal
// ==========================

function closeDoctorModal() {

    const modal = document.getElementById("doctorModal");
    modal.style.display = "none";

}

// ==========================
// Save Doctor
// ==========================

function saveDoctor(){

    const id =
    document.getElementById("doctorId").value;

    const doctor={

        name:
        document.getElementById("doctorName").value.trim(),

        email:
        document.getElementById("doctorEmail").value.trim(),

        password:
        document.getElementById("doctorPassword").value.trim(),

        specialization:
        document.getElementById("doctorSpecialization").value,

        phone:
        document.getElementById("doctorPhone").value.trim()

    };

    if(

        doctor.name==="" ||

        doctor.email==="" ||

        doctor.password==="" ||

        doctor.specialization==="" ||

        doctor.phone===""

    ){

        alert("Please fill all fields.");

        return;

    }

    const url =
    id===""
    ? ADMIN_DOCTOR_API
    : DOCTOR_API+"/"+id;

    const method =
    id===""
    ? "POST"
    : "PUT";

    fetch(url,{

        method:method,

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(doctor)

    })

    .then(async response=>{

        const text =
        await response.text();

        if(!response.ok){

            throw new Error(text || "Operation Failed");

        }

        return text ? JSON.parse(text) : {};

    })

    .then(()=>{

        alert(

            id===""

            ? "Doctor Registered Successfully"

            : "Doctor Updated Successfully"

        );

        closeDoctorModal();

        loadDoctors();

    })

    .catch(error=>{

        console.error(error);

        alert(error.message);

    });

}
// ==========================
// Delete Doctor
// ==========================

function deleteDoctor(id) {

    deleteDoctorId = id;

    document.getElementById("deleteModal").style.display = "flex";

}

// ==========================
// Close Delete Modal
// ==========================

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display = "none";

}

// ==========================
// Confirm Delete
// ==========================

function confirmDelete() {

    fetch(DOCTOR_API + "/" + deleteDoctorId, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        closeDeleteModal();

        loadDoctors();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// ==========================
// Edit Doctor
// ==========================

function editDoctor(id) {

    fetch(DOCTOR_API + "/" + id)
        .then(res => {
            if (!res.ok) {
                throw new Error("Unable to load doctor");
            }
            return res.json();
        })
        .then(doctor => {

            document.getElementById("modalTitle").innerHTML = "Edit Doctor";

            document.getElementById("doctorId").value = doctor.id || "";
            document.getElementById("doctorName").value = doctor.name || "";
            document.getElementById("doctorEmail").value = doctor.email || "";
            document.getElementById("doctorPassword").value = "";
            document.getElementById("doctorPhone").value = doctor.phone || "";
            document.getElementById("doctorSpecialization").value = doctor.specialization || "";

            const modal = document.getElementById("doctorModal");

            modal.style.display = "flex";

            modal.classList.add("show");

        })
        .catch(err => {

            console.error(err);
            alert(err.message);

        });

}
// ==========================
// Toggle Password
// ==========================

function togglePassword() {

    const password = document.getElementById("doctorPassword");
    const icon = document.getElementById("togglePassword");

    if (!password || !icon) return;

    if (password.type === "password") {

        password.type = "text";
        icon.className = "fas fa-eye-slash";

    } else {

        password.type = "password";
        icon.className = "fas fa-eye";

    }

}

// ==========================
// Close Modal on Outside Click
// ==========================

// ==========================
// Close Modal on Outside Click
// ==========================

window.addEventListener("mousedown", function (e) {

    const doctorModal = document.getElementById("doctorModal");
    const deleteModal = document.getElementById("deleteModal");

    if (doctorModal && e.target === doctorModal) {
        closeDoctorModal();
    }

    if (deleteModal && e.target === deleteModal) {
        closeDeleteModal();
    }

});
