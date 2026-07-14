console.log("📄 HMS PRO Medical Records Loaded");



/*=========================================================
                    API CONFIGURATION
=========================================================*/


const RECORD_API = API_URL + "/records";

const PATIENT_API = API_URL + "/patients";

const DOCTOR_API = API_URL + "/doctors";



/*=========================================================
                    GLOBAL VARIABLES
=========================================================*/


let recordsList = [];

let patientsList = [];

let doctorsList = [];

let deleteRecordId = null;




/*=========================================================
                    PAGE LOAD
=========================================================*/


document.addEventListener(

"DOMContentLoaded",

()=>{


    initializeRecords();


}

);





/*=========================================================
                    INITIALIZE
=========================================================*/


async function initializeRecords(){


    showLoading();



    await loadPatients();



    await loadDoctors();



    await loadRecords();



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

    document.getElementById("recordPatient");




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
                POPULATE DOCTOR DROPDOWN
=========================================================*/


function populateDoctorDropdown(){


    const dropdown =

    document.getElementById("recordDoctor");




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
                    LOAD RECORDS
=========================================================*/


async function loadRecords(){


    try{


        const response =

        await fetch(RECORD_API);





        if(!response.ok){


            throw new Error(

                "Unable to load records"

            );


        }






        recordsList =

        await response.json();





        renderRecordsTable();



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
                RENDER RECORDS TABLE
=========================================================*/


function renderRecordsTable(list = recordsList){


    const table =

    document.getElementById("recordsTable");



    if(!table)

        return;





    if(list.length===0){


        table.innerHTML = `


        <tr>


            <td colspan="7">


                No Medical Records Found


            </td>


        </tr>


        `;


        return;


    }






    table.innerHTML = list.map(record=>`



<tr>



<td>

${record.id}

</td>







<td>


<div class="patient-profile">


<div class="patient-avatar">


<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(record.patient?.name || "Patient")}&background=2563eb&color=ffffff">


</div>





<div class="patient-info">


<h4>

${record.patient?.name || "-"}

</h4>



<small>

${record.patient?.phone || ""}

</small>



</div>


</div>



</td>







<td>


Dr. ${record.doctor?.name || "-"}


</td>







<td>


<span class="badge ${getRecordBadge(record.recordType)}">


${record.recordType || "Other"}


</span>


</td>








<td>


${

record.description ||

record.diagnosis ||

record.notes ||

"-"

}


</td>







<td>


${record.recordDate || "-"}


</td>








<td>



<div class="action-buttons">





<button

class="view-btn"

onclick="viewRecord(${record.id})">


<i class="fa-solid fa-eye"></i>


</button>







<button

class="edit-btn"

onclick="editRecord(${record.id})">


<i class="fa-solid fa-pen"></i>


</button>







<button

class="delete-btn"

onclick="deleteRecord(${record.id})">


<i class="fa-solid fa-trash"></i>


</button>





</div>



</td>






</tr>



`).join("");



}







/*=========================================================
                RECORD TYPE BADGE
=========================================================*/


function getRecordBadge(type){


    if(type==="Diagnosis"){


        return "badge-diagnosis";


    }



    if(type==="Prescription"){


        return "badge-prescription";


    }



    if(type==="Lab Report"){


        return "badge-lab";


    }



    return "badge-other";


}








/*=========================================================
                UPDATE STATISTICS
=========================================================*/


function updateStatistics(){



    setValue(

        "totalRecords",

        recordsList.length

    );







    setValue(

        "labRecords",

        recordsList.filter(record=>

            record.recordType==="Lab Report"

        ).length

    );







    setValue(

        "prescriptionRecords",

        recordsList.filter(record=>

            record.recordType==="Prescription"

        ).length

    );







    setValue(

        "diagnosisRecords",

        recordsList.filter(record=>

            record.recordType==="Diagnosis"

        ).length

    );



}








/*=========================================================
                    SEARCH RECORDS
=========================================================*/


function searchRecord(){



    const keyword =

    document.getElementById("searchRecord")

    .value

    .toLowerCase()

    .trim();







    if(keyword===""){


        renderRecordsTable();


        return;


    }







    const filtered = recordsList.filter(record=>{


        return (



        (record.patient?.name || "")

        .toLowerCase()

        .includes(keyword)





        ||





        (record.doctor?.name || "")

        .toLowerCase()

        .includes(keyword)





        ||





        (record.recordType || "")

        .toLowerCase()

        .includes(keyword)





        ||





        (record.diagnosis || "")

        .toLowerCase()

        .includes(keyword)



        );


    });






    renderRecordsTable(filtered);



}









/*=========================================================
                    FILTER RECORDS
=========================================================*/


function filterRecords(){



    const patient =

    document.getElementById("patientFilter")

    .value;





    const doctor =

    document.getElementById("doctorFilter")

    .value;






    const type =

    document.getElementById("recordTypeFilter")

    .value;






    const date =

    document.getElementById("recordDateFilter")

    .value;








    let filtered =

    [...recordsList];









    if(patient){


        filtered = filtered.filter(record=>


            record.patient?.name===patient


        );


    }







    if(doctor){


        filtered = filtered.filter(record=>


            record.doctor?.name===doctor


        );


    }







    if(type){


        filtered = filtered.filter(record=>


            record.recordType===type


        );


    }







    if(date){


        filtered = filtered.filter(record=>


            record.recordDate===date


        );


    }







    renderRecordsTable(filtered);



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
                OPEN RECORD MODAL
=========================================================*/


function openRecordModal(){


    document.getElementById("modalTitle").innerHTML = `


    <i class="fa-solid fa-file-medical"></i>


    Add Medical Record


    `;



    document.getElementById("recordId").value="";


    document.getElementById("recordPatient").value="";


    document.getElementById("recordDoctor").value="";


    document.getElementById("recordType").value="Diagnosis";


    document.getElementById("recordDate").value =

    new Date().toISOString().split("T")[0];


    document.getElementById("recordDiagnosis").value="";


    document.getElementById("recordPrescription").value="";


    document.getElementById("recordNotes").value="";



    document.getElementById("recordModal")
    .style.display="flex";


}






/*=========================================================
                CLOSE RECORD MODAL
=========================================================*/


function closeRecordModal(){


    const modal =

    document.getElementById("recordModal");



    if(modal){


        modal.style.display="none";


    }


}







/*=========================================================
                SAVE RECORD
=========================================================*/


async function saveRecord(){


    const id =

    document.getElementById("recordId").value;





    const record = {



        patient:{


            id:Number(

                document.getElementById("recordPatient")
                .value

            )


        },





        doctor:{


            id:Number(

                document.getElementById("recordDoctor")
                .value

            )


        },





        recordType:


        document.getElementById("recordType")
        .value,





        recordDate:


        document.getElementById("recordDate")
        .value,





        diagnosis:


        document.getElementById("recordDiagnosis")
        .value,





        prescription:


        document.getElementById("recordPrescription")
        .value,





        notes:


        document.getElementById("recordNotes")
        .value


    };







    if(!record.patient.id || !record.doctor.id){


        showToast(

            "Please select patient and doctor",

            "warning"

        );


        return;


    }








    try{



        const response = await fetch(



            id===""

            ?

            RECORD_API

            :

            RECORD_API+"/"+id,




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

                JSON.stringify(record)


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

            "Medical record added successfully"

            :

            "Medical record updated successfully"



        );







        closeRecordModal();




        await loadRecords();




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
                    EDIT RECORD
=========================================================*/


async function editRecord(id){


    try{


        const response =

        await fetch(

            RECORD_API+"/"+id

        );






        if(!response.ok){


            throw new Error(

                "Unable to load record"

            );


        }






        const record =

        await response.json();







        document.getElementById("modalTitle").innerHTML = `



        <i class="fa-solid fa-pen"></i>



        Edit Medical Record



        `;







        document.getElementById("recordId").value =

        record.id;








        document.getElementById("recordPatient").value =

        record.patient?.id || "";







        document.getElementById("recordDoctor").value =

        record.doctor?.id || "";








        document.getElementById("recordType").value =

        record.recordType || "Diagnosis";







        document.getElementById("recordDate").value =

        record.recordDate || "";








        document.getElementById("recordDiagnosis").value =

        record.diagnosis || "";








        document.getElementById("recordPrescription").value =

        record.prescription || "";








        document.getElementById("recordNotes").value =

        record.notes || "";








        document.getElementById("recordModal")
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
                VIEW RECORD DETAILS
=========================================================*/


async function viewRecord(id){


    try{


        const response =

        await fetch(

            RECORD_API+"/"+id

        );





        const record =

        await response.json();







        alert(

        "Patient : "

        +

        (record.patient?.name || "-")

        +

        "\nDoctor : "

        +

        (record.doctor?.name || "-")

        +

        "\nType : "

        +

        (record.recordType || "-")

        +

        "\nDiagnosis : "

        +

        (record.diagnosis || "-")

        +

        "\nPrescription : "

        +

        (record.prescription || "-")

        );



    }




    catch(error){


        showToast(

            "Unable to view record",

            "error"

        );


    }


}
/*=========================================================
                DELETE RECORD
=========================================================*/


function deleteRecord(id){


    deleteRecordId = id;



    document.getElementById("deleteModal")
    .style.display="flex";


}







/*=========================================================
                CLOSE DELETE MODAL
=========================================================*/


function closeDeleteModal(){


    deleteRecordId = null;



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


    if(deleteRecordId===null){


        return;


    }





    try{


        const response = await fetch(


            RECORD_API+"/"+deleteRecordId,


            {


                method:"DELETE"


            }


        );






        if(!response.ok){


            throw new Error(

                "Unable to delete record"

            );


        }





        closeDeleteModal();




        showToast(

            "Medical record deleted successfully"

        );





        await loadRecords();




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



    if(recordsList.length===0){


        showToast(

            "No records available",

            "warning"

        );


        return;


    }







    let csv =

    "ID,Patient,Doctor,Type,Date,Diagnosis,Prescription\n";








    recordsList.forEach(record=>{



        csv +=



        `${record.id},`+



        `"${record.patient?.name || ""}",`+



        `"${record.doctor?.name || ""}",`+



        `"${record.recordType || ""}",`+



        `"${record.recordDate || ""}",`+



        `"${record.diagnosis || ""}",`+



        `"${record.prescription || ""}"\n`;



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



    link.download="medical-records.csv";







    link.click();







    window.URL.revokeObjectURL(url);



}








/*=========================================================
                    AUTO REFRESH
=========================================================*/


setInterval(()=>{


    loadRecords();



},30000);








/*=========================================================
                    ESC KEY CLOSE
=========================================================*/


document.addEventListener(

"keydown",

(e)=>{


    if(e.key==="Escape"){


        closeRecordModal();



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



    const recordModal =

    document.getElementById("recordModal");




    const deleteModal =

    document.getElementById("deleteModal");







    if(e.target===recordModal){


        closeRecordModal();


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


    loadRecords();



}

);








/*=========================================================
                    READY
=========================================================*/


console.log(

"✅ HMS PRO Medical Records Management Ready"

);