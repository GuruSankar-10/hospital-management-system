console.log("💳 HMS PRO Billing Loaded");



/*=========================================================
                    API CONFIGURATION
=========================================================*/


const BILLING_API = API_URL + "/billing";

const PATIENT_API = API_URL + "/patients";



/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/


let billList = [];

let patientsList = [];

let deleteBillId = null;



/*=========================================================
                    PAGE LOAD
=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeBilling();


}

);




/*=========================================================
                    INITIALIZE
=========================================================*/


async function initializeBilling(){


    showLoading();


    await loadPatients();


    await loadBills();


    hideLoading();


}





/*=========================================================
                    LOADING
=========================================================*/


function showLoading(){


    const loading =

    document.getElementById("loadingOverlay");



    if(loading){

        loading.style.display="flex";

    }


}




function hideLoading(){


    const loading =

    document.getElementById("loadingOverlay");



    if(loading){

        loading.style.display="none";

    }


}





/*=========================================================
                    TOAST
=========================================================*/


function showToast(message,type="success"){


    const container =

    document.getElementById("toastContainer");



    if(!container)

        return;




    const toast =

    document.createElement("div");




    toast.className =

    `toast ${type}`;





    toast.innerHTML = `


    <i class="fa-solid ${

        type==="success"

        ?

        "fa-circle-check"

        :

        type==="error"

        ?

        "fa-circle-xmark"

        :

        "fa-circle-info"

    }"></i>



    <span>

    ${message}

    </span>


    `;




    container.appendChild(toast);




    setTimeout(()=>{


        toast.remove();


    },3000);



}




/*=========================================================
                    LOAD PATIENTS
=========================================================*/


async function loadPatients(){


    try{


        const response =

        await fetch(PATIENT_API);



        if(!response.ok){


            throw new Error(

                "Unable to load patients"

            );

        }




        patientsList =

        await response.json();




        populatePatientDropdown();



    }



    catch(error){


        console.error(error);



        showToast(

            error.message,

            "error"

        );


    }


}





/*=========================================================
            POPULATE PATIENT DROPDOWN
=========================================================*/


function populatePatientDropdown(){


    const dropdown =

    document.getElementById("billPatient");



    const filter =

    document.getElementById("patientFilter");





    if(dropdown){



        dropdown.innerHTML = `


        <option value="">


        Select Patient


        </option>


        `;




        patientsList.forEach(patient=>{


            dropdown.innerHTML += `


            <option value="${patient.id}">


            ${patient.name}


            </option>


            `;



        });



    }






    if(filter){


        filter.innerHTML = `


        <option value="">


        All Patients


        </option>


        `;





        patientsList.forEach(patient=>{


            filter.innerHTML += `


            <option value="${patient.name}">


            ${patient.name}


            </option>


            `;



        });


    }


}





/*=========================================================
                    LOAD BILLS
=========================================================*/


async function loadBills(){


    try{


        const response =

        await fetch(BILLING_API);




        if(!response.ok){


            throw new Error(

                "Unable to load bills"

            );


        }





        billList =

        await response.json();




        renderBillingTable();



        updateStatistics();



    }



    catch(error){


        console.error(error);



        showToast(

            error.message,

            "error"

        );


    }


}
/*=========================================================
                RENDER BILLING TABLE
=========================================================*/


function renderBillingTable(list = billList){


    const table =

    document.getElementById("billingTable");



    if(!table)

        return;




    if(list.length===0){


        table.innerHTML = `


        <tr>


            <td colspan="8">


                No Bills Found


            </td>


        </tr>


        `;


        return;


    }





    table.innerHTML = list.map(bill=>`



<tr>



<td>

${bill.id}

</td>




<td>


<div class="invoice-profile">


<div class="invoice-avatar">


<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(bill.patient?.name || "Patient")}&background=2563eb&color=ffffff">


</div>




<div class="invoice-info">


<h4>

${bill.patient?.name || "-"}

</h4>


<small>

${bill.patient?.phone || ""}

</small>


</div>


</div>


</td>






<td>


INV-${bill.id}


</td>






<td>


₹${formatAmount(bill.totalAmount)}


</td>






<td>


${bill.billDate || "-"}


</td>






<td>


${bill.paymentMethod || "-"}


</td>






<td>


<span class="badge ${


bill.paymentStatus==="Paid"

?

"badge-success"


:

bill.paymentStatus==="Cancelled"

?

"badge-danger"


:

"badge-warning"



}">


${bill.paymentStatus || "Pending"}


</span>


</td>






<td>



<div class="action-buttons">



<button

class="print-btn"

onclick="printBill(${bill.id})">


<i class="fa-solid fa-print"></i>


</button>





<button

class="edit-btn"

onclick="editBill(${bill.id})">


<i class="fa-solid fa-pen"></i>


</button>





<button

class="delete-btn"

onclick="deleteBill(${bill.id})">


<i class="fa-solid fa-trash"></i>


</button>




</div>


</td>




</tr>



`).join("");



}




