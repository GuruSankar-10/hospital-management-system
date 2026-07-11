// =====================================
// Dashboard Management
// =====================================

let statsChart = null;
let paymentChart = null;

// ===============================
// Load Dashboard
// ===============================
function loadDashboard() {

    Promise.all([

        fetch("/doctors").then(res => res.json()),

        fetch("/patients").then(res => res.json()),

        fetch("/appointments").then(res => res.json()),

        fetch("/billing").then(res => res.json())

    ])

    .then(([doctors, patients, appointments, bills]) => {

        const doctorCount = doctors.length;

        const patientCount = patients.length;

        const appointmentCount = appointments.length;

        const billCount = bills.length;

        document.getElementById("doctorCount").innerHTML = doctorCount;

        document.getElementById("patientCount").innerHTML = patientCount;

        document.getElementById("appointmentCount").innerHTML = appointmentCount;

        document.getElementById("billCount").innerHTML = billCount;

        let revenue = 0;

        let cash = 0;

        let card = 0;

        let upi = 0;

        bills.forEach(bill => {

            revenue += Number(bill.amount || 0);

            switch ((bill.paymentMethod || "").toUpperCase()) {

                case "CASH":
                    cash++;
                    break;

                case "CARD":
                    card++;
                    break;

                case "UPI":
                    upi++;
                    break;

            }

        });

        document.getElementById("revenue").innerHTML =
            "₹ " + revenue.toFixed(2);

        createBarChart(
            doctorCount,
            patientCount,
            appointmentCount,
            billCount
        );

        createPieChart(
            cash,
            card,
            upi
        );

    })

    .catch(error => {

        console.error(error);

        alert("Unable to load dashboard.");

    });

}
// ===============================
// Hospital Statistics Bar Chart
// ===============================
function createBarChart(doctors, patients, appointments, bills) {

    // Destroy old chart if it exists
    if (statsChart) {
        statsChart.destroy();
    }

    const ctx = document.getElementById("statsChart");

    statsChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Doctors",
                "Patients",
                "Appointments",
                "Bills"
            ],

            datasets: [{

                label: "Hospital Statistics",

                data: [
                    doctors,
                    patients,
                    appointments,
                    bills
                ],

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444"
                ],

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            animation: {

                duration: 1500

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}

// ===============================
// Payment Method Pie Chart
// ===============================
function createPieChart(cash, card, upi) {

    // Destroy old chart if it exists
    if (paymentChart) {
        paymentChart.destroy();
    }

    const ctx = document.getElementById("paymentChart");

    paymentChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Cash",
                "Card",
                "UPI"
            ],

            datasets: [{

                data: [
                    cash,
                    card,
                    upi
                ],

                backgroundColor: [
                    "#22c55e",
                    "#3b82f6",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1500

            },

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// ===============================
// Hospital Statistics Bar Chart
// ===============================
function createBarChart(doctors, patients, appointments, bills) {

    // Destroy old chart if it exists
    if (statsChart) {
        statsChart.destroy();
    }

    const ctx = document.getElementById("statsChart");

    statsChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Doctors",
                "Patients",
                "Appointments",
                "Bills"
            ],

            datasets: [{

                label: "Hospital Statistics",

                data: [
                    doctors,
                    patients,
                    appointments,
                    bills
                ],

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444"
                ],

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            animation: {

                duration: 1500

            },

            scales: {

                y: {

                    beginAtZero: true,

                    ticks: {

                        precision: 0

                    }

                }

            }

        }

    });

}

// ===============================
// Payment Method Pie Chart
// ===============================
function createPieChart(cash, card, upi) {

    // Destroy old chart if it exists
    if (paymentChart) {
        paymentChart.destroy();
    }

    const ctx = document.getElementById("paymentChart");

    paymentChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Cash",
                "Card",
                "UPI"
            ],

            datasets: [{

                data: [
                    cash,
                    card,
                    upi
                ],

                backgroundColor: [
                    "#22c55e",
                    "#3b82f6",
                    "#f59e0b"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 1500

            },

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}