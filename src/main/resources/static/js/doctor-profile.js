/*=========================================================
                HMS PRO DOCTOR PROFILE
=========================================================*/

const API_URL = window.API_URL;

const doctorId = localStorage.getItem("doctorId");

const doctorName = localStorage.getItem("name") || "Doctor";

const PROFILE_API =
API_URL + "/doctors/profile/" + doctorId;

const UPDATE_API =
API_URL + "/doctors/profile/" + doctorId;

const PASSWORD_API =
API_URL + "/doctors/change-password/" + doctorId;

const PATIENT_API =
API_URL + "/patients/doctor/" + doctorId;

const APPOINTMENT_API =
API_URL + "/appointments/doctor/" + doctorId;


/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeProfile();

});


/*=========================================================
                INITIALIZE
=========================================================*/

function initializeProfile() {

    const doctorNameElement =
        document.getElementById("doctorName");

    const bannerNameElement =
        document.getElementById("doctorBannerName");

    const doctorIdElement =
        document.getElementById("doctorId");

    const lastLoginElement =
        document.getElementById("lastLogin");


    if (doctorNameElement) {

        doctorNameElement.textContent =
            doctorName;

    }

    if (bannerNameElement) {

        bannerNameElement.textContent =
            doctorName;

    }

    if (doctorIdElement) {

        doctorIdElement.value =
            doctorId;

    }

    if (lastLoginElement) {

        lastLoginElement.value =
            new Date().toLocaleString();

    }

    loadProfile();

    loadStatistics();

}


/*=========================================================
                LOAD PROFILE
=========================================================*/

async function loadProfile() {

    try {

        const response =
            await fetch(PROFILE_API);

        if (!response.ok) {

            throw new Error("Unable to load profile");

        }

        const doctor =
            await response.json();

        document.getElementById("profileName").textContent =
            doctor.name || "";

        document.getElementById("profileSpecialization").textContent =
            doctor.specialization || "";

        document.getElementById("fullName").value =
            doctor.name || "";

        document.getElementById("email").value =
            doctor.email || "";

        document.getElementById("phone").value =
            doctor.phone || "";

        document.getElementById("department").value =
            doctor.department || "";

        document.getElementById("specialization").value =
            doctor.specialization || "";

        document.getElementById("qualification").value =
            doctor.qualification || "";

        document.getElementById("experience").value =
            doctor.experience || "";

        document.getElementById("about").value =
            doctor.about || "";

        if (doctor.profileImage &&
            doctor.profileImage.trim() !== "") {

            document.getElementById("doctorPhoto").src =
                doctor.profileImage;

        }

        document.getElementById("experienceCard").textContent =
            doctor.experience || "0";

    }

    catch (error) {

        console.error("Profile Error:", error);

    }

}


/*=========================================================
                LOAD STATISTICS
=========================================================*/

async function loadStatistics() {

    try {

        const patientResponse =
            await fetch(PATIENT_API);

        if (patientResponse.ok) {

            const patients =
                await patientResponse.json();

            document.getElementById("patientCount").textContent =
                patients.length;

        }

        const appointmentResponse =
            await fetch(APPOINTMENT_API);

        if (appointmentResponse.ok) {

            const appointments =
                await appointmentResponse.json();

            document.getElementById("appointmentCount").textContent =
                appointments.length;

        }

    }

    catch (error) {

        console.error("Statistics Error:", error);

    }

}
/*=========================================================
                SAVE PROFILE
=========================================================*/

