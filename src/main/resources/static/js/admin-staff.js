

/*=========================================================
                    API CONFIGURATION
=========================================================*/

const STAFF_API = API_URL + "/staff";

const REGISTER_API = API_URL + "/staff/register";
/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

let staffList = [];

let deleteStaffId = null;

/*=========================================================
                    PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializePage();

});

/*=========================================================
                    INITIALIZE
=========================================================*/

async function initializePage(){

    showLoading();

    await loadStaff();

    hideLoading();

}

/*=========================================================
                    LOADING
=========================================================*/

function showLoading(){

    const loading =
    document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading =
    document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="none";

    }

}

/*=========================================================
                    TOAST
=========================================================*/

function showToast(message,type="success"){

    const container =
    document.getElementById("toastContainer");

    if(!container) return;

    const toast =
    document.createElement("div");

    toast.className =
    `toast ${type}`;

    toast.innerHTML=`

        <i class="fa-solid ${
            type==="success"
            ? "fa-circle-check"
            : type==="error"
            ? "fa-circle-xmark"
            : "fa-circle-info"
        }"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*=========================================================
                    LOAD STAFF
=========================================================*/

async function loadStaff(){

    try{

        const response =
        await fetch(STAFF_API);

        if(!response.ok){

            throw new Error(
                "Unable to load staff."
            );

        }

        staffList =
        await response.json();

        renderStaffTable();

        updateStatistics();

    }

    catch(error){

        console.error(error);

        showToast(
            error.message,
            "error"
        );

    }

}

/*=========================================================
                    RENDER TABLE
=========================================================*/

function renderStaffTable(){

    const table =
    document.getElementById("staffTable");

    if(!table) return;

    if(staffList.length===0){

        table.innerHTML=`

        <tr>

        <td colspan="9">

        No Staff Found

        </td>

        </tr>

        `;

        return;

    }

    table.innerHTML =
    staffList.map(staff=>`

<tr>

<td>

${staff.id}

</td>

<td>

<div class="staff-profile">

<div class="staff-avatar">

<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(staff.fullName || staff.name)}&background=2563eb&color=ffffff">

</div>

<div class="staff-info">

<h4>

${staff.fullName || staff.name}

</h4>

<small>

${staff.designation || "-"}

</small>

</div>

</div>

</td>

<td>

${staff.email}

</td>

<td>

${staff.phone || "-"}

</td>

<td>

${staff.department || "-"}

</td>

<td>

${staff.designation || "-"}

</td>

<td>

${staff.shift || "Morning"}

</td>

<td>

<span class="badge badge-success">

${staff.status || "Active"}

</span>

</td>

<td>

<div class="action-buttons">

<button

class="edit-btn"

onclick="editStaff(${staff.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button

class="delete-btn"

onclick="deleteStaff(${staff.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

</tr>

