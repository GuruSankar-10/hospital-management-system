function addBill(){
    let bill = {
        amount: parseFloat(document.getElementById("amount").value),
        paymentStatus: document.getElementById("paymentStatus").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        patient:{
            id: parseInt(document.getElementById("patientId").value)
        },
        appointment:{
            id: parseInt(document.getElementById("appointmentId").value)
        }
    };

    fetch("http://localhost:8080/billing",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(bill)
    })
    .then(res=>res.json())
    .then(data=>{
        alert("Bill Created Successfully");
        loadBills();
    });
}
function loadBills(){
    fetch("http://localhost:8080/billing")
    .then(res=>res.json())
    .then(data=>{
        let table=document.getElementById("billingTable");
        table.innerHTML="";

        data.forEach(b=>{
            table.innerHTML += `
            <tr>
                <td>${b.id}</td>
                <td>₹${b.amount}</td>
                <td>${b.paymentStatus}</td>
                <td>${b.paymentMethod}</td>
                <td>${b.patient ? b.patient.id : ""}</td>
                <td>${b.appointment ? b.appointment.id : ""}</td>
                <td>
                    <button class="delete-btn" onclick="deleteBill(${b.id})">Delete</button>
                    <button class="pdf-btn" onclick="downloadBill(${b.id})">PDF</button>
                    <button class="wa-btn"
                        onclick="sendBillWhatsApp(
                            '${b.patient.phone}',
                            '${b.patient.name}',
                            '${b.amount}',
                            '${b.paymentStatus}',
                            '${b.paymentMethod}'
                        )">
                        WhatsApp
                    </button>
                </td>
            </tr>`;
        });
    });
}

function deleteBill(id){
    fetch(`http://localhost:8080/billing/${id}`,{
        method:"DELETE"
    })
    .then(res=>res.text())
    .then(msg=>{
        alert(msg);
        loadBills();
    });
}

function downloadBill(id){
    window.open(`http://localhost:8080/pdf/bill/${id}`, "_blank");
}

window.onload = loadBills;
function sendBillWhatsApp(phone, name, amount, status, method){

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