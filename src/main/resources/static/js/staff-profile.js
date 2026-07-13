console.log("Staff Profile JS Loaded");

// ==========================================
// Base URL
// ==========================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const STAFF_API = BASE_URL + "/staff";

// ==========================================
// Page Load
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    loadStaffProfile();

});

// ==========================================
// Load Staff Profile
// ==========================================

function loadStaffProfile() {

    const email = localStorage.getItem("email");

    if (!email) {

        alert("Session expired. Please login again.");

        window.location.href = "login.html";

        return;

    }

    fetch(STAFF_API + "/email/" + email)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load profile.");

        }

        return response.json();

    })

    .then(staff => {

        document.getElementById("staffName").innerHTML =
            staff.fullName || staff.name || "-";

        document.getElementById("topName").innerHTML =
            staff.fullName || staff.name || "-";

        document.getElementById("staffPhone").innerHTML =
            staff.phone || "-";

        document.getElementById("staffDepartment").innerHTML =
            staff.department || "-";

        document.getElementById("staffEmail").innerHTML =
            staff.email || email;

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}