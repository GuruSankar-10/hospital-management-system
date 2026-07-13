console.log("Staff Appointment JS Loaded");


const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const APPOINTMENT_API = BASE_URL + "/appointments";


let appointmentData = [];


// ==============================
// Page Load
// ==============================

document.addEventListener("DOMContentLoaded", function(){

    loadAppointments();

});




// ==============================
// Load Appointments
// ==============================

function loadAppointments(){


fetch(APPOINTMENT_API)


.then(response => response.json())


.then(data => {


    appointmentData = data;


    displayAppointments(data);



})


.catch(error => {


    console.log("Appointment Load Error:", error);


});


}






// ==============================
// Display Appointments
// ==============================

function displayAppointments(data){


let rows = "";



data.forEach(app => {



rows += `

<tr>


<td>${app.id}</td>



<td>

${app.patient ? app.patient.name : "N/A"}

</td>



<td>

${app.doctor ? app.doctor.name : "N/A"}

</td>



<td>

${app.date ? app.date : "N/A"}

</td>



<td>

<select onchange="updateStatus(${app.id},this.value)">


<option ${app.status=="PENDING"?"selected":""}>
PENDING
</option>


<option ${app.status=="CONFIRMED"?"selected":""}>
CONFIRMED
</option>


<option ${app.status=="COMPLETED"?"selected":""}>
COMPLETED
</option>


<option ${app.status=="CANCELLED"?"selected":""}>
CANCELLED
</option>


</select>


</td>



<td>


<button

class="deleteBtn"

onclick="deleteAppointment(${app.id})">


Delete


</button>



</td>


</tr>

`;



});




document.getElementById("appointmentTable").innerHTML = rows;



}







// ==============================
// Search Appointment
// ==============================

function searchAppointments(){



let value = document
.getElementById("searchAppointment")
.value
.toLowerCase();




let filtered = appointmentData.filter(app=>{


return (

(app.patient &&
app.patient.name.toLowerCase().includes(value))

||

(app.doctor &&
app.doctor.name.toLowerCase().includes(value))


||

(app.status &&
app.status.toLowerCase().includes(value))


);


});



displayAppointments(filtered);



}







// ==============================
// Update Status
// ==============================

function updateStatus(id,status){



fetch(APPOINTMENT_API+"/"+id+"/status",{


method:"PUT",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({

status:status

})


})


.then(response=>response.json())


.then(data=>{


alert("Appointment Status Updated");


loadAppointments();



})


.catch(error=>{


console.log(error);


alert("Status Update Failed");


});



}







// ==============================
// Delete Appointment
// ==============================

function deleteAppointment(id){



if(!confirm("Delete this appointment?")){

return;

}



fetch(APPOINTMENT_API+"/"+id,{


method:"DELETE"


})


.then(response=>response.text())


.then(message=>{


alert(message);


loadAppointments();



})



.catch(error=>{


console.log(error);


alert("Delete Failed");


});



}