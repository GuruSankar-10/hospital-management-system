/*=========================================================
                    HMS PRO SETTINGS
                    PART 6A
=========================================================*/

"use strict";

/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

const SETTINGS = {

    hospital: {},

    admin: {},

    users: []

};

const STORAGE = {

    HOSPITAL: "hms_hospital",

    ADMIN: "hms_admin",

    SETTINGS: "hms_settings"

};

/*=========================================================
                    INITIALIZE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSettings();

});

/*=========================================================
                    INITIALIZATION
=========================================================*/

function initializeSettings() {

    loadHospitalProfile();

    loadAdminProfile();

    loadAppearanceSettings();

    loadNotificationSettings();

    loadSystemSettings();

    updateSystemInfo();

}

/*=========================================================
                HOSPITAL PROFILE
=========================================================*/

function loadHospitalProfile() {

    const hospital = JSON.parse(

        localStorage.getItem(STORAGE.HOSPITAL)

    ) || {};

    document.getElementById("hospitalName").value =
        hospital.name || "";

    document.getElementById("hospitalEmail").value =
        hospital.email || "";

    document.getElementById("hospitalPhone").value =
        hospital.phone || "";

    document.getElementById("hospitalWebsite").value =
        hospital.website || "";

    const emergency =
        document.getElementById("emergencyNumber");

    if (emergency) {

        emergency.value =
            hospital.emergency || "";

    }

    const gst =
        document.getElementById("hospitalGST");

    if (gst) {

        gst.value =
            hospital.gst || "";

    }

    document.getElementById("hospitalAddress").value =
        hospital.address || "";

}

/*=========================================================
                SAVE HOSPITAL PROFILE
=========================================================*/

function saveHospitalProfile() {

    showLoading();

    const hospital = {

        name:

        document.getElementById("hospitalName").value,

        email:

        document.getElementById("hospitalEmail").value,

        phone:

        document.getElementById("hospitalPhone").value,

        website:

        document.getElementById("hospitalWebsite").value,

        emergency:

        document.getElementById("emergencyNumber")
        ? document.getElementById("emergencyNumber").value
        : "",

        gst:

        document.getElementById("hospitalGST")
        ? document.getElementById("hospitalGST").value
        : "",

        address:

        document.getElementById("hospitalAddress").value

    };

    localStorage.setItem(

        STORAGE.HOSPITAL,

        JSON.stringify(hospital)

    );

    setTimeout(() => {

        hideLoading();

        showToast(

            "Hospital profile saved successfully",

            "success"

        );

    }, 700);

}

/*=========================================================
                ADMIN PROFILE
=========================================================*/

function loadAdminProfile() {

    const admin = JSON.parse(

        localStorage.getItem(STORAGE.ADMIN)

    ) || {};

    document.getElementById("adminName").value =
        admin.name || "Administrator";

    document.getElementById("adminEmail").value =
        admin.email || "";

    document.getElementById("adminPhone").value =
        admin.phone || "";

}

/*=========================================================
                SAVE ADMIN PROFILE
=========================================================*/

function saveAdminProfile() {

    showLoading();

    const password =
        document.getElementById("newPassword").value;

    const confirm =
        document.getElementById("confirmPassword").value;

    if (password !== confirm) {

        hideLoading();

        showToast(

            "Passwords do not match",

            "error"

        );

        return;

    }

    const admin = {

        name:

        document.getElementById("adminName").value,

        email:

        document.getElementById("adminEmail").value,

        phone:

        document.getElementById("adminPhone").value,

        password: password

    };

    localStorage.setItem(

        STORAGE.ADMIN,

        JSON.stringify(admin)

    );

    setTimeout(() => {

        hideLoading();

        showToast(

            "Administrator profile updated",

            "success"

        );

    }, 700);

}

/*=========================================================
                APPEARANCE
=========================================================*/

function loadAppearanceSettings() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    const theme =

        document.getElementById("themeSelect");

    if (theme) {

        theme.value =

            settings.theme || "light";

    }

    const color =

        document.getElementById("themeColor");

    if (color) {

        color.value =

            settings.color || "#2563eb";

    }

}

function saveAppearance() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    const theme =

        document.getElementById("themeSelect");

    const color =

        document.getElementById("themeColor");

    settings.theme =

        theme ? theme.value : "light";

    settings.color =

        color ? color.value : "#2563eb";

    localStorage.setItem(

        STORAGE.SETTINGS,

        JSON.stringify(settings)

    );

    document.documentElement.style.setProperty(

        "--primary",

        settings.color

    );

    showToast(

        "Appearance updated",

        "success"

    );

}

/*=========================================================
                SYSTEM INFO
=========================================================*/

function updateSystemInfo() {

    const users = JSON.parse(

        localStorage.getItem("users")

    ) || [];

    const counter =

        document.getElementById("userCount");

    if (counter) {

        counter.innerText = users.length;

    }

}
/*=========================================================
                    HMS PRO SETTINGS
                    PART 6B
        USER MANAGEMENT
=========================================================*/

/*=========================================================
                LOAD USERS
=========================================================*/

