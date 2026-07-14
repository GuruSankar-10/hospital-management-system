/*=========================================================
            HMS PRO STAFF APPOINTMENTS
=========================================================*/

const STAFF_APPOINTMENT_API = `${API_URL}/appointments`;

let appointments = [];
let filteredAppointments = [];

/*=========================================================
            PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeAppointments();

});

/*=========================================================
            INITIALIZE
=========================================================*/

async function initializeAppointments() {

    showLoading();

    loadStaffName();

    await loadAppointments();

    hideLoading();

}

/*=========================================================
            LOAD STAFF NAME
=========================================================*/

function loadStaffName() {

    const name = localStorage.getItem("name") || "Staff";

    const staff = document.getElementById("staffName");

    if(staff){

        staff.textContent = name;

    }

}

/*=========================================================
            LOAD APPOINTMENTS
=========================================================*/

async function loadAppointments() {

    try{

        const response = await fetch(STAFF_APPOINTMENT_API);

        if(!response.ok){

            throw new Error("Unable to load appointments");

        }

        appointments = await response.json();

        filteredAppointments = [...appointments];

        updateStatistics();

        renderAppointments();

    }

    catch(error){

        console.error(error);

        showToast("Failed to load appointments","error");

    }

}

/*=========================================================
            UPDATE DASHBOARD
=========================================================*/

function updateStatistics(){

    document.getElementById("appointmentCount").textContent = appointments.length;

    document.getElementById("todayAppointments").textContent = appointments.length;

    const doctors = new Set();

    let completed = 0;

    let scheduled = 0;

    let cancelled = 0;

    appointments.forEach(app=>{

        if(app.doctor?.name){

            doctors.add(app.doctor.name);

        }

        const status=(app.status || "Scheduled").toLowerCase();

        if(status==="completed"){

            completed++;

        }

        else if(status==="cancelled"){

            cancelled++;

        }

        else{

            scheduled++;

        }

    });

    document.getElementById("doctorCount").textContent = doctors.size;

    document.getElementById("scheduledCount").textContent = scheduled;

    document.getElementById("completedCount").textContent = completed;

    document.getElementById("cancelledCount").textContent = cancelled;

}

console.log("📅 HMS Staff Appointments Loaded");
/*=========================================================
            RENDER APPOINTMENTS
=========================================================*/

function renderAppointments(){

    const table=document.getElementById("appointmentTable");

    if(!table) return;

    table.innerHTML="";

    if(filteredAppointments.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="7" class="text-center">

                No Appointments Found

            </td>

        </tr>

        `;

        return;

    }

    filteredAppointments.forEach(appointment=>{

        const status=appointment.status || "Scheduled";

        let badge="badge-primary";

        if(status.toLowerCase()==="completed"){

            badge="badge-success";

        }

        else if(status.toLowerCase()==="cancelled"){

            badge="badge-danger";

        }

        table.innerHTML+=`

        <tr>

            <td>${appointment.id}</td>

            <td>${appointment.patient?.name ?? "-"}</td>

            <td>${appointment.doctor?.name ?? "-"}</td>

            <td>${appointment.appointmentDate ?? "-"}</td>

            <td>${appointment.appointmentTime ?? "-"}</td>

            <td>

                <span class="badge ${badge}">

                    ${status}

                </span>

            </td>

            <td>

                <button
                    class="table-btn view"
                    onclick="viewAppointment(${appointment.id})">

                    <i class="fas fa-eye"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

/*=========================================================
            SEARCH
=========================================================*/

function searchAppointments(){

    const keyword=document
        .getElementById("searchAppointment")
        .value
        .toLowerCase();

    filteredAppointments=appointments.filter(app=>

        (app.patient?.name ?? "")
        .toLowerCase()
        .includes(keyword)

        ||

        (app.doctor?.name ?? "")
        .toLowerCase()
        .includes(keyword)

        ||

        (app.status ?? "")
        .toLowerCase()
        .includes(keyword)

    );

    filterAppointments();

}

/*=========================================================
            STATUS FILTER
=========================================================*/

function filterAppointments(){

    const status=document
        .getElementById("statusFilter")
        ?.value;

    if(status && status!==""){

        filteredAppointments=filteredAppointments.filter(app=>

            (app.status ?? "Scheduled")===status

        );

    }

    renderAppointments();

}

/*=========================================================
            VIEW APPOINTMENT
=========================================================*/

function viewAppointment(id){

    const appointment=appointments.find(a=>a.id===id);

    if(!appointment) return;

    document.getElementById("appointmentDetails").innerHTML=`

        <div class="profile-details">

            <h2>

                Appointment #${appointment.id}

            </h2>

            <hr>

            <p>

                <strong>Patient :</strong>

                ${appointment.patient?.name ?? "-"}

            </p>

            <p>

                <strong>Doctor :</strong>

                ${appointment.doctor?.name ?? "-"}

            </p>

            <p>

                <strong>Date :</strong>

                ${appointment.appointmentDate ?? "-"}

            </p>

            <p>

                <strong>Time :</strong>

                ${appointment.appointmentTime ?? "-"}

            </p>

            <p>

                <strong>Status :</strong>

                ${appointment.status ?? "Scheduled"}

            </p>

        </div>

    `;

    document.getElementById("appointmentModal").style.display="flex";

}

/*=========================================================
            CLOSE MODAL
=========================================================*/

function closeAppointmentModal(){

    document.getElementById("appointmentModal").style.display="none";

}
/*=========================================================
                LOADING
=========================================================*/

function showLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="flex";

    }

}

function hideLoading(){

    const loading=document.getElementById("loadingOverlay");

    if(loading){

        loading.style.display="none";

    }

}

/*=========================================================
                TOAST
=========================================================*/

function showToast(message,type="success"){

    const container=document.getElementById("toastContainer");

    if(!container) return;

    const toast=document.createElement("div");

    toast.className=`toast ${type}`;

    toast.innerHTML=`

        <i class="fas ${
            type==="success"
            ? "fa-check-circle"
            : "fa-times-circle"
        }"></i>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);

}

/*=========================================================
                REFRESH
=========================================================*/

async function refreshAppointments(){

    showLoading();

    await loadAppointments();

    hideLoading();

    showToast("Appointments refreshed");

}

/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(()=>{

    loadAppointments();

},300000);

/*=========================================================
                CLOSE MODAL
=========================================================*/

window.onclick=function(event){

    const modal=document.getElementById("appointmentModal");

    if(event.target===modal){

        closeAppointmentModal();

    }

};

/*=========================================================
                ESC KEY
=========================================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeAppointmentModal();

    }

});

/*=========================================================
                FILTER CHANGE
=========================================================*/

const statusFilter=document.getElementById("statusFilter");

if(statusFilter){

    statusFilter.addEventListener("change",()=>{

        filteredAppointments=[...appointments];

        filterAppointments();

    });

}

/*=========================================================
                WINDOW FOCUS
=========================================================*/

window.addEventListener("focus",()=>{

    loadAppointments();

});

/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener("visibilitychange",()=>{

    if(!document.hidden){

        loadAppointments();

    }

});

/*=========================================================
                READY
=========================================================*/

console.log("📅 HMS PRO Staff Appointments Ready");