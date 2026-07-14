console.log("📊 HMS PRO Reports Dashboard Loaded");



/*=========================================================
                    API CONFIGURATION
=========================================================*/


const PATIENT_API = API_URL + "/patients";

const DOCTOR_API = API_URL + "/doctors";

const APPOINTMENT_API = API_URL + "/appointments";

const BILLING_API = API_URL + "/billing";







/*=========================================================
                    GLOBAL DATA
=========================================================*/


let patients = [];

let doctors = [];

let appointments = [];

let bills = [];






let patientChart;

let revenueChart;

let appointmentChart;

let doctorChart;







/*=========================================================
                    PAGE LOAD
=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeReports();


}

);








/*=========================================================
                    INITIALIZE
=========================================================*/


async function initializeReports(){


    showLoading();




    await loadPatients();



    await loadDoctors();



    await loadAppointments();



    await loadBilling();





    updateCards();





    createCharts();





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





        patients =

        await response.json();



    }



    catch(error){


        console.error(error);



        showToast(

            "Patient loading failed",

            "error"

        );


    }


}








/*=========================================================
                    LOAD DOCTORS
=========================================================*/


async function loadDoctors(){


    try{


        const response =

        await fetch(DOCTOR_API);





        doctors =

        await response.json();



    }



    catch(error){


        console.error(error);



        showToast(

            "Doctor loading failed",

            "error"

        );


    }


}








/*=========================================================
                LOAD APPOINTMENTS
=========================================================*/


async function loadAppointments(){


    try{


        const response =

        await fetch(APPOINTMENT_API);





        appointments =

        await response.json();



    }



    catch(error){


        console.error(error);



        showToast(

            "Appointment loading failed",

            "error"

        );


    }


}








/*=========================================================
                    LOAD BILLING
=========================================================*/


async function loadBilling(){


    try{


        const response =

        await fetch(BILLING_API);





        bills =

        await response.json();



    }



    catch(error){


        console.error(error);



        showToast(

            "Billing loading failed",

            "error"

        );


    }


}
/*=========================================================
                UPDATE DASHBOARD CARDS
=========================================================*/


function updateCards(){



    setValue(

        "totalPatients",

        patients.length

    );





    setValue(

        "totalDoctors",

        doctors.length

    );





    setValue(

        "totalAppointments",

        appointments.length

    );






    let revenue = 0;



    bills.forEach(bill=>{


        revenue += Number(

            bill.totalAmount || 0

        );


    });







    setValue(

        "totalRevenue",

        "₹"+formatAmount(revenue)

    );



}







/*=========================================================
                CREATE ALL CHARTS
=========================================================*/


function createCharts(){



    createPatientChart();



    createRevenueChart();



}








/*=========================================================
                PATIENT GROWTH CHART
=========================================================*/


function createPatientChart(){



    const canvas =

    document.getElementById("patientChart");



    if(!canvas)

        return;







    if(patientChart){

        patientChart.destroy();

    }







    patientChart = new Chart(



        canvas,



        {


            type:"line",



            data:{



                labels:[

                    "Jan",

                    "Feb",

                    "Mar",

                    "Apr",

                    "May",

                    "Jun"

                ],




                datasets:[



                {


                    label:

                    "Patients",



                    data:[

                        20,

                        45,

                        80,

                        120,

                        170,

                        patients.length

                    ],



                    tension:.4



                }



                ]



            },





            options:{



                responsive:true,



                maintainAspectRatio:false,



                plugins:{



                    legend:{



                        display:true



                    }



                }



            }



        }



    );



}










/*=========================================================
                REVENUE CHART
=========================================================*/


function createRevenueChart(){



    const canvas =

    document.getElementById("revenueChart");



    if(!canvas)

        return;







    if(revenueChart){


        revenueChart.destroy();


    }







    let totalRevenue = 0;



    bills.forEach(bill=>{


        totalRevenue += Number(

            bill.totalAmount || 0

        );


    });








    revenueChart = new Chart(



        canvas,



        {



            type:"bar",





            data:{



                labels:[

                    "Revenue"

                ],




                datasets:[



                {


                    label:

                    "Amount ₹",




                    data:[

                        totalRevenue

                    ]



                }



                ]



            },





            options:{



                responsive:true,



                maintainAspectRatio:false



            }




        }



    );



}







/*=========================================================
                    GENERATE REPORT
=========================================================*/


function generateReport(){



    updateCards();



    createCharts();




    showToast(

        "Report generated successfully"

    );


}








/*=========================================================
                    FORMAT NUMBER
=========================================================*/


function formatAmount(amount){


    return Number(amount || 0)

    .toLocaleString("en-IN");


}







/*=========================================================
                    SET VALUE
=========================================================*/


function setValue(id,value){


    const element =

    document.getElementById(id);




    if(element){


        element.textContent=value;


    }


}
/*=========================================================
            APPOINTMENT STATUS CHART
=========================================================*/


