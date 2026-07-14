/*=========================================================
                HMS PRO STAFF MEDICAL RECORDS
=========================================================*/

const RECORD_API = `${API_URL}/records`;
const PATIENT_API = `${API_URL}/patients`;

let records = [];
let filteredRecords = [];
let patients = [];

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});

async function initialize() {

    showLoading();

    loadProfile();

    await Promise.all([
        loadPatients(),
        loadRecords()
    ]);

    hideLoading();

}

/*=========================================================
                PROFILE
=========================================================*/

function loadProfile() {

    const name = localStorage.getItem("name") || "Staff";

    const staffName = document.getElementById("staffName");

    if (staffName) {
        staffName.textContent = name;
    }

}

/*=========================================================
                LOAD PATIENTS
=========================================================*/

async function loadPatients() {

    try {

        const response = await fetch(PATIENT_API);

        if (!response.ok)
            throw new Error("Unable to load patients");

        patients = await response.json();

        const patientCount =
            document.getElementById("todayPatients");

        if (patientCount)
            patientCount.textContent = patients.length;

        const patientFilter =
            document.getElementById("patientFilter");

        const patientSelect =
            document.getElementById("recordPatient");

        if (patientFilter) {

            patientFilter.innerHTML =
                `<option value="">All Patients</option>`;

            patients.forEach(patient => {

                patientFilter.innerHTML += `

<option value="${patient.id}">
${patient.name}
</option>

`;

            });

        }

        if (patientSelect) {

            patientSelect.innerHTML = "";

            patients.forEach(patient => {

                patientSelect.innerHTML += `

<option value="${patient.id}">
${patient.name}
</option>

`;

            });

        }

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load patients", "error");

    }

}

/*=========================================================
                LOAD RECORDS
=========================================================*/

async function loadRecords() {

    try {

        const response = await fetch(RECORD_API);

        if (!response.ok)
            throw new Error("Unable to load records");

        records = await response.json();

        filteredRecords = [...records];

        updateStatistics();

        renderRecords();

    }

    catch (error) {

        console.error(error);

        showToast("Unable to load medical records", "error");

    }

}

/*=========================================================
                STATISTICS
=========================================================*/

function updateStatistics() {

    document.getElementById("totalRecords").textContent =
        records.length;

    document.getElementById("updatedRecords").textContent =
        records.length;

    document.getElementById("pendingRecords").textContent =
        records.length;

}

/*=========================================================
                TABLE
=========================================================*/

function renderRecords() {

    const tbody =
        document.getElementById("recordsTable");

    const empty =
        document.getElementById("emptyState");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (filteredRecords.length === 0) {

        if (empty)
            empty.style.display = "block";

        tbody.innerHTML = `

<tr>

<td colspan="7" class="text-center">

No Medical Records Found

</td>

</tr>

`;

        return;

    }

    if (empty)
        empty.style.display = "none";

    filteredRecords.forEach(record => {

        tbody.innerHTML += `

<tr>

<td>${record.id}</td>

<td>${record.patient?.name ?? "-"}</td>

<td>${record.doctor?.name ?? "-"}</td>

<td>${record.diagnosis ?? "-"}</td>

<td>${record.symptoms ?? "-"}</td>

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

</td>

</tr>

`;

    });

}

/*=========================================================
                SEARCH
=========================================================*/

function searchRecord() {

    const keyword =
        document.getElementById("searchRecord")
        .value
        .toLowerCase();

    filteredRecords = records.filter(record => {

        return (

            (record.patient?.name || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (record.doctor?.name || "")
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

    renderRecords();

}

/*=========================================================
                FILTER
=========================================================*/

function filterRecords() {

    const patientId =
        document.getElementById("patientFilter").value;

    const visitDate =
        document.getElementById("recordDateFilter").value;

    filteredRecords = records.filter(record => {

        const patientMatch =

            patientId === "" ||

            String(record.patient?.id) === patientId;

        const dateMatch =

            visitDate === "" ||

            record.visitDate === visitDate;

        return patientMatch && dateMatch;

    });

    renderRecords();

}

console.log("✅ Part 1 Loaded");
/*=========================================================
                VIEW RECORD
=========================================================*/

function viewRecord(id) {

    const record = records.find(r => r.id == id);

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

    const record = records.find(r => r.id == id);

    if (!record) return;

    document.getElementById("recordId").value = record.id;

    document.getElementById("recordPatient").value =
        record.patient?.id || "";

    document.getElementById("recordDate").value =
        record.visitDate || "";

    document.getElementById("recordDiagnosis").value =
        record.diagnosis || "";

    document.getElementById("recordSymptoms").value =
        record.symptoms || "";

    document.getElementById("recordTreatment").value =
        record.treatment || "";

    document.getElementById("recordNotes").value =
        record.notes || "";

    document.getElementById("recordModal").style.display = "flex";

}

/*=========================================================
                SAVE RECORD
=========================================================*/

async function saveRecord() {

    const id = document.getElementById("recordId").value;

    const body = {

        patient: {
            id: Number(
                document.getElementById("recordPatient").value
            )
        },

        diagnosis:
            document.getElementById("recordDiagnosis").value,

        symptoms:
            document.getElementById("recordSymptoms").value,

        treatment:
            document.getElementById("recordTreatment").value,

        notes:
            document.getElementById("recordNotes").value,

        visitDate:
            document.getElementById("recordDate").value

    };

    try {

        showLoading();

        const response = await fetch(`${RECORD_API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(body)

        });

        if (!response.ok) {

            throw new Error("Unable to update record");

        }

        closeRecordModal();

        await loadRecords();

        showToast(
            "Medical Record Updated Successfully",
            "success"
        );

    }

    catch (error) {

        console.error(error);

        showToast(
            "Update Failed",
            "error"
        );

    }

    finally {

        hideLoading();

    }

}

/*=========================================================
                CLOSE MODALS
=========================================================*/

function closeRecordModal() {

    document.getElementById("recordModal").style.display = "none";

}

function closeViewModal() {

    document.getElementById("viewModal").style.display = "none";

}

/*=========================================================
                LOADING
=========================================================*/

function showLoading() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.style.display = "flex";

    }

}

function hideLoading() {

    const overlay = document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.style.display = "none";

    }

}

/*=========================================================
                TOAST
=========================================================*/

function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    if (!container) return;

    const toast =
        document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = `

<div class="toast-content">

<i class="fa-solid ${type === "success"
? "fa-circle-check"
: "fa-circle-xmark"}"></i>

<span>${message}</span>

</div>

`;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

/*=========================================================
                REFRESH
=========================================================*/

setInterval(() => {

    loadRecords();

}, 300000);

window.addEventListener("focus", () => {

    loadRecords();

});

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        loadRecords();

    }

});

console.log("✅ HMS Staff Medical Records Ready");