`).join("");

}

/*=========================================================
                UPDATE STATISTICS
=========================================================*/

function updateStatistics(){

    setValue(

        "staffCount",

        staffList.length

    );

    const active =
    staffList.filter(s=>

        !s.status ||

        s.status==="Active"

    ).length;

    setValue(

        "activeStaffCount",

        active

    );

    const departments =
    new Set(

        staffList.map(s=>

            s.department || "General"

        )

    );

    setValue(

        "departmentCount",

        departments.size

    );

}

/*=========================================================
                    HELPER
=========================================================*/

function setValue(id,value){

    const element =
    document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}
/*=========================================================
                    EDIT STAFF
=========================================================*/

async function editStaff(id){

    try{

        const response = await fetch(`${STAFF_API}/${id}`);

        if(!response.ok){

            throw new Error("Unable to load staff details.");

        }

        const staff = await response.json();

        document.getElementById("modalTitle").innerHTML=`

            <i class="fa-solid fa-user-pen"></i>

            Edit Staff

        `;

        document.getElementById("staffId").value =
        staff.id || "";

        document.getElementById("staffName").value =
        staff.fullName || staff.name || "";

        document.getElementById("staffEmail").value =
        staff.email || "";

        document.getElementById("staffPassword").value = "";

        document.getElementById("staffPhone").value =
        staff.phone || "";

        document.getElementById("staffDepartment").value =
        staff.department || "";

        document.getElementById("staffDesignation").value =
        staff.designation || "";

        document.getElementById("staffShift").value =
        staff.shift || "Morning";

        document.getElementById("staffStatus").value =
        staff.status || "Active";

        document.getElementById("staffModal").style.display="flex";

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

    }

}

/*=========================================================
                    DELETE STAFF
=========================================================*/

function deleteStaff(id){

    deleteStaffId = id;

    document.getElementById("deleteModal").style.display="flex";

}

/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/

function closeDeleteModal(){

    deleteStaffId = null;

    document.getElementById("deleteModal").style.display="none";

}

/*=========================================================
                CONFIRM DELETE
=========================================================*/

async function confirmDelete(){

    if(deleteStaffId==null){

        return;

    }

    try{

        const response = await fetch(

            `${STAFF_API}/${deleteStaffId}`,

            {

                method:"DELETE"

            }

        );

        if(!response.ok){

            throw new Error("Unable to delete staff.");

        }

        closeDeleteModal();

        showToast(

            "Staff deleted successfully."

        );

        await loadStaff();

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

    }

}

/*=========================================================
                PASSWORD TOGGLE
=========================================================*/

function togglePassword(){

    const password =

    document.getElementById("staffPassword");

    const icon =

    document.getElementById("togglePassword");

    if(password.type==="password"){

        password.type="text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else{

        password.type="password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}

/*=========================================================
                EXPORT CSV
=========================================================*/

function exportCSV(){

    if(staffList.length===0){

        showToast("No staff data available.","warning");

        return;

    }

    let csv =

    "ID,Name,Email,Phone,Department,Designation,Shift,Status\n";

    staffList.forEach(staff=>{

        csv +=

        `${staff.id},`+

        `"${staff.fullName || staff.name}",`+

        `"${staff.email}",`+

        `"${staff.phone || ""}",`+

        `"${staff.department || ""}",`+

        `"${staff.designation || ""}",`+

        `"${staff.shift || ""}",`+

        `"${staff.status || "Active"}"\n`;

    });

    const blob =

    new Blob([csv],{

        type:"text/csv"

    });

    const url =

    window.URL.createObjectURL(blob);

    const link =

    document.createElement("a");

    link.href = url;

    link.download = "staff.csv";

    link.click();

    window.URL.revokeObjectURL(url);

}

/*=========================================================
                REFRESH
=========================================================*/

function refreshPage(){

    loadStaff();

}
/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(() => {

    loadStaff();

}, 30000);

/*=========================================================
                ESC KEY CLOSE
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeStaffModal();

        closeDeleteModal();

    }

});

/*=========================================================
            CLICK OUTSIDE MODAL
=========================================================*/

window.addEventListener("click",(e)=>{

    const staffModal =

    document.getElementById("staffModal");

    const deleteModal =

    document.getElementById("deleteModal");

    if(e.target===staffModal){

        closeStaffModal();

    }

    if(e.target===deleteModal){

        closeDeleteModal();

    }

});

/*=========================================================
                LOGOUT
=========================================================*/

function logout(){

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("email");

    localStorage.removeItem("name");

    localStorage.removeItem("staffId");

    window.location.href="login.html";

}

/*=========================================================
                PAGE REFRESH
=========================================================*/

window.addEventListener("focus",()=>{

    loadStaff();

});

/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        loadStaff();

    }

});

/*=========================================================
                INITIAL CHECK
=========================================================*/

(function(){

    if(!localStorage.getItem("token")){

        console.warn("User not logged in.");

        // Uncomment if login is mandatory

        // window.location.href="login.html";

    }

})();

/*=========================================================
                END OF FILE
=========================================================*/

console.log("✅ HMS PRO Staff Management Ready");