console.log("Admin Dashboard JS Loaded");


// ======================================
// BASE URL
// ======================================


const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";



const DASHBOARD_API =
BASE_URL + "/dashboard/stats";



// ======================================
// LOAD DASHBOARD STATISTICS
// ======================================


function loadDashboardStats(){


fetch(DASHBOARD_API)

.then(response=>{


    if(!response.ok){

        throw new Error(
            "Dashboard API Failed : " + response.status
        );

    }


    return response.json();


})


.then(data=>{


console.log("Dashboard Data:",data);



// ================= CARDS =================


updateElement(
"doctorCount",
data.doctors
);



updateElement(
"staffCount",
data.staff
);



updateElement(
"patientCount",
data.patients
);



updateElement(
"appointmentCount",
data.appointments
);




// ================= SUMMARY =================



updateElement(
"summaryDoctorCount",
data.doctors
);



updateElement(
"summaryStaffCount",
data.staff
);



updateElement(
"summaryPatientCount",
data.patients
);



updateElement(
"summaryAppointmentCount",
data.appointments
);




// Load Charts

loadCharts(data);



})


.catch(error=>{


console.error(
"Dashboard Error:",
error
);


});


}








// ======================================
// SAFE ELEMENT UPDATE
// ======================================


function updateElement(id,value){


const element =
document.getElementById(id);



if(element){


element.innerText =
value ?? 0;


}


}









// ======================================
// CHARTS
// ======================================



function loadCharts(data){



if(typeof Chart === "undefined"){

console.log(
"Chart.js not loaded"
);

return;

}





// ================= PATIENT CHART =================



const patientCanvas =
document.getElementById(
"patientChart"
);



if(patientCanvas){



new Chart(
patientCanvas,
{


type:"line",


data:{


labels:[

"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun"

],



datasets:[{

label:"Patients",

data:[

10,
25,
40,
60,
80,
data.patients || 0

],



tension:.4


}]


},



options:{


responsive:true,


plugins:{


legend:{


display:true


}


}


}



}

);



}









// ================= APPOINTMENT CHART =================



const appointmentCanvas =
document.getElementById(
"appointmentChart"
);



if(appointmentCanvas){



new Chart(
appointmentCanvas,
{


type:"doughnut",



data:{



labels:[

"Completed",
"Pending",
"Cancelled"

],



datasets:[{


data:[

data.appointments || 0,
5,
2

]


}]



},



options:{


responsive:true


}



}

);



}



}










// ======================================
// PAGE LOAD
// ======================================



document.addEventListener(
"DOMContentLoaded",
()=>{


loadDashboardStats();


});