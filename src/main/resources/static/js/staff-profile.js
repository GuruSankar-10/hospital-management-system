console.log("Staff Profile JS Loaded");


const STAFF_API = "/staff";



document.addEventListener("DOMContentLoaded",function(){


loadStaffProfile();


});





function loadStaffProfile(){


let email = localStorage.getItem("email");



if(!email){

window.location.href="login.html";

return;

}



fetch(STAFF_API + "/email/" + email)



.then(response=>response.json())



.then(staff=>{


document.getElementById("staffName").innerHTML =
staff.name;


document.getElementById("topName").innerHTML =
staff.name;



document.getElementById("staffPhone").innerHTML =
staff.phone;



document.getElementById("staffDepartment").innerHTML =
staff.department;



document.getElementById("staffEmail").innerHTML =
email;



})



.catch(error=>{


console.log(error);


alert("Unable to load profile");


});



}