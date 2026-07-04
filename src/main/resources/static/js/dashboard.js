function loadDashboard() {

    let doctorCount = 0;
    let patientCount = 0;
    let appointmentCount = 0;
    let billCount = 0;
    let totalRevenue = 0;

    let cash = 0;
    let card = 0;
    let upi = 0;

    Promise.all([
        fetch("http://localhost:8080/doctors").then(res => res.json()),
        fetch("http://localhost:8080/patients").then(res => res.json()),
        fetch("http://localhost:8080/appointments").then(res => res.json()),
        fetch("http://localhost:8080/billing").then(res => res.json())
    ])
    .then(([doctors, patients, appointments, bills]) => {

        doctorCount = doctors.length;
        patientCount = patients.length;
        appointmentCount = appointments.length;
        billCount = bills.length;

        document.getElementById("doctorCount").innerText = doctorCount;
        document.getElementById("patientCount").innerText = patientCount;
        document.getElementById("appointmentCount").innerText = appointmentCount;
        document.getElementById("billCount").innerText = billCount;

        bills.forEach(b => {
            totalRevenue += b.amount;

            if(b.paymentMethod === "Cash") cash++;
            else if(b.paymentMethod === "Card") card++;
            else if(b.paymentMethod === "UPI") upi++;
        });

        document.getElementById("revenue").innerText = "₹ " + totalRevenue;

        createBarChart(doctorCount, patientCount, appointmentCount, billCount);
        createPieChart(cash, card, upi);
    });
}

function createBarChart(doctors, patients, appointments, bills) {
    new Chart(document.getElementById("statsChart"), {
        type: "bar",
        data: {
            labels: ["Doctors", "Patients", "Appointments", "Bills"],
            datasets: [{
                label: "Count",
                data: [doctors, patients, appointments, bills]
            }]
        }
    });
}

function createPieChart(cash, card, upi) {
    new Chart(document.getElementById("paymentChart"), {
        type: "pie",
        data: {
            labels: ["Cash", "Card", "UPI"],
            datasets: [{
                data: [cash, card, upi]
            }]
        }
    });
}

window.onload = loadDashboard;