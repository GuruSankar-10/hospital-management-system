// ==========================================
// HMS PRO Doctor Patients
// ==========================================


console.log("Doctor Patients JS Loaded");



// ================================
// BASE URL
// ================================


const BASE_URL =

window.location.hostname === "localhost"

?

"http://localhost:8080"

:

"https://hospital-management-system-6pok.onrender.com";




const doctorId =
localStorage.getItem("doctorId");



if(!doctorId){

alert("Session expired. Please login again.");

window.location.href="login.html";

}



let patients=[];

let selectedPatientId=null;







// ================================
// PAGE LOAD
// ================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadPatients();



const search =
document.getElementById(
"searchPatient"
);



if(search){

search.addEventListener(
"keyup",
searchPatient
);

}



});









// ================================
// LOAD PATIENTS
// ================================


async function loadPatients(){


try{


const response = await fetch(

BASE_URL+
"/patients/doctor/"+
doctorId

);



if(!response.ok){

throw new Error(
"Unable to load patients"
);

}



patients =
await response.json();



displayPatients(patients);


updateCards(patients);



}

catch(error){

console.error(error);

}



}









// ================================
// DISPLAY PATIENTS
// ================================


function displayPatients(list){



let rows="";



list.forEach(p=>{


rows+=`


<tr>


<td>${p.id}</td>


<td>${p.name || "-"}</td>


<td>${p.age || "-"}</td>


<td>${p.disease || "-"}</td>


<td>${p.phone || "-"}</td>



<td>

<button class="view-btn"
onclick="viewPatient(${p.id})">

<i class="fa fa-eye"></i>

</button>

</td>




<td>

<button class="record-btn"
onclick="openMedicalRecord(${p.id})">

<i class="fa fa-file-medical"></i>

</button>

</td>




<td>

<button class="prescription-btn"
onclick="openPrescription(${p.id})">

<i class="fa fa-prescription"></i>

</button>

</td>





<td>

<button class="edit-btn"
onclick="editPatient(${p.id})">

<i class="fa fa-pen"></i>

</button>

</td>






<td>

<button class="delete-btn"
onclick="deletePatient(${p.id})">

<i class="fa fa-trash"></i>

</button>

</td>



</tr>


`;



});



document.getElementById(
"patientTable"
).innerHTML =


rows ||

`

<tr>

<td colspan="10">

No Patients Found

</td>

</tr>

`;



}









// ================================
// CARDS
// ================================


function updateCards(list){



setValue(
"patientCount",
list.length
);



let fever=0;

let other=0;



list.forEach(p=>{


if(

p.disease &&
p.disease
.toLowerCase()
.includes("fever")

)

{

fever++;

}

else{

other++;

}



});





setValue(
"feverCount",
fever
);



setValue(
"otherCount",
other
);



setValue(
"todayCount",
list.length
);



}









// ================================
// SEARCH
// ================================


function searchPatient(){



let value =
document
.getElementById(
"searchPatient"
)
.value
.toLowerCase();





let filtered =
patients.filter(p=>

(p.name||"")
.toLowerCase()
.includes(value)

||

(p.disease||"")
.toLowerCase()
.includes(value)

||

(p.phone||"")
.includes(value)

);



displayPatients(filtered);



}









// ================================
// VIEW PATIENT
// ================================


function viewPatient(id){


let patient =
patients.find(
p=>p.id==id
);



if(!patient)return;



selectedPatientId=id;



setValue(
"detailName",
patient.name
);



setValue(
"detailAge",
patient.age
);



setValue(
"detailDisease",
patient.disease
);



setValue(
"detailPhone",
patient.phone
);



setValue(

"detailStaff",

patient.staff
?
patient.staff.name
:
"-"

);




document.getElementById(
"patientModal"
).style.display="flex";



}









function closePatientModal(){


document.getElementById(
"patientModal"
).style.display="none";


}









// ================================
// MEDICAL RECORD
// ================================


function openMedicalRecord(id){


localStorage.setItem(
"patientId",
id
);



window.location.href=
"doctor-medical-records.html";



}









// ================================
// PRESCRIPTION
// ================================


function openPrescription(id){


localStorage.setItem(
"patientId",
id
);



window.location.href=
"doctor-prescriptions.html";


}









// ================================
// VIEW HISTORY FROM MODAL
// ================================


function viewPatientHistory(){


if(selectedPatientId){


openMedicalRecord(
selectedPatientId
);


}



}









// ================================
// EDIT
// ================================


function editPatient(id){


localStorage.setItem(
"editPatientId",
id
);



alert(
"Edit Patient feature will be connected next."
);



}









// ================================
// DELETE
// ================================


async function deletePatient(id){



if(!confirm(
"Delete this patient?"
))

return;




await fetch(

BASE_URL+
"/patients/"+
id,

{

method:"DELETE"

}

);



alert(
"Patient Deleted Successfully"
);



loadPatients();



}









// ================================
// SAFE SET
// ================================


function setValue(id,value){


let el =
document.getElementById(id);



if(el){

el.innerHTML =
value || "-";

}


}









// ================================
// GLOBAL
// ================================


window.viewPatient=viewPatient;

window.closePatientModal=closePatientModal;

window.openMedicalRecord=openMedicalRecord;

window.openPrescription=openPrescription;

window.viewPatientHistory=viewPatientHistory;

window.editPatient=editPatient;

window.deletePatient=deletePatient;

window.searchPatient=searchPatient;