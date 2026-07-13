console.log("Admin Dashboard JS Loaded");

// ==========================
// Base URL
// ==========================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const DASHBOARD_API =
BASE_URL + "/dashboard/stats";

// ==========================
// Load Dashboard Statistics
// ==========================

function loadDashboardStats() {

    fetch(DASHBOARD_API)

    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load dashboard");
        }

        return response.json();

    })

    .then(data => {

        console.log(data);

        // Cards
        document.getElementById("doctorCount").innerHTML =
        data.doctors;

        document.getElementById("staffCount").innerHTML =
        data.staff;

        document.getElementById("patientCount").innerHTML =
        data.patients;

        document.getElementById("appointmentCount").innerHTML =
        data.appointments;

        // Summary
        document.getElementById("summaryDoctorCount").innerHTML =
        data.doctors;

        document.getElementById("summaryStaffCount").innerHTML =
        data.staff;

        document.getElementById("summaryPatientCount").innerHTML =
        data.patients;

        document.getElementById("summaryAppointmentCount").innerHTML =
        data.appointments;

    })

    .catch(error => {

        console.error(error);

    });

}

// ==========================
// Load On Page Open
// ==========================

window.onload = function () {

    loadDashboardStats();

};