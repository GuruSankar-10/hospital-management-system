const doctorName = localStorage.getItem("name") || "Doctor";

document.getElementById("doctorName").innerHTML =
"Dr. " + doctorName.replace(/^Dr\.?\s*/i,"");

document.getElementById("todayDate").innerHTML =
new Date().toDateString();

function loadPatients(){

fetch("http://localhost:8080/patients")

.then(res=>res.json())

.then(data=>{

let table=document.getElementById("patientTable");

table.innerHTML="";

data.forEach(patient=>{

table.innerHTML+=`

<tr>

<td>${patient.id}</td>

<td>${patient.name}</td>

<td>${patient.age}</td>

<td>${patient.disease}</td>

<td>${patient.phone}</td>

<td>

<button onclick="viewPatient(${patient.id})">

View

</button>

</td>

</tr>

`;

});

});

}

function searchPatients(){

let input=document
.getElementById("searchInput")
.value
.toLowerCase();

let rows=document
.querySelectorAll("#patientTable tr");

rows.forEach(row=>{

row.style.display=
row.innerText
.toLowerCase()
.includes(input)
? ""
: "none";

});

}

function viewPatient(id){

window.location.href=
"patient-details.html?id="+id;

}

loadPatients();