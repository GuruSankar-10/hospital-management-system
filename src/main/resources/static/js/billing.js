// =====================================
// Billing Management
// =====================================

let allBills = [];

// ===============================
// Add Bill
// ===============================
function addBill() {

    const amount = document.getElementById("amount").value.trim();
    const paymentStatus = document.getElementById("paymentStatus").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value.trim();
    const patientId = document.getElementById("patientId").value.trim();
    const appointmentId = document.getElementById("appointmentId").value.trim();

    if (
        amount === "" ||
        paymentStatus === "" ||
        paymentMethod === "" ||
        patientId === "" ||
        appointmentId === ""
    ) {

        alert("Please fill all fields.");
        return;

    }

    const bill = {

        amount: Number(amount),

        paymentStatus: paymentStatus,

        paymentMethod: paymentMethod,

        patient: {
            id: Number(patientId)
        },

        appointment: {
            id: Number(appointmentId)
        }

    };

    fetch("/billing", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(bill)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to create bill.");

        }

        return response.json();

    })

    .then(data => {

        alert("✅ Bill Created Successfully");

        clearBillForm();

        loadBills();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to create bill.");

    });

}
// ===============================
// Load Bills
// ===============================
function loadBills() {

    fetch("/billing")

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to fetch bills.");

        }

        return response.json();

    })

    .then(data => {

        allBills = data;

        renderBills(allBills);

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to load bills.");

    });

}

// ===============================
// Render Bills Table
// ===============================
function renderBills(list) {

    const table = document.getElementById("billingTable");

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No Bills Available
                </td>
            </tr>
        `;

        return;

    }

    list.forEach(bill => {

        table.innerHTML += `

        <tr>

            <td>${bill.id}</td>

            <td>₹${bill.amount}</td>

            <td>${bill.paymentStatus}</td>

            <td>${bill.paymentMethod}</td>

            <td>${bill.patient ? bill.patient.id : "-"}</td>

            <td>${bill.appointment ? bill.appointment.id : "-"}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteBill(${bill.id})">

                    🗑 Delete

                </button>

                <button
                    class="pdf-btn"
                    onclick="downloadBill(${bill.id})">

                    📄 PDF

                </button>

                <button
                    class="wa-btn"
                    onclick="sendBillWhatsApp(
                        '${bill.patient ? bill.patient.phone || "" : ""}',
                        '${bill.patient ? bill.patient.name || "Patient" : "Patient"}',
                        '${bill.amount}',
                        '${bill.paymentStatus}',
                        '${bill.paymentMethod}'
                    )">

                    WhatsApp

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Bill
// ===============================
function deleteBill(id) {

    if (!confirm("Are you sure you want to delete this bill?")) {

        return;

    }

    fetch("/billing/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to delete bill.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        loadBills();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to delete bill.");

    });

}

// ===============================
// Download Bill PDF
// ===============================
function downloadBill(id) {

    window.open("/pdf/bill/" + id, "_blank");

}

// ===============================
// Send Bill via WhatsApp
// ===============================
function sendBillWhatsApp(phone, name, amount, status, method) {

    if (phone === "") {

        alert("Patient phone number is not available.");

        return;

    }

    const message =
        `Hello ${name},

Your Hospital Bill Details

Amount : ₹${amount}
Status : ${status}
Payment Method : ${method}

Thank you for visiting HMS Hospital 🏥`;

    window.open(

        `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}
// ===============================
// Load Bills
// ===============================
function loadBills() {

    fetch("/billing")

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to fetch bills.");

        }

        return response.json();

    })

    .then(data => {

        allBills = data;

        renderBills(allBills);

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to load bills.");

    });

}

// ===============================
// Render Bills Table
// ===============================
function renderBills(list) {

    const table = document.getElementById("billingTable");

    table.innerHTML = "";

    if (list.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    No Bills Available
                </td>
            </tr>
        `;

        return;

    }

    list.forEach(bill => {

        table.innerHTML += `

        <tr>

            <td>${bill.id}</td>

            <td>₹${bill.amount}</td>

            <td>${bill.paymentStatus}</td>

            <td>${bill.paymentMethod}</td>

            <td>${bill.patient ? bill.patient.id : "-"}</td>

            <td>${bill.appointment ? bill.appointment.id : "-"}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteBill(${bill.id})">

                    🗑 Delete

                </button>

                <button
                    class="pdf-btn"
                    onclick="downloadBill(${bill.id})">

                    📄 PDF

                </button>

                <button
                    class="wa-btn"
                    onclick="sendBillWhatsApp(
                        '${bill.patient ? bill.patient.phone || "" : ""}',
                        '${bill.patient ? bill.patient.name || "Patient" : "Patient"}',
                        '${bill.amount}',
                        '${bill.paymentStatus}',
                        '${bill.paymentMethod}'
                    )">

                    WhatsApp

                </button>

            </td>

        </tr>

        `;

    });

}

// ===============================
// Delete Bill
// ===============================
function deleteBill(id) {

    if (!confirm("Are you sure you want to delete this bill?")) {

        return;

    }

    fetch("/billing/" + id, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to delete bill.");

        }

        return response.text();

    })

    .then(message => {

        alert("✅ " + message);

        loadBills();

    })

    .catch(error => {

        console.error(error);

        alert("❌ Failed to delete bill.");

    });

}

// ===============================
// Download Bill PDF
// ===============================
function downloadBill(id) {

    window.open("/pdf/bill/" + id, "_blank");

}

// ===============================
// Send Bill via WhatsApp
// ===============================
function sendBillWhatsApp(phone, name, amount, status, method) {

    if (phone === "") {

        alert("Patient phone number is not available.");

        return;

    }

    const message =
        `Hello ${name},

Your Hospital Bill Details

Amount : ₹${amount}
Status : ${status}
Payment Method : ${method}

Thank you for visiting HMS Hospital 🏥`;

    window.open(

        `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}