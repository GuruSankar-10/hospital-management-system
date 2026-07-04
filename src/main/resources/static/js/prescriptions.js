function addPrescription(){
    let prescription = {
        disease: document.getElementById("disease").value,
        medicines: document.getElementById("medicines").value,
        advice: document.getElementById("advice").value,
        doctor:{
            id: parseInt(document.getElementById("doctorId").value)
        },
        patient:{
            id: parseInt(document.getElementById("patientId").value)
        }
    };

    fetch("http://localhost:8080/prescriptions",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(prescription)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Prescription Saved");
        loadPrescriptions();
    });
}

function loadPrescriptions(){
    fetch("http://localhost:8080/prescriptions")
    .then(res=>res.json())
    .then(data=>{
        let table=document.getElementById("prescriptionTable");
        table.innerHTML="";

        data.forEach(p=>{
            table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.doctor ? p.doctor.id : ""}</td>
                <td>${p.patient ? p.patient.id : ""}</td>
                <td>${p.disease}</td>
                <td>${p.medicines}</td>
                <td>${p.advice}</td>
                <td>
                    <button class="delete-btn"
                     onclick="deletePrescription(${p.id})">
                     Delete
                    </button>
                </td>
            </tr>`;
        });
    });
}

function deletePrescription(id){
    fetch(`http://localhost:8080/prescriptions/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(msg=>{
        alert(msg);
        loadPrescriptions();
    });
}

window.onload = loadPrescriptions;