console.log("Staff Patient JS Loaded");


const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const PATIENT_API = BASE_URL + "/patients";

let patientsData = [];


// ==============================
// Load Patients
// ==============================

document.addEventListener("DOMContentLoaded", function(){

    loadPatients();

});



// ==============================
// Get Patients
// ==============================

function loadPatients(){


fetch(PATIENT_API)


.then(response => response.json())


.then(data => {


    patientsData = data;


    displayPatients(data);


})


.catch(error => {


    console.log("Patient Load Error:", error);


});


}





// ==============================
// Display Patients
// ==============================

function displayPatients(data){


let rows = "";



data.forEach(patient => {



rows += `

<tr>


<td>${patient.id}</td>


<td>${patient.name}</td>


<td>${patient.age}</td>


<td>${patient.disease}</td>


<td>${patient.phone}</td>


<td>

${patient.doctor ? patient.doctor.name : "Not Assigned"}

</td>



</tr>

`;



});



document.getElementById("patientTable").innerHTML = rows;



}







// ==============================
// Search Patients
// ==============================

function searchPatients(){


let searchValue =

document.getElementById("searchPatient")
.value
.toLowerCase();




let filtered = patientsData.filter(patient => {


return (

patient.name.toLowerCase()
.includes(searchValue)

||

patient.disease.toLowerCase()
.includes(searchValue)

||

patient.phone.includes(searchValue)


);


});



displayPatients(filtered);



}