function loadUsers() {

    SETTINGS.users = JSON.parse(

        localStorage.getItem("users")

    ) || [];

    renderUsers();

}

/*=========================================================
                RENDER USERS
=========================================================*/

function renderUsers(list = SETTINGS.users) {

    const tbody = document.getElementById("usersTable");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (list.length === 0) {

        tbody.innerHTML = `

        <tr>

            <td colspan="6" class="text-center">

                No Users Found

            </td>

        </tr>

        `;

        return;

    }

    list.forEach((user, index) => {

        tbody.innerHTML += `

        <tr>

            <td>${index + 1}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>

                <span class="badge badge-info">

                    ${user.role}

                </span>

            </td>

            <td>

                <span class="badge badge-success">

                    Active

                </span>

            </td>

            <td>

                <button

                    class="primary-btn"

                    onclick="editUser(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button

                    class="delete-btn"

                    onclick="deleteUser(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/*=========================================================
                ADD USER
=========================================================*/

function addNewUser() {

    const name = prompt("Enter User Name");

    if (!name) return;

    const email = prompt("Enter Email");

    if (!email) return;

    const role = prompt(

        "Enter Role (ADMIN / DOCTOR / STAFF)",

        "STAFF"

    );

    SETTINGS.users.push({

        name,

        email,

        role

    });

    localStorage.setItem(

        "users",

        JSON.stringify(SETTINGS.users)

    );

    renderUsers();

    updateSystemInfo();

    showToast(

        "User Added Successfully",

        "success"

    );

}

/*=========================================================
                EDIT USER
=========================================================*/

function editUser(index) {

    const user = SETTINGS.users[index];

    if (!user) return;

    const name = prompt(

        "Update Name",

        user.name

    );

    if (name === null) return;

    const email = prompt(

        "Update Email",

        user.email

    );

    if (email === null) return;

    const role = prompt(

        "Update Role",

        user.role

    );

    SETTINGS.users[index] = {

        name,

        email,

        role

    };

    localStorage.setItem(

        "users",

        JSON.stringify(SETTINGS.users)

    );

    renderUsers();

    showToast(

        "User Updated",

        "success"

    );

}

/*=========================================================
                DELETE USER
=========================================================*/

function deleteUser(index) {

    if (!confirm("Delete this user?"))

        return;

    SETTINGS.users.splice(index, 1);

    localStorage.setItem(

        "users",

        JSON.stringify(SETTINGS.users)

    );

    renderUsers();

    updateSystemInfo();

    showToast(

        "User Deleted",

        "warning"

    );

}

/*=========================================================
                SEARCH USERS
=========================================================*/

function searchUsers(keyword) {

    keyword = keyword.toLowerCase();

    const filtered = SETTINGS.users.filter(user =>

        user.name.toLowerCase().includes(keyword) ||

        user.email.toLowerCase().includes(keyword) ||

        user.role.toLowerCase().includes(keyword)

    );

    renderUsers(filtered);

}

/*=========================================================
                INITIALIZE USERS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadUsers();

    const search = document.getElementById("searchUsers");

    if (search) {

        search.addEventListener("keyup", e => {

            searchUsers(e.target.value);

        });

    }

});
/*=========================================================
                    HMS PRO SETTINGS
                    PART 6C
        NOTIFICATIONS • BACKUP • SYSTEM
=========================================================*/

/*=========================================================
                NOTIFICATION SETTINGS
=========================================================*/

function loadNotificationSettings() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    const email = document.getElementById("emailNotification");
    const sms = document.getElementById("smsNotification");
    const appointment = document.getElementById("appointmentAlert");
    const inventory = document.getElementById("inventoryAlert");

    if (email) email.checked = settings.emailNotification ?? true;

    if (sms) sms.checked = settings.smsNotification ?? true;

    if (appointment) appointment.checked = settings.appointmentAlert ?? true;

    if (inventory) inventory.checked = settings.inventoryAlert ?? true;

}

/*=========================================================
                SAVE NOTIFICATIONS
=========================================================*/

function saveNotifications() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    settings.emailNotification =
        document.getElementById("emailNotification")?.checked;

    settings.smsNotification =
        document.getElementById("smsNotification")?.checked;

    settings.appointmentAlert =
        document.getElementById("appointmentAlert")?.checked;

    settings.inventoryAlert =
        document.getElementById("inventoryAlert")?.checked;

    localStorage.setItem(

        STORAGE.SETTINGS,

        JSON.stringify(settings)

    );

    showToast(

        "Notification settings saved.",

        "success"

    );

}

/*=========================================================
                SYSTEM SETTINGS
=========================================================*/

function loadSystemSettings() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    const timezone = document.getElementById("timezone");

    const dateFormat = document.getElementById("dateFormat");

    const currency = document.getElementById("currency");

    const autoLogout = document.getElementById("autoLogout");

    if (timezone)

        timezone.value = settings.timezone || "Asia/Kolkata";

    if (dateFormat)

        dateFormat.value = settings.dateFormat || "DD/MM/YYYY";

    if (currency)

        currency.value = settings.currency || "INR (₹)";

    if (autoLogout)

        autoLogout.value = settings.autoLogout || 30;

}

/*=========================================================
                SAVE SYSTEM SETTINGS
=========================================================*/

function saveSystemSettings() {

    const settings = JSON.parse(

        localStorage.getItem(STORAGE.SETTINGS)

    ) || {};

    settings.timezone =
        document.getElementById("timezone")?.value;

    settings.dateFormat =
        document.getElementById("dateFormat")?.value;

    settings.currency =
        document.getElementById("currency")?.value;

    settings.autoLogout =
        document.getElementById("autoLogout")?.value;

    localStorage.setItem(

        STORAGE.SETTINGS,

        JSON.stringify(settings)

    );

    showToast(

        "System settings updated.",

        "success"

    );

}

/*=========================================================
                CREATE BACKUP
=========================================================*/

function createBackup() {

    showLoading();

    const backup = {

        hospital:

            JSON.parse(localStorage.getItem(STORAGE.HOSPITAL)) || {},

        admin:

            JSON.parse(localStorage.getItem(STORAGE.ADMIN)) || {},

        settings:

            JSON.parse(localStorage.getItem(STORAGE.SETTINGS)) || {},

        users:

            JSON.parse(localStorage.getItem("users")) || [],

        backupDate:

            new Date().toLocaleString()

    };

    const blob = new Blob(

        [JSON.stringify(backup, null, 4)],

        {

            type: "application/json"

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "HMS_Backup.json";

    a.click();

    URL.revokeObjectURL(url);

    hideLoading();

    showToast(

        "Backup downloaded successfully.",

        "success"

    );

}

/*=========================================================
                RESTORE BACKUP
=========================================================*/

function restoreBackup() {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".json";

    input.onchange = function(e) {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(event) {

            try {

                const data = JSON.parse(event.target.result);

                if (data.hospital)

                    localStorage.setItem(

                        STORAGE.HOSPITAL,

                        JSON.stringify(data.hospital)

                    );

                if (data.admin)

                    localStorage.setItem(

                        STORAGE.ADMIN,

                        JSON.stringify(data.admin)

                    );

                if (data.settings)

                    localStorage.setItem(

                        STORAGE.SETTINGS,

                        JSON.stringify(data.settings)

                    );

                if (data.users)

                    localStorage.setItem(

                        "users",

                        JSON.stringify(data.users)

                    );

                initializeSettings();

                loadUsers();

                showToast(

                    "Backup restored successfully.",

                    "success"

                );

            }

            catch (error) {

                console.error(error);

                showToast(

                    "Invalid backup file.",

                    "error"

                );

            }

        };

        reader.readAsText(file);

    };

    input.click();

}

/*=========================================================
                EXPORT REPORTS
=========================================================*/

function exportReports() {

    showToast(

        "Report export feature will be connected to backend.",

        "success"

    );

}
/*=========================================================
                    HMS PRO SETTINGS
                    PART 6D
            HELPERS • TOAST • LOADER
=========================================================*/

/*=========================================================
                SHOW LOADING
=========================================================*/

function showLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "flex";

    }

}

/*=========================================================
                HIDE LOADING
=========================================================*/

function hideLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "none";

    }

}

/*=========================================================
                TOAST MESSAGE
=========================================================*/

function showToast(message, type = "success") {

    const container = document.getElementById("toastContainer");

    if (!container) {

        alert(message);

        return;

    }

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    let icon = "fa-circle-check";

    if (type === "error") {

        icon = "fa-circle-xmark";

    }

    else if (type === "warning") {

        icon = "fa-triangle-exclamation";

    }

    toast.innerHTML = `

        <i class="fa-solid ${icon}"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

/*=========================================================
                LOGO PREVIEW
=========================================================*/

const logoUpload = document.getElementById("logoUpload");

if (logoUpload) {

    logoUpload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            const logo = document.getElementById("hospitalLogo");

            if (logo) {

                logo.src = e.target.result;

            }

        };

        reader.readAsDataURL(file);

    });

}

/*=========================================================
                RESET SETTINGS
=========================================================*/

function resetSettings() {

    if (!confirm("Reset all settings?"))

        return;

    localStorage.removeItem(STORAGE.HOSPITAL);

    localStorage.removeItem(STORAGE.ADMIN);

    localStorage.removeItem(STORAGE.SETTINGS);

    initializeSettings();

    showToast(

        "Settings reset successfully.",

        "warning"

    );

}

/*=========================================================
                LOGOUT
=========================================================*/

function logout() {

    if (!confirm("Logout from HMS PRO?"))

        return;

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("name");

    localStorage.removeItem("doctorId");

    window.location.href = "login.html";

}

/*=========================================================
                PAGE REFRESH
=========================================================*/

function refreshSettings() {

    initializeSettings();

    loadUsers();

}

/*=========================================================
                AUTO SAVE
=========================================================*/

document.addEventListener("change", () => {

    console.log("Settings changed.");

});

/*=========================================================
                PAGE READY
=========================================================*/

window.addEventListener("load", () => {

    refreshSettings();

    console.log("Settings Module Loaded Successfully");

});

/*=========================================================
                END OF SETTINGS
=========================================================*/