/*=========================================================
                HMS PRO COMMON
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("HMS PRO Common JS Loaded");

});

/*=========================================================
                LOGOUT
=========================================================*/

function logout() {

    localStorage.clear();

    window.location.href = "login.html";

}

/*=========================================================
                TOAST
=========================================================*/

function showToast(message, type = "success") {

    const container = document.getElementById("toastContainer");

    if (!container) {

        alert(message);

        return;

    }

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = `
        <i class="fa-solid fa-circle-info"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}

/*=========================================================
                LOADING
=========================================================*/

function showLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "flex";

    }

}

function hideLoading() {

    const loader = document.getElementById("loadingOverlay");

    if (loader) {

        loader.style.display = "none";

    }

}

/*=========================================================
                CONFIRM DELETE
=========================================================*/

function confirmAction(message = "Are you sure?") {

    return confirm(message);

}