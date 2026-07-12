console.log("Billing JS Loaded");


const BILLING_API = "http://localhost:8080/billing";


let bills = [];



// =====================================
// Page Load
// =====================================

document.addEventListener("DOMContentLoaded", function(){

    loadBills();

    loadSummary();

});




// =====================================
// Load Billing Summary
// =====================================

function loadSummary(){


fetch(BILLING_API + "/summary")


.then(response => response.json())


.then(data => {


    document.getElementById("totalRevenue").innerHTML =
    "₹ " + data.totalRevenue;


    document.getElementById("paidBills").innerHTML =
    data.paidBills;


    document.getElementById("unpaidBills").innerHTML =
    data.unpaidBills;


    document.getElementById("totalBills").innerHTML =
    data.totalBills;


})

.catch(error=>{

    console.log(error);

});


}







// =====================================
// Load All Bills
// =====================================

function loadBills(){


fetch(BILLING_API)


.then(response=>response.json())


.then(data=>{


    bills = data;


    displayBills(data);


})


.catch(error=>{


    console.log("Billing Error:",error);


});


}








// =====================================
// Display Bills
// =====================================

function displayBills(data){


let rows = "";



data.forEach(bill=>{


rows += `


<tr>


<td>
${bill.id}
</td>


<td>
₹ ${bill.amount}
</td>


<td>
${bill.paymentStatus}
</td>


<td>
${bill.paymentMethod}
</td>


<td>

${bill.patient 
? bill.patient.name 
: "N/A"}

</td>


<td>


<button
class="btn"
onclick='printBill(${JSON.stringify(bill)})'>

🖨 Print

</button>



<button
class="whatsappBtn"
onclick='whatsappBill(${JSON.stringify(bill)})'>

📱 WhatsApp

</button>




<button
class="deleteBtn"
onclick="deleteBill(${bill.id})">

Delete

</button>


</td>


</tr>


`;


});



document.getElementById("billingTable").innerHTML = rows;


}









// =====================================
// Create Bill
// =====================================

function createBill(){



let bill = {


amount:
Number(
document.getElementById("amount").value
),



paymentStatus:
document.getElementById("paymentStatus").value,



paymentMethod:
document.getElementById("paymentMethod").value,



patient:{

id:Number(
document.getElementById("patientId").value
)

},



appointment:{

id:Number(
document.getElementById("appointmentId").value
)

}


};





if(
!bill.amount ||
!bill.paymentStatus ||
!bill.paymentMethod ||
!bill.patient.id
){


alert("Please fill all required fields");

return;

}







fetch(BILLING_API,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(bill)


})



.then(response=>response.json())


.then(data=>{


alert("Bill Created Successfully ✅");


clearForm();


loadBills();


loadSummary();


})


.catch(error=>{


console.log(error);


alert("Bill Creation Failed");


});


}








// =====================================
// Delete Bill
// =====================================

function deleteBill(id){



if(!confirm("Delete this bill?")){

return;

}



fetch(
BILLING_API+"/"+id,
{

method:"DELETE"

})



.then(response=>response.text())


.then(message=>{


alert(message);


loadBills();


loadSummary();


});



}








// =====================================
// Search Bills
// =====================================

function searchBills(){


let value =
document
.getElementById("searchBill")
.value
.toLowerCase();



let filtered =
bills.filter(bill=>{


return (

String(bill.id)
.includes(value)


||

bill.paymentStatus
.toLowerCase()
.includes(value)


||

bill.paymentMethod
.toLowerCase()
.includes(value)


);


});



displayBills(filtered);



}








// =====================================
// Print Bill
// =====================================

function printBill(bill){



let invoice = `


<html>

<head>

<title>Hospital Bill</title>


<style>

body{

font-family:Arial;
padding:40px;

}


.invoice{

border:2px solid black;
padding:30px;

}


h1,h2{

text-align:center;

}


</style>


</head>


<body>


<div class="invoice">


<h1>
🏥 Hospital Management System
</h1>


<h2>
Bill Invoice
</h2>


<hr>



<p>
<b>Bill ID:</b>
${bill.id}
</p>


<p>
<b>Patient:</b>
${bill.patient 
? bill.patient.name 
: "N/A"}

</p>


<p>
<b>Amount:</b>
₹ ${bill.amount}
</p>


<p>
<b>Status:</b>
${bill.paymentStatus}
</p>


<p>
<b>Payment Method:</b>
${bill.paymentMethod}
</p>



<hr>


<h3 style="text-align:center">

Thank You

</h3>



</div>


</body>

</html>


`;




let printWindow =
window.open(
"",
"_blank"
);



printWindow.document.write(invoice);


printWindow.document.close();


printWindow.print();



}









// =====================================
// WhatsApp Share
// =====================================

function whatsappBill(bill){



let message = `


🏥 Hospital Management System


Bill Invoice


Bill ID:
${bill.id}


Patient:
${bill.patient 
? bill.patient.name 
: "N/A"}



Amount:
₹ ${bill.amount}



Payment Status:
${bill.paymentStatus}



Payment Method:
${bill.paymentMethod}



Thank You.



`;




let whatsappURL =

"https://wa.me/?text="

+

encodeURIComponent(message);




window.open(
whatsappURL,
"_blank"
);



}









// =====================================
// Clear Form
// =====================================

function clearForm(){


document.getElementById("amount").value="";


document.getElementById("paymentStatus").value="";


document.getElementById("paymentMethod").value="";


document.getElementById("patientId").value="";


document.getElementById("appointmentId").value="";


}