console.log("Billing JS Loaded");

// =====================================
// API URL
// =====================================

const BASE_URL =
window.location.hostname === "localhost"
? "http://localhost:8080"
: "https://hospital-management-system-6pok.onrender.com";

const BILLING_API = BASE_URL + "/billing";
const PATIENT_API = BASE_URL + "/patients";
const DOCTOR_API = BASE_URL + "/doctors";
const MEDICINE_API = BASE_URL + "/medicines";

let selectedMedicinePrice = 0;
let deleteBillId = null;

// =====================================
// PAGE LOAD
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadPatients();

    loadDoctors();

    loadMedicines();

    loadBills();

    loadSummary();

});

// =====================================
// LOAD PATIENTS
// =====================================

async function loadPatients(){

    try{

        const response = await fetch(PATIENT_API);

        const patients = await response.json();

        let options =
        `<option value="">Select Patient</option>`;

        patients.forEach(patient=>{

            options +=
            `<option value="${patient.id}">
                ${patient.name}
            </option>`;

        });

        document.getElementById("patientSelect").innerHTML =
        options;

    }

    catch(error){

        console.error(error);

    }

}

// =====================================
// LOAD DOCTORS
// =====================================

async function loadDoctors(){

    try{

        const response = await fetch(DOCTOR_API);

        const doctors = await response.json();

        let options =
        `<option value="">Select Doctor</option>`;

        doctors.forEach(doctor=>{

            options +=
            `<option value="${doctor.id}">
                ${doctor.name}
            </option>`;

        });

        document.getElementById("doctorSelect").innerHTML =
        options;

    }

    catch(error){

        console.error(error);

    }

}

// =====================================
// LOAD MEDICINES
// =====================================

async function loadMedicines(){

    try{

        const response = await fetch(MEDICINE_API);

        const medicines = await response.json();

        let options =
        `<option value="">Select Medicine</option>`;

        medicines.forEach(medicine=>{

            options +=

            `<option

            value="${medicine.id}"

            data-price="${medicine.price}"

            >

            ${medicine.name}

            </option>`;

        });

        const medicineSelect =
        document.getElementById("medicineSelect");

        medicineSelect.innerHTML = options;

        medicineSelect.addEventListener("change",()=>{

            const selected =
            medicineSelect.options[
                medicineSelect.selectedIndex
            ];

            selectedMedicinePrice =
            Number(
                selected.dataset.price || 0
            );

            document.getElementById(
                "medicinePrice"
            ).value =
            selectedMedicinePrice;

            calculateMedicineTotal();

        });

    }

    catch(error){

        console.error(error);

    }

}

// =====================================
// LOAD SUMMARY
// =====================================

async function loadSummary(){

    try{

        const response =
        await fetch(BILLING_API + "/summary");

        const summary =
        await response.json();

        document.getElementById(
            "totalRevenue"
        ).innerHTML =
        "₹" + (summary.totalRevenue || 0);

        document.getElementById(
            "paidBills"
        ).innerHTML =
        summary.paidBills;

        document.getElementById(
            "pendingBills"
        ).innerHTML =
        summary.unpaidBills;

        document.getElementById(
            "billCount"
        ).innerHTML =
        summary.totalBills;

    }

    catch(error){

        console.error(error);

    }

}
// =====================================
// CALCULATE MEDICINE TOTAL
// =====================================

function calculateMedicineTotal() {

    const qty =
    parseInt(document.getElementById("medicineQty").value) || 0;

    const total = qty * selectedMedicinePrice;

    document.getElementById("medicineTotal").value = total;

    calculateGrandTotal();

}

// =====================================
// CALCULATE GRAND TOTAL
// =====================================

function calculateGrandTotal() {

    const medicine =
    parseFloat(document.getElementById("medicineTotal").value) || 0;

    const doctor =
    parseFloat(document.getElementById("doctorFee").value) || 0;

    const room =
    parseFloat(document.getElementById("roomCharge").value) || 0;

    const lab =
    parseFloat(document.getElementById("labCharge").value) || 0;

    const total = medicine + doctor + room + lab;

    document.getElementById("grandTotal").value = total;

}

// =====================================
// GENERATE BILL
// =====================================

async function generateBill() {

    const patientId =
    document.getElementById("patientSelect").value;

    const doctorId =
    document.getElementById("doctorSelect").value;

    const medicineId =
    document.getElementById("medicineSelect").value;

    if (

        patientId === "" ||

        doctorId === "" ||

        medicineId === ""

    ) {

        alert("Please select Patient, Doctor and Medicine.");

        return;

    }

    const bill = {

        patient: {

            id: patientId

        },

        medicineTotal:
        parseFloat(
            document.getElementById("medicineTotal").value
        ) || 0,

        doctorFee:
        parseFloat(
            document.getElementById("doctorFee").value
        ) || 0,

        roomCharge:
        parseFloat(
            document.getElementById("roomCharge").value
        ) || 0,

        labCharge:
        parseFloat(
            document.getElementById("labCharge").value
        ) || 0,

        paymentMethod:
        document.getElementById("paymentMethod").value,

        paymentStatus:
        document.getElementById("paymentStatus").value

    };

    try {

        const response = await fetch(BILLING_API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(bill)

        });

        if (!response.ok) {

            throw new Error("Unable to Generate Bill");

        }

        alert("Bill Generated Successfully");

        loadBills();

        loadSummary();

        document.getElementById("medicineQty").value = 1;
        document.getElementById("medicinePrice").value = "";
        document.getElementById("medicineTotal").value = "";
        document.getElementById("grandTotal").value = "";

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}
// =====================================
// LOAD BILLS
// =====================================

async function loadBills() {

    try {

        const response = await fetch(BILLING_API);

        if (!response.ok) {

            throw new Error("Unable to load bills");

        }

        const bills = await response.json();

        let rows = "";

        bills.forEach(bill => {

            rows += `

            <tr>

                <td>${bill.id}</td>

                <td>${bill.patient ? bill.patient.name : "-"}</td>

                <td>₹${bill.amount ?? 0}</td>

                <td>${bill.paymentStatus}</td>

                <td>${bill.paymentMethod}</td>

                <td>

                    <button
                    class="deleteBtn"
                    onclick="deleteBill(${bill.id})">

                    <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById("billingTable").innerHTML = rows;

    }

    catch (error) {

        console.error(error);

    }

}

// =====================================
// DELETE BILL
// =====================================

function deleteBill(id) {

    deleteBillId = id;

    document.getElementById("deleteModal").style.display = "flex";

}

// =====================================
// CLOSE DELETE MODAL
// =====================================

function closeDeleteModal() {

    document.getElementById("deleteModal").style.display = "none";

}

// =====================================
// CONFIRM DELETE
// =====================================

async function confirmDelete() {

    try {

        const response = await fetch(

            BILLING_API + "/" + deleteBillId,

            {

                method: "DELETE"

            }

        );

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        alert("Bill Deleted Successfully");

        closeDeleteModal();

        loadBills();

        loadSummary();

    }

    catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// =====================================
// GLOBAL FUNCTIONS
// =====================================

window.calculateMedicineTotal = calculateMedicineTotal;

window.calculateGrandTotal = calculateGrandTotal;

window.generateBill = generateBill;

window.deleteBill = deleteBill;

window.confirmDelete = confirmDelete;

window.closeDeleteModal = closeDeleteModal;