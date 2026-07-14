// ======================================
// HMS PRO ADMIN JAVASCRIPT
// ======================================

console.log("Admin JS Loaded");

// API_URL is loaded from config.js

// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadAppointments();

    loadPatients();

    loadAdminName();

    loadDate();

});

// ======================================
// LOAD APPOINTMENTS
// ======================================

async function loadAppointments() {

    try {

        const response = await fetch(API_URL + "/appointments");

        if (!response.ok) {
            throw new Error("Appointments API Error");
        }

        const appointments = await response.json();

        let rows = "";

        appointments
            .slice(-5)
            .reverse()
            .forEach(a => {

                rows += `
                    <tr>
                        <td>${a.id ?? "-"}</td>
                        <td>${a.patient?.name ?? "-"}</td>
                        <td>${a.doctor?.name ?? "-"}</td>
                        <td>${a.appointmentDate ?? "-"}</td>
                        <td>
                            <span class="badge badge-success">
                                ${a.status ?? "Pending"}
                            </span>
                        </td>
                    </tr>
                `;

            });

        const table = document.getElementById("appointmentTable");

        if (table) {

            table.innerHTML = rows || `
                <tr>
                    <td colspan="5">No appointments found</td>
                </tr>
            `;

        }

    } catch (error) {

        console.error("Appointment Loading Error:", error);

    }

}

// ======================================
// LOAD PATIENTS
// ======================================

async function loadPatients() {

    try {

        const response = await fetch(API_URL + "/patients");

        if (!response.ok) {
            throw new Error("Patients API Error");
        }

        const patients = await response.json();

        let rows = "";

        patients
            .slice(-5)
            .reverse()
            .forEach(p => {

                rows += `
                    <tr>
                        <td>${p.id ?? "-"}</td>
                        <td>${p.name ?? "-"}</td>
                        <td>${p.age ?? "-"}</td>
                        <td>${p.disease ?? "-"}</td>
                    </tr>
                `;

            });

        const table = document.getElementById("patientTable");

        if (table) {

            table.innerHTML = rows || `
                <tr>
                    <td colspan="4">No patients found</td>
                </tr>
            `;

        }

    } catch (error) {

        console.error("Patient Loading Error:", error);

    }

}

// ======================================
// ADMIN NAME
// ======================================

function loadAdminName() {

    const admin = localStorage.getItem("name");

    const element = document.getElementById("adminName");

    if (admin && element) {

        element.innerText = admin;

    }

}

// ======================================
// DATE
// ======================================

function loadDate() {

    const date = document.getElementById("todayDate");

    if (date) {

        date.innerText = new Date().toDateString();

    }

}