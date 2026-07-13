const BASE_URL = "http://localhost:8080";

const DASHBOARD_API = BASE_URL + "/dashboard/stats";

// ==========================================
// Dashboard Initialization
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    loadDashboard();

    loadRevenueChart();

    loadPatientChart();

});

// ==========================================
// Load Dashboard Data
// ==========================================

async function loadDashboard() {

    try {

        const response = await fetch(DASHBOARD_API);

        if (!response.ok) {

            throw new Error("Failed to load dashboard");

        }

        const data = await response.json();

        animateCounter("doctorCount", data.doctors);

        animateCounter("staffCount", data.staff);

        animateCounter("patientCount", data.patients);

        animateCounter("appointmentCount", data.appointments);

        animateCounter("summaryDoctorCount", data.doctors);

        animateCounter("summaryStaffCount", data.staff);

        animateCounter("summaryPatientCount", data.patients);

        animateCounter("summaryAppointmentCount", data.appointments);

        if (document.getElementById("revenue")) {

            document.getElementById("revenue").innerHTML =
            "₹ " + data.revenue;

        }

        if (document.getElementById("paidBills")) {

            document.getElementById("paidBills").innerHTML =
            data.paidBills;

        }

        if (document.getElementById("unpaidBills")) {

            document.getElementById("unpaidBills").innerHTML =
            data.unpaidBills;

        }

        if (document.getElementById("medicineCount")) {

            document.getElementById("medicineCount").innerHTML =
            data.medicines;

        }

        if (document.getElementById("lowStock")) {

            document.getElementById("lowStock").innerHTML =
            data.lowStockMedicines;

        }

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// Animated Counter
// ==========================================

function animateCounter(id, endValue) {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const increment = Math.max(
        1,
        Math.ceil(endValue / 50)
    );

    const timer = setInterval(() => {

        current += increment;

        if(current >= endValue){

            current = endValue;

            clearInterval(timer);

        }

        element.innerHTML = current;

    },20);

}
// ==========================================
// Revenue Chart
// ==========================================

let revenueChart;

function loadRevenueChart() {

    const canvas = document.getElementById("revenueChart");

    if (!canvas) return;

    if (revenueChart) {

        revenueChart.destroy();

    }

    revenueChart = new Chart(canvas, {

        type: "line",

        data: {

            labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"
            ],

            datasets: [{

                label: "Hospital Revenue",

                data: [
                    25000,
                    42000,
                    38000,
                    61000,
                    52000,
                    70000,
                    81000
                ],

                borderColor: "#2563eb",

                backgroundColor: "rgba(37,99,235,.15)",

                fill: true,

                tension: .4,

                borderWidth: 4,

                pointRadius: 5,

                pointHoverRadius: 8

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: true,

                    position: "top"

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

// ==========================================
// Patient Statistics Chart
// ==========================================

let patientChart;

function loadPatientChart() {

    const canvas = document.getElementById("patientChart");

    if (!canvas) return;

    if (patientChart) {

        patientChart.destroy();

    }

    patientChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Male",

                "Female",

                "Children"

            ],

            datasets: [{

                data: [

                    120,

                    145,

                    42

                ],

                backgroundColor: [

                    "#2563eb",

                    "#9333ea",

                    "#10b981"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "65%",

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// Refresh dashboard every 30 seconds

setInterval(() => {

    loadDashboard();

},30000);

function updateSyncTime(){

    const now=new Date();

    document.getElementById("syncTime").innerHTML=

    now.toLocaleTimeString();

}

updateSyncTime();

setInterval(updateSyncTime,1000);

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});
