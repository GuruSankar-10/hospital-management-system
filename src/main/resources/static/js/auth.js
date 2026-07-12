// ==========================================
// Hospital Management System
// Authentication
// ==========================================

const API_URL = "http://localhost:8080/auth";

// ==========================================
// Login
// ==========================================

function login() {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        alert("Please enter email and password.");

        return;

    }

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

    .then(response => {

        if (!response.ok) {

            throw new Error("Invalid Email or Password");

        }

        return response.json();

    })

    .then(data => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.fullName);
        localStorage.setItem("email", data.email);

        if (data.doctorId != null) {

            localStorage.setItem("doctorId", data.doctorId);

        }

        alert("Welcome " + data.fullName);

        if (data.role === "ADMIN") {

            window.location.href = "admin-dashboard.html";

        }

        else if (data.role === "DOCTOR") {

            window.location.href = "doctor-dashboard.html";

        }

        else if (data.role === "STAFF") {

            window.location.href = "staff-dashboard.html";

        }

        else {

            alert("Unknown Role");

        }

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Open Forgot Password
// ==========================================

function openForgotPassword() {

    document.getElementById("forgotModal").style.display = "block";

}

// ==========================================
// Close Forgot Password
// ==========================================

function closeForgotPassword() {

    document.getElementById("forgotModal").style.display = "none";

    document.getElementById("resetEmail").value = "";

    document.getElementById("newPassword").value = "";

    document.getElementById("confirmPassword").value = "";

}

// ==========================================
// Reset Password
// ==========================================

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

    const request = {

        email: email,

        newPassword: newPassword

    };

    fetch(API_URL + "/forgot-password", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(request)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to reset password.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        closeForgotPassword();

    })

    .catch(error => {

        alert("❌ " + error.message);

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
// Press Enter to Login
// ==========================================

document.addEventListener("keydown", function(event){

    if(event.key === "Enter"){

        login();

    }

});

// ==========================================
// Close Forgot Password Popup
// When Clicking Outside
// ==========================================

window.onclick = function(event){

    const modal = document.getElementById("forgotModal");

    if(event.target === modal){

        closeForgotPassword();

    }

};

// ==========================================
// Logout
// ==========================================

function logout(){

    localStorage.clear();

    window.location.href="login.html";

}

// ==========================================
// Remember Email
// ==========================================

window.addEventListener("DOMContentLoaded",function(){

    const savedEmail = localStorage.getItem("rememberEmail");

    if(savedEmail){

        const emailBox = document.getElementById("email");

        if(emailBox){

            emailBox.value = savedEmail;

        }

    }

});

// ==========================================
// Save Remember Email
// ==========================================

function rememberUser(){

    const email = document.getElementById("email").value.trim();

    if(email !== ""){

        localStorage.setItem("rememberEmail",email);

    }

}

// ==========================================
// Auto Focus Email
// ==========================================

window.addEventListener("load",function(){

    const emailBox = document.getElementById("email");

    if(emailBox){

        emailBox.focus();

    }

});

// ==========================================
// Login Button Loading
// ==========================================

function showLoading(button){

    if(!button) return;

    button.disabled = true;
    button.innerHTML = "Signing In...";

}

function hideLoading(button){

    if(!button) return;

    button.disabled = false;
    button.innerHTML = "Login Securely";

}