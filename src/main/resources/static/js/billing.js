let allBills = [];

// Add Bill
function addBill() {

    let bill = {
        amount: parseFloat(document.getElementById("amount").value),
        paymentStatus: document.getElementById("paymentStatus").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        patient: {
            id: parseInt(document.getElementById("patientId").value)
        },
        appointment: {
            id: parseInt(document.getElementById("appointmentId").value)
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
            throw new Error("Failed to create bill");
        }
        return response.json();
    })
    .then(data => {

        alert("Bill Created Successfully ✅");

        document.getElementById("amount").value = "";
        document.getElementById("paymentStatus").value = "";
        document.getElementById("paymentMethod").value = "";
        document.getElementById("patientId").value = "";
        document.getElementById("appointmentId").value = "";

        loadBills();

    })
    .catch(error => {
        console.error(error);
        alert("Unable to create bill");
    });

}

// Load Bills
function loadBills() {

    fetch("/billing")
    .then(response => response.json())
    .then(data => {

        allBills = data;

        let table = document.getElementById("billingTable");
        table.innerHTML = "";

        data.forEach(b => {

            table.innerHTML += `
            <tr>
                <td>${b.id}</td>
                <td>₹${b.amount}</td>
                <td>${b.paymentStatus}</td>
                <td>${b.paymentMethod}</td>
                <td>${b.patient ? b.patient.id : ""}</td>
                <td>${b.appointment ? b.appointment.id : ""}</td>
                <td>
                    <button class="delete-btn" onclick="deleteBill(${b.id})">
                        🗑 Delete
                    </button>

                    <button class="pdf-btn" onclick="downloadBill(${b.id})">
                        📄 PDF
                    </button>

                    <button class="wa-btn"
                        onclick="sendBillWhatsApp(
                            '${b.patient ? b.patient.phone : ""}',
                            '${b.patient ? b.patient.name : ""}',
                            '${b.amount}',
                            '${b.paymentStatus}',
                            '${b.paymentMethod}'
                        )">
                        WhatsApp
                    </button>
                </td>
            </tr>`;
        });

    })
    .catch(error => console.error(error));

}

// Delete Bill
function deleteBill(id) {

    if (!confirm("Delete this bill?")) return;

    fetch(`/billing/${id}`, {
        method: "DELETE"
    })
    .then(response => response.text())
    .then(msg => {

        alert(msg);
        loadBills();

    })
    .catch(error => console.error(error));

}

// Download PDF
function downloadBill(id) {

    window.open(`/pdf/bill/${id}`, "_blank");

}

// WhatsApp
function sendBillWhatsApp(phone, name, amount, status, method) {

    let message =
        "Hello " + name + ",%0A%0A" +
        "Your Hospital Bill Details:%0A" +
        "Amount: ₹" + amount + "%0A" +
        "Status: " + status + "%0A" +
        "Payment Method: " + method + "%0A%0A" +
        "Thank you for visiting HMS Hospital 🏥";

    window.open(
        "https://wa.me/91" + phone + "?text=" + message,
        "_blank"
    );

}

window.onload = loadBills;