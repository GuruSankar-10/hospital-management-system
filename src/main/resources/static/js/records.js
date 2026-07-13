console.log("HMS PRO Medical Records JS Loaded");


// ==========================================
// API
// ==========================================


const BASE_URL =
window.location.hostname === "localhost"
?
"http://localhost:8080"
:
"https://hospital-management-system-6pok.onrender.com";


const RECORD_API =
BASE_URL + "/medical-records";



let records=[];





// ==========================================
// LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{

loadRecords();


});









// ==========================================
// GET RECORDS
// ==========================================


function loadRecords(){


fetch(RECORD_API)

.then(response=>{


if(!response.ok){

throw new Error(
"Unable to load records"
);

}


return response.json();


})


.then(data=>{


records=data;


displayRecords(data);


updateCards(data);



})


.catch(error=>{


console.error(error);


alert(error.message);


});



}









// ==========================================
// DISPLAY
// ==========================================


function displayRecords(data){



let rows="";



data.forEach(record=>{


rows+=`

<tr>


<td>${record.id}</td>


<td>${record.patient?.name || "-"}</td>


<td>${record.doctor?.name || "-"}</td>


<td>${record.diagnosis || "-"}</td>


<td>${record.symptoms || "-"}</td>


<td>${record.treatment || "-"}</td>


<td>${record.notes || "-"}</td>


<td>${record.visitDate || "-"}</td>


<td>


<button

class="deleteBtn"

onclick="deleteRecord(${record.id})">


<i class="fa-solid fa-trash"></i>


</button>



</td>


</tr>

`;



});





document.getElementById(
"recordTable"
).innerHTML =


rows ||

`

<tr>

<td colspan="9">

No Medical Records Found

</td>

</tr>

`;



}









// ==========================================
// UPDATE CARDS
// ==========================================


function updateCards(data){



const total =
data.length;



let doctors =
new Set();


let patients =
new Set();


let today =
new Date()
.toISOString()
.substring(0,10);




let todayCount=0;




data.forEach(r=>{


if(r.doctor){

doctors.add(
r.doctor.id
);

}



if(r.patient){

patients.add(
r.patient.id
);

}



if(r.visitDate===today){

todayCount++;

}



});






setValue(
"recordCount",
total
);



setValue(
"todayRecords",
todayCount
);



setValue(
"doctorRecords",
doctors.size
);



setValue(
"patientRecords",
patients.size
);



}






function setValue(id,value){


const el =
document.getElementById(id);


if(el){

el.innerHTML=value;

}



}









// ==========================================
// ADD RECORD
// ==========================================


function addRecord(){



const record={


diagnosis:
diagnosis.value.trim(),


symptoms:
symptoms.value.trim(),


treatment:
treatment.value.trim(),


notes:
notes.value.trim(),


visitDate:
visitDate.value,



patient:{
id:Number(
patientId.value
)
},



doctor:{
id:Number(
doctorId.value
)
}



};






if(

!record.diagnosis ||

!record.visitDate ||

!record.patient.id ||

!record.doctor.id

){


alert(
"Please fill required fields"
);


return;


}




fetch(RECORD_API,{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(record)

})


.then(res=>{


if(!res.ok){

throw new Error(
"Save failed"
);

}


return res.json();


})


.then(()=>{


alert(
"Medical Record Saved Successfully ✅"
);



clearRecordForm();



loadRecords();



})


.catch(error=>{


alert(error.message);


});



}









// ==========================================
// DELETE
// ==========================================


function deleteRecord(id){


if(!confirm(
"Delete this medical record?"
))
return;




fetch(

RECORD_API+"/"+id,

{

method:"DELETE"

}

)


.then(res=>res.text())


.then(msg=>{


alert(msg);


loadRecords();



});



}









// ==========================================
// SEARCH
// ==========================================


function searchRecords(){



const key =

document.getElementById(
"searchRecord"
)
.value
.toLowerCase();




const filtered =

records.filter(r=>


String(r.id)
.includes(key)


||


(r.patient?.name||"")
.toLowerCase()
.includes(key)


||


(r.doctor?.name||"")
.toLowerCase()
.includes(key)


||


(r.diagnosis||"")
.toLowerCase()
.includes(key)


);



displayRecords(filtered);



}









// ==========================================
// CLEAR
// ==========================================


function clearRecordForm(){


diagnosis.value="";

symptoms.value="";

treatment.value="";

notes.value="";

visitDate.value="";

patientId.value="";

doctorId.value="";


}









// GLOBAL

window.addRecord =
addRecord;


window.deleteRecord =
deleteRecord;


window.searchRecords =
searchRecords;