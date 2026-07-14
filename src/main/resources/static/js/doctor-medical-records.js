/*=========================================================
        HMS PRO - DOCTOR MEDICAL RECORDS
=========================================================*/

const RECORD_API =
`${API_URL}/records/doctor/${doctorId}`;

const token = localStorage.getItem("token");
const doctorId = localStorage.getItem("doctorId");
const userRole = localStorage.getItem("role");

let medicalRecords = [];
let filteredRecords = [];
let editingRecord = null;

/*=========================================================
                SECURITY
=========================================================*/

if (!token) {

    alert("Please login first.");

    window.location.href = "login.html";

}

if (userRole !== "DOCTOR") {

    alert("Access Denied");

    window.location.href = "login.html";

}

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadDoctorInfo();

    loadMedicalRecords();

});

/*=========================================================
                LOAD DOCTOR
=========================================================*/

function loadDoctorInfo() {

    const doctorName =
        localStorage.getItem("name") || "Doctor";

    const name =
        document.getElementById("doctorName");

    if (name) {

        name.textContent = doctorName;

    }

    const image =
        document.getElementById("doctorImage");

    if (image) {

        image.src =
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(doctorName) +
            "&background=2563eb&color=ffffff";

    }

}

/*=========================================================
                LOAD RECORDS
=========================================================*/

async function loadMedicalRecords() {

    try {

        showLoading();

        const response = await fetch(RECORD_API, {

            headers: {

                Authorization: "Bearer " + token

            }

        });

        if (!response.ok) {

            throw new Error("Unable to load medical records");

        }

        medicalRecords = await response.json();

        filteredRecords = [...medicalRecords];

        updateStatistics();

        renderTable();

    }

    catch (error) {

        console.error(error);

        showToast(error.message, "error");

    }

    finally {

        hideLoading();

    }

}

/*=========================================================
                STATISTICS
=========================================================*/

function updateStatistics() {

    const total =
        document.getElementById("totalRecords");

    if (total) {

        total.textContent = medicalRecords.length;

    }

    const patientSet = new Set();

    medicalRecords.forEach(record => {

        if (record.patient) {

            patientSet.add(record.patient.id);

        }

    });

    const patientCount =
        document.getElementById("totalPatients");

    if (patientCount) {

        patientCount.textContent =
            patientSet.size;

    }

    const today =
        new Date().toISOString().split("T")[0];

    const todayRecords =
        medicalRecords.filter(r =>
            r.visitDate === today
        );

    const todayCount =
        document.getElementById("todayRecords");

    if (todayCount) {

        todayCount.textContent =
            todayRecords.length;

    }

}

/*=========================================================
                TABLE
=========================================================*/

