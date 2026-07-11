// ================================
// Doctor Appointments
// ================================

const API_URL = "http://localhost:8080/appointments";

const doctorName = localStorage.getItem("name") || "Doctor";

document.getElementById("doctorName").innerHTML =
    "Dr. " + doctorName.replace(/^Dr\.?\s*/i, "");

// Today's Date
document.getElementById("todayDate").innerHTML =
    new Date().toDateString();

// Load Appointments
function loadAppointments() {

    const doctorId = localStorage.getItem("doctorId");

    fetch("http://localhost:8080/appointments/doctor/" + doctorId)

        .then(response => response.json())

        .then(data => {

            const table = document.getElementById("appointmentTable");

            table.innerHTML = "";

            data.forEach(app => {

                table.innerHTML += `

                <tr>

                    <td>${app.id}</td>

                    <td>${app.patient ? app.patient.name : "-"}</td>

                    <td>${app.appointmentDate || "-"}</td>

                    <td>${app.appointmentTime || "-"}</td>

                    <td>

                        <select onchange="updateStatus(${app.id}, this.value)">

                            <option value="PENDING"
                                ${app.status=="PENDING"?"selected":""}>
                                Pending
                            </option>

                            <option value="COMPLETED"
                                ${app.status=="COMPLETED"?"selected":""}>
                                Completed
                            </option>

                            <option value="CANCELLED"
                                ${app.status=="CANCELLED"?"selected":""}>
                                Cancelled
                            </option>

                        </select>

                    </td>

                    <td>

                        <button class="complete-btn"
                                onclick="viewAppointment(${app.id})">

                            View

                        </button>

                    </td>

                </tr>

                `;

            });

        })

        .catch(error => {

            console.error(error);

            alert("Unable to load appointments");

        });

}

// Search

function searchAppointments(){

    const input =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#appointmentTable tr");

    rows.forEach(row=>{

        row.style.display =
            row.innerText.toLowerCase().includes(input)
            ? ""
            : "none";

    });

}

// Update Status

function updateStatus(id,status){

    fetch(API_URL + "/" + id + "/status",{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            status:status

        })

    })

    .then(response=>{

        if(response.ok){

            alert("Status Updated");

        }

    })

    .catch(error=>{

        console.error(error);

    });

}

// View Appointment

function viewAppointment(id){

    alert("Appointment ID : " + id);

}

// Load

loadAppointments();