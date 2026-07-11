// =====================================
// Hospital Management System
// Login & Logout Management
// =====================================

// ===============================
// Check User Login
// ===============================
(function () {

    const name = localStorage.getItem("name");
    const role = localStorage.getItem("role");

    // Redirect to login if user is not logged in
    if (!name || !role) {

        alert("Please login first.");

        window.location.replace("login.html");

        return;

    }

    console.log("Logged in as:", role);

    // Prevent browser back after login/logout
    history.pushState(null, null, location.href);

    window.onpopstate = function () {

        history.go(1);

    };

})();

// ===============================
// Get Logged User Name
// ===============================
function getUserName() {

    return localStorage.getItem("name") || "User";

}

// ===============================
// Get Logged User Role
// ===============================
function getUserRole() {

    return localStorage.getItem("role") || "";

}

// ===============================
// Logout Function
// ===============================
function logout() {

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {

        return;

    }

    // Clear Storage
    localStorage.clear();
    sessionStorage.clear();

    alert("✅ Logged Out Successfully");

    // Redirect to Login
    window.location.replace("login.html");

}

// ===============================
// Session Expired
// ===============================
function sessionExpired() {

    alert("Your session has expired. Please login again.");

    localStorage.clear();
    sessionStorage.clear();

    window.location.replace("login.html");

}

// ===============================
// Welcome Message
// ===============================
function showWelcome() {

    console.log("Welcome " + getUserName());

}

// ===============================
// Page Loaded
// ===============================
window.addEventListener("DOMContentLoaded", function () {

    showWelcome();

});