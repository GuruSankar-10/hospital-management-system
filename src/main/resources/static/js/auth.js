/*=========================================================
                HMS PRO AUTHENTICATION
=========================================================*/

const AUTH_API = window.AUTH_API;

if (!AUTH_API) {

    console.error("AUTH_API is not defined.");

    alert("Configuration Error. Please load config.js first.");

    throw new Error("AUTH_API Undefined");

}


/*=========================================================
                LOGIN
=========================================================*/

async function login() {

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const loginButton =
        document.getElementById("loginBtn");


    if (!emailInput || !passwordInput) {

        alert("Login form not found.");

        return;

    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value.trim();


    if (email === "" || password === "") {

        alert("Please enter Email and Password.");

        return;

    }


    showLoading(loginButton);


    try {

        const response = await fetch(

            AUTH_API + "/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }

        );


        if (!response.ok) {

            hideLoading(loginButton);

            let message = "Invalid Email or Password";

            try {

                const error =
                    await response.json();

                if (error.message) {

                    message = error.message;

                }

            }

            catch (e) {

                console.error(e);

            }

            throw new Error(message);

        }


        const data =
            await response.json();


        /*=====================================
                STORE USER
        =====================================*/

        localStorage.setItem(
            "token",
            data.token
        );

        localStorage.setItem(
            "role",
            data.role
        );

        localStorage.setItem(
            "name",
            data.fullName
        );

        localStorage.setItem(
            "email",
            data.email
        );


        if (data.doctorId != null) {

            localStorage.setItem(
                "doctorId",
                data.doctorId
            );

        }


        rememberUser();

        hideLoading(loginButton);

        alert("Welcome " + data.fullName);


        /*=====================================
                REDIRECT
        =====================================*/

        switch (data.role) {

            case "ADMIN":

                window.location.href =
                    "admin-dashboard.html";

                break;

            case "DOCTOR":

                window.location.href =
                    "doctor-dashboard.html";

                break;

            case "STAFF":

                window.location.href =
                    "staff-dashboard.html";

                break;

            default:

                alert("Unknown User Role");

        }

    }

    catch (error) {

        hideLoading(loginButton);

        console.error(error);

        alert(error.message);

    }

}
/*=========================================================
                REMEMBER USER
=========================================================*/

function rememberUser() {

    const emailInput = document.getElementById("email");

    if (!emailInput) return;

    const email = emailInput.value.trim();

    if (email !== "") {

        localStorage.setItem("rememberEmail", email);

    }

}


/*=========================================================
                BUTTON LOADING
=========================================================*/

function showLoading(button) {

    if (!button) return;

    button.disabled = true;

    button.dataset.originalText = button.innerHTML;

    button.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Signing In...';

}

function hideLoading(button) {

    if (!button) return;

    button.disabled = false;

    button.innerHTML =
        button.dataset.originalText || "Login Securely";

}


/*=========================================================
                FORGOT PASSWORD
=========================================================*/

async function resetPassword() {

    const email =
        document.getElementById("resetEmail").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();

    if (!email || !newPassword || !confirmPassword) {

        alert("Please fill all fields.");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match.");

        return;

    }

    try {

        const response = await fetch(

            AUTH_API + "/forgot-password",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email,

                    newPassword

                })

            }

        );

        if (!response.ok) {

            throw new Error("Unable to reset password.");

        }

        alert("✅ Password Updated Successfully");

        closeForgotPassword();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/*=========================================================
                FORGOT PASSWORD MODAL
=========================================================*/

function openForgotPassword() {

    const modal =
        document.getElementById("forgotModal");

    if (modal) {

        modal.style.display = "flex";

    }

}

function closeForgotPassword() {

    const modal =
        document.getElementById("forgotModal");

    if (modal) {

        modal.style.display = "none";

    }

    const fields = [

        "resetEmail",

        "newPassword",

        "confirmPassword"

    ];

    fields.forEach(id => {

        const input = document.getElementById(id);

        if (input) {

            input.value = "";

        }

    });

}


/*=========================================================
                TOGGLE PASSWORD
=========================================================*/

function togglePassword(inputId, iconId) {

    const input =
        document.getElementById(inputId);

    const icon =
        document.getElementById(iconId);

    if (!input || !icon) return;

    if (input.type === "password") {

        input.type = "text";

        icon.className = "fas fa-eye-slash";

    }

    else {

        input.type = "password";

        icon.className = "fas fa-eye";

    }

}
/*=========================================================
                LOGOUT
=========================================================*/

function logout() {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    window.location.href = "login.html";

}


/*=========================================================
                CHECK LOGIN
=========================================================*/

function checkLogin() {

    const token = localStorage.getItem("token");

    return token !== null && token !== "";

}


/*=========================================================
                CURRENT USER
=========================================================*/

function getCurrentUser() {

    return {

        token: localStorage.getItem("token"),

        role: localStorage.getItem("role"),

        name: localStorage.getItem("name"),

        email: localStorage.getItem("email"),

        doctorId: localStorage.getItem("doctorId")

    };

}


/*=========================================================
                DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const emailInput = document.getElementById("email");

    const savedEmail = localStorage.getItem("rememberEmail");

    if (emailInput && savedEmail) {

        emailInput.value = savedEmail;

    }

});


/*=========================================================
                ENTER KEY LOGIN
=========================================================*/

document.addEventListener("keydown", (event) => {

    if (event.key !== "Enter") return;

    const email =
        document.getElementById("email");

    const password =
        document.getElementById("password");

    if (email && password) {

        login();

    }

});


/*=========================================================
                CLOSE MODAL
=========================================================*/

window.addEventListener("click", (event) => {

    const modal =
        document.getElementById("forgotModal");

    if (modal && event.target === modal) {

        closeForgotPassword();

    }

});


/*=========================================================
                ESC KEY
=========================================================*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeForgotPassword();

    }

});


/*=========================================================
                DEBUG
=========================================================*/

console.log("====================================");

console.log("🏥 HMS PRO Authentication Loaded");

console.log("AUTH API :", AUTH_API);

console.log("Logged In :", checkLogin());

console.log("====================================");