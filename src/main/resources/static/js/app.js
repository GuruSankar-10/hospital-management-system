alert("JS Loaded");

function addDoctor() {
    let doctor = {
        name: document.getElementById("name").value,
        specialization: document.getElementById("specialization").value,
        phone: document.getElementById("phone").value
    };

    fetch("http://localhost:8080/doctors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(doctor)
    })
    .then(res => res.json())
    .then(data => {
        alert("Doctor Added");
        loadDoctors();
    });
}

function loadDoctors() {
    fetch("http://localhost:8080/doctors")
    .then(res => res.json())
    .then(data => {
        console.log("Doctors:", data);

        let table = document.getElementById("doctorTable");
        console.log("Table:", table);

        table.innerHTML = "";

        for(let i=0; i<data.length; i++) {
            table.innerHTML += `
                <tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].specialization}</td>
                    <td>${data[i].phone}</td>
                </tr>
            `;
        }
    });
}

window.addEventListener("load", function () {
    console.log("Page fully loaded");
    loadPatients();
});