// ==========================================
// Doctor Profile
// ==========================================

const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

const API_URL = isLocal
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

// ==========================================
// Load Doctor Profile
// ==========================================

function loadProfile() {

    const doctorId = localStorage.getItem("doctorId");

    if (!doctorId) {

        alert("Doctor ID not found. Please login again.");

        window.location.href = "login.html";

        return;

    }

    fetch(API_URL + "/doctors/profile/" + doctorId, {

        method: "GET",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"

        }

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load profile.");

        }

        return response.json();

    })

    .then(data => {

        document.getElementById("name").value = data.name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("specialization").value = data.specialization || "";
        document.getElementById("department").value = data.department || "";
        document.getElementById("qualification").value = data.qualification || "";
        document.getElementById("experience").value = data.experience || "";
        document.getElementById("about").value = data.about || "";

        if (data.profileImage && data.profileImage !== "") {

            document.getElementById("profileImage").src = data.profileImage;

        }

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Save Doctor Profile
// ==========================================

function saveProfile() {

    const doctorId = localStorage.getItem("doctorId");

    const doctor = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        specialization: document.getElementById("specialization").value,
        department: document.getElementById("department").value,
        qualification: document.getElementById("qualification").value,
        experience: parseInt(document.getElementById("experience").value) || 0,
        about: document.getElementById("about").value,
        profileImage: document.getElementById("profileImage").src

    };

    fetch(API_URL + "/doctors/profile/" + doctorId, {

        method: "PUT",

        headers: {

            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"

        },

        body: JSON.stringify(doctor)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to update profile.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Profile Updated Successfully");

        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);

    })

    .catch(error => {

        alert(error.message);

    });

}

// ==========================================
// Load Profile Automatically
// ==========================================

window.onload = function () {

    loadProfile();

};