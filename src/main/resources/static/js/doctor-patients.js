/*=========================================================
                HMS PRO DOCTOR PATIENTS
=========================================================*/

const doctorId = localStorage.getItem("doctorId");
const doctorName = localStorage.getItem("name") || "Doctor";

const PATIENT_API = API_URL + "/patients/doctor/" + doctorId;

document.addEventListener("DOMContentLoaded", () => {

    const doctor = document.getElementById("doctorName");

    if (doctor) {
        doctor.innerHTML = doctorName;
    }

    loadPatients();

});


/*=========================================================
                LOAD PATIENTS
=========================================================*/

async function loadPatients() {

    try {

        const response = await fetch(PATIENT_API);

        if (!response.ok) {

            throw new Error("Unable to load patients");

        }

        const patients = await response.json();

        updateStatistics(patients);

        renderPatients(patients);

    }

    catch (error) {

        console.error(error);

        document.getElementById("patientTable").innerHTML =

            `<tr>

            <td colspan="8"
                style="text-align:center;padding:30px;color:red;">

                Failed to load patients

            </td>

        </tr>`;

    }

}


/*=========================================================
                UPDATE CARDS
=========================================================*/

function updateStatistics(patients) {

    document.getElementById("patientCount").innerHTML =
        patients.length;

    document.getElementById("criticalCount").innerHTML =
        patients.filter(p =>
            (p.status || "").toUpperCase() === "CRITICAL"
        ).length;

    document.getElementById("recoveredCount").innerHTML =
        patients.filter(p =>
            (p.status || "").toUpperCase() === "RECOVERED"
        ).length;

    document.getElementById("todayCount").innerHTML =
        patients.length;

}
/*=========================================================
                PATIENT TABLE
=========================================================*/

function renderPatients(patients) {

    const table =
        document.getElementById("patientTable");

    table.innerHTML = "";

    if (patients.length === 0) {

        table.innerHTML =

            `<tr>

            <td colspan="8"
                style="text-align:center">

                No Patients Found

            </td>

        </tr>`;

        return;

    }

    patients.forEach(patient => {

        table.innerHTML += `

<tr>

<td>${patient.id}</td>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.gender || "-"}</td>

<td>${patient.disease}</td>

<td>${patient.phone}</td>

<td>

<span class="status ${getStatusClass(patient.status)}">

${patient.status || "ACTIVE"}

</span>

</td>

<td>

<button class="btn"
onclick='viewPatient(${JSON.stringify(patient)})'>

<i class="fas fa-eye"></i>

</button>

<button class="btn"

onclick="location.href='doctor-prescriptions.html'">

<i class="fas fa-file-prescription"></i>

</button>

<button class="btn"

onclick="location.href='doctor-medical-records.html'">

<i class="fas fa-file-medical"></i>

</button>

</td>

</tr>

`;

    });

}

/*=========================================================
                VIEW PATIENT
=========================================================*/

function viewPatient(patient) {

    document.getElementById("viewName").value =
        patient.name || "";

    document.getElementById("viewAge").value =
        patient.age || "";

    document.getElementById("viewGender").value =
        patient.gender || "";

    document.getElementById("viewDisease").value =
        patient.disease || "";

    document.getElementById("viewPhone").value =
        patient.phone || "";

    document.getElementById("viewStatus").value =
        patient.status || "ACTIVE";

    document.getElementById("viewModal").style.display =
        "flex";

}


function closeViewModal() {

    document.getElementById("viewModal").style.display =
        "none";

}


/*=========================================================
                STATUS COLOR
=========================================================*/

function getStatusClass(status) {

    if (!status) return "confirmed";

    switch (status.toUpperCase()) {

        case "CRITICAL":
            return "cancelled";

        case "RECOVERED":
            return "completed";

        default:
            return "confirmed";

    }

}

/*=========================================================
                SEARCH
=========================================================*/

const search =
    document.getElementById("searchPatient");

if (search) {

    search.addEventListener("keyup", function() {

        const value =
            this.value.toLowerCase();

        document
            .querySelectorAll("#patientTable tr")
            .forEach(row => {

                row.style.display =
                    row.innerText
                        .toLowerCase()
                        .includes(value)
                        ? ""
                        : "none";

            });

    });

}


/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(loadPatients, 30000);

window.addEventListener("focus", loadPatients);

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        loadPatients();

    }

});

console.log("Doctor Patients Loaded Successfully");

