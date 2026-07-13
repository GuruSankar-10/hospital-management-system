console.log("PATIENT JS LOADED");


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
BASE_URL + "/patients";


const DOCTOR_API =
BASE_URL + "/doctors";


const STAFF_API =
BASE_URL + "/staff";



let deletePatientId = null;





// ==========================================
// PAGE LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadPatients();

loadDoctors();

loadStaff();



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









// ==========================================
// LOAD PATIENTS
// ==========================================


async function loadPatients(){


try{


const response =
await fetch(API);



if(!response.ok){

throw new Error(
"Unable to load patients"
);

}



const patients =
await response.json();



displayPatients(patients);

updateCards(patients);



}

catch(error){

console.error(error);

}



}









// ==========================================
// DISPLAY PATIENTS
// ==========================================


function displayPatients(patients){



let rows="";




patients.forEach(p=>{


rows += `


<tr>


<td>${p.id ?? "-"}</td>


<td>${p.name ?? "-"}</td>


<td>${p.age ?? "-"}</td>


<td>${p.disease ?? "-"}</td>


<td>${p.phone ?? "-"}</td>


<td>${p.doctor?.name ?? "-"}</td>


<td>${p.staff?.fullName ?? p.staff?.name ?? "-"}</td>



<td>


<button
class="btn"
onclick="editPatient(${p.id})">


<i class="fa-solid fa-pen"></i>


</button>





<button
class="deleteBtn"
onclick="deletePatient(${p.id})">


<i class="fa-solid fa-trash"></i>


</button>



</td>


</tr>


`;


});






const table =
document.getElementById(
"patientTable"
);



if(table){


table.innerHTML =

rows ||

`

<tr>

<td colspan="8">

No Patients Found

</td>

</tr>

`;



}



}









// ==========================================
// UPDATE CARDS
// ==========================================


function updateCards(patients){



updateCount(
"patientCount",
patients.length
);



let doctors=0;

let staff=0;

let diseases=new Set();




patients.forEach(p=>{


if(p.doctor){

doctors++;

}


if(p.staff){

staff++;

}


if(p.disease){

diseases.add(
p.disease
);

}



});





updateCount(
"doctorAssigned",
doctors
);


updateCount(
"staffAssigned",
staff
);


updateCount(
"diseaseCount",
diseases.size
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
// LOAD DOCTORS
// ==========================================


async function loadDoctors(){


try{


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

catch(error){

console.error(error);

}


}









// ==========================================
// LOAD STAFF
// ==========================================


async function loadStaff(){


try{


const response =
await fetch(STAFF_API);



const staff =
await response.json();



const select =
document.getElementById(
"staffSelect"
);



if(!select)return;



select.innerHTML =

`
<option value="">
Select Staff
</option>
`;




staff.forEach(s=>{


select.innerHTML +=

`
<option value="${s.id}">
${s.fullName || s.name}
</option>
`;



});



}

catch(error){

console.error(error);

}



}









// ==========================================
// SEARCH
// ==========================================


async function searchPatient(){



const keyword =
document.getElementById(
"searchPatient"
)
.value
.toLowerCase();



const response =
await fetch(API);



const patients =
await response.json();




const filtered =
patients.filter(p=>


(p.name||"")
.toLowerCase()
.includes(keyword)


||

(p.disease||"")
.toLowerCase()
.includes(keyword)


||

(p.phone||"")
.includes(keyword)


);



displayPatients(filtered);



}









// ==========================================
// OPEN MODAL
// ==========================================


function openPatientModal(){



document.getElementById(
"modalTitle"
).innerHTML="Add Patient";



document.getElementById(
"patientId"
).value="";



document.getElementById(
"patientModal"
).style.display="flex";



}









function closePatientModal(){



document.getElementById(
"patientModal"
).style.display="none";


}









// ==========================================
// SAVE PATIENT
// ==========================================


async function savePatient(){



const id =
document.getElementById(
"patientId"
).value;



const patient={


name:
document.getElementById(
"patientName"
).value,


age:
Number(
document.getElementById(
"patientAge"
).value
),


disease:
document.getElementById(
"patientDisease"
).value,


phone:
document.getElementById(
"patientPhone"
).value,


doctor:{
id:
document.getElementById(
"doctorSelect"
).value
},


staff:{
id:
document.getElementById(
"staffSelect"
).value
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




try{


await fetch(url,{

method,

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(patient)


});



closePatientModal();


loadPatients();



}

catch(error){

console.error(error);

}



}









// ==========================================
// EDIT PATIENT
// ==========================================


async function editPatient(id){


const response =
await fetch(
API+"/"+id
);



const p =
await response.json();



document.getElementById(
"patientId"
).value=p.id;


document.getElementById(
"patientName"
).value=p.name;


document.getElementById(
"patientAge"
).value=p.age;


document.getElementById(
"patientDisease"
).value=p.disease;


document.getElementById(
"patientPhone"
).value=p.phone;



document.getElementById(
"doctorSelect"
).value=p.doctor?.id || "";



document.getElementById(
"staffSelect"
).value=p.staff?.id || "";



document.getElementById(
"modalTitle"
).innerHTML="Edit Patient";



document.getElementById(
"patientModal"
).style.display="flex";



}









// ==========================================
// DELETE
// ==========================================


function deletePatient(id){



deletePatientId=id;



document.getElementById(
"deleteModal"
).style.display="flex";



}





function closeDeleteModal(){


document.getElementById(
"deleteModal"
).style.display="none";


}






async function confirmDelete(){



await fetch(

API+"/"+deletePatientId,

{

method:"DELETE"

}

);



deletePatientId=null;


closeDeleteModal();


loadPatients();



}









// GLOBAL FUNCTIONS

window.openPatientModal=openPatientModal;

window.closePatientModal=closePatientModal;

window.savePatient=savePatient;

window.editPatient=editPatient;

window.deletePatient=deletePatient;

window.confirmDelete=confirmDelete;

window.closeDeleteModal=closeDeleteModal;

window.searchPatient=searchPatient;