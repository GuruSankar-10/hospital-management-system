let allAppointments=[];

function addAppointment(){
    let appointment = {
        appointmentDate: document.getElementById("appointmentDate").value,
        appointmentTime: document.getElementById("appointmentTime").value + ":00",
        status: document.getElementById("status").value,
        doctor:{
            id: parseInt(document.getElementById("doctorId").value)
        },
        patient:{
            id: parseInt(document.getElementById("patientId").value)
        }
    };

    fetch("http://localhost:8080/appointments",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(appointment)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Appointment Added");
        loadAppointments();
    });
}

function loadAppointments(){
    fetch("http://localhost:8080/appointments")
    .then(res=>res.json())
    .then(data=>{
        allAppointments=data;
        renderAppointments(data);
    });
}

function renderAppointments(list){
    let table=document.getElementById("appointmentTable");
    table.innerHTML="";

    list.forEach(a=>{
        table.innerHTML += `
        <tr>
            <td>${a.id}</td>
            <td>${a.appointmentDate}</td>
            <td>${a.appointmentTime}</td>
            <td>${a.status}</td>
            <td>${a.doctor ? a.doctor.id : ""}</td>
            <td>${a.patient ? a.patient.id : ""}</td>
            <td>
                <button onclick="deleteAppointment(${a.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function deleteAppointment(id){
    fetch(`http://localhost:8080/appointments/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(msg=>{
        alert(msg);
        loadAppointments();
    });
}

window.onload=loadAppointments;