/*=========================================================
                UPDATE BILL STATISTICS
=========================================================*/


function updateStatistics(){


    let revenue = 0;



    billList.forEach(bill=>{


        revenue +=

        Number(bill.totalAmount || 0);


    });





    setValue(

        "totalRevenue",

        "₹"+formatAmount(revenue)

    );





    setValue(

        "paidBills",

        billList.filter(b=>

            b.paymentStatus==="Paid"

        ).length

    );





    setValue(

        "pendingBills",

        billList.filter(b=>

            b.paymentStatus==="Pending"

        ).length

    );





    setValue(

        "cancelledBills",

        billList.filter(b=>

            b.paymentStatus==="Cancelled"

        ).length

    );


}




/*=========================================================
                    SEARCH BILL
=========================================================*/


function searchBill(){


    const keyword =

    document.getElementById("searchBill")

    .value

    .toLowerCase()

    .trim();





    if(keyword===""){


        renderBillingTable();


        return;


    }





    const filtered = billList.filter(bill=>{


        return (


        (bill.patient?.name || "")

        .toLowerCase()

        .includes(keyword)




        ||




        ("inv-"+bill.id)

        .toLowerCase()

        .includes(keyword)




        ||




        (bill.paymentStatus || "")

        .toLowerCase()

        .includes(keyword)



        ||



        (bill.paymentMethod || "")

        .toLowerCase()

        .includes(keyword)



        );


    });




    renderBillingTable(filtered);


}





/*=========================================================
                    FILTER BILLS
=========================================================*/


function filterBills(){


    const patient =

    document.getElementById("patientFilter")

    .value;



    const status =

    document.getElementById("paymentStatusFilter")

    .value;



    const method =

    document.getElementById("paymentMethodFilter")

    .value;




    let filtered =

    [...billList];





    if(patient){


        filtered = filtered.filter(b=>

            b.patient?.name===patient

        );


    }






    if(status){


        filtered = filtered.filter(b=>

            b.paymentStatus===status

        );


    }





    if(method){


        filtered = filtered.filter(b=>

            b.paymentMethod===method

        );


    }





    renderBillingTable(filtered);


}





/*=========================================================
                    HELPERS
=========================================================*/


function formatAmount(amount){


    return Number(amount || 0)

    .toLocaleString("en-IN");


}





function setValue(id,value){


    const element =

    document.getElementById(id);



    if(element){


        element.textContent=value;


    }


}
/*=========================================================
                OPEN BILLING MODAL
=========================================================*/


function openBillingModal(){


    document.getElementById("modalTitle").innerHTML = `


    <i class="fa-solid fa-file-invoice-dollar"></i>


    Create Invoice


    `;



    document.getElementById("billId").value="";


    document.getElementById("billPatient").value="";


    document.getElementById("billDate").value =
    
    new Date().toISOString().split("T")[0];


    document.getElementById("consultationFee").value="";


    document.getElementById("medicineCharges").value="";


    document.getElementById("labCharges").value="";


    document.getElementById("roomCharges").value="";


    document.getElementById("totalAmount").value="";


    document.getElementById("paymentMethod").value="Cash";


    document.getElementById("paymentStatus").value="Paid";



    document.getElementById("billingModal")
    .style.display="flex";


}




/*=========================================================
                CLOSE BILLING MODAL
=========================================================*/


function closeBillingModal(){


    const modal =

    document.getElementById("billingModal");



    if(modal){

        modal.style.display="none";

    }


}





/*=========================================================
                CALCULATE TOTAL
=========================================================*/


