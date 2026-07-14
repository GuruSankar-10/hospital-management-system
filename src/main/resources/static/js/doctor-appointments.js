// ==========================================
// HMS PRO Doctor Appointments
// ==========================================


console.log("Doctor Appointments JS Loaded");




// ===============================
// BASE URL
// ===============================

const doctorId = localStorage.getItem("doctorId");

if (!doctorId) {

    alert("Session expired. Please login again.");

    window.location.href = "login.html";

}

const APPOINTMENT_API =
    API_URL + "/appointments/doctor/" + doctorId;

const UPDATE_API =
    API_URL + "/appointments";

let appointments = [];

let selectedAppointmentId = null;









// ===============================
// PAGE LOAD
// ===============================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadAppointments();



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









// ===============================
// LOAD APPOINTMENTS
// ===============================


async function loadAppointments(){


try{


const response =
await fetch(APPOINTMENT_API);



if(!response.ok){

throw new Error(
"Unable to load appointments"
);

}



appointments =
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









// ===============================
// DISPLAY
// ===============================


function displayAppointments(list){



let rows="";



list.forEach(a=>{


let status =
(a.status || "PENDING")
.toLowerCase();




rows+=`

<tr>


<td>${a.id}</td>


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


<span class="status ${status}">

${a.status || "PENDING"}

</span>


</td>





<td>



<button
class="editBtn"

onclick="openStatusModal(
${a.id},
'${a.status}'
)">


<i class="fas fa-edit"></i>

Update


</button>




<button
class="view-btn"

onclick="viewPatient(
${a.patient?.id}
)">


<i class="fas fa-eye"></i>


</button>



</td>


</tr>


`;



});





document.getElementById(
"appointmentTable"
).innerHTML =


rows ||

`

<tr>

<td colspan="6">

No Appointments Found

</td>

</tr>

`;



}









// ===============================
// CARDS
// ===============================


function updateCards(list){



let pending=0;

let confirmed=0;

let completed=0;




list.forEach(a=>{


let status =
(a.status || "")
.toUpperCase();



if(status==="PENDING")
pending++;


else if(status==="CONFIRMED")
confirmed++;


else if(status==="COMPLETED")
completed++;



});




setValue(
"appointmentCount",
list.length
);



setValue(
"pendingCount",
pending
);



setValue(
"confirmedCount",
confirmed
);



setValue(
"completedCount",
completed
);



}









// ===============================
// SEARCH
// ===============================


function searchAppointment(){



let keyword =
document
.getElementById(
"searchAppointment"
)
.value
.toLowerCase();





let filtered =
appointments.filter(a=>



(a.patient?.name || "")
.toLowerCase()
.includes(keyword)



||



(a.status || "")
.toLowerCase()
.includes(keyword)



||



(a.appointmentDate || "")
.includes(keyword)



);



displayAppointments(filtered);



}









// ===============================
// STATUS MODAL
// ===============================


function openStatusModal(id,status){


selectedAppointmentId=id;



document.getElementById(
"appointmentId"
).value=id;



document.getElementById(
"appointmentStatus"
).value=status;



document.getElementById(
"statusModal"
).style.display="flex";


}









function closeStatusModal(){


document.getElementById(
"statusModal"
).style.display="none";


}









// ===============================
// UPDATE STATUS
// ===============================


async function updateStatus(){


let status =
document
.getElementById(
"appointmentStatus"
)
.value;





try{


await fetch(

UPDATE_API+
"/"+
selectedAppointmentId+
"/status",

{

method:"PUT",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

status:status

})

}


);




closeStatusModal();


loadAppointments();



}

catch(error){


console.error(error);


}



}









// ===============================
// VIEW PATIENT
// ===============================


function viewPatient(id){


if(!id)return;



localStorage.setItem(
"patientId",
id
);



window.location.href=
"doctor-patients.html";


}









// ===============================
// SAFE SET
// ===============================


function setValue(id,value){


let el =
document.getElementById(id);



if(el){

el.innerHTML=value;

}


}









// GLOBAL FUNCTIONS
// ===============================


window.openStatusModal=openStatusModal;

window.closeStatusModal=closeStatusModal;

window.updateStatus=updateStatus;

window.searchAppointment=searchAppointment;

window.viewPatient=viewPatient;