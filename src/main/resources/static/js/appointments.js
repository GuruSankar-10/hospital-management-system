console.log("📅 HMS PRO Appointments Loaded");



/*=========================================================
                    API CONFIGURATION
=========================================================*/


const APPOINTMENT_API = API_URL + "/appointments";

const DOCTOR_API = API_URL + "/doctors";

const PATIENT_API = API_URL + "/patients";



/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/


let appointmentList = [];

let doctorsList = [];

let patientsList = [];

let deleteAppointmentId = null;



/*=========================================================
                    PAGE LOAD
=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeAppointments();


}

);



/*=========================================================
                    INITIALIZE
=========================================================*/


async function initializeAppointments(){


    showLoading();


    await loadDoctors();


    await loadPatients();


    await loadAppointments();


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
                    LOAD DOCTORS
=========================================================*/


async function loadDoctors(){


    try{


        const response =

        await fetch(DOCTOR_API);



        if(!response.ok){

            throw new Error(

                "Doctor loading failed"

            );

        }




        doctorsList =

        await response.json();




        populateDoctorDropdown();



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
                LOAD PATIENTS
=========================================================*/


async function loadPatients(){


    try{


        const response =

        await fetch(PATIENT_API);




        if(!response.ok){


            throw new Error(

                "Patient loading failed"

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
            POPULATE DROPDOWNS
=========================================================*/


function populateDoctorDropdown(){


    const doctorSelect =

    document.getElementById("appointmentDoctor");



    const doctorFilter =

    document.getElementById("doctorFilter");




    if(doctorSelect){


        doctorSelect.innerHTML = `


        <option value="">


        Select Doctor


        </option>


        `;



        doctorsList.forEach(doctor=>{


            doctorSelect.innerHTML += `


            <option value="${doctor.id}">


            Dr. ${doctor.name}


            </option>


            `;


        });


    }




    if(doctorFilter){


        doctorFilter.innerHTML = `


        <option value="">


        All Doctors


        </option>


        `;




        doctorsList.forEach(doctor=>{


            doctorFilter.innerHTML += `


            <option value="${doctor.name}">


            Dr. ${doctor.name}


            </option>


            `;


        });


    }


}




function populatePatientDropdown(){


    const patientSelect =

    document.getElementById("appointmentPatient");



    const patientFilter =

    document.getElementById("patientFilter");




    if(patientSelect){


        patientSelect.innerHTML = `


        <option value="">


        Select Patient


        </option>


        `;



        patientsList.forEach(patient=>{


            patientSelect.innerHTML += `


            <option value="${patient.id}">


            ${patient.name}


            </option>


            `;


        });


    }




    if(patientFilter){


        patientFilter.innerHTML = `


        <option value="">


        All Patients


        </option>


        `;



        patientsList.forEach(patient=>{


            patientFilter.innerHTML += `


            <option value="${patient.name}">


            ${patient.name}


            </option>


            `;


        });


    }


}



/*=========================================================
                LOAD APPOINTMENTS
=========================================================*/


async function loadAppointments(){


    try{


        const response =

        await fetch(APPOINTMENT_API);



        if(!response.ok){


            throw new Error(

                "Unable to load appointments"

            );


        }




        appointmentList =

        await response.json();




        renderAppointmentTable();



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
                RENDER APPOINTMENT TABLE
=========================================================*/


function renderAppointmentTable(list = appointmentList){


    const table =

    document.getElementById("appointmentTable");



    if(!table)

        return;




    if(list.length===0){


        table.innerHTML = `


        <tr>

            <td colspan="8">

                No Appointments Found

            </td>

        </tr>


        `;


        return;


    }




    table.innerHTML = list.map(app=>`



<tr>



<td>

${app.id}

</td>




<td>


<div class="appointment-profile">


<div class="appointment-avatar">


<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(app.patient?.name || "Patient")}&background=2563eb&color=ffffff">


</div>



<div class="appointment-info">


<h4>

${app.patient?.name || "-"}

</h4>


<small>

${app.patient?.phone || ""}

</small>


</div>


</div>


</td>





<td>


Dr. ${app.doctor?.name || "-"}


</td>





<td>

${app.appointmentDate || "-"}

</td>




<td>

${app.appointmentTime || "-"}

</td>





<td>

${app.reason || "-"}

</td>




<td>


<span class="badge ${

app.status==="Completed"

?

"badge-success"

:

app.status==="Cancelled"

?

"badge-danger"

:

"badge-warning"

}">


${app.status || "Scheduled"}


</span>


</td>





<td>


<div class="action-buttons">


<button

class="edit-btn"

onclick="editAppointment(${app.id})">


<i class="fa-solid fa-pen"></i>


</button>





<button

class="delete-btn"

onclick="deleteAppointment(${app.id})">


<i class="fa-solid fa-trash"></i>


</button>



</div>


</td>



</tr>


`).join("");



}




/*=========================================================
                UPDATE STATISTICS
=========================================================*/


function updateStatistics(){


    setValue(

        "appointmentCount",

        appointmentList.length

    );




    setValue(

        "completedCount",

        appointmentList.filter(app=>

            app.status==="Completed"

        ).length

    );





    setValue(

        "pendingCount",

        appointmentList.filter(app=>

            !app.status ||

            app.status==="Scheduled"

        ).length

    );





    setValue(

        "cancelledCount",

        appointmentList.filter(app=>

            app.status==="Cancelled"

        ).length

    );



}




/*=========================================================
                SEARCH APPOINTMENT
=========================================================*/


function searchAppointment(){


    const keyword =

    document.getElementById("searchAppointment")

    .value

    .toLowerCase()

    .trim();




    if(keyword===""){


        renderAppointmentTable();


        return;


    }





    const filtered = appointmentList.filter(app=>{


        return (


        (app.patient?.name || "")

        .toLowerCase()

        .includes(keyword)



        ||



        (app.doctor?.name || "")

        .toLowerCase()

        .includes(keyword)



        ||



        (app.reason || "")

        .toLowerCase()

        .includes(keyword)



        ||



        (app.status || "")

        .toLowerCase()

        .includes(keyword)



        );


    });




    renderAppointmentTable(filtered);



}




/*=========================================================
                FILTER APPOINTMENTS
=========================================================*/


function filterAppointments(){


    const doctor =

    document.getElementById("doctorFilter")

    .value;




    const patient =

    document.getElementById("patientFilter")

    .value;




    const status =

    document.getElementById("appointmentStatusFilter")

    .value;




    const date =

    document.getElementById("appointmentDateFilter")

    .value;





    let filtered =

    [...appointmentList];





    if(doctor){


        filtered = filtered.filter(app=>

            app.doctor?.name===doctor

        );


    }





    if(patient){


        filtered = filtered.filter(app=>

            app.patient?.name===patient

        );


    }





    if(status){


        filtered = filtered.filter(app=>

            app.status===status

        );


    }





    if(date){


        filtered = filtered.filter(app=>

            app.appointmentDate===date

        );


    }





    renderAppointmentTable(filtered);


}





/*=========================================================
                    HELPER
=========================================================*/


function setValue(id,value){


    const element =

    document.getElementById(id);



    if(element){


        element.textContent=value;


    }


}
/*=========================================================
                OPEN APPOINTMENT MODAL
=========================================================*/

function openAppointmentModal(){


    document.getElementById("modalTitle").innerHTML = `

        <i class="fa-solid fa-calendar-plus"></i>

        Add Appointment

    `;



    document.getElementById("appointmentId").value="";


    document.getElementById("appointmentPatient").value="";


    document.getElementById("appointmentDoctor").value="";


    document.getElementById("appointmentDate").value="";


    document.getElementById("appointmentTime").value="";


    document.getElementById("appointmentReason").value="";


    document.getElementById("appointmentStatus").value="Scheduled";



    document.getElementById("appointmentModal")
    .style.display="flex";


}



/*=========================================================
            CLOSE APPOINTMENT MODAL
=========================================================*/

function closeAppointmentModal(){


    const modal =

    document.getElementById("appointmentModal");



    if(modal){

        modal.style.display="none";

    }


}





/*=========================================================
                SAVE APPOINTMENT
=========================================================*/


async function saveAppointment(){


    const id =

    document.getElementById("appointmentId").value;




    const appointment = {


        patient:{

            id:Number(

                document.getElementById("appointmentPatient")
                .value

            )

        },



        doctor:{

            id:Number(

                document.getElementById("appointmentDoctor")
                .value

            )

        },



        appointmentDate:

        document.getElementById("appointmentDate")
        .value,



        appointmentTime:

        document.getElementById("appointmentTime")
        .value,



        reason:

        document.getElementById("appointmentReason")
        .value,



        status:

        document.getElementById("appointmentStatus")
        .value


    };





    if(

        !appointment.patient.id

        ||

        !appointment.doctor.id

        ||

        !appointment.appointmentDate

    ){


        showToast(

            "Please fill required fields",

            "warning"

        );


        return;


    }





    try{


        const response = await fetch(


            id===""

            ?

            APPOINTMENT_API

            :

            APPOINTMENT_API+"/"+id,


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

                JSON.stringify(appointment)


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

            "Appointment created successfully"

            :

            "Appointment updated successfully"


        );




        closeAppointmentModal();



        await loadAppointments();



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
                EDIT APPOINTMENT
=========================================================*/


async function editAppointment(id){


    try{


        const response =

        await fetch(

            APPOINTMENT_API+"/"+id

        );




        if(!response.ok){


            throw new Error(

                "Unable to load appointment"

            );


        }




        const app =

        await response.json();





        document.getElementById("modalTitle").innerHTML = `


            <i class="fa-solid fa-calendar-pen"></i>


            Edit Appointment


        `;





        document.getElementById("appointmentId").value =

        app.id;





        document.getElementById("appointmentPatient").value =

        app.patient?.id || "";





        document.getElementById("appointmentDoctor").value =

        app.doctor?.id || "";





        document.getElementById("appointmentDate").value =

        app.appointmentDate || "";





        document.getElementById("appointmentTime").value =

        app.appointmentTime || "";





        document.getElementById("appointmentReason").value =

        app.reason || "";





        document.getElementById("appointmentStatus").value =

        app.status || "Scheduled";





        document.getElementById("appointmentModal")
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
                DELETE APPOINTMENT
=========================================================*/

function deleteAppointment(id){

    deleteAppointmentId = id;

    document.getElementById("deleteModal")
    .style.display="flex";

}



/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/

function closeDeleteModal(){

    deleteAppointmentId = null;


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


    if(deleteAppointmentId===null){

        return;

    }



    try{


        const response = await fetch(


            APPOINTMENT_API+"/"+deleteAppointmentId,


            {

                method:"DELETE"

            }


        );



        if(!response.ok){


            throw new Error(

                "Unable to delete appointment"

            );

        }




        closeDeleteModal();



        showToast(

            "Appointment deleted successfully"

        );



        await loadAppointments();



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
                    EXPORT CSV
=========================================================*/

function exportCSV(){


    if(appointmentList.length===0){


        showToast(

            "No appointment data available",

            "warning"

        );


        return;


    }





    let csv =

    "ID,Patient,Doctor,Date,Time,Reason,Status\n";





    appointmentList.forEach(app=>{


        csv +=


        `${app.id},`+

        `"${app.patient?.name || ""}",`+

        `"${app.doctor?.name || ""}",`+

        `"${app.appointmentDate || ""}",`+

        `"${app.appointmentTime || ""}",`+

        `"${app.reason || ""}",`+

        `"${app.status || ""}"\n`;



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



    link.download="appointments.csv";



    link.click();





    window.URL.revokeObjectURL(url);



}



/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(()=>{


    loadAppointments();


},30000);





/*=========================================================
                ESC KEY CLOSE
=========================================================*/

document.addEventListener(

"keydown",

(e)=>{


    if(e.key==="Escape"){


        closeAppointmentModal();


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


    const appointmentModal =

    document.getElementById("appointmentModal");



    const deleteModal =

    document.getElementById("deleteModal");




    if(e.target===appointmentModal){


        closeAppointmentModal();


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


    loadAppointments();


}

);





/*=========================================================
                    READY
=========================================================*/


console.log(

"✅ HMS PRO Appointment Management Ready"

);