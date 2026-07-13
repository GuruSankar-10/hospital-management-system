console.log("HMS PRO Billing Module Loaded");


// ======================================
// API URLs
// ======================================

const BASE_URL =
window.location.hostname === "localhost"
?
"http://localhost:8080"
:
"https://hospital-management-system-6pok.onrender.com";


const BILLING_API =
BASE_URL + "/billing";


const PATIENT_API =
BASE_URL + "/patients";


const APPOINTMENT_API =
BASE_URL + "/appointments";



// ======================================
// VARIABLES
// ======================================


let bills = [];

let appointments = [];






// ======================================
// PAGE LOAD
// ======================================


document.addEventListener(
"DOMContentLoaded",
()=>{


setInvoiceDetails();


loadPatients();

loadAppointments();

loadBills();

loadSummary();



});






function setInvoiceDetails(){


const invoice =
document.getElementById("invoiceNo");


const date =
document.getElementById("billDate");



if(invoice){

invoice.innerHTML =
"Invoice : INV-" + Date.now();

}



if(date){

date.innerHTML =
new Date().toLocaleString();

}



}









// ======================================
// SUMMARY
// ======================================


function loadSummary(){



fetch(BILLING_API + "/summary")

.then(res=>{


if(!res.ok){

throw new Error(
"Summary error"
);

}


return res.json();


})


.then(data=>{


document.getElementById(
"totalRevenue"
).innerHTML =
"₹ " + (data.totalRevenue || 0);



document.getElementById(
"paidBills"
).innerHTML =
data.paidBills || 0;



document.getElementById(
"unpaidBills"
).innerHTML =
data.unpaidBills || 0;



document.getElementById(
"totalBills"
).innerHTML =
data.totalBills || 0;



})


.catch(error=>{

console.log(error);

});



}









// ======================================
// LOAD PATIENTS
// ======================================


function loadPatients(){



fetch(PATIENT_API)

.then(res=>res.json())


.then(data=>{


let options =

`
<option value="">
Select Patient
</option>
`;



data.forEach(p=>{


options +=

`
<option value="${p.id}">
${p.name}
</option>

`;



});



const select =
document.getElementById(
"patientId"
);



if(select){

select.innerHTML =
options;

}



})


.catch(console.error);



}









// ======================================
// LOAD APPOINTMENTS
// ======================================


function loadAppointments(){



fetch(APPOINTMENT_API)

.then(res=>res.json())


.then(data=>{


appointments=data;



let options =

`
<option value="">
Select Appointment
</option>

`;



data.forEach(a=>{


options +=

`
<option value="${a.id}">
Appointment #${a.id}
</option>

`;



});



const select =
document.getElementById(
"appointmentId"
);



if(select){

select.innerHTML =
options;

}



})


.catch(console.error);



}









// ======================================
// AUTO FILL DOCTOR
// ======================================


document.addEventListener(
"change",
function(e){



if(e.target.id==="appointmentId"){



const id =
Number(e.target.value);



const appointment =
appointments.find(
a=>a.id===id
);



if(!appointment)
return;




document.getElementById(
"patientId"
).value =
appointment.patient?.id || "";



document.getElementById(
"doctorName"
).value =
appointment.doctor?.name || "";



document.getElementById(
"department"
).value =
appointment.doctor?.specialization || "";



}



});









// ======================================
// CALCULATE BILL
// ======================================


function calculateBill(){


let consultation =
Number(
document.getElementById(
"consultationFee"
).value || 0
);



let medicine =
Number(
document.getElementById(
"medicineFee"
).value || 0
);



let lab =
Number(
document.getElementById(
"labFee"
).value || 0
);



let room =
Number(
document.getElementById(
"roomFee"
).value || 0
);



let other =
Number(
document.getElementById(
"otherFee"
).value || 0
);



let gst =
Number(
document.getElementById(
"gst"
).value || 0
);



let discount =
Number(
document.getElementById(
"discount"
).value || 0
);



let total =

consultation+
medicine+
lab+
room+
other;



total += total * gst /100;


total -= total * discount /100;



document.getElementById(
"amount"
).value =
total.toFixed(2);



}









// ======================================
// CREATE BILL
// ======================================


function createBill(){


calculateBill();



const bill={


amount:Number(
document.getElementById(
"amount"
).value
),



paymentMethod:
document.getElementById(
"paymentMethod"
).value,



paymentStatus:
document.getElementById(
"paymentStatus"
).value,



patient:{
id:Number(
document.getElementById(
"patientId"
).value
)
},



appointment:{
id:Number(
document.getElementById(
"appointmentId"
).value
)
}



};




if(

!bill.patient.id ||

!bill.appointment.id ||

!bill.paymentMethod ||

!bill.paymentStatus

){


alert(
"Please fill all required fields"
);

return;


}




fetch(BILLING_API,{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(bill)


})

.then(res=>{


if(!res.ok){

throw new Error(
"Bill creation failed"
);

}


return res.json();


})


.then(()=>{


alert(
"Bill Generated Successfully ✅"
);


clearForm();


loadBills();


loadSummary();



})


.catch(error=>{


alert(error.message);


});



}









