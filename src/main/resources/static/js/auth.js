// ==========================================
// Hospital Management System
// Authentication
// ==========================================

// Local Spring Boot Backend
// ==========================================
// API URL
// ==========================================
const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const API_URL = isLocal
    ? "http://localhost:8080/auth"
    : "https://hospital-management-system-6pok.onrender.com/auth";

// ==========================================
// Login
// ==========================================

function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const loginButton = document.querySelector("button");

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    showLoading(loginButton);

    const loginData = {
        email: email,
        password: password
    };

    fetch(API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })

    .then(async response => {

        if (!response.ok) {

            hideLoading(loginButton);

            let message = "Invalid email or password.";

            try {
                const error = await response.json();
                if (error.message) {
                    message = error.message;
                }
            } catch (e) {
                console.log(e);
            }

            throw new Error(message);
        }

        return response.json();
    })

    .then(data => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.fullName);
        localStorage.setItem("email", data.email);

        if (data.doctorId !== null && data.doctorId !== undefined) {
            localStorage.setItem("doctorId", data.doctorId);
        }

        rememberUser();

        alert("Welcome " + data.fullName);

        if (data.role === "ADMIN") {

            window.location.href = "admin-dashboard.html";

        } else if (data.role === "DOCTOR") {

            window.location.href = "doctor-dashboard.html";

        } else if (data.role === "STAFF") {

            window.location.href = "staff-dashboard.html";

        } else {

            alert("Unknown Role");

        }

    })

    .catch(error => {

        hideLoading(loginButton);
        alert(error.message);

    });

}

// ==========================================
// Forgot Password
// ==========================================

function openForgotPassword() {

    document.getElementById("forgotModal").style.display = "block";

}

function closeForgotPassword() {

    document.getElementById("forgotModal").style.display = "none";

    document.getElementById("resetEmail").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";

}

function resetPassword() {

    const email = document.getElementById("resetEmail").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (email === "" || newPassword === "" || confirmPassword === "") {

        alert("Please fill all fields.");
        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");
        return;

    }

    fetch(API_URL + "/forgot-password", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            newPassword: newPassword
        })

    })

    .then(async response => {

        if (!response.ok) {

            let message = "Unable to reset password.";

            try {

                const error = await response.json();

                if (error.message) {
                    message = error.message;
                }

            } catch (e) {}

            throw new Error(message);

        }

        return response.text();

    })

    .then(message => {

        alert(message);
        closeForgotPassword();

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Show / Hide Password
// ==========================================

function togglePassword(inputId, iconId) {

    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input || !icon) return;

    if (input.type === "password") {

        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

}

// ==========================================
// Logout
// ==========================================

function logout() {

    localStorage.clear();
    window.location.href = "login.html";

}

// ==========================================
// Remember Email
// ==========================================

function rememberUser() {

    const email = document.getElementById("email").value.trim();

    if (email !== "") {

        localStorage.setItem("rememberEmail", email);

    }

}

window.addEventListener("DOMContentLoaded", function () {

    const savedEmail = localStorage.getItem("rememberEmail");

    if (savedEmail && document.getElementById("email")) {

        document.getElementById("email").value = savedEmail;

    }

});

// ==========================================
// Enter Key Login
// ==========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        login();

    }

});

// ==========================================
// Close Forgot Password Modal
// ==========================================

window.onclick = function (event) {

    const modal = document.getElementById("forgotModal");

    if (event.target === modal) {

        closeForgotPassword();

    }

};

// ==========================================
// Button Loading
// ==========================================

function showLoading(button) {

    if (!button) return;

    button.disabled = true;
    button.innerHTML = "Signing In...";

}

function hideLoading(button) {

    if (!button) return;

    button.disabled = false;
    button.innerHTML = "Login Securely";

}

// ==========================================
// Auto Focus
// ==========================================

window.onload = function () {

    const email = document.getElementById("email");

    if (email) {

        email.focus();

    }

};