async function saveProfile() {

    try {

        const doctor = {

            name:
            document.getElementById("fullName").value.trim(),

            email:
            document.getElementById("email").value.trim(),

            phone:
            document.getElementById("phone").value.trim(),

            department:
            document.getElementById("department").value.trim(),

            specialization:
            document.getElementById("specialization").value.trim(),

            qualification:
            document.getElementById("qualification").value.trim(),

            experience:
            Number(document.getElementById("experience").value),

            about:
            document.getElementById("about").value.trim()

        };


        if (doctor.name === "") {

            alert("Doctor Name is required.");

            return;

        }

        if (doctor.email === "") {

            alert("Email is required.");

            return;

        }

        if (doctor.phone === "") {

            alert("Phone Number is required.");

            return;

        }


        const response = await fetch(UPDATE_API, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(doctor)

        });


        if (!response.ok) {

            throw new Error("Unable to Update Profile");

        }


        const updatedDoctor =
            await response.json();


        localStorage.setItem(

            "name",

            updatedDoctor.name

        );


        document.getElementById("doctorName").textContent =
            updatedDoctor.name;

        document.getElementById("doctorBannerName").textContent =
            updatedDoctor.name;

        document.getElementById("profileName").textContent =
            updatedDoctor.name;

        document.getElementById("profileSpecialization").textContent =
            updatedDoctor.specialization || "";


        if (updatedDoctor.profileImage &&
            updatedDoctor.profileImage.trim() !== "") {

            document.getElementById("doctorPhoto").src =
                updatedDoctor.profileImage;

        }

        alert("✅ Profile Updated Successfully");

        loadProfile();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}


/*=========================================================
                RESET PROFILE
=========================================================*/

function resetProfile() {

    if (confirm("Reset all changes?")) {

        loadProfile();

    }

}


/*=========================================================
                CHANGE PASSWORD
=========================================================*/

async function changePassword() {

    const currentPassword =
        document.getElementById("currentPassword").value.trim();

    const newPassword =
        document.getElementById("newPassword").value.trim();

    const confirmPassword =
        document.getElementById("confirmPassword").value.trim();


    if (currentPassword === "") {

        alert("Enter Current Password");

        return;

    }

    if (newPassword === "") {

        alert("Enter New Password");

        return;

    }

    if (confirmPassword === "") {

        alert("Confirm Password");

        return;

    }

    if (newPassword !== confirmPassword) {

        alert("Passwords do not match");

        return;

    }


    try {

        const response = await fetch(PASSWORD_API, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                currentPassword,

                newPassword

            })

        });


        if (!response.ok) {

            throw new Error("Password Update Failed");

        }


        alert("✅ Password Changed Successfully");


        document.getElementById("currentPassword").value = "";

        document.getElementById("newPassword").value = "";

        document.getElementById("confirmPassword").value = "";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(() => {

    loadProfile();

    loadStatistics();

}, 30000);


/*=========================================================
                WINDOW FOCUS
=========================================================*/

window.addEventListener("focus", () => {

    refreshProfile();

});


/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange", () => {

    if (!document.hidden) {

        refreshProfile();

    }

});


/*=========================================================
                REFRESH PROFILE
=========================================================*/

function refreshProfile() {

    loadProfile();

    loadStatistics();

}


/*=========================================================
                LOGIN CHECK
=========================================================*/

function checkLogin() {

    const token = localStorage.getItem("token");

    if (!token) {

        window.location.href = "login.html";

    }

}

checkLogin();


/*=========================================================
                CURRENT USER
=========================================================*/

function getCurrentDoctor() {

    return {

        doctorId: localStorage.getItem("doctorId"),

        name: localStorage.getItem("name"),

        email: localStorage.getItem("email"),

        role: localStorage.getItem("role"),

        token: localStorage.getItem("token")

    };

}


/*=========================================================
                KEYBOARD SHORTCUT
=========================================================*/

document.addEventListener("keydown", (event) => {

    if (event.ctrlKey && event.key.toLowerCase() === "s") {

        event.preventDefault();

        saveProfile();

    }

});


/*=========================================================
                LOGOUT
=========================================================*/

function logout() {

    if (!confirm("Are you sure you want to logout?")) {

        return;

    }

    localStorage.clear();

    window.location.href = "login.html";

}


/*=========================================================
                PAGE READY
=========================================================*/

window.addEventListener("load", () => {

    console.log("====================================");

    console.log("🏥 HMS PRO Doctor Profile Loaded");

    console.log("Doctor :", doctorName);

    console.log("Doctor ID :", doctorId);

    console.log("Backend :", API_URL);

    console.log("====================================");

});


/*=========================================================
                END OF FILE
=========================================================*/