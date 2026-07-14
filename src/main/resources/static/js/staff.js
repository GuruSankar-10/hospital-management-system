console.log("STAFF JS LOADED");


// ==========================================
// BASE URL
// ==========================================
const STAFF_API_URL =
API_URL + "/staff";

let deleteId = null;




// ==========================================
// PAGE LOAD
// ==========================================


document.addEventListener(
"DOMContentLoaded",
()=>{


loadStaff();


});









// ==========================================
// OPEN STAFF MODAL
// ==========================================


function openStaffModal(){



const modal =
document.getElementById("staffModal");



if(modal){

modal.style.display="flex";

}



}









// ==========================================
// CLOSE STAFF MODAL
// ==========================================


function closeStaffModal(){



const modal =
document.getElementById("staffModal");



if(modal){

modal.style.display="none";

}



clearForm();


}









// ==========================================
// CLEAR FORM
// ==========================================


function clearForm(){



const fields=[

"staffId",
"staffName",
"staffEmail",
"staffPassword",
"staffPhone"

];



fields.forEach(id=>{


const element =
document.getElementById(id);



if(element){

element.value="";

}


});





const department =
document.getElementById(
"staffDepartment"
);



if(department){

department.value="";

}



}









// ==========================================
// REGISTER STAFF
// ==========================================


function registerStaff(){



const staff={


fullName:
document.getElementById("staffName").value.trim(),



email:
document.getElementById("staffEmail").value.trim(),



password:
document.getElementById("staffPassword").value.trim(),



phone:
document.getElementById("staffPhone").value.trim(),



department:
document.getElementById("staffDepartment").value.trim()



};





if(

staff.fullName==="" ||

staff.email==="" ||

staff.password==="" ||

staff.phone==="" ||

staff.department===""

){


alert(
"Please fill all fields"
);


return;


}






fetch(
STAFF_API_URL + "/register",
{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:
JSON.stringify(staff)



})



.then(async response=>{


const text =
await response.text();



if(!response.ok){


throw new Error(
text || "Registration failed"
);


}



return text;



})



.then(message=>{


alert(
message || "Staff Registered Successfully"
);



closeStaffModal();



loadStaff();



})



.catch(error=>{


console.error(
error
);


alert(
error.message
);


});



}









// ==========================================
// LOAD STAFF
// ==========================================


function loadStaff(){



fetch(
STAFF_API_URL
)



.then(response=>{


if(!response.ok){


throw new Error(
"Unable to load staff"
);


}


return response.json();



})



.then(data=>{



let table="";


let nurse=0;

let reception=0;

let other=0;





data.forEach(staff=>{



if(
staff.department==="Nurse"
){

nurse++;

}

else if(
staff.department==="Reception"
){

reception++;

}

else{

other++;

}







table+=`

<tr>


<td>
${staff.id ?? "-"}
</td>


<td>
${staff.fullName ?? staff.name ?? "-"}
</td>


<td>
${staff.email ?? "-"}
</td>


<td>
${staff.phone ?? "-"}
</td>


<td>
${staff.department ?? "-"}
</td>


<td>


<button
class="deleteBtn"
onclick="deleteStaff(${staff.id})">


<i class="fa-solid fa-trash"></i>


</button>


</td>



</tr>


`;



});









const tableElement =
document.getElementById(
"staffTable"
);



if(tableElement){



tableElement.innerHTML =

table ||

`

<tr>

<td colspan="6">

No Staff Found

</td>

</tr>

`;



}






updateCount(
"staffCount",
data.length
);



updateCount(
"nurseCount",
nurse
);



updateCount(
"receptionCount",
reception
);



updateCount(
"otherCount",
other
);






})



.catch(error=>{


console.error(
"Load Staff Error:",
error
);



});



}









// ==========================================
// UPDATE COUNT
// ==========================================


function updateCount(
id,
value
){



const element =
document.getElementById(id);



if(element){

element.innerText=value;

}


}









// ==========================================
// SEARCH STAFF
// ==========================================


function searchStaff(){



const value =

document.getElementById(
"searchStaff"
)
.value
.toLowerCase();





const rows =
document.querySelectorAll(
"#staffTable tr"
);





rows.forEach(row=>{


row.style.display =

row.innerText
.toLowerCase()
.includes(value)

?

""

:

"none";



});



}









// ==========================================
// DELETE STAFF
// ==========================================


function deleteStaff(id){



deleteId=id;



const modal =
document.getElementById(
"deleteModal"
);



if(modal){

modal.style.display="flex";

}



}









// ==========================================
// CONFIRM DELETE
// ==========================================


function confirmDelete(){



if(!deleteId){

return;

}





fetch(
STAFF_API_URL + "/" + deleteId,
{


method:"DELETE"


})



.then(response=>{


if(!response.ok){


throw new Error(
"Delete Failed"
);


}



return response.text();



})



.then(message=>{


alert(
message ||
"Staff Deleted Successfully"
);



deleteId=null;



closeDeleteModal();



loadStaff();



})



.catch(error=>{


console.error(
error
);


alert(
error.message
);



});



}









// ==========================================
// CLOSE DELETE MODAL
// ==========================================


function closeDeleteModal(){



const modal =
document.getElementById(
"deleteModal"
);



if(modal){

modal.style.display="none";

}



}









// ==========================================
// OUTSIDE CLICK CLOSE
// ==========================================


window.onclick=function(event){



const staffModal =
document.getElementById(
"staffModal"
);



const deleteModal =
document.getElementById(
"deleteModal"
);





if(
event.target===staffModal
){

closeStaffModal();

}




if(
event.target===deleteModal
){

closeDeleteModal();

}




};









// ==========================================
// GLOBAL FUNCTIONS
// ==========================================


window.openStaffModal =
openStaffModal;


window.closeStaffModal =
closeStaffModal;


window.registerStaff =
registerStaff;


window.searchStaff =
searchStaff;


window.deleteStaff =
deleteStaff;


window.confirmDelete =
confirmDelete;


window.closeDeleteModal =
closeDeleteModal;