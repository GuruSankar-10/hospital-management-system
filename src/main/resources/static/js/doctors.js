let allDoctors = [];

// Add Doctor
function addDoctor() {

    let doctor = {
        name: document.getElementById("name").value,
        specialization: document.getElementById("specialization").value,
        phone: document.getElementById("phone").value
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
            throw new Error("Failed to add doctor");
        }
        return response.json();
    })
    .then(data => {

        alert("Doctor Added Successfully ✅");

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("specialization").value = "";
        document.getElementById("phone").value = "";

        loadDoctors();

    })
    .catch(error => {
        console.error(error);
        alert("Unable to add doctor");
    });
}

// Load Doctors
function loadDoctors() {

    fetch("/doctors")
    .then(response => response.json())
    .then(data => {
        allDoctors = data;
        renderDoctors(data);
    })
    .catch(error => console.error(error));
}

// Render Doctors Table
function renderDoctors(doctors) {

    let table = document.getElementById("doctorTable");
    table.innerHTML = "";

    doctors.forEach(d => {

        table.innerHTML += `
        <tr>
            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.phone}</td>
            <td>
                <button class="edit-btn"
                    onclick="editDoctor(${d.id},'${d.name}','${d.specialization}','${d.phone}')">
                    ✏ Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteDoctor(${d.id})">
                    🗑 Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// Delete Doctor
function deleteDoctor(id) {

    if (!confirm("Delete this doctor?")) return;

    fetch(`/doctors/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(msg => {
        alert(msg);
        loadDoctors();
    })
    .catch(error => console.error(error));

}

// Edit Doctor
function editDoctor(id, name, specialization, phone) {

    let newName = prompt("Doctor Name", name);
    if (newName == null) return;

    let newSpec = prompt("Specialization", specialization);
    if (newSpec == null) return;

    let newPhone = prompt("Phone Number", phone);
    if (newPhone == null) return;

    let doctor = {
        name: newName,
        specialization: newSpec,
        phone: newPhone
    };

    fetch(`/doctors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Update Failed");
        }
        return response.json();
    })
    .then(data => {
        alert("Doctor Updated Successfully ✅");
        loadDoctors();
    })
    .catch(error => {
        console.error(error);
        alert("Unable to update doctor");
    });

}

// Search Doctor
function searchDoctors() {

    let keyword = document.getElementById("searchBox").value.toLowerCase();

    let filtered = allDoctors.filter(d =>
        d.name.toLowerCase().includes(keyword) ||
        d.specialization.toLowerCase().includes(keyword)
    );

    renderDoctors(filtered);

}

// Load Data on Page Load
window.onload = loadDoctors;