function calculateTotal(){


    const consultation =

    Number(

    document.getElementById("consultationFee").value

    ||0);



    const medicine =

    Number(

    document.getElementById("medicineCharges").value

    ||0);



    const lab =

    Number(

    document.getElementById("labCharges").value

    ||0);



    const room =

    Number(

    document.getElementById("roomCharges").value

    ||0);





    const total =

    consultation +

    medicine +

    lab +

    room;





    document.getElementById("totalAmount").value =

    total;


}





/*=========================================================
                    SAVE BILL
=========================================================*/


async function saveBill(){


    const id =

    document.getElementById("billId").value;




    const bill = {


        patient:{

            id:Number(

                document.getElementById("billPatient").value

            )

        },



        billDate:

        document.getElementById("billDate").value,



        consultationFee:

        Number(

            document.getElementById("consultationFee").value || 0

        ),



        medicineCharges:

        Number(

            document.getElementById("medicineCharges").value || 0

        ),



        labCharges:

        Number(

            document.getElementById("labCharges").value || 0

        ),



        roomCharges:

        Number(

            document.getElementById("roomCharges").value || 0

        ),



        totalAmount:

        Number(

            document.getElementById("totalAmount").value || 0

        ),



        paymentMethod:

        document.getElementById("paymentMethod").value,



        paymentStatus:

        document.getElementById("paymentStatus").value


    };





    if(!bill.patient.id){


        showToast(

            "Please select patient",

            "warning"

        );


        return;

    }







    try{


        const response = await fetch(


            id===""

            ?

            BILLING_API

            :

            BILLING_API+"/"+id,



            {


                method:

                id===""

                ?

                "POST"

                :

                "PUT",



                headers:{


                    "Content-Type":

                    "application/json"


                },



                body:

                JSON.stringify(bill)


            }


        );





        if(!response.ok){


            throw new Error(

                await response.text()

            );


        }





        showToast(


            id===""

            ?

            "Bill created successfully"

            :

            "Bill updated successfully"


        );





        closeBillingModal();



        await loadBills();


    }





    catch(error){


        console.error(error);



        showToast(

            error.message,

            "error"

        );


    }


}







/*=========================================================
                    EDIT BILL
=========================================================*/


async function editBill(id){


    try{


        const response =

        await fetch(

            BILLING_API+"/"+id

        );



        if(!response.ok){


            throw new Error(

                "Unable to load bill"

            );


        }





        const bill =

        await response.json();





        document.getElementById("modalTitle").innerHTML = `


        <i class="fa-solid fa-pen"></i>


        Edit Invoice


        `;





        document.getElementById("billId").value =

        bill.id;





        document.getElementById("billPatient").value =

        bill.patient?.id || "";





        document.getElementById("billDate").value =

        bill.billDate || "";





        document.getElementById("consultationFee").value =

        bill.consultationFee || 0;





        document.getElementById("medicineCharges").value =

        bill.medicineCharges || 0;





        document.getElementById("labCharges").value =

        bill.labCharges || 0;





        document.getElementById("roomCharges").value =

        bill.roomCharges || 0;





        document.getElementById("totalAmount").value =

        bill.totalAmount || 0;





        document.getElementById("paymentMethod").value =

        bill.paymentMethod || "Cash";





        document.getElementById("paymentStatus").value =

        bill.paymentStatus || "Pending";





        document.getElementById("billingModal")
        .style.display="flex";


    }




    catch(error){


        console.error(error);



        showToast(

            error.message,

            "error"

        );


    }


}
/*=========================================================
                DELETE BILL
=========================================================*/


function deleteBill(id){

    deleteBillId = id;


    document.getElementById("deleteModal")
    .style.display="flex";


}




/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/


function closeDeleteModal(){


    deleteBillId = null;


    const modal =

    document.getElementById("deleteModal");



    if(modal){

        modal.style.display="none";

    }


}




/*=========================================================
                CONFIRM DELETE
=========================================================*/


async function confirmDelete(){


    if(deleteBillId===null){

        return;

    }



    try{


        const response = await fetch(


            BILLING_API+"/"+deleteBillId,


            {


                method:"DELETE"


            }


        );




        if(!response.ok){


            throw new Error(

                "Unable to delete bill"

            );


        }





        closeDeleteModal();



        showToast(

            "Invoice deleted successfully"

        );




        await loadBills();



    }




    catch(error){


        console.error(error);



        showToast(

            error.message,

            "error"

        );


    }


}






