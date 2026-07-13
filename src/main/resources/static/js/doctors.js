// ==========================================
// HMS PRO Doctor Dashboard
// ==========================================


console.log("Doctor Dashboard JS Loaded");



// ==========================================
// BASE URL
// ==========================================


const BASE_URL =

window.location.hostname === "localhost"

?

"http://localhost:8080"

:

"https://hospital-management-system-6pok.onrender.com";





const doctorId =
localStorage.getItem("doctorId");





if(!doctorId){


alert(
"Session expired. Please login again."
);


window.location.href =
"login.html";


}








// APIs


const PATIENT_API =

BASE_URL +
"/patients/doctor/" +
doctorId;




const APPOINTMENT_API =

BASE_URL +
"/appointments/doctor/" +
doctorId;




const RECORD_API =

BASE_URL +
"/medical-records/doctor/" +
doctorId;




const PRESCRIPTION_API =

BASE_URL +
"/prescriptions/doctor/" +
doctorId;







// ==========================================
// PAGE LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadPatients();


loadAppointments();


loadMedicalRecords();


loadPrescriptions();


});









// ==========================================
// PATIENTS
// ==========================================


async function loadPatients(){


try{


const response =
await fetch(PATIENT_API);



const patients =
await response.json();





setValue(
"patientCount",
patients.length
);




showRecentPatients(patients);



}

catch(error){


console.error(error);


}



}









function showRecentPatients(patients){


let rows="";



patients
.slice(0,5)
.forEach(p=>{


rows+=`

<tr>

<td>${p.name || "-"}</td>

<td>${p.age || "-"}</td>

<td>${p.disease || "-"}</td>

</tr>

`;



});




document.getElementById(
"recentPatients"
).innerHTML =


rows ||

`

<tr>

<td colspan="3">

No Patients Found

</td>

</tr>

`;



}









// ==========================================
// APPOINTMENTS
// ==========================================


async function loadAppointments(){


try{


const response =
await fetch(APPOINTMENT_API);



const appointments =
await response.json();





setValue(
"appointmentCount",
appointments.length
);




showAppointments(
appointments
);



updateAppointmentCards(
appointments
);



}

catch(error){


console.error(error);


}



}









function showAppointments(data){


let rows="";



data
.slice(0,5)
.forEach(a=>{


rows+=`

<tr>


<td>

${a.patient?.name || "-"}

</td>



<td>

${a.appointmentDate || "-"}

</td>



<td>

${a.appointmentTime || "-"}

</td>



<td>

${a.status || "-"}

</td>



</tr>


`;



});




document.getElementById(
"todayAppointments"
).innerHTML =


rows ||

`

<tr>

<td colspan="4">

No Appointments

</td>

</tr>

`;



}









// ==========================================
// APPOINTMENT STATUS
// ==========================================


function updateAppointmentCards(data){


let pending=0;

let completed=0;

let confirmed=0;




data.forEach(a=>{


let status =
(a.status || "")
.toUpperCase();




if(status==="PENDING")
pending++;



if(status==="COMPLETED")
completed++;



if(status==="CONFIRMED")
confirmed++;




});






setValue(
"pendingCount",
pending
);



setValue(
"completedCount",
completed
);



setValue(
"pendingAppointments",
pending
);



setValue(
"completedAppointments",
completed
);



setValue(
"confirmedAppointments",
confirmed
);



}









// ==========================================
// MEDICAL RECORDS COUNT
// ==========================================


async function loadMedicalRecords(){


try{


const res =
await fetch(RECORD_API);



const data =
await res.json();



setValue(
"recordCount",
data.length
);



}

catch(e){


console.log(
"Records API unavailable"
);


}



}









// ==========================================
// PRESCRIPTION COUNT
// ==========================================


async function loadPrescriptions(){


try{


const res =
await fetch(PRESCRIPTION_API);



const data =
await res.json();



setValue(
"prescriptionCount",
data.length
);



}

catch(e){


console.log(
"Prescription API unavailable"
);


}



}









// ==========================================
// SAFE VALUE SET
// ==========================================


function setValue(id,value){


const element =
document.getElementById(id);



if(element){


element.innerHTML=value;


}



}