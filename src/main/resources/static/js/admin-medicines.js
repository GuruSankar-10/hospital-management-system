console.log("Medicine Management Loaded");

// =====================================
// API URL
// =====================================

const BASE_URL =
window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://hospital-management-system-6pok.onrender.com";

const MEDICINE_API = BASE_URL + "/medicines";

let deleteMedicineId = null;

// =====================================
// Page Load
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    loadMedicines();

});

// =====================================
// Load Medicines
// =====================================

function loadMedicines() {

    fetch(MEDICINE_API)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load medicines.");

        }

        return response.json();

    })

    .then(medicines => {

        let rows = "";

        let lowStock = 0;

        let expiry = 0;

        medicines.forEach(medicine => {

            // -------------------------
            // Low Stock
            // -------------------------

            let stockBadge = "";

            if (medicine.stock <= medicine.reorderLevel) {

                lowStock++;

                stockBadge =
                "<span style='color:red;font-weight:bold;'>🔴 Low Stock</span>";

            } else {

                stockBadge =
                "<span style='color:green;font-weight:bold;'>🟢 Available</span>";

            }

            // -------------------------
            // Expiry Check
            // -------------------------

            if (medicine.expiryDate) {

                const today = new Date();

                const expiryDate = new Date(medicine.expiryDate);

                const diff =
                (expiryDate - today) / (1000 * 60 * 60 * 24);

                if (diff <= 30) {

                    expiry++;

                }

            }

            rows += `

<tr>

<td>${medicine.medicineCode || "-"}</td>

<td>${medicine.medicineName || "-"}</td>

<td>${medicine.strength || "-"}</td>

<td>${medicine.category || "-"}</td>

<td>${medicine.stock ?? 0}</td>

<td>₹${medicine.price ?? 0}</td>

<td>${stockBadge}</td>

<td>

<button
class="btn"
onclick="editMedicine(${medicine.id})">

<i class="fas fa-pen"></i>

</button>

<button
class="deleteBtn"
onclick="deleteMedicine(${medicine.id})">

<i class="fas fa-trash"></i>

</button>

</td>

</tr>

`;

        });

        document.getElementById("medicineTable").innerHTML = rows;

        document.getElementById("medicineCount").innerHTML =
        medicines.length;

        document.getElementById("lowStockCount").innerHTML =
        lowStock;

        document.getElementById("expiryCount").innerHTML =
        expiry;

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}
// =====================================
// Search Medicine
// =====================================

function searchMedicine() {

    const keyword = document
        .getElementById("searchMedicine")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#medicineTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(keyword)
                ? ""
                : "none";

    });

}

// =====================================
// Open Medicine Modal
// =====================================

function openMedicineModal() {

    document.getElementById("modalTitle").innerHTML =
        "Add Medicine";

    document.getElementById("medicineId").value = "";

    document.getElementById("medicineName").value = "";
    document.getElementById("genericName").value = "";
    document.getElementById("strength").value = "";
    document.getElementById("category").value = "Tablet";
    document.getElementById("dosageForm").value = "";
    document.getElementById("manufacturer").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("reorderLevel").value = "";
    document.getElementById("batchNumber").value = "";
    document.getElementById("expiryDate").value = "";
    document.getElementById("status").value = "ACTIVE";
    document.getElementById("description").value = "";

    document.getElementById("medicineModal").style.display =
        "flex";

}

// =====================================
// Close Medicine Modal
// =====================================

function closeMedicineModal() {

    document.getElementById("medicineModal").style.display =
        "none";

}

// =====================================
// Save Medicine
// =====================================

