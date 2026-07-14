console.log("🏥 HMS PRO Patients Loaded");


/*=========================================================
                    API CONFIGURATION
=========================================================*/
const PATIENT_API = API_URL + "/patients";

const DOCTOR_API = API_URL + "/doctors";



/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/

let patientsList = [];

let doctorsList = [];

let deletePatientId = null;



/*=========================================================
                    PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializePatients();

});



/*=========================================================
                    INITIALIZE
=========================================================*/

async function initializePatients(){

    showLoading();


    await loadDoctors();


    await loadPatients();


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


        <span>${message}</span>

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
                "Unable to load doctors"
            );

        }



        doctorsList =
        await response.json();



        populateDoctorDropdown();


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
                DOCTOR DROPDOWN
=========================================================*/

function populateDoctorDropdown(){


    const dropdown =
    document.getElementById("patientDoctor");



    const filter =
    document.getElementById("doctorFilter");



    if(dropdown){


        dropdown.innerHTML = `

        <option value="">

            Select Doctor

        </option>

        `;


        doctorsList.forEach(doctor=>{


            dropdown.innerHTML += `

            <option value="${doctor.id}">

                Dr. ${doctor.name}

            </option>

            `;


        });


    }



    if(filter){


        filter.innerHTML = `

        <option value="">

            All Doctors

        </option>

        `;


        doctorsList.forEach(doctor=>{


            filter.innerHTML += `

            <option value="${doctor.name}">

                Dr. ${doctor.name}

            </option>

            `;


        });


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
                "Unable to load patients"
            );


        }



        patientsList =
        await response.json();



        renderPatientTable();



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
                RENDER PATIENT TABLE
=========================================================*/