function renderTable() {

    const table =
        document.getElementById("recordsTable");

    if (!table) return;

    table.innerHTML = "";

    if (filteredRecords.length === 0) {

        table.innerHTML = `

<tr>

<td colspan="7" style="text-align:center">

No Medical Records Found

</td>

</tr>

`;

        return;

    }

    filteredRecords.forEach(record => {

        table.innerHTML += `

<tr>

<td>${record.id}</td>

<td>${record.patient?.name ?? "-"}</td>

<td>${record.diagnosis ?? "-"}</td>

<td>${record.symptoms ?? "-"}</td>

<td>${record.treatment ?? "-"}</td>

<td>${record.visitDate ?? "-"}</td>

<td>

<button
class="table-btn view"
onclick="viewRecord(${record.id})">

<i class="fa-solid fa-eye"></i>

</button>

<button
class="table-btn edit"
onclick="editRecord(${record.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="table-btn delete"
onclick="deleteMedicalRecord(${record.id})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

    });

}

/*=========================================================
                SEARCH
=========================================================*/

function searchRecords() {

    const keyword =
        document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    filteredRecords =
        medicalRecords.filter(record => {

            return (

                (record.patient?.name || "")
                .toLowerCase()
                .includes(keyword)

                ||

                (record.diagnosis || "")
                .toLowerCase()
                .includes(keyword)

                ||

                (record.symptoms || "")
                .toLowerCase()
                .includes(keyword)

            );

        });

    renderTable();

}

console.log("✅ Doctor Medical Records JS Part 1 Loaded");
/*=========================================================
                SAVE RECORD
=========================================================*/

async function saveMedicalRecord() {

    const patientId = document.getElementById("patientId").value.trim();
    const visitDate = document.getElementById("visitDate").value;
    const diagnosis = document.getElementById("diagnosis").value.trim();
    const symptoms = document.getElementById("symptoms").value.trim();
    const treatment = document.getElementById("treatment").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (patientId === "" || diagnosis === "") {

        showToast("Patient ID and Diagnosis are required.", "error");
        return;

    }

    const medicalRecord = {

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
            visitDate || new Date().toISOString().split("T")[0]

    };

    try {

        showLoading();

        const response = await fetch(RECORD_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                Authorization: "Bearer " + token

            },

            body: JSON.stringify(medicalRecord)

        });

        if (!response.ok) {

            throw new Error("Unable to save record.");

        }

        clearForm();

        await loadMedicalRecords();

        showToast("Medical Record Saved Successfully");

    }

    catch (error) {

        console.error(error);

        showToast(error.message, "error");

    }

    finally {

        hideLoading();

    }

}

/*=========================================================
                VIEW RECORD
=========================================================*/

function viewRecord(id) {

    const record =
        medicalRecords.find(r => r.id === id);

    if (!record) return;

    document.getElementById("recordDetails").innerHTML = `

<div class="detail-grid">

<p><strong>Patient :</strong> ${record.patient?.name ?? "-"}</p>

<p><strong>Doctor :</strong> ${record.doctor?.name ?? "-"}</p>

<p><strong>Diagnosis :</strong> ${record.diagnosis ?? "-"}</p>

<p><strong>Symptoms :</strong> ${record.symptoms ?? "-"}</p>

<p><strong>Treatment :</strong> ${record.treatment ?? "-"}</p>

<p><strong>Notes :</strong> ${record.notes ?? "-"}</p>

<p><strong>Visit Date :</strong> ${record.visitDate ?? "-"}</p>

</div>

`;

    document.getElementById("viewModal").style.display = "flex";

}

/*=========================================================
                EDIT RECORD
=========================================================*/

function editRecord(id) {

    editingRecord =
        medicalRecords.find(r => r.id === id);

    if (!editingRecord) return;

    document.getElementById("editRecordId").value =
        editingRecord.id;

    document.getElementById("editDiagnosis").value =
        editingRecord.diagnosis ?? "";

    document.getElementById("editSymptoms").value =
        editingRecord.symptoms ?? "";

    document.getElementById("editTreatment").value =
        editingRecord.treatment ?? "";

    document.getElementById("editNotes").value =
        editingRecord.notes ?? "";

    document.getElementById("editModal").style.display =
        "flex";

}

/*=========================================================
                UPDATE RECORD
=========================================================*/

async function updateMedicalRecord() {

    if (!editingRecord) {

        showToast("No record selected.", "error");
        return;

    }

    const body = {

        patient: {

            id: editingRecord.patient.id

        },

        doctor: {

            id: editingRecord.doctor.id

        },

        diagnosis:
            document.getElementById("editDiagnosis").value,

        symptoms:
            document.getElementById("editSymptoms").value,

        treatment:
            document.getElementById("editTreatment").value,

        notes:
            document.getElementById("editNotes").value,

        visitDate:
            editingRecord.visitDate

    };

    try {

        showLoading();

        const response = await fetch(

            RECORD_API + "/" + editingRecord.id,

            {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: "Bearer " + token

                },

                body: JSON.stringify(body)

            }

        );

        if (!response.ok) {

            throw new Error("Unable to update record.");

        }

        closeEditModal();

        await loadMedicalRecords();

        showToast("Medical Record Updated");

    }

    catch (error) {

        console.error(error);

        showToast(error.message, "error");

    }

    finally {

        hideLoading();

    }

}

/*=========================================================
                DELETE RECORD
=========================================================*/

async function deleteMedicalRecord(id) {

    if (!confirm("Delete this record?")) return;

    try {

        showLoading();

        const response = await fetch(

            RECORD_API + "/" + id,

            {

                method: "DELETE",

                headers: {

                    Authorization: "Bearer " + token

                }

            }

        );

        if (!response.ok) {

            throw new Error("Unable to delete record.");

        }

        await loadMedicalRecords();

        showToast("Medical Record Deleted");

    }

    catch (error) {

        console.error(error);

        showToast(error.message, "error");

    }

    finally {

        hideLoading();

    }

}

/*=========================================================
                UTILITIES
=========================================================*/

function clearForm() {

    document.getElementById("patientId").value = "";
    document.getElementById("visitDate").value = "";
    document.getElementById("diagnosis").value = "";
    document.getElementById("symptoms").value = "";
    document.getElementById("treatment").value = "";
    document.getElementById("notes").value = "";

}

function closeViewModal() {

    document.getElementById("viewModal").style.display = "none";

}

function closeEditModal() {

    document.getElementById("editModal").style.display = "none";

    editingRecord = null;

}

function showLoading() {

    const loading = document.getElementById("loadingOverlay");

    if (loading) {

        loading.style.display = "flex";

    }

}

function hideLoading() {

    const loading = document.getElementById("loadingOverlay");

    if (loading) {

        loading.style.display = "none";

    }

}

function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    if (!container) {

        alert(message);
        return;

    }

    const toast =
        document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = `
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

window.addEventListener("focus", loadMedicalRecords);

console.log("✅ Doctor Medical Records Loaded Successfully");