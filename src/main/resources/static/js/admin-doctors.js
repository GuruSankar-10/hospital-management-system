console.log("Admin Doctor JS Loaded");


const DOCTOR_API="http://localhost:8080/doctors";



// ==========================
// Load Doctors
// ==========================

window.onload=function(){

    loadDoctors();

};




// ==========================
// Load Doctor List
// ==========================


function loadDoctors(){


fetch(DOCTOR_API)


.then(res=>res.json())


.then(data=>{


let rows="";


let cardio=0;
let neuro=0;
let general=0;



data.forEach(doctor=>{


if(doctor.specialization==="Cardiology")
cardio++;


else if(doctor.specialization==="Neurology")
neuro++;


else
general++;




rows+=`

<tr>

<td>${doctor.id}</td>

<td>${doctor.name}</td>

<td>${doctor.email}</td>

<td>${doctor.specialization}</td>

<td>${doctor.phone}</td>


<td>

<button class="deleteBtn"
onclick="deleteDoctor(${doctor.id})">

Delete

</button>

</td>


</tr>


`;



});



document.getElementById("doctorTable").innerHTML=rows;



document.getElementById("doctorCount").innerHTML=data.length;

document.getElementById("cardioCount").innerHTML=cardio;

document.getElementById("neuroCount").innerHTML=neuro;

document.getElementById("generalCount").innerHTML=general;



})


.catch(error=>console.log(error));


}







// ==========================
// Open Modal
// ==========================


function openDoctorModal(){


document.getElementById("doctorModal").style.display="flex";


}






// ==========================
// Close Modal
// ==========================


function closeDoctorModal(){


document.getElementById("doctorModal").style.display="none";


}





// ==========================
// Add Doctor
// ==========================


function saveDoctor(){


let doctor={


name:
document.getElementById("doctorName").value,


email:
document.getElementById("doctorEmail").value,


phone:
document.getElementById("doctorPhone").value,


specialization:
document.getElementById("doctorSpecialization").value


};




fetch(DOCTOR_API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(doctor)

})


.then(res=>res.json())


.then(data=>{


alert("Doctor Added Successfully");


closeDoctorModal();


loadDoctors();


})


.catch(err=>{


console.log(err);


alert("Doctor Add Failed");


});


}







// ==========================
// Delete Doctor
// ==========================


function deleteDoctor(id){


if(!confirm("Delete Doctor?"))
return;



fetch(DOCTOR_API+"/"+id,{

method:"DELETE"

})


.then(res=>res.text())


.then(msg=>{


alert(msg);


loadDoctors();


});


}