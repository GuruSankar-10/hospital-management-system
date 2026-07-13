console.log("APPOINTMENT JS LOADED");


// ==========================================
// BASE URL
// ==========================================


const BASE_URL =
window.location.hostname === "localhost"
?
"http://localhost:8080"
:
"https://hospital-management-system-6pok.onrender.com";



const API =
BASE_URL + "/appointments";


const PATIENT_API =
BASE_URL + "/patients";


const DOCTOR_API =
BASE_URL + "/doctors";



let deleteAppointmentId = null;









// ==========================================
// PAGE LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadAppointments();

loadPatients();

loadDoctors();



const search =
document.getElementById(
"searchAppointment"
);



if(search){

search.addEventListener(
"keyup",
searchAppointment
);

}



});









// ==========================================
// LOAD APPOINTMENTS
// ==========================================


async function loadAppointments(){


try{


const response =
await fetch(API);



const appointments =
await response.json();



displayAppointments(
appointments
);



updateCards(
appointments
);



}

catch(error){

console.error(error);

}


}









// ==========================================
// DISPLAY APPOINTMENTS
// ==========================================


function displayAppointments(data){



let rows="";



data.forEach(a=>{


let status =
(a.status || "")
.toUpperCase();




let badgeClass="";



if(status==="CONFIRMED")
badgeClass="success";


else if(status==="PENDING")
badgeClass="warning";


else if(status==="CANCELLED")
badgeClass="danger";




rows += `


<tr>


<td>${a.id}</td>


<td>${a.patient?.name || "-"}</td>


<td>${a.doctor?.name || "-"}</td>


<td>${a.appointmentDate || "-"}</td>


<td>${a.appointmentTime || "-"}</td>


<td>

<span class="status ${badgeClass}">

${status || "-"}

</span>


</td>



<td>


<button
class="btn"
onclick="editAppointment(${a.id})">


<i class="fa-solid fa-pen"></i>


</button>




<button
class="deleteBtn"
onclick="deleteAppointment(${a.id})">


<i class="fa-solid fa-trash"></i>


</button>



</td>



</tr>


`;



});






const table =
document.getElementById(
"appointmentTable"
);



if(table){


table.innerHTML =

rows ||

`

<tr>

<td colspan="7">

No Appointments Found

</td>

</tr>

`;



}



}









// ==========================================
// UPDATE CARDS
// ==========================================


function updateCards(data){



updateCount(
"appointmentCount",
data.length
);



let confirmed=0;

let pending=0;

let cancelled=0;




data.forEach(a=>{


let status =
(a.status || "")
.toUpperCase();



if(status==="CONFIRMED")
confirmed++;


else if(status==="PENDING")
pending++;


else if(status==="CANCELLED")
cancelled++;



});




updateCount(
"confirmedCount",
confirmed
);


updateCount(
"pendingCount",
pending
);


updateCount(
"cancelledCount",
cancelled
);



}








function updateCount(id,value){


const el =
document.getElementById(id);


if(el){

el.innerText=value;

}


}









// ==========================================
// LOAD PATIENTS
// ==========================================


async function loadPatients(){


const response =
await fetch(PATIENT_API);



const patients =
await response.json();



const select =
document.getElementById(
"patientSelect"
);



if(!select)return;



select.innerHTML =
`
<option value="">
Select Patient
</option>
`;




patients.forEach(p=>{


select.innerHTML +=

`
<option value="${p.id}">
${p.name}
</option>
`;



});


}









// ==========================================
// LOAD DOCTORS
// ==========================================


async function loadDoctors(){


const response =
await fetch(DOCTOR_API);



const doctors =
await response.json();



const select =
document.getElementById(
"doctorSelect"
);



if(!select)return;



select.innerHTML =
`
<option value="">
Select Doctor
</option>
`;




doctors.forEach(d=>{


select.innerHTML +=

`
<option value="${d.id}">
${d.name}
</option>
`;



});


}









// ==========================================
// SEARCH
// ==========================================


async function searchAppointment(){


const keyword =
document.getElementById(
"searchAppointment"
)
.value
.toLowerCase();



const response =
await fetch(API);



const data =
await response.json();



const filtered =
data.filter(a=>


(a.patient?.name||"")
.toLowerCase()
.includes(keyword)


||


(a.doctor?.name||"")
.toLowerCase()
.includes(keyword)


||


(a.status||"")
.toLowerCase()
.includes(keyword)



);



displayAppointments(
filtered
);



}









// ==========================================
// MODAL
// ==========================================


function openAppointmentModal(){



document.getElementById(
"modalTitle"
).innerHTML="New Appointment";



document.getElementById(
"appointmentId"
).value="";



document.getElementById(
"appointmentModal"
).style.display="flex";



}




function closeAppointmentModal(){



document.getElementById(
"appointmentModal"
).style.display="none";



}









// ==========================================
// SAVE
// ==========================================


async function saveAppointment(){



const id =
document.getElementById(
"appointmentId"
).value;



const appointment={


appointmentDate:
appointmentDate.value,


appointmentTime:
appointmentTime.value,


status:
appointmentStatus.value,


patient:{
id:
patientSelect.value
},


doctor:{
id:
doctorSelect.value
}


};






const url =
id
?
API+"/"+id
:
API;



const method =
id
?
"PUT"
:
"POST";




await fetch(url,{

method,

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(appointment)

});



closeAppointmentModal();

loadAppointments();



}









// ==========================================
// EDIT
// ==========================================


async function editAppointment(id){



const response =
await fetch(
API+"/"+id
);



const a =
await response.json();



appointmentId.value=a.id;

patientSelect.value=
a.patient?.id || "";


doctorSelect.value=
a.doctor?.id || "";


appointmentDate.value=
a.appointmentDate;


appointmentTime.value=
a.appointmentTime;


appointmentStatus.value=
a.status;



modalTitle.innerHTML=
"Edit Appointment";



appointmentModal.style.display=
"flex";


}









// ==========================================
// DELETE
// ==========================================


function deleteAppointment(id){


deleteAppointmentId=id;


deleteModal.style.display=
"flex";


}





function closeDeleteModal(){


deleteModal.style.display=
"none";


}




async function confirmDelete(){


await fetch(

API+"/"+deleteAppointmentId,

{

method:"DELETE"

}

);



deleteAppointmentId=null;


closeDeleteModal();


loadAppointments();


}









// GLOBAL

window.openAppointmentModal=openAppointmentModal;

window.closeAppointmentModal=closeAppointmentModal;

window.saveAppointment=saveAppointment;

window.editAppointment=editAppointment;

window.deleteAppointment=deleteAppointment;

window.confirmDelete=confirmDelete;

window.closeDeleteModal=closeDeleteModal;

window.searchAppointment=searchAppointment;