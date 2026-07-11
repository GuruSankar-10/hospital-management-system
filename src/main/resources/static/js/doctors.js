// =====================================
// Doctor Management
// =====================================

let allDoctors = [];

// ===============================
// Add Doctor
// ===============================
function addDoctor() {

    const name = document.getElementById("name").value.trim();
    const specialization = document.getElementById("specialization").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (name === "" || specialization === "" || phone === "") {

        alert("Please fill all fields.");
        return;

    }

    const doctor = {

        name: name,
        specialization: specialization,
        phone: phone

    };

    fetch("/doctors", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(doctor)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to add doctor.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Doctor Added Successfully");

        clearDoctorForm();

        loadDoctors();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to add doctor.");

    });

}

// ===============================
// Load Doctors
// ===============================
function loadDoctors() {

    fetch("/doctors")

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load doctors.");

        }

        return response.json();

    })

    .then(data => {

        allDoctors = data;

        renderDoctors(allDoctors);

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to load doctors.");

    });

}
// ===============================
// Render Doctors Table
// ===============================
function renderDoctors(doctors) {

    const table = document.getElementById("doctorTable");

    table.innerHTML = "";

    if (doctors.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No Doctors Found
                </td>
            </tr>
        `;

        return;

    }

    doctors.forEach(doctor => {

        table.innerHTML += `

        <tr>

            <td>${doctor.id}</td>

            <td>${doctor.name}</td>

            <td>${doctor.specialization}</td>

            <td>${doctor.phone}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editDoctor(
                        ${doctor.id},
                        '${doctor.name}',
                        '${doctor.specialization}',
                        '${doctor.phone}'
                    )">

                    ✏️ Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteDoctor(${doctor.id})">

                    🗑 Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Doctor
// ===============================
function deleteDoctor(id) {

    if (!confirm("Are you sure you want to delete this doctor?")) {

        return;

    }

    fetch("/doctors/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete failed.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        loadDoctors();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to delete doctor.");

    });

}

// ===============================
// Edit Doctor
// ===============================
function editDoctor(id, name, specialization, phone) {

    const newName = prompt("Doctor Name", name);

    if (newName === null) return;

    const newSpecialization = prompt("Specialization", specialization);

    if (newSpecialization === null) return;

    const newPhone = prompt("Phone Number", phone);

    if (newPhone === null) return;

    const doctor = {

        name: newName.trim(),

        specialization: newSpecialization.trim(),

        phone: newPhone.trim()

    };

    fetch("/doctors/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(doctor)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Update failed.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Doctor Updated Successfully");

        loadDoctors();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to update doctor.");

    });

}
// ===============================
// Search Doctors
// ===============================
function searchDoctors() {

    const keyword = document
        .getElementById("searchBox")
        .value
        .toLowerCase()
        .trim();

    const filteredDoctors = allDoctors.filter(doctor => {

        return (

            doctor.name.toLowerCase().includes(keyword) ||

            doctor.specialization.toLowerCase().includes(keyword) ||

            doctor.phone.toLowerCase().includes(keyword) ||

            doctor.id.toString().includes(keyword)

        );

    });

    renderDoctors(filteredDoctors);

}

// ===============================
// Clear Doctor Form
// ===============================
function clearDoctorForm() {

    document.getElementById("name").value = "";
    document.getElementById("specialization").value = "";
    document.getElementById("phone").value = "";

}

// ===============================
// Refresh Doctors
// ===============================
function refreshDoctors() {

    loadDoctors();

}

// ===============================
// Doctor Count
// ===============================
function getDoctorCount() {

    return allDoctors.length;

}

// ===============================
// Auto Refresh Every 30 Seconds
// ===============================
setInterval(function () {

    refreshDoctors();

}, 30000);

// ===============================
// Page Loaded
// ===============================
window.addEventListener("DOMContentLoaded", function () {

    console.log("Doctors Page Loaded Successfully");

    loadDoctors();

});

// ===============================
// Refresh When Window Gets Focus
// ===============================
window.addEventListener("focus", function () {

    refreshDoctors();

});