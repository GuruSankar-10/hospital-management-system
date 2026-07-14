console.log("🏥 HMS PRO Dashboard Loaded");

/*=========================================================
                    API CONFIGURATION
=========================================================*/
const API = {

    doctors: API_URL + "/doctors",

    patients: API_URL + "/patients",

    appointments: API_URL + "/appointments",

    billing: API_URL + "/billing"

};
/*=========================================================
                    GLOBAL DATA
=========================================================*/

let doctors = [];
let patients = [];
let appointments = [];
let bills = [];

/*=========================================================
                    PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeDashboard();

});

/*=========================================================
                    INITIALIZE
=========================================================*/

async function initializeDashboard(){

    showLoading();

    await Promise.all([

        loadDoctors(),

        loadPatients(),

        loadAppointments(),

        loadBilling()

    ]);

    updateDashboardCards();

    hideLoading();

}

/*=========================================================
                    LOADING
=========================================================*/

function showLoading(){

    const overlay =
    document.getElementById("loadingOverlay");

    if(overlay){

        overlay.style.display="flex";

    }

}

function hideLoading(){

    const overlay =
    document.getElementById("loadingOverlay");

    if(overlay){

        overlay.style.display="none";

    }

}

/*=========================================================
                    LOAD DOCTORS
=========================================================*/

async function loadDoctors(){

    try{

        const response =
        await fetch(API.doctors);

        if(!response.ok){

            throw new Error("Unable to load doctors.");

        }

        doctors =
        await response.json();

    }

    catch(error){

        console.error(error);

        doctors=[];

    }

}

/*=========================================================
                    LOAD PATIENTS
=========================================================*/

async function loadPatients(){

    try{

        const response =
        await fetch(API.patients);

        if(!response.ok){

            throw new Error("Unable to load patients.");

        }

        patients =
        await response.json();

    }

    catch(error){

        console.error(error);

        patients=[];

    }

}

/*=========================================================
                    LOAD APPOINTMENTS
=========================================================*/

async function loadAppointments(){

    try{

        const response =
        await fetch(API.appointments);

        if(!response.ok){

            throw new Error("Unable to load appointments.");

        }

        appointments =
        await response.json();

    }

    catch(error){

        console.error(error);

        appointments=[];

    }

}

/*=========================================================
                    LOAD BILLING
=========================================================*/

async function loadBilling(){

    try{

        const response =
        await fetch(API.billing);

        if(!response.ok){

            throw new Error("Unable to load billing.");

        }

        bills =
        await response.json();

    }

    catch(error){

        console.error(error);

        bills=[];

    }

}

/*=========================================================
                UPDATE DASHBOARD CARDS
=========================================================*/

function updateDashboardCards(){

    setText("doctorCount", doctors.length);

    setText("patientCount", patients.length);

    setText("appointmentCount", appointments.length);

    setText(

        "activeDoctors",

        doctors.filter(d=>

            !d.status ||

            d.status==="Active"

        ).length

    );

    setText(

        "admittedPatients",

        patients.length

    );

    setText(

        "todayVisits",

        appointments.length

    );

    const revenue = bills.reduce(

        (sum,bill)=>

        sum + Number(

            bill.totalAmount ||

            bill.amount ||

            0

        ),

        0

    );

    setText(

        "revenueCount",

        "₹"+revenue.toLocaleString()

    );

    setText(

        "monthlyRevenue",

        "₹"+revenue.toLocaleString()

    );

}

/*=========================================================
                    HELPER
=========================================================*/

function setText(id,value){

    const element =

    document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}
/*=========================================================
                RECENT DOCTORS TABLE
=========================================================*/

function loadRecentDoctors(){

    const table =
    document.getElementById("recentDoctorTable");

    if(!table) return;

    if(doctors.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="3">

                No Doctors Found

            </td>

        </tr>

        `;

        return;

    }

    table.innerHTML = doctors

    .slice(0,5)

    .map(doctor=>`

<tr>

<td>

<div style="display:flex;align-items:center;gap:10px;">

<img

src="https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=2563eb&color=ffffff"

style="width:40px;height:40px;border-radius:50%;">

<div>

<strong>Dr. ${doctor.name}</strong>

</div>

</div>

</td>

<td>

${doctor.specialization || "General"}

</td>

<td>

<span class="badge badge-success">

${doctor.status || "Active"}

</span>

</td>

</tr>

`).join("");

}

/*=========================================================
                RECENT PATIENTS
=========================================================*/

function loadRecentPatients(){

    const table =
    document.getElementById("recentPatientTable");

    if(!table) return;

    if(patients.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="3">

                No Patients Found

            </td>

        </tr>

        `;

        return;

    }

    table.innerHTML = patients

    .slice(0,5)

    .map(patient=>`

<tr>

<td>

${patient.name}

</td>

<td>

${patient.disease || "-"}

</td>

<td>

${patient.doctor?.name || "-"}

</td>

</tr>

`).join("");

}

/*=========================================================
                TODAY APPOINTMENTS
=========================================================*/

