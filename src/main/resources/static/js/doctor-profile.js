// ==========================================
// Doctor Profile JS
// ==========================================

console.log("Doctor Profile JS Loaded");



// ==========================================
// BASE URL
// ==========================================


const BASE_URL =
window.location.hostname === "localhost" ||
window.location.hostname === "127.0.0.1"

?

"http://localhost:8080"

:

"https://hospital-management-system-6pok.onrender.com";





const token =
localStorage.getItem("token");




// ==========================================
// PAGE LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadProfile();

loadDoctorStats();


});









// ==========================================
// LOAD DOCTOR PROFILE
// ==========================================


async function loadProfile(){



const doctorId =
localStorage.getItem("doctorId");



if(!doctorId){

alert("Doctor session expired");

window.location.href="login.html";

return;

}





try{


const response =
await fetch(

BASE_URL+
"/doctors/profile/"
+
doctorId,

{

headers:{


"Authorization":
"Bearer "+token


}


}

);




if(!response.ok){

throw new Error(
"Unable to load doctor profile"
);

}




const doctor =
await response.json();





// =========================
// Form Fields
// =========================


setValue(
"doctorFullName",
doctor.name
);



setValue(
"doctorEmail",
doctor.email
);



setValue(
"doctorPhone",
doctor.phone
);



setValue(
"doctorSpecialization",
doctor.specialization
);





// =========================
// Profile Header
// =========================


setText(
"profileName",
doctor.name
);



setText(
"profileEmail",
doctor.email
);



setText(
"profileSpecialization",
doctor.specialization
);



setText(
"doctorName",
doctor.name
);






}

catch(error){

console.error(error);

alert(error.message);

}



}









// ==========================================
// UPDATE PROFILE
// ==========================================


async function updateDoctorProfile(){



const doctorId =
localStorage.getItem("doctorId");





const doctor = {


name:
getValue(
"doctorFullName"
),



email:
getValue(
"doctorEmail"
),



phone:
getValue(
"doctorPhone"
),



specialization:
getValue(
"doctorSpecialization"
)



};






try{



const response =
await fetch(

BASE_URL+
"/doctors/profile/"
+
doctorId,

{


method:"PUT",


headers:{


"Content-Type":
"application/json",


"Authorization":
"Bearer "+token


},


body:
JSON.stringify(doctor)



}

);





if(!response.ok){

throw new Error(
"Profile update failed"
);

}




const data =
await response.json();




alert(
"Profile Updated Successfully ✅"
);




localStorage.setItem(
"name",
data.name
);




loadProfile();




}



catch(error){

console.error(error);

alert(error.message);

}



}









// ==========================================
// CHANGE PASSWORD
// ==========================================


async function changePassword(){



const doctorId =
localStorage.getItem("doctorId");



const oldPassword =
getValue(
"oldPassword"
);



const newPassword =
getValue(
"newPassword"
);



const confirmPassword =
getValue(
"confirmPassword"
);






if(
oldPassword==="" ||
newPassword==="" ||
confirmPassword===""

){


alert(
"Please fill all password fields"
);


return;


}







if(newPassword !== confirmPassword){


alert(
"New password and confirm password not matching"
);


return;


}







try{



const response =
await fetch(

BASE_URL+
"/doctors/change-password/"
+
doctorId,

{


method:"PUT",


headers:{


"Content-Type":
"application/json",


"Authorization":
"Bearer "+token


},


body:JSON.stringify({

oldPassword:
oldPassword,


newPassword:
newPassword


})


}

);






if(!response.ok){


const msg =
await response.text();


throw new Error(msg);


}






alert(
"Password Updated Successfully ✅"
);





document.getElementById(
"oldPassword"
).value="";



document.getElementById(
"newPassword"
).value="";



document.getElementById(
"confirmPassword"
).value="";




}



catch(error){


console.error(error);


alert(error.message);


}




}









// ==========================================
// DOCTOR STATISTICS
// ==========================================


async function loadDoctorStats(){



const doctorId =
localStorage.getItem("doctorId");



try{



// Patients


const patientResponse =
await fetch(

BASE_URL+
"/patients/doctor/"
+
doctorId

);



const patients =
await patientResponse.json();





setText(
"profilePatients",
patients.length
);









// Appointments


const appointmentResponse =
await fetch(

BASE_URL+
"/appointments/doctor/"
+
doctorId

);



const appointments =
await appointmentResponse.json();





setText(
"profileAppointments",
appointments.length
);









// Prescriptions


const prescriptionResponse =
await fetch(

BASE_URL+
"/prescriptions/doctor/"
+
doctorId

);



const prescriptions =
await prescriptionResponse.json();





setText(
"profilePrescriptions",
prescriptions.length
);






}

catch(error){


console.log(
"Statistics loading failed"
);


}



}









// ==========================================
// HELPERS
// ==========================================


function setValue(id,value){


const element =
document.getElementById(id);



if(element){

element.value =
value || "";

}


}







function getValue(id){


const element =
document.getElementById(id);



if(element){

return element.value.trim();

}


return "";

}







function setText(id,value){


const element =
document.getElementById(id);



if(element){

element.innerHTML =
value || "-";

}


}







// ==========================================
// GLOBAL FUNCTIONS
// ==========================================


window.updateDoctorProfile =
updateDoctorProfile;


window.changePassword =
changePassword;