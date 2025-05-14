document.addEventListener("DOMContentLoaded", function () {
    const incharges = [
        { name: "Incharge 1", description: "Bus Route 1", phone: "tel:1234567890", whatsapp: "https://wa.me/1234567890" },
        { name: "Incharge 2", description: "Bus Route 2", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 3", description: "Bus Route 3", phone: "tel:3456789012", whatsapp: "https://wa.me/3456789012"},
        { name: "Incharge 4", description: "Bus Route 4", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 5", description: "Bus Route 5", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 6", description: "Bus Route 6", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 7", description: "Bus Route 7", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 8", description: "Bus Route 8", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 9", description: "Bus Route 9", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 10", description: "Bus Route 10", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 11", description: "Bus Route 11", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"},
        { name: "Incharge 12", description: "Bus Route 12", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901"}
    ];

    const drivers = [
        { name: "Route 1", description: "Name 1", phone: "tel:1234567890", whatsapp: "https://wa.me/1234567890" },
        { name: "Route 2", description: "Name 2", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 3", description: "Name 3", phone: "tel:3456789012", whatsapp: "https://wa.me/3456789012" },
        { name: "Route 4", description: "Name 4", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 5", description: "Name 5", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 6", description: "Name 6", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 7", description: "Name 7", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 8", description: "Name 8", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 9", description: "Name 9", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 10", description: "Name 10", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 11", description: "Name 11", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" },
        { name: "Route 12", description: "Name 12", phone: "tel:2345678901", whatsapp: "https://wa.me/2345678901" }
    ];

    const inchargeContainer = document.getElementById("busIncharge");
    const driversContainer = document.getElementById("busDrivers");
    const btnIncharges = document.getElementById("showIncharges");
    const btnDrivers = document.getElementById("showDrivers");
    const sectionIncharges = document.getElementById("busInchargesDisplay");
    const sectionDrivers = document.getElementById("busDriversDisplay");
    const allCards = document.querySelectorAll(".incharge-card"); 

    function populateCards(data, container) {
        container.innerHTML = "";
        if (data.length > 0) {
            data.forEach(item => {
                const card = document.createElement("div");
                card.className = "incharge-card";
                card.innerHTML = `
                    <div class="left">
                        <i class="bi bi-person-fill person-icon"></i>
                        <div class="text-left ml-1">
                            <div class="incharge-name">${item.name}</div>
                            <div class="incharge-desc">${item.description}</div>
                        </div>
                    </div>
                    <div class="right">
                        <a href="${item.phone}" class="icon-link"><i class="bi bi-telephone-fill"></i></a>
                        <a href="${item.whatsapp}" class="icon-link" target="_blank"><i class="bi bi-whatsapp"></i></a>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    }

    populateCards(incharges, inchargeContainer);
    populateCards(drivers, driversContainer);
    function filterCards(query) {
        const lowerCaseQuery = query.toLowerCase();
        const allCards = document.querySelectorAll(".incharge-card");
        allCards.forEach(card => {
            const nameElement = card.querySelector(".incharge-name");
            const descElement = card.querySelector(".incharge-desc");
            const name = nameElement ? nameElement.textContent.toLowerCase() : "";
            const desc = descElement ? descElement.textContent.toLowerCase() : "";
            card.style.display = (name.includes(lowerCaseQuery) || desc.includes(lowerCaseQuery)) ? "flex" : "none";
        });
    }

    document.getElementById("search").addEventListener("input", function () {
        filterCards(this.value);
    });

    document.getElementById("clearSearch").addEventListener("click", function () {
        document.getElementById("search").value = "";
        filterCards(""); 
    });

    btnIncharges.addEventListener("click", function () {
        inchargeContainer.style.display = "block";
        driversContainer.style.display = "none";
        sectionIncharges.style.display = "block";
        sectionDrivers.style.display = "none";
        btnIncharges.classList.add("active");
        btnDrivers.classList.remove("active");
        filterCards(document.getElementById("search").value); 
    });

    btnDrivers.addEventListener("click", function () {
        inchargeContainer.style.display = "none";
        driversContainer.style.display = "block";
        sectionIncharges.style.display = "none";
        sectionDrivers.style.display = "block";
        btnIncharges.classList.remove("active");
        btnDrivers.classList.add("active");
        filterCards(document.getElementById("search").value); 
    });
    inchargeContainer.style.display = "block";
    driversContainer.style.display = "none";
    sectionIncharges.style.display = "block";
    sectionDrivers.style.display = "none";
    btnIncharges.classList.add("active");
});
document.getElementById('contactdriverBtn').addEventListener('click', function() {
    window.location.href = '../pages/drivercontact.html'; 
});
