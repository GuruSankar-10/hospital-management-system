	// =====================================
	// Patient Management
	// =====================================
	
	let allPatients = [];
	
	// ===============================
	// Add Patient
	// ===============================
	function addPatient() {
	
	    const name = document.getElementById("pname").value.trim();
	    const age = document.getElementById("age").value.trim();
	    const disease = document.getElementById("disease").value.trim();
	    const phone = document.getElementById("pphone").value.trim();
	
	    if (name === "" || age === "" || disease === "" || phone === "") {
	
	        alert("Please fill all fields.");
	
	        return;
	
	    }
	
	    const patient = {
	
	        name: name,
	
	        age: Number(age),
	
	        disease: disease,
	
	        phone: phone
	
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
	
	            throw new Error("Unable to add patient.");
	
	        }
	
	        return response.json();
	
	    })
	
	    .then(data => {
	
	        alert("✅ Patient Added Successfully");
	
	        clearPatientForm();
	
	        loadPatients();
	
	    })
	
	    .catch(error => {
	
	        console.error(error);
	
	        alert("❌ Failed to add patient.");
	
	    });
	
	}
	
	// ===============================
	// Load Patients
	// ===============================
	function loadPatients() {
	
	    fetch("/patients")
	
	    .then(response => {
	
	        if (!response.ok) {
	
	            throw new Error("Unable to load patients.");
	
	        }
	
	        return response.json();
	
	    })
	
	    .then(data => {
	
	        allPatients = data;
	
	        renderPatients(allPatients);
	
	    })
	
	    .catch(error => {
	
	        console.error(error);
	
	        alert("❌ Failed to load patients.");
	
	    });
	
	}
	// ===============================
	// Render Patients Table
	// ===============================
	function renderPatients(patients) {
	
	    const table = document.getElementById("patientTable");
	
	    table.innerHTML = "";
	
	    if (patients.length === 0) {
	
	        table.innerHTML = `
	            <tr>
	                <td colspan="6">
	                    No Patients Found
	                </td>
	            </tr>
	        `;
	
	        return;
	
	    }
	
	    patients.forEach(patient => {
	
	        table.innerHTML += `
	
	        <tr>
	
	            <td>${patient.id}</td>
	
	            <td>${patient.name}</td>
	
	            <td>${patient.age}</td>
	
	            <td>${patient.disease}</td>
	
	            <td>${patient.phone}</td>
	
	            <td>
	
	                <button
	                    class="edit-btn"
	                    onclick="editPatient(
	                        ${patient.id},
	                        '${patient.name}',
	                        ${patient.age},
	                        '${patient.disease}',
	                        '${patient.phone}'
	                    )">
	
	                    ✏️ Edit
	
	                </button>
	
	                <button
	                    class="delete-btn"
	                    onclick="deletePatient(${patient.id})">
	
	                    🗑 Delete
	
	                </button>
	
	            </td>
	
	        </tr>
	
	        `;
	
	    });
	
	}
	
	// ===============================
	// Delete Patient
	// ===============================
	function deletePatient(id) {
	
	    if (!confirm("Are you sure you want to delete this patient?")) {
	
	        return;
	
	    }
	
	    fetch("/patients/" + id, {
	
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
	
	        loadPatients();
	
	    })
	
	    .catch(error => {
	
	        console.error(error);
	
	        alert("❌ Failed to delete patient.");
	
	    });
	
	}
	
	// ===============================
	// Edit Patient
	// ===============================
	function editPatient(id, name, age, disease, phone) {
	
	    const newName = prompt("Patient Name", name);
	
	    if (newName === null) return;
	
	    const newAge = prompt("Patient Age", age);
	
	    if (newAge === null) return;
	
	    const newDisease = prompt("Disease", disease);
	
	    if (newDisease === null) return;
	
	    const newPhone = prompt("Phone Number", phone);
	
	    if (newPhone === null) return;
	
	    const patient = {
	
	        name: newName.trim(),
	
	        age: Number(newAge),
	
	        disease: newDisease.trim(),
	
	        phone: newPhone.trim()
	
	    };
	
	    fetch("/patients/" + id, {
	
	        method: "PUT",
	
	        headers: {
	
	            "Content-Type": "application/json"
	
	        },
	
	        body: JSON.stringify(patient)
	
	    })
	
	    .then(response => {
	
	        if (!response.ok) {
	
	            throw new Error("Update failed.");
	
	        }
	
	        return response.json();
	
	    })
	
	    .then(data => {
	
	        alert("✅ Patient Updated Successfully");
	
	        loadPatients();
	
	    })
	
	    .catch(error => {
	
	        console.error(error);
	
	        alert("❌ Failed to update patient.");
	
	    });
	
	}
	// ===============================
	// Search Patients
	// ===============================
	function searchPatients() {
	
	    const keyword = document
	        .getElementById("searchBox")
	        .value
	        .toLowerCase()
	        .trim();
	
	    const filteredPatients = allPatients.filter(patient => {
	
	        return (
	
	            patient.id.toString().includes(keyword) ||
	
	            patient.name.toLowerCase().includes(keyword) ||
	
	            patient.disease.toLowerCase().includes(keyword) ||
	
	            patient.phone.toLowerCase().includes(keyword) ||
	
	            patient.age.toString().includes(keyword)
	
	        );
	
	    });
	
	    renderPatients(filteredPatients);
	
	}
	
	// ===============================
	// Clear Patient Form
	// ===============================
	function clearPatientForm() {
	
	    document.getElementById("pname").value = "";
	    document.getElementById("age").value = "";
	    document.getElementById("disease").value = "";
	    document.getElementById("pphone").value = "";
	
	}
	
	// ===============================
	// Refresh Patients
	// ===============================
	function refreshPatients() {
	
	    loadPatients();
	
	}
	
	// ===============================
	// Get Patient Count
	// ===============================
	function getPatientCount() {
	
	    return allPatients.length;
	
	}
	
	// ===============================
	// Auto Refresh Every 30 Seconds
	// ===============================
	setInterval(function () {
	
	    refreshPatients();
	
	}, 30000);
	
	// ===============================
	// Page Loaded
	// ===============================
	window.addEventListener("DOMContentLoaded", function () {
	
	    console.log("Patients Page Loaded Successfully");
	
	    loadPatients();
	
	});
	
	// ===============================
	// Refresh When Window Gets Focus
	// ===============================
	window.addEventListener("focus", function () {
	
	    refreshPatients();
	
	});