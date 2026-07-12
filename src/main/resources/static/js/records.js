console.log("Records JS Loaded");


const RECORD_API = "http://localhost:8080/records";


let records = [];



// ==========================
// Page Load
// ==========================

document.addEventListener("DOMContentLoaded", function(){

    loadRecords();

});




// ==========================
// Load Records
// ==========================

function loadRecords(){


fetch(RECORD_API)


.then(response => response.json())


.then(data => {


records = data;


displayRecords(data);



})


.catch(error=>{


console.log("Record Loading Error:",error);


});


}








// ==========================
// Display Records
// ==========================

function displayRecords(data){



let rows = "";



data.forEach(record => {



rows += `

<tr>


<td>${record.id}</td>


<td>${record.diagnosis}</td>


<td>${record.doctorNotes}</td>


<td>${record.testResults}</td>


<td>${record.recordDate}</td>



<td>

${record.patient ? record.patient.name : "N/A"}

</td>



<td>

${record.doctor ? record.doctor.name : "N/A"}

</td>



<td>


<button

class="deleteBtn"

onclick="deleteRecord(${record.id})">

Delete

</button>


</td>


</tr>


`;



});



document.getElementById("recordTable").innerHTML = rows;



}









// ==========================
// Add Medical Record
// ==========================

function addRecord(){



let record = {


diagnosis:
document.getElementById("diagnosis").value,



doctorNotes:
document.getElementById("doctorNotes").value,



testResults:
document.getElementById("testResults").value,



recordDate:
document.getElementById("recordDate").value,



patient:{

id:
Number(document.getElementById("patientId").value)

},



doctor:{

id:
Number(document.getElementById("doctorId").value)

}


};






if(
!record.diagnosis ||
!record.patient.id ||
!record.doctor.id
){


alert("Please enter required details");


return;


}







fetch(RECORD_API,{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify(record)



})



.then(response=>response.json())


.then(data=>{


alert("Medical Record Added Successfully");


clearRecordForm();


loadRecords();



})



.catch(error=>{


console.log(error);


alert("Failed to Add Record");


});



}









// ==========================
// Delete Record
// ==========================

function deleteRecord(id){



if(!confirm("Delete this medical record?")){


return;


}



fetch(RECORD_API+"/"+id,{


method:"DELETE"


})



.then(response=>response.text())


.then(message=>{


alert(message);


loadRecords();



})



.catch(error=>{


console.log(error);


});



}









// ==========================
// Search Records
// ==========================

function searchRecords(){



let value = document
.getElementById("searchRecord")
.value
.toLowerCase();




let filtered = records.filter(record=>{


return (

String(record.id)
.includes(value)


||

record.diagnosis
.toLowerCase()
.includes(value)


||

record.testResults
.toLowerCase()
.includes(value)


);



});



displayRecords(filtered);



}









// ==========================
// Clear Form
// ==========================

function clearRecordForm(){



document.getElementById("diagnosis").value="";


document.getElementById("doctorNotes").value="";


document.getElementById("testResults").value="";


document.getElementById("recordDate").value="";


document.getElementById("patientId").value="";


document.getElementById("doctorId").value="";


}