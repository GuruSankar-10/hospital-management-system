let allPatients = [];

// Add Patient
function addPatient() {

    let patient = {
        name: document.getElementById("pname").value,
        age: parseInt(document.getElementById("age").value),
        disease: document.getElementById("disease").value,
        phone: document.getElementById("pphone").value
    };

    fetch("/patients", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add patient");
        }
        return response.json();
    })
    .then(data => {

        alert("Patient Added Successfully ✅");

        document.getElementById("pname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("disease").value = "";
        document.getElementById("pphone").value = "";

        loadPatients();

    })
    .catch(error => {
        console.error(error);
        alert("Unable to add patient");
    });

}

// Load Patients
function loadPatients() {

    fetch("/patients")
    .then(response => response.json())
    .then(data => {
        allPatients = data;
        renderPatients(data);
    })
    .catch(error => console.error(error));

}

// Render Patients
function renderPatients(patients) {

    let table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(p => {

        table.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            <td>${p.phone}</td>
            <td>
                <button class="edit-btn"
                    onclick="editPatient(${p.id},'${p.name}',${p.age},'${p.disease}','${p.phone}')">
                    ✏ Edit
                </button>

                <button class="delete-btn"
                    onclick="deletePatient(${p.id})">
                    🗑 Delete
                </button>
            </td>
        </tr>
        `;

    });

}

// Delete Patient
function deletePatient(id) {

    if (!confirm("Delete this patient?")) return;

    fetch(`/patients/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(msg => {
        alert(msg);
        loadPatients();
    })
    .catch(error => console.error(error));

}

// Edit Patient
function editPatient(id, name, age, disease, phone) {

    let newName = prompt("Patient Name", name);
    if (newName == null) return;

    let newAge = prompt("Age", age);
    if (newAge == null) return;

    let newDisease = prompt("Disease", disease);
    if (newDisease == null) return;

    let newPhone = prompt("Phone", phone);
    if (newPhone == null) return;

    let patient = {
        name: newName,
        age: parseInt(newAge),
        disease: newDisease,
        phone: newPhone
    };

    fetch(`/patients/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(patient)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Update Failed");
        }
        return response.json();
    })
    .then(data => {
        alert("Patient Updated Successfully ✅");
        loadPatients();
    })
    .catch(error => {
        console.error(error);
        alert("Unable to update patient");
    });

}

// Search Patients
function searchPatients() {

    let keyword = document.getElementById("searchBox").value.toLowerCase();

    let filtered = allPatients.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.disease.toLowerCase().includes(keyword)
    );

    renderPatients(filtered);

}

// Load on Page Open
window.onload = loadPatients;