/*=========================================================
                PRINT BILL RECEIPT
=========================================================*/


async function printBill(id){


    try{


        const response =

        await fetch(

            BILLING_API+"/"+id

        );




        const bill =

        await response.json();





        const printWindow =

        window.open("","","width=700,height=700");





        printWindow.document.write(`


        <html>


        <head>

        <title>

        HMS PRO Invoice

        </title>



        <style>


        body{

            font-family:Arial;

            padding:30px;

        }


        h1{

            color:#2563eb;

        }


        table{

            width:100%;

            border-collapse:collapse;

        }


        td,th{

            border:1px solid #ddd;

            padding:10px;

        }


        </style>


        </head>



        <body>



        <h1>

        HMS PRO Hospital

        </h1>


        <h2>

        Invoice #${bill.id}

        </h2>



        <p>

        Patient:

        ${bill.patient?.name || "-"}

        </p>



        <p>

        Date:

        ${bill.billDate || "-"}

        </p>



        <table>


        <tr>

        <th>

        Description

        </th>


        <th>

        Amount

        </th>

        </tr>



        <tr>

        <td>

        Consultation

        </td>


        <td>

        ₹${bill.consultationFee || 0}

        </td>


        </tr>



        <tr>

        <td>

        Medicine

        </td>


        <td>

        ₹${bill.medicineCharges || 0}

        </td>


        </tr>




        <tr>

        <td>

        Lab

        </td>


        <td>

        ₹${bill.labCharges || 0}

        </td>


        </tr>




        <tr>

        <td>

        Room

        </td>


        <td>

        ₹${bill.roomCharges || 0}

        </td>


        </tr>




        <tr>

        <th>

        Total

        </th>


        <th>

        ₹${bill.totalAmount || 0}

        </th>


        </tr>


        </table>



        <br>


        <p>

        Payment:

        ${bill.paymentMethod || "-"}

        </p>



        <p>

        Status:

        ${bill.paymentStatus || "-"}

        </p>



        </body>


        </html>


        `);




        printWindow.document.close();


        printWindow.print();



    }



    catch(error){


        console.error(error);



        showToast(

            "Print failed",

            "error"

        );


    }


}





/*=========================================================
                    EXPORT CSV
=========================================================*/


function exportCSV(){



    if(billList.length===0){


        showToast(

            "No billing data available",

            "warning"

        );


        return;


    }





    let csv =

    "ID,Patient,Amount,Date,Method,Status\n";





    billList.forEach(bill=>{


        csv +=


        `${bill.id},`+

        `"${bill.patient?.name || ""}",`+

        `${bill.totalAmount || 0},`+

        `"${bill.billDate || ""}",`+

        `"${bill.paymentMethod || ""}",`+

        `"${bill.paymentStatus || ""}"\n`;



    });






    const blob =

    new Blob(

        [csv],

        {

            type:"text/csv"

        }

    );





    const url =

    window.URL.createObjectURL(blob);





    const link =

    document.createElement("a");





    link.href=url;



    link.download="billing-report.csv";



    link.click();





    window.URL.revokeObjectURL(url);



}





/*=========================================================
                    AUTO REFRESH
=========================================================*/


setInterval(()=>{


    loadBills();


},30000);







/*=========================================================
                    ESC CLOSE
=========================================================*/


document.addEventListener(

"keydown",

(e)=>{


    if(e.key==="Escape"){


        closeBillingModal();


        closeDeleteModal();


    }


}

);







/*=========================================================
                CLICK OUTSIDE MODAL
=========================================================*/


window.addEventListener(

"click",

(e)=>{


    const billingModal =

    document.getElementById("billingModal");



    const deleteModal =

    document.getElementById("deleteModal");




    if(e.target===billingModal){


        closeBillingModal();


    }





    if(e.target===deleteModal){


        closeDeleteModal();


    }



}

);






/*=========================================================
                    LOGOUT
=========================================================*/


function logout(){


    localStorage.removeItem("token");

    localStorage.removeItem("role");

    localStorage.removeItem("email");

    localStorage.removeItem("name");



    window.location.href="login.html";


}





/*=========================================================
                    WINDOW FOCUS
=========================================================*/


window.addEventListener(

"focus",

()=>{


    loadBills();


}

);






console.log(

"✅ HMS PRO Billing Management Ready"

);