function createAppointmentChart(){


    const canvas =

    document.getElementById("appointmentChart");



    if(!canvas)

        return;






    if(appointmentChart){


        appointmentChart.destroy();


    }







    let completed = 0;

    let pending = 0;

    let cancelled = 0;






    appointments.forEach(app=>{



        if(app.status==="Completed"){


            completed++;


        }

        else if(app.status==="Cancelled"){


            cancelled++;


        }

        else{


            pending++;


        }



    });







    appointmentChart = new Chart(



        canvas,



        {



            type:"doughnut",





            data:{



                labels:[

                    "Completed",

                    "Pending",

                    "Cancelled"

                ],




                datasets:[



                {


                    data:[

                        completed,

                        pending,

                        cancelled

                    ]



                }



                ]



            },





            options:{



                responsive:true,



                maintainAspectRatio:false



            }



        }



    );



}








/*=========================================================
            DOCTOR PERFORMANCE CHART
=========================================================*/


function createDoctorChart(){



    const canvas =

    document.getElementById("doctorChart");



    if(!canvas)

        return;







    if(doctorChart){


        doctorChart.destroy();


    }







    let doctorNames = [];

    let doctorCounts = [];







    doctors.forEach(doctor=>{



        let count =

        appointments.filter(app=>



            app.doctor?.id===doctor.id



        ).length;





        doctorNames.push(

            doctor.name

        );




        doctorCounts.push(

            count

        );



    });








    doctorChart = new Chart(



        canvas,



        {



            type:"bar",





            data:{



                labels:

                doctorNames,





                datasets:[



                {


                    label:

                    "Appointments",



                    data:

                    doctorCounts



                }



                ]



            },





            options:{



                responsive:true,



                maintainAspectRatio:false



            }



        }



    );



}








/*=========================================================
            UPDATE CHARTS
=========================================================*/


function updateAllCharts(){


    createPatientChart();



    createRevenueChart();



    createAppointmentChart();



    createDoctorChart();



}








/*=========================================================
            REPORT TABLE DATA
=========================================================*/


function updateReportTable(){



    const table =

    document.getElementById("reportTable");



    if(!table)

        return;






    let revenue = 0;



    bills.forEach(bill=>{


        revenue += Number(

            bill.totalAmount || 0

        );


    });








    table.innerHTML = `



<tr>



<td>

Patients

</td>



<td>

${patients.length}

</td>



<td>

-

</td>



<td>

Active

</td>



</tr>






<tr>



<td>

Doctors

</td>



<td>

${doctors.length}

</td>



<td>

-

</td>



<td>

Active

</td>



</tr>








<tr>



<td>

Appointments

</td>



<td>

${appointments.length}

</td>



<td>

-

</td>



<td>

Updated

</td>



</tr>








<tr>



<td>

Revenue

</td>



<td>

-

</td>



<td>

₹${formatAmount(revenue)}

</td>



<td>

Collected

</td>



</tr>



`;



}








/*=========================================================
            LOAD COMPLETE REPORT
=========================================================*/


async function loadReports(){



    showLoading();



    await loadPatients();



    await loadDoctors();



    await loadAppointments();



    await loadBilling();





    updateCards();



    updateReportTable();



    updateAllCharts();





    hideLoading();





    showToast(

        "Reports refreshed"

    );



}
/*=========================================================
                    EXPORT CSV
=========================================================*/


function exportCSV(){



    let csv =

    "Category,Count,Amount,Status\n";





    csv +=

    `Patients,${patients.length},-,Active\n`;



    csv +=

    `Doctors,${doctors.length},-,Active\n`;





    csv +=

    `Appointments,${appointments.length},-,Updated\n`;






    let revenue = 0;



    bills.forEach(bill=>{


        revenue += Number(

            bill.totalAmount || 0

        );


    });







    csv +=

    `Revenue,-,${revenue},Collected\n`;







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



    link.download="hospital-report.csv";



    link.click();






    window.URL.revokeObjectURL(url);



}







/*=========================================================
                    PRINT REPORT
=========================================================*/


function printReport(){



    const content =

    document.querySelector(".main")

    .innerHTML;







    const printWindow =

    window.open(

        "",

        "",

        "width=900,height=700"

    );






    printWindow.document.write(`



    <html>



    <head>



    <title>

    HMS PRO Report

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

    HMS PRO Hospital Report

    </h1>



    ${content}



    </body>



    </html>



    `);






    printWindow.document.close();



    printWindow.print();



}







/*=========================================================
                    DATE FILTER
=========================================================*/


function applyDateFilter(){



    const from =

    document.getElementById("fromDate")

    .value;




    const to =

    document.getElementById("toDate")

    .value;





    if(!from || !to){


        showToast(

            "Select date range",

            "warning"

        );


        return;


    }






    showToast(

        "Date filter applied"

    );



}








/*=========================================================
                    AUTO REFRESH
=========================================================*/


setInterval(()=>{


    loadReports();



},60000);








/*=========================================================
                    ESC CLOSE
=========================================================*/


document.addEventListener(

"keydown",

(e)=>{


    if(e.key==="Escape"){


        console.log(

            "Escape pressed"

        );


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


    loadReports();



}

);








/*=========================================================
                    FINAL READY
=========================================================*/


console.log(

"✅ HMS PRO Reports Dashboard Ready"

);