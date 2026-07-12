console.log("Admin Doctor JS Loaded");

// ==========================
// API URLs
// ==========================

const DOCTOR_API = "http://localhost:8080/doctors";
const ADMIN_DOCTOR_API = "http://localhost:8080/admin/doctor";

let deleteDoctorId = null;

// ==========================
// Window Load
// ==========================

window.onload = function () {
    loadDoctors();
};

// ==========================
// Load Doctors
// ==========================

function loadDoctors() {

    fetch(DOCTOR_API)

        .then(response => response.json())

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

<td>${doctor.specialization}</td>

<td>${doctor.phone}</td>

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

            console.log(error);

            alert("Unable to Load Doctors");

        });

}

// ==========================
// Search Doctor
// ==========================

function searchDoctor() {

    let input = document
        .getElementById("searchDoctor")
        .value
        .toLowerCase();

    let rows = document.querySelectorAll("#doctorTable tr");

    rows.forEach(row => {

        let text = row.innerText.toLowerCase();

        if (text.includes(input))

            row.style.display = "";

        else

            row.style.display = "none";

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

    document.getElementById("doctorModal").style.display = "flex";

}

// ==========================
// Close Modal
// ==========================

function closeDoctorModal() {

    document.getElementById("doctorModal").style.display = "none";

}
// ==========================
// Save Doctor
// ==========================

function saveDoctor() {

    const id = document.getElementById("doctorId").value;

    const doctor = {

        name: document.getElementById("doctorName").value.trim(),

        email: document.getElementById("doctorEmail").value.trim(),

        password: document.getElementById("doctorPassword").value.trim(),

        specialization: document.getElementById("doctorSpecialization").value,

        phone: document.getElementById("doctorPhone").value.trim()

    };

    if (
        doctor.name === "" ||
        doctor.email === "" ||
        doctor.specialization === "" ||
        doctor.phone === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    // ==========================
    // ADD DOCTOR
    // ==========================

    if (id === "") {

        fetch("http://localhost:8080/admin/doctor", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(doctor)

        })

        .then(res => {

            if (!res.ok) {

                throw new Error();

            }

            return res.json();

        })

        .then(() => {

            alert("Doctor Registered Successfully");

            closeDoctorModal();

            loadDoctors();

        })

        .catch(() => {

            alert("Registration Failed");

        });

    }

    // ==========================
    // UPDATE DOCTOR
    // ==========================

    else {

        fetch("http://localhost:8080/doctors/" + id, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(doctor)

        })

        .then(res => res.json())

        .then(() => {

            alert("Doctor Updated Successfully");

            closeDoctorModal();

            loadDoctors();

        })

        .catch(() => {

            alert("Update Failed");

        });

    }

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

    .then(response => response.text())

    .then(message => {

        alert(message);

        closeDeleteModal();

        loadDoctors();

    })

    .catch(error => {

        console.log(error);

        alert("Delete Failed");

    });

}


// ==========================
// Edit Doctor
// ==========================

function editDoctor(id) {

    fetch(DOCTOR_API + "/" + id)

    .then(response => response.json())

    .then(doctor => {

        document.getElementById("doctorId").value = doctor.id;

        document.getElementById("doctorName").value = doctor.name;

        document.getElementById("doctorEmail").value = doctor.email;

        document.getElementById("doctorPassword").value = "";

        document.getElementById("doctorSpecialization").value =
        doctor.specialization;

        document.getElementById("doctorPhone").value =
        doctor.phone;

        document.getElementById("modalTitle").innerHTML =
        "Edit Doctor";

        document.getElementById("doctorModal").style.display =
        "flex";

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Load Doctor");

    });

}


// ==========================
// Toggle Password
// ==========================

function togglePassword() {

    let password =
    document.getElementById("doctorPassword");

    let icon =
    document.getElementById("togglePassword");

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

window.onclick = function(event) {

    let doctorModal =
    document.getElementById("doctorModal");

    let deleteModal =
    document.getElementById("deleteModal");

    if (event.target === doctorModal) {

        closeDoctorModal();

    }

    if (event.target === deleteModal) {

        closeDeleteModal();

    }

};