function renderPatientTable(list = patientsList){


    const table =
    document.getElementById("patientTable");


    if(!table)

        return;



    if(list.length === 0){


        table.innerHTML = `

        <tr>

            <td colspan="8">

                No Patients Found

            </td>

        </tr>

        `;


        return;


    }




    table.innerHTML = list.map(patient=>`


<tr>


<td>

${patient.id}

</td>



<td>


<div class="patient-profile">


<div class="patient-avatar">


<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(patient.name)}&background=2563eb&color=ffffff">


</div>



<div class="patient-info">


<h4>

${patient.name}

</h4>


<small>

${patient.gender || "-"}

</small>


</div>


</div>


</td>




<td>

${patient.age || "-"}

</td>




<td>

${patient.disease || "-"}

</td>




<td>

${patient.doctor?.name 
? 
"Dr. "+patient.doctor.name 
: 
"-"}

</td>




<td>

${patient.phone || "-"}

</td>




<td>


<span class="badge ${
    
    patient.status==="Critical"
    ?
    "badge-danger"
    :
    patient.status==="Discharged"
    ?
    "badge-info"
    :
    "badge-success"

}">


${patient.status || "Admitted"}


</span>


</td>




<td>


<div class="action-buttons">


<button

class="edit-btn"

onclick="editPatient(${patient.id})">


<i class="fa-solid fa-pen"></i>


</button>



<button

class="delete-btn"

onclick="deletePatient(${patient.id})">


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

        "patientCount",

        patientsList.length

    );



    setValue(

        "admittedCount",

        patientsList.filter(p=>

            !p.status ||

            p.status==="Admitted"

        ).length

    );



    setValue(

        "dischargedCount",

        patientsList.filter(p=>

            p.status==="Discharged"

        ).length

    );



    setValue(

        "criticalCount",

        patientsList.filter(p=>

            p.status==="Critical"

        ).length

    );


}



/*=========================================================
                    SEARCH PATIENT
=========================================================*/

function searchPatient(){


    const keyword =

    document.getElementById("searchPatient")

    .value

    .toLowerCase()

    .trim();



    if(keyword===""){


        renderPatientTable();


        return;


    }




    const filtered = patientsList.filter(patient=>{


        return (

            (patient.name || "")

            .toLowerCase()

            .includes(keyword)



            ||



            (patient.disease || "")

            .toLowerCase()

            .includes(keyword)



            ||



            (patient.phone || "")

            .includes(keyword)



            ||



            (patient.doctor?.name || "")

            .toLowerCase()

            .includes(keyword)

        );


    });



    renderPatientTable(filtered);


}



/*=========================================================
                    FILTER PATIENTS
=========================================================*/

function filterPatients(){


    const disease =

    document.getElementById("diseaseFilter")

    .value;



    const doctor =

    document.getElementById("doctorFilter")

    .value;



    const status =

    document.getElementById("patientStatusFilter")

    .value;




    let filtered = [...patientsList];



    if(disease){


        filtered = filtered.filter(p=>

            p.disease===disease

        );


    }



    if(doctor){


        filtered = filtered.filter(p=>

            p.doctor?.name===doctor

        );


    }



    if(status){


        filtered = filtered.filter(p=>

            p.status===status

        );


    }




    renderPatientTable(filtered);


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
                    OPEN PATIENT MODAL
=========================================================*/

function openPatientModal(){


    document.getElementById("modalTitle").innerHTML = `

        <i class="fa-solid fa-user-plus"></i>

        Add Patient

    `;


    document.getElementById("patientId").value="";

    document.getElementById("patientName").value="";

    document.getElementById("patientAge").value="";

    document.getElementById("patientGender").value="";

    document.getElementById("patientPhone").value="";

    document.getElementById("patientDisease").value="";

    document.getElementById("patientDoctor").value="";

    document.getElementById("patientStatus").value="Admitted";

    document.getElementById("patientAddress").value="";


    document.getElementById("patientModal").style.display="flex";


}



/*=========================================================
                    CLOSE PATIENT MODAL
=========================================================*/

function closePatientModal(){


    const modal =

    document.getElementById("patientModal");


    if(modal){

        modal.style.display="none";

    }

}



/*=========================================================
                    SAVE PATIENT
=========================================================*/

async function savePatient(){


    const id =

    document.getElementById("patientId").value;



    const doctorId =

    document.getElementById("patientDoctor").value;



    const patient = {


        name:

        document.getElementById("patientName")

        .value

        .trim(),



        age:

        Number(

            document.getElementById("patientAge").value

        ),



        gender:

        document.getElementById("patientGender").value,



        phone:

        document.getElementById("patientPhone").value,



        disease:

        document.getElementById("patientDisease").value,



        address:

        document.getElementById("patientAddress").value,



        status:

        document.getElementById("patientStatus").value,



        doctor:

        doctorId

        ?

        {

            id:Number(doctorId)

        }

        :

        null


    };




    if(

        patient.name===""

        ||

        !patient.age

        ||

        patient.disease===""

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

            PATIENT_API

            :

            PATIENT_API+"/"+id,

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

                JSON.stringify(patient)


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

            "Patient added successfully"

            :

            "Patient updated successfully"

        );



        closePatientModal();



        await loadPatients();


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
                    EDIT PATIENT
=========================================================*/

async function editPatient(id){


    try{


        const response =

        await fetch(

            PATIENT_API+"/"+id

        );



        if(!response.ok){


            throw new Error(

                "Unable to load patient"

            );


        }




        const patient =

        await response.json();




        document.getElementById("modalTitle").innerHTML = `


            <i class="fa-solid fa-user-pen"></i>


            Edit Patient


        `;




        document.getElementById("patientId").value =

        patient.id;



        document.getElementById("patientName").value =

        patient.name || "";



        document.getElementById("patientAge").value =

        patient.age || "";



        document.getElementById("patientGender").value =

        patient.gender || "";



        document.getElementById("patientPhone").value =

        patient.phone || "";



        document.getElementById("patientDisease").value =

        patient.disease || "";



        document.getElementById("patientAddress").value =

        patient.address || "";



        document.getElementById("patientStatus").value =

        patient.status || "Admitted";



        document.getElementById("patientDoctor").value =

        patient.doctor?.id || "";



        document.getElementById("patientModal").style.display="flex";


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
                    DELETE PATIENT
=========================================================*/

function deletePatient(id){

    deletePatientId = id;

    document.getElementById("deleteModal").style.display="flex";

}


/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/

function closeDeleteModal(){

    deletePatientId = null;

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

    if(deletePatientId===null){

        return;

    }


    try{


        const response = await fetch(

            PATIENT_API + "/" + deletePatientId,

            {

                method:"DELETE"

            }

        );


        if(!response.ok){

            throw new Error(
                "Unable to delete patient"
            );

        }


        closeDeleteModal();


        showToast(

            "Patient deleted successfully"

        );


        await loadPatients();


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


    if(patientsList.length===0){

        showToast(

            "No patient data available",

            "warning"

        );

        return;

    }



    let csv =

    "ID,Name,Age,Gender,Disease,Doctor,Phone,Status\n";



    patientsList.forEach(patient=>{


        csv +=

        `${patient.id},`+

        `"${patient.name}",`+

        `${patient.age},`+

        `"${patient.gender || ""}",`+

        `"${patient.disease || ""}",`+

        `"${patient.doctor?.name || ""}",`+

        `"${patient.phone || ""}",`+

        `"${patient.status || ""}"\n`;


    });



    const blob = new Blob(

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


    link.download="patients.csv";


    link.click();



    window.URL.revokeObjectURL(url);


}



/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(()=>{


    loadPatients();


},30000);



/*=========================================================
                ESC KEY CLOSE
=========================================================*/

document.addEventListener(

"keydown",

(e)=>{


    if(e.key==="Escape"){


        closePatientModal();


        closeDeleteModal();


    }


}

);



/*=========================================================
            CLICK OUTSIDE MODAL CLOSE
=========================================================*/

window.addEventListener(

"click",

(e)=>{


    const patientModal =

    document.getElementById("patientModal");


    const deleteModal =

    document.getElementById("deleteModal");



    if(e.target===patientModal){

        closePatientModal();

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


    loadPatients();


}

);



/*=========================================================
                    READY
=========================================================*/

console.log(

"✅ HMS PRO Patient Management Ready"

);