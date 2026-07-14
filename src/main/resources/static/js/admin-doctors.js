console.log("🏥 HMS PRO - Admin Doctors Loaded");

/*=========================================================
                    API CONFIGURATION
=========================================================*/

const DOCTOR_API = API_URL + "/doctors";

const ADMIN_DOCTOR_API = API_URL + "/admin/doctor";
/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

let doctors = [];
let deleteDoctorId = null;

/*=========================================================
                    PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializePage();

});

function initializePage(){

    loadDoctors();

}

/*=========================================================
                    TOAST
=========================================================*/

function showToast(message,type="success"){

    const oldToast=document.querySelector(".toast");

    if(oldToast){

        oldToast.remove();

    }

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

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

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*=========================================================
                    LOADING
=========================================================*/

function showLoading(){

    document.getElementById("doctorTable").innerHTML=`

        <tr>

            <td colspan="7">

                <div class="loading">

                    <div class="spinner"></div>

                </div>

            </td>

        </tr>

    `;

}

/*=========================================================
                    LOAD DOCTORS
=========================================================*/

async function loadDoctors(){

    showLoading();

    try{

        const response=await fetch(DOCTOR_API);

        if(!response.ok){

            throw new Error("Unable to load doctors.");

        }

        doctors=await response.json();

        renderDoctors(doctors);

        updateStatistics();

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

    }

}

/*=========================================================
                    RENDER TABLE
=========================================================*/

function renderDoctors(list){

    const table=document.getElementById("doctorTable");

    if(!list || list.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="7">

                <div class="no-data">

                    <i class="fa-solid fa-user-doctor"></i>

                    <h3>No Doctors Found</h3>

                    <p>Add your first doctor.</p>

                </div>

            </td>

        </tr>

        `;

        return;

    }

    table.innerHTML=list.map(doctor=>`

<tr>

<td>

<strong>#${doctor.id}</strong>

</td>

<td>

<div class="doctor-profile">

<div class="doctor-avatar">

<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=ffffff">

</div>

<div class="doctor-info">

<h4>Dr. ${doctor.name}</h4>

<small>${doctor.specialization || "General Medicine"}</small>

</div>

</div>

</td>

<td>

<span class="badge badge-info">

${doctor.specialization || "General"}

</span>

</td>

<td>

${doctor.email || "-"}

</td>

<td>

${doctor.phone || "-"}

</td>

<td>

<span class="badge badge-success">

${doctor.status || "Active"}

</span>

</td>

<td>

<div class="action-buttons">

<button
class="edit-btn"
onclick="editDoctor(${doctor.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="delete-btn"
onclick="deleteDoctor(${doctor.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

</tr>

`).join("");

}

/*=========================================================
                    DASHBOARD COUNTS
=========================================================*/

function updateStatistics(){

    document.getElementById("doctorCount").textContent=
    doctors.length;

    const active=
    doctors.filter(d=>

        !d.status ||

        d.status==="Active"

    ).length;

    document.getElementById("activeDoctorCount").textContent=
    active;

    const departments=new Set(

        doctors.map(d=>

            d.specialization || "General"

        )

    );

    document.getElementById("departmentCount").textContent=
    departments.size;

    document.getElementById("todayAppointmentCount").textContent=
    "0";

}
/*=========================================================
                    SEARCH DOCTOR
=========================================================*/

function searchDoctor(){

    const keyword=document
    .getElementById("searchDoctor")
    .value
    .trim()
    .toLowerCase();

    if(keyword===""){

        renderDoctors(doctors);

        return;

    }

    const filtered=doctors.filter(doctor=>{

        return(

            (doctor.name || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (doctor.email || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (doctor.phone || "")
            .toLowerCase()
            .includes(keyword)

            ||

            (doctor.specialization || "")
            .toLowerCase()
            .includes(keyword)

        );

    });

    renderDoctors(filtered);

}

/*=========================================================
                    OPEN MODAL
=========================================================*/

function openDoctorModal(){

    document.getElementById("modalTitle").innerHTML=`

        <i class="fa-solid fa-user-plus"></i>

        Add Doctor

    `;

    document.getElementById("doctorId").value="";

    document.getElementById("doctorName").value="";

    document.getElementById("doctorEmail").value="";

    document.getElementById("doctorPassword").value="";

    document.getElementById("doctorPhone").value="";

    document.getElementById("doctorSpecialization").selectedIndex=0;

    document.getElementById("doctorQualification").value="";

    document.getElementById("doctorExperience").value="";

    document.getElementById("doctorFee").value="";

    document.getElementById("doctorRoom").value="";

    document.getElementById("doctorShift").selectedIndex=0;

    document.getElementById("doctorStatus").selectedIndex=0;

    document.getElementById("doctorModal").style.display="flex";

}

/*=========================================================
                    CLOSE MODAL
=========================================================*/

function closeDoctorModal(){

    document.getElementById("doctorModal").style.display="none";

}

/*=========================================================
                    SAVE DOCTOR
=========================================================*/

async function saveDoctor(){

    const id=document.getElementById("doctorId").value;

    const doctor={

        name:
        document.getElementById("doctorName").value.trim(),

        email:
        document.getElementById("doctorEmail").value.trim(),

        phone:
        document.getElementById("doctorPhone").value.trim(),

        specialization:
        document.getElementById("doctorSpecialization").value,

        qualification:
        document.getElementById("doctorQualification").value,

        experience:
        document.getElementById("doctorExperience").value,

        consultationFee:
        document.getElementById("doctorFee").value,

        roomNumber:
        document.getElementById("doctorRoom").value,

        shift:
        document.getElementById("doctorShift").value,

        status:
        document.getElementById("doctorStatus").value

    };

    if(id===""){

        doctor.password=
        document.getElementById("doctorPassword")
        .value
        .trim();

    }

    if(

        doctor.name===""

        ||

        doctor.email===""

        ||

        doctor.phone===""

        ||

        doctor.specialization===""

        ||

        (id==="" && doctor.password==="")

    ){

        showToast(

            "Please fill all mandatory fields.",

            "warning"

        );

        return;

    }

    const saveButton=document.querySelector(

        ".modal-footer .primary-btn"

    );

    const originalHTML=saveButton.innerHTML;

    saveButton.disabled=true;

    saveButton.innerHTML=`

        <i class="fa-solid fa-spinner fa-spin"></i>

        Saving...

    `;

    try{

        const response=await fetch(

            id===""

            ? ADMIN_DOCTOR_API

            : `${DOCTOR_API}/${id}`,

            {

                method:id===""?"POST":"PUT",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(doctor)

            }

        );

        if(!response.ok){

            throw new Error(

                await response.text()

            );

        }

        showToast(

            id===""

            ?

            "Doctor added successfully."

            :

            "Doctor updated successfully."

        );

        closeDoctorModal();

        await loadDoctors();

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

    }

    finally{

        saveButton.disabled=false;

        saveButton.innerHTML=originalHTML;

    }

}
/*=========================================================
                    EDIT DOCTOR
=========================================================*/

async function editDoctor(id){

    try{

        const response = await fetch(`${DOCTOR_API}/${id}`);

        if(!response.ok){

            throw new Error("Unable to load doctor.");

        }

        const doctor = await response.json();

        document.getElementById("modalTitle").innerHTML=`

            <i class="fa-solid fa-user-pen"></i>

            Edit Doctor

        `;

        document.getElementById("doctorId").value =
        doctor.id;

        document.getElementById("doctorName").value =
        doctor.name || "";

        document.getElementById("doctorEmail").value =
        doctor.email || "";

        document.getElementById("doctorPassword").value = "";

        document.getElementById("doctorPhone").value =
        doctor.phone || "";

        document.getElementById("doctorSpecialization").value =
        doctor.specialization || "";

        document.getElementById("doctorQualification").value =
        doctor.qualification || "";

        document.getElementById("doctorExperience").value =
        doctor.experience || "";

        document.getElementById("doctorFee").value =
        doctor.consultationFee || "";

        document.getElementById("doctorRoom").value =
        doctor.roomNumber || "";

        document.getElementById("doctorShift").value =
        doctor.shift || "Morning";

        document.getElementById("doctorStatus").value =
        doctor.status || "Active";

        document.getElementById("doctorModal").style.display="flex";

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

    }

}

/*=========================================================
                    DELETE
=========================================================*/

function deleteDoctor(id){

    deleteDoctorId=id;

    document.getElementById("deleteModal").style.display="flex";

}

/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/

function closeDeleteModal(){

    deleteDoctorId=null;

    document.getElementById("deleteModal").style.display="none";

}

/*=========================================================
                CONFIRM DELETE
=========================================================*/

async function confirmDelete(){

    if(deleteDoctorId==null){

        return;

    }

    try{

        const response=await fetch(

            `${DOCTOR_API}/${deleteDoctorId}`,

            {

                method:"DELETE"

            }

        );

        if(!response.ok){

            throw new Error("Unable to delete doctor.");

        }

        closeDeleteModal();

        showToast(

            "Doctor deleted successfully."

        );

        await loadDoctors();

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

    const password=

    document.getElementById("doctorPassword");

    const icon=

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
                    LOGOUT
=========================================================*/

function logout(){

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("name");

    window.location.href="login.html";

}

/*=========================================================
                CLOSE MODALS USING ESC
=========================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeDoctorModal();

        closeDeleteModal();

    }

});

/*=========================================================
            CLICK OUTSIDE TO CLOSE
=========================================================*/

window.addEventListener("click",(e)=>{

    const doctorModal=

    document.getElementById("doctorModal");

    const deleteModal=

    document.getElementById("deleteModal");

    if(e.target===doctorModal){

        closeDoctorModal();

    }

    if(e.target===deleteModal){

        closeDeleteModal();

    }

});

/*=========================================================
                    END OF FILE
=========================================================*/

console.log("✅ HMS PRO Admin Doctors Ready");