let allDoctors = [];

// Automatically uses localhost locally and Render URL when deployed
const API = window.location.origin;

function addDoctor() {

    let doctor = {
        name: document.getElementById("name").value,
        specialization: document.getElementById("specialization").value,
        phone: document.getElementById("phone").value
    };

    fetch(`${API}/doctors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add doctor");
        }
        return response.json();
    })
    .then(data => {

        alert("Doctor Added Successfully ✅");

        document.getElementById("name").value = "";
        document.getElementById("specialization").value = "";
        document.getElementById("phone").value = "";

        loadDoctors();

    })
    .catch(error => {
        console.error(error);
        alert("Unable to add doctor");
    });

}

function loadDoctors() {

    fetch(`${API}/doctors`)
    .then(response => response.json())
    .then(data => {

        allDoctors = data;
        renderDoctors(data);

    });

}

function renderDoctors(doctors) {

    let table = document.getElementById("doctorTable");

    table.innerHTML = "";

    doctors.forEach(d => {

        table.innerHTML += `
        <tr>
            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>${d.specialization}</td>
            <td>${d.phone}</td>
            <td>
                <button onclick="editDoctor(${d.id},'${d.name}','${d.specialization}','${d.phone}')">
                    Edit
                </button>

                <button onclick="deleteDoctor(${d.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });

}

function deleteDoctor(id) {

    fetch(`${API}/doctors/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(msg => {

        alert(msg);

        loadDoctors();

    });

}

function editDoctor(id,name,specialization,phone) {

    let newName = prompt("Enter Name", name);

    let newSpec = prompt("Enter Specialization", specialization);

    let newPhone = prompt("Enter Phone", phone);

    let doctor = {

        name:newName,

        specialization:newSpec,

        phone:newPhone

    };

    fetch(`${API}/doctors/${id}`, {

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(doctor)

    })

    .then(response=>response.json())

    .then(data=>{

        alert("Doctor Updated Successfully");

        loadDoctors();

    });

}

function searchDoctors() {

    let keyword = document.getElementById("searchBox").value.toLowerCase();

    let filtered = allDoctors.filter(d =>

        d.name.toLowerCase().includes(keyword) ||

        d.specialization.toLowerCase().includes(keyword)

    );

    renderDoctors(filtered);

}

window.onload = loadDoctors;