function saveMedicine() {

    const id =
        document.getElementById("medicineId").value;

    const medicine = {

        medicineName:
            document.getElementById("medicineName").value.trim(),

        genericName:
            document.getElementById("genericName").value.trim(),

        strength:
            document.getElementById("strength").value.trim(),

        category:
            document.getElementById("category").value,

        dosageForm:
            document.getElementById("dosageForm").value.trim(),

        manufacturer:
            document.getElementById("manufacturer").value.trim(),

        price:
            parseFloat(document.getElementById("price").value || 0),

        stock:
            parseInt(document.getElementById("stock").value || 0),

        reorderLevel:
            parseInt(document.getElementById("reorderLevel").value || 0),

        batchNumber:
            document.getElementById("batchNumber").value.trim(),

        expiryDate:
            document.getElementById("expiryDate").value,

        status:
            document.getElementById("status").value,

        description:
            document.getElementById("description").value.trim()

    };

    if (medicine.medicineName === "") {

        alert("Medicine Name is required.");

        return;

    }

    const url =
        id === ""
            ? MEDICINE_API
            : MEDICINE_API + "/" + id;

    const method =
        id === ""
            ? "POST"
            : "PUT";

    fetch(url, {

        method: method,

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(medicine)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to save medicine.");

        }

        return response.json();

    })

    .then(() => {

        alert("Medicine Saved Successfully");

        closeMedicineModal();

        loadMedicines();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}
// =====================================
// Edit Medicine
// =====================================

function editMedicine(id) {

    fetch(MEDICINE_API + "/" + id)

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load medicine.");

        }

        return response.json();

    })

    .then(medicine => {

        document.getElementById("modalTitle").innerHTML =
            "Edit Medicine";

        document.getElementById("medicineId").value =
            medicine.id || "";

        document.getElementById("medicineName").value =
            medicine.medicineName || "";

        document.getElementById("genericName").value =
            medicine.genericName || "";

        document.getElementById("strength").value =
            medicine.strength || "";

        document.getElementById("category").value =
            medicine.category || "Tablet";

        document.getElementById("dosageForm").value =
            medicine.dosageForm || "";

        document.getElementById("manufacturer").value =
            medicine.manufacturer || "";

        document.getElementById("price").value =
            medicine.price || "";

        document.getElementById("stock").value =
            medicine.stock || "";

        document.getElementById("reorderLevel").value =
            medicine.reorderLevel || "";

        document.getElementById("batchNumber").value =
            medicine.batchNumber || "";

        document.getElementById("expiryDate").value =
            medicine.expiryDate || "";

        document.getElementById("status").value =
            medicine.status || "ACTIVE";

        document.getElementById("description").value =
            medicine.description || "";

        document.getElementById("medicineModal").style.display =
            "flex";

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}

// =====================================
// Delete Medicine
// =====================================

function deleteMedicine(id) {

    deleteMedicineId = id;

    if (!confirm("Are you sure you want to delete this medicine?")) {

        return;

    }

    fetch(MEDICINE_API + "/" + deleteMedicineId, {

        method: "DELETE"

    })

    .then(response => {

        if (!response.ok) {

            throw new Error("Delete Failed");

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        loadMedicines();

    })

    .catch(error => {

        console.error(error);

        alert(error.message);

    });

}
// =====================================
// Close Modal on Outside Click
// =====================================

window.addEventListener("mousedown", function (event) {

    const modal = document.getElementById("medicineModal");

    if (
        modal &&
        modal.style.display === "flex" &&
        event.target === modal
    ) {

        closeMedicineModal();

    }

});

// =====================================
// Refresh Medicines
// =====================================

function refreshMedicines() {

    loadMedicines();

}

// =====================================
// Utility
// =====================================

function clearMedicineForm() {

    document.getElementById("medicineId").value = "";

    document.getElementById("medicineName").value = "";

    document.getElementById("genericName").value = "";

    document.getElementById("strength").value = "";

    document.getElementById("category").value = "Tablet";

    document.getElementById("dosageForm").value = "";

    document.getElementById("manufacturer").value = "";

    document.getElementById("price").value = "";

    document.getElementById("stock").value = "";

    document.getElementById("reorderLevel").value = "";

    document.getElementById("batchNumber").value = "";

    document.getElementById("expiryDate").value = "";

    document.getElementById("status").value = "ACTIVE";

    document.getElementById("description").value = "";

}

// =====================================
// Make Functions Global
// =====================================

window.loadMedicines = loadMedicines;
window.searchMedicine = searchMedicine;

window.openMedicineModal = openMedicineModal;
window.closeMedicineModal = closeMedicineModal;

window.saveMedicine = saveMedicine;
window.editMedicine = editMedicine;
window.deleteMedicine = deleteMedicine;

window.refreshMedicines = refreshMedicines;