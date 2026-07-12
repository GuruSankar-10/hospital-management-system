console.log("Admin Dashboard JS Loaded");


const DASHBOARD_API =
"http://localhost:8080/dashboard/stats";


// ==========================
// Load Dashboard Statistics
// ==========================


function loadDashboardStats(){


fetch(DASHBOARD_API)


.then(response=>response.json())


.then(data=>{


console.log(data);


// Cards

document.getElementById("doctorCount").innerHTML =
data.doctors;


document.getElementById("staffCount").innerHTML =
data.staff;


document.getElementById("patientCount").innerHTML =
data.patients;


document.getElementById("appointmentCount").innerHTML =
data.appointments;



// Summary


document.getElementById("summaryDoctorCount").innerHTML =
data.doctors;


document.getElementById("summaryStaffCount").innerHTML =
data.staff;


document.getElementById("summaryPatientCount").innerHTML =
data.patients;


document.getElementById("summaryAppointmentCount").innerHTML =
data.appointments;



})


.catch(error=>{

console.log(error);

});


}




// ==========================
// Load On Page Open
// ==========================


window.onload=function(){


loadDashboardStats();


};