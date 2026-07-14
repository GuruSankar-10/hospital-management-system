/*=========================================================
                    HMS PRO
                INVENTORY MODULE
=========================================================*/

const API = "/medicines";

let medicines = [];
let editingId = null;

/*=========================================================
                PAGE LOAD
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    loadMedicines();

    document
        .getElementById("medicineForm")
        .addEventListener("submit", saveMedicine);

});

/*=========================================================
                LOAD MEDICINES
=========================================================*/

async function loadMedicines() {

    try {

        const response = await fetch(API);

        medicines = await response.json();

        renderTable(medicines);

        updateCards();

    }

    catch (error) {

        console.error("Error Loading Medicines", error);

    }

}

/*=========================================================
                RENDER TABLE
=========================================================*/

function renderTable(data) {

    const table = document.getElementById("medicineTable");

    table.innerHTML = "";

    data.forEach(medicine => {

        let status = "";
        let cssClass = "";

        if (medicine.stock <= 0) {

            status = "❌ Out of Stock";
            cssClass = "out-stock";

        }

        else if (medicine.stock < 20) {

            status = "⚠ Low Stock";
            cssClass = "low-stock";

        }

        else {

            status = "✅ In Stock";
            cssClass = "in-stock";

        }

        table.innerHTML += `

        <tr>

            <td>${medicine.id}</td>

            <td>${medicine.name}</td>

            <td>${medicine.category || "-"}</td>

            <td>${medicine.manufacturer || "-"}</td>

            <td>₹${medicine.price}</td>

            <td>${medicine.stock}</td>

            <td>${medicine.expiryDate || "-"}</td>

            <td>

                <span class="status ${cssClass}">

                    ${status}

                </span>

            </td>

            <td>

                <button
                    class="action-btn edit"
                    onclick="editMedicine(${medicine.id})">

                    Edit

                </button>

                <button
                    class="action-btn delete"
                    onclick="deleteMedicine(${medicine.id})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

/*=========================================================
                DASHBOARD
=========================================================*/

function updateCards() {

    document.getElementById("totalMedicine").innerText =
        medicines.length;

    let totalStock = 0;

    let lowStock = 0;

    let outStock = 0;

    medicines.forEach(medicine => {

        totalStock += medicine.stock;

        if (medicine.stock <= 0)

            outStock++;

        else if (medicine.stock < 20)

            lowStock++;

    });

    document.getElementById("totalStock").innerText =
        totalStock;

    document.getElementById("lowStock").innerText =
        lowStock;

    document.getElementById("outStock").innerText =
        outStock;

}

/*=========================================================
                SAVE MEDICINE
=========================================================*/

async function saveMedicine(e) {

    e.preventDefault();

    const medicine = {

        name: document.getElementById("medicineName").value,

        category: document.getElementById("category").value,

        manufacturer: document.getElementById("manufacturer").value,

        price: parseFloat(document.getElementById("price").value),

        stock: parseInt(document.getElementById("stock").value),

        expiryDate: document.getElementById("expiryDate").value,

        description: document.getElementById("description").value

    };

    try {

        if (editingId == null) {

            await fetch(API, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(medicine)

            });

        }

        else {

            await fetch(API + "/" + editingId, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(medicine)

            });

            editingId = null;

        }

        document.getElementById("medicineForm").reset();

        closeMedicineModal();

        loadMedicines();

    }

    catch (error) {

        console.error(error);

    }

}

/*=========================================================
                DELETE
=========================================================*/

async function deleteMedicine(id) {

    if (!confirm("Delete this medicine?"))

        return;

    await fetch(API + "/" + id, {

        method: "DELETE"

    });

    loadMedicines();

}

/*=========================================================
                EDIT
=========================================================*/

function editMedicine(id) {

    const medicine = medicines.find(m => m.id === id);

    if (!medicine)

        return;

    editingId = id;

    document.getElementById("medicineName").value =
        medicine.name;

    document.getElementById("category").value =
        medicine.category || "";

    document.getElementById("manufacturer").value =
        medicine.manufacturer || "";

    document.getElementById("price").value =
        medicine.price;

    document.getElementById("stock").value =
        medicine.stock;

    document.getElementById("expiryDate").value =
        medicine.expiryDate || "";

    document.getElementById("description").value =
        medicine.description || "";

    openMedicineModal();

}

/*=========================================================
                SEARCH
=========================================================*/

function searchMedicine() {

    const keyword = document
        .getElementById("searchMedicine")
        .value
        .toLowerCase();

    const filtered = medicines.filter(medicine =>

        medicine.name.toLowerCase().includes(keyword)

    );

    renderTable(filtered);

}

/*=========================================================
                CATEGORY FILTER
=========================================================*/

function filterCategory() {

    const category =
        document.getElementById("categoryFilter").value;

    if (category === "") {

        renderTable(medicines);

        return;

    }

    const filtered = medicines.filter(medicine =>

        medicine.category === category

    );

    renderTable(filtered);

}

/*=========================================================
                MODAL
=========================================================*/

function openMedicineModal() {

    document.getElementById("medicineModal").style.display =
        "block";

}

function closeMedicineModal() {

    document.getElementById("medicineModal").style.display =
        "none";

}