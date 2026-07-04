let allPatients = [];

function addPatient() {
    let patient = {
        name: document.getElementById("pname").value,
        age: parseInt(document.getElementById("age").value),
        disease: document.getElementById("disease").value,
        phone: document.getElementById("pphone").value
    };

    fetch("http://localhost:8080/patients", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(patient)
    })
    .then(res => res.json())
    .then(data => {
        alert("Patient Added");
        loadPatients();
    });
}

function loadPatients() {
    fetch("http://localhost:8080/patients")
    .then(res => res.json())
    .then(data => {
        allPatients = data;
        renderPatients(data);
    });
}

function renderPatients(patients) {
    let table = document.getElementById("patientTable");
    table.innerHTML = "";

    patients.forEach(p => {
        table.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.age}</td>
            <td>${p.disease}</td>
            <td>${p.phone}</td>
            <td>
                <button onclick="editPatient(${p.id},'${p.name}',${p.age},'${p.disease}','${p.phone}')">Edit</button>
                <button onclick="deletePatient(${p.id})">Delete</button>
            </td>
        </tr>`;
    });
}

function deletePatient(id) {
    fetch(`http://localhost:8080/patients/${id}`, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg);
        loadPatients();
    });
}

function editPatient(id,name,age,disease,phone) {
    let newName = prompt("Name", name);
    let newAge = prompt("Age", age);
    let newDisease = prompt("Disease", disease);
    let newPhone = prompt("Phone", phone);

    let patient = {
        name:newName,
        age:parseInt(newAge),
        disease:newDisease,
        phone:newPhone
    };

    fetch(`http://localhost:8080/patients/${id}`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(patient)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Patient Updated");
        loadPatients();
    });
}

function searchPatients() {
    let keyword = document.getElementById("searchBox").value.toLowerCase();

    let filtered = allPatients.filter(p =>
        p.name.toLowerCase().includes(keyword) ||
        p.disease.toLowerCase().includes(keyword)
    );

    renderPatients(filtered);
}

window.onload = loadPatients;