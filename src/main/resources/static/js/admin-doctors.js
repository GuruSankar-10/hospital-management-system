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

document.addEventListener("DOMContentLoaded", () => {
    loadDoctors();
});

// ==========================
// Load Doctors
// ==========================

function loadDoctors() {

    fetch(DOCTOR_API)

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load doctors");
        }

        return response.json();

    })

    .then(doctors => {

        let rows = "";

        let cardio = 0;
        let neuro = 0;
        let general = 0;

        doctors.forEach(doctor => {

            if (doctor.specialization === "Cardiology") {
                cardio++;
            } else if (doctor.specialization === "Neurology") {
                neuro++;
            } else {
                general++;
            }

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

        document.getElementById("doctorCount").innerHTML = doctors.length;
        document.getElementById("cardiologyCount").innerHTML = cardio;
        document.getElementById("neurologyCount").innerHTML = neuro;
        document.getElementById("generalCount").innerHTML = general;

    })

    .catch(error => {

        console.error(error);

        alert("Unable to Load Doctors");

    });

}
// ==========================
// Search Doctor
// ==========================

function searchDoctor() {

    const keyword = document
        .getElementById("searchDoctor")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#doctorTable tr");

    rows.forEach(row => {

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
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
    modal.style.zIndex = "99999";

}

// ==========================
// Close Modal
// ==========================

function closeDoctorModal() {

    const modal = document.getElementById("doctorModal");

    modal.style.display = "none";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";

}
// ==========================
// Save Doctor
// ==========================

function saveDoctor() {

    const id = document.getElementById("doctorId").value;

    const doctor = {

        name: document.getElementById("doctorName").value.trim(),

        email: document.getElementById("doctorEmail").value.trim(),

        specialization: document.getElementById("doctorSpecialization").value,

        phone: document.getElementById("doctorPhone").value.trim()

    };

    // Password only while adding a new doctor
    if (id === "") {

        doctor.password =
            document.getElementById("doctorPassword").value.trim();

    }

    const isNewDoctor = id === "";

    if (

        doctor.name === "" ||
        doctor.email === "" ||
        doctor.specialization === "" ||
        doctor.phone === "" ||
        (isNewDoctor && doctor.password === "")

    ) {

        alert("Please fill all required fields.");
        return;

    }

    const url =
        isNewDoctor
            ? ADMIN_DOCTOR_API
            : DOCTOR_API + "/" + id;

    const method =
        isNewDoctor
            ? "POST"
            : "PUT";

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(doctor)

    })

    .then(async response => {

        const text = await response.text();

        if (!response.ok) {

            throw new Error(text || "Operation Failed");

        }

        try {

            return text ? JSON.parse(text) : {};

        } catch (e) {

            return {};

        }

    })

    .then(() => {

        alert(

            isNewDoctor
                ? "Doctor Registered Successfully"
                : "Doctor Updated Successfully"

        );

        closeDoctorModal();

        loadDoctors();

    })

    .catch(error => {

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

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load doctor");

        }

        return response.json();

    })

    .then(doctor => {
		console.log("Doctor Response:", doctor);

        document.getElementById("modalTitle").innerHTML = "Edit Doctor";

        document.getElementById("doctorId").value = doctor.id || "";

        document.getElementById("doctorName").value = doctor.name || "";

        document.getElementById("doctorEmail").value = doctor.email || "";

        // Password should be blank while editing
        document.getElementById("doctorPassword").value = "";

        document.getElementById("doctorPhone").value = doctor.phone || "";

        document.getElementById("doctorSpecialization").value =
            doctor.specialization || "";

        const modal = document.getElementById("doctorModal");

        modal.style.display = "flex";
        modal.style.visibility = "visible";
        modal.style.opacity = "1";
        modal.style.zIndex = "99999";

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

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
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}

// ==========================
// Close Modal on Outside Click
// ==========================

window.addEventListener("mousedown", function (e) {

    const doctorModal = document.getElementById("doctorModal");
    const deleteModal = document.getElementById("deleteModal");

    if (
        doctorModal &&
        doctorModal.style.display === "flex" &&
        e.target === doctorModal
    ) {

        closeDoctorModal();

    }

    if (
        deleteModal &&
        deleteModal.style.display === "flex" &&
        e.target === deleteModal
    ) {

        closeDeleteModal();

    }

});
// ==========================
// Make functions global
// ==========================

window.editDoctor = editDoctor;
window.deleteDoctor = deleteDoctor;
window.openDoctorModal = openDoctorModal;
window.closeDoctorModal = closeDoctorModal;
window.saveDoctor = saveDoctor;
window.confirmDelete = confirmDelete;
window.closeDeleteModal = closeDeleteModal;
window.togglePassword = togglePassword;
window.searchDoctor = searchDoctor;