function loadAppointmentTable(){

    const table =
    document.getElementById("appointmentTable");

    if(!table) return;

    if(appointments.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="4">

                No Appointments

            </td>

        </tr>

        `;

        return;

    }

    table.innerHTML = appointments

    .slice(0,5)

    .map(a=>`

<tr>

<td>

${a.patient?.name || "-"}

</td>

<td>

${a.doctor?.name || "-"}

</td>

<td>

${a.time || "-"}

</td>

<td>

<span class="badge badge-info">

${a.status || "Scheduled"}

</span>

</td>

</tr>

`).join("");

}

/*=========================================================
                BILLING TABLE
=========================================================*/

function loadBillingTable(){

    const table =
    document.getElementById("billingTable");

    if(!table) return;

    if(bills.length===0){

        table.innerHTML=`

        <tr>

            <td colspan="4">

                No Bills Found

            </td>

        </tr>

        `;

        return;

    }

    table.innerHTML = bills

    .slice(0,5)

    .map(bill=>`

<tr>

<td>

#${bill.id}

</td>

<td>

${bill.patient?.name || "-"}

</td>

<td>

₹${bill.totalAmount || bill.amount || 0}

</td>

<td>

<span class="badge badge-success">

Paid

</span>

</td>

</tr>

`).join("");

}

/*=========================================================
                LOAD ALL TABLES
=========================================================*/

function loadDashboardTables(){

    loadRecentDoctors();

    loadRecentPatients();

    loadAppointmentTable();

    loadBillingTable();

}
/*=========================================================
                    CHART.JS
=========================================================*/

let revenueChart = null;
let appointmentChart = null;

/*=========================================================
                    INITIALIZE CHARTS
=========================================================*/

function initializeCharts(){

    loadRevenueChart();

    loadAppointmentChart();

}

/*=========================================================
                REVENUE CHART
=========================================================*/

function loadRevenueChart(){

    const canvas = document.getElementById("revenueChart");

    if(!canvas) return;

    if(revenueChart){

        revenueChart.destroy();

    }

    revenueChart = new Chart(canvas,{

        type:"line",

        data:{

            labels:[

                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"

            ],

            datasets:[{

                label:"Revenue",

                data:[

                    120000,
                    140000,
                    155000,
                    180000,
                    165000,
                    210000,
                    bills.reduce(

                        (sum,b)=>

                        sum + Number(

                            b.totalAmount ||

                            b.amount ||

                            0

                        ),

                        0

                    )

                ],

                borderColor:"#2563eb",

                backgroundColor:"rgba(37,99,235,.15)",

                fill:true,

                tension:.4

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:true

                }

            }

        }

    });

}

/*=========================================================
                APPOINTMENT CHART
=========================================================*/

function loadAppointmentChart(){

    const canvas = document.getElementById("appointmentChart");

    if(!canvas) return;

    if(appointmentChart){

        appointmentChart.destroy();

    }

    appointmentChart = new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[

                "Completed",

                "Pending",

                "Cancelled"

            ],

            datasets:[{

                data:[

                    appointments.filter(

                        a=>a.status==="Completed"

                    ).length,

                    appointments.filter(

                        a=>

                        !a.status ||

                        a.status==="Scheduled" ||

                        a.status==="Pending"

                    ).length,

                    appointments.filter(

                        a=>a.status==="Cancelled"

                    ).length

                ],

                backgroundColor:[

                    "#10b981",

                    "#2563eb",

                    "#ef4444"

                ]

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

/*=========================================================
                REFRESH CHARTS
=========================================================*/

function refreshCharts(){

    loadRevenueChart();

    loadAppointmentChart();

}
/*=========================================================
                AUTO REFRESH
=========================================================*/

function refreshDashboard(){

    initializeDashboard();

}

setInterval(refreshDashboard,30000);

/*=========================================================
                LIVE CLOCK
=========================================================*/

function updateLiveClock(){

    const clock=document.getElementById("liveClock");

    if(!clock) return;

    const now=new Date();

    clock.textContent=now.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    });

}

setInterval(updateLiveClock,1000);

updateLiveClock();

/*=========================================================
                TODAY DATE
=========================================================*/

function updateTodayDate(){

    const date=document.getElementById("todayDate");

    if(!date) return;

    const now=new Date();

    date.textContent=now.toLocaleDateString([],{

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    });

}

updateTodayDate();

/*=========================================================
                PAGE VISIBILITY
=========================================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!document.hidden){

            refreshDashboard();

        }

    }

);

/*=========================================================
                WINDOW FOCUS
=========================================================*/

window.addEventListener(

    "focus",

    ()=>{

        refreshDashboard();

    }

);

/*=========================================================
                NOTIFICATION
=========================================================*/

function showNotification(message,type="success"){

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
                WELCOME MESSAGE
=========================================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showNotification(

            "Welcome to HMS PRO Dashboard",

            "success"

        );

    },700);

});

/*=========================================================
                LOGOUT
=========================================================*/

function logout(){

    localStorage.clear();

    window.location.href="login.html";

}

/*=========================================================
                END
=========================================================*/

console.log("✅ HMS PRO Dashboard Ready");