// ======================================
// LOAD BILLS
// ======================================


function loadBills(){


fetch(BILLING_API)

.then(res=>res.json())


.then(data=>{


bills=data;


displayBills(data);



})


.catch(console.error);



}









// ======================================
// DISPLAY BILLS
// ======================================


function displayBills(data){


let rows="";



data.forEach(b=>{


let status =

b.paymentStatus || "UNPAID";



let badge =

status==="PAID"

?
"🟢 PAID"

:

status==="PENDING"

?
"🟡 PENDING"

:

"🔴 UNPAID";




rows +=

`

<tr>


<td>
INV-${b.id}
</td>


<td>
${b.patient?.name || "-"}
</td>


<td>
₹ ${b.amount}
</td>


<td>
${badge}
</td>


<td>
${b.paymentMethod || "-"}
</td>


<td>


<button class="btn"
onclick='printBill(${JSON.stringify(b)})'>

<i class="fa fa-print"></i>

</button>



<button class="whatsappBtn"
onclick='whatsappBill(${JSON.stringify(b)})'>

<i class="fab fa-whatsapp"></i>

</button>



<button class="deleteBtn"
onclick="deleteBill(${b.id})">

<i class="fa fa-trash"></i>

</button>



</td>


</tr>

`;



});





document.getElementById(
"billingTable"
).innerHTML =


rows ||

`

<tr>

<td colspan="6">

No Billing Records Found

</td>

</tr>

`;



}









// ======================================
// SEARCH
// ======================================


function searchBills(){


const key =
document.getElementById(
"searchBill"
).value
.toLowerCase();



const result =
bills.filter(b=>


String(b.id)
.includes(key)


||

(b.patient?.name || "")
.toLowerCase()
.includes(key)


||

(b.paymentStatus || "")
.toLowerCase()
.includes(key)


);



displayBills(result);



}









// ======================================
// DELETE
// ======================================


function deleteBill(id){


if(!confirm(
"Delete this bill?"
))
return;



fetch(
BILLING_API+"/"+id,
{

method:"DELETE"

})

.then(()=>{


loadBills();

loadSummary();


});



}









// ======================================
// PRINT
// ======================================


function printBill(b){



let win =
window.open("");



win.document.write(

`

<h1 align="center">
🏥 CITY HOSPITAL
</h1>

<h2 align="center">
Invoice
</h2>


<hr>


<p>
Invoice : INV-${b.id}
</p>


<p>
Patient : ${b.patient?.name || "-"}
</p>


<p>
Amount : ₹${b.amount}
</p>


<p>
Status : ${b.paymentStatus}
</p>


<p>
Payment : ${b.paymentMethod}
</p>


`

);



win.print();



}









// ======================================
// WHATSAPP
// ======================================


function whatsappBill(b){



let msg =

`
🏥 CITY HOSPITAL

Invoice : INV-${b.id}

Patient :
${b.patient?.name || "-"}

Amount :
₹${b.amount}

Status :
${b.paymentStatus}

Thank You ❤️
`;



window.open(

"https://wa.me/?text="+
encodeURIComponent(msg),

"_blank"

);



}









// ======================================
// HMS PRO BUTTONS
// ======================================


function printCurrentBill(){


if(bills.length){

printBill(
bills[bills.length-1]
);


}

else{

alert(
"No bill available"
);


}


}




function shareCurrentBill(){


if(bills.length){

whatsappBill(
bills[bills.length-1]
);


}

else{

alert(
"No bill available"
);


}



}









// ======================================
// PDF
// ======================================


function downloadBillPDF(){


alert(
"PDF download will be added soon"
);


}









// ======================================
// CLEAR FORM
// ======================================


function clearForm(){



document.getElementById(
"amount"
).value="";

document.getElementById(
"patientId"
).value="";

document.getElementById(
"appointmentId"
).value="";

document.getElementById(
"paymentMethod"
).value="";

document.getElementById(
"paymentStatus"
).value="";



}









// ======================================
// GLOBAL
// ======================================


window.calculateBill=calculateBill;

window.createBill=createBill;

window.searchBills=searchBills;

window.printBill=printBill;

window.whatsappBill=whatsappBill;

window.deleteBill=deleteBill;

window.downloadBillPDF=downloadBillPDF;

window.printCurrentBill=printCurrentBill;

window.shareCurrentBill=shareCurrentBill;