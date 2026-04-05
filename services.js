// ============================================================
//  NepSewa — services.js
//  Merged: serv.js (booking logic) + provider.js (algorithm)
//  All original code preserved, unified into one file
// ============================================================

// ===== DARK MODE TOGGLE (original) =====
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
}

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// ===== INLINE ERROR SYSTEM (original from serv.js) =====
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById("error-" + inputId.split("-")[1]);
    if (!input || !error) return;
    input.classList.add("input-error");
    error.innerText = message;
    error.classList.add("show");
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById("error-" + inputId.split("-")[1]);
    if (!input || !error) return;
    input.classList.remove("input-error");
    error.innerText = "";
    error.classList.remove("show");
}

// ===== REAL-TIME CALENDAR (original from serv.js) =====
const DAY_NAMES   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getUpcomingDays(count = 6) {
    const days = [];
    const now  = new Date();
    for (let i = 0; i < count; i++) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
        days.push({
            dayName : DAY_NAMES[d.getDay()],
            date    : d.getDate(),
            month   : MONTH_NAMES[d.getMonth()],
            year    : d.getFullYear(),
            label   : `${DAY_NAMES[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`
        });
    }
    return days;
}

function buildCalendar() {
    const picker = document.querySelector(".date-picker");
    if (!picker) return;

    const days = getUpcomingDays(6);
    picker.innerHTML = "";

    days.forEach((day, index) => {
        const div = document.createElement("div");
        div.className = "date-day" + (index === 0 ? " selected" : "");
        div.innerHTML = `
            <span class="day">${day.dayName}</span>
            <span class="date">${day.date}</span>
            <span class="month-label" style="font-size:10px;color:#999;">${day.month}</span>
        `;
        div.addEventListener("click", () => selectDate(div, day.label));
        picker.appendChild(div);
    });

    selectedDate = days[0].label;
    const el = document.getElementById("selectedDate");
    if (el) el.innerText = selectedDate;
}

// ===== SERVICE DATA (original from serv.js) =====
let currentServiceType = '';
let selectedDate       = '';
let selectedTime       = '8AM - 9AM';

const serviceData = {
    maid: {
        title: "Maid Service", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Rs. 2,500 for full day (8 hrs)",
        workerInfo: "Our maids handle daily household work including sweeping, mopping, washing dishes, and basic cooking. All maids are background-checked and trained. Perfect for busy families who need reliable help at home every day.",
        image: "https://homeworknepal.com/wp-content/uploads/2024/05/Housemaid.jpg", serviceKey: "maid"
    },
    technician: {
        title: "Technician Service", price: "Rs. 300 / Hour",
        priceDesc: "Rs. 300 for 1 hour · Rs. 800 for 3 hours · Parts & replacements charged separately",
        workerInfo: "Our technicians repair home appliances like TVs, washing machines, refrigerators, and microwaves. They carry basic tools and spare parts for common repairs. Most jobs are done in a single visit with a 30-day service warranty.",
        image: "https://homeworknepal.com/wp-content/uploads/2022/09/electrician-electric-electricity-2755683-1024x681.jpg", serviceKey: "technician"
    },
    plumber: {
        title: "Plumber Service", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Emergency call: Rs. 800 flat visit charge",
        workerInfo: "Our plumbers fix leaking taps, blocked drains, broken pipes, and bathroom fittings. They are available for both regular bookings and urgent repairs. All plumbers carry standard tools and pipe fittings for quick on-site fixes.",
        image: "https://nnps.com.np/wp-content/uploads/2023/06/imgs-1.jpg", serviceKey: "plumber"
    },
    electrician: {
        title: "Electrician Service", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Wiring jobs quoted separately",
        workerInfo: "Our electricians handle switch repairs, fan and light installations, power socket fitting, and circuit troubleshooting. All work is done safely following standard wiring practices. A safety check is included with every service visit.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwC_BznDpwyR2eeQpC7mAQTTisL33B2Mt3g&s", serviceKey: "electrician"
    },
    haircutting: {
        title: "Hair Cutting", price: "Rs. 200 / Person",
        priceDesc: "Rs. 200 per person · Rs. 500 for a family of 3 · Home visit included in price",
        workerInfo: "Get a clean, professional haircut at your home without going to a salon. Our barbers bring all their own tools and equipment. Suitable for men and kids.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBOJdrtttgPWstF4HcMoxCwE8pU2dNwZEYQg&s", serviceKey: "haircutting"
    },
    gardener: {
        title: "Gardener Service", price: "Rs. 1,000 / Day",
        priceDesc: "Rs. 1,000 for a full day (6–8 hrs) · Rs. 600 for half day · Tools brought by gardener",
        workerInfo: "Our gardeners do lawn mowing, plant trimming, weeding, watering, and basic garden maintenance. They bring their own basic tools.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC99OjYEYoOEna34FkVD741eZRu7AUVtSO3w&s", serviceKey: "gardener"
    },
    makeup: {
        title: "Makeup Artist", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for basic look (1 hr) · Rs. 1,200 for bridal/party makeup · Products used by artist",
        workerInfo: "Our makeup artists come to your home for all occasions — weddings, parties, photoshoots, and daily events. They bring their own professional makeup kit with quality products.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaaYzEvMXuqWZ5Hp5Q14B9vqRFu5fQvlfBEA&s", serviceKey: "makeup"
    },
    photographer: {
        title: "Photographer", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,200 for 3 hours · Edited photos delivered within 2 days",
        workerInfo: "Our photographers cover family events, product shoots, birthdays, and small ceremonies. They bring their own camera and lighting equipment. Edited photos delivered digitally within 2 working days.",
        image: "https://img.freepik.com/free-photo/young-stylish-photographer-holds-professional-camera-taking-photos_8353-6506.jpg", serviceKey: "photographer"
    },
    cleaning: {
        title: "Home Cleaning", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Rs. 2,500 for full home deep clean",
        workerInfo: "Our cleaning team cleans kitchens, bathrooms, bedrooms, and living rooms thoroughly. They bring their own cleaning supplies and equipment.",
        image: "https://sunflowermaids.com/wp-content/uploads/2021/08/Signs-of-a-Bad-Cleaning-Lady.jpg", serviceKey: "cleaning"
    },
    ac: {
        title: "AC Repair & Service", price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for general service · Rs. 800 for repair visit · Gas refill charged separately",
        workerInfo: "Our AC technicians do regular servicing, filter cleaning, gas refilling, and fault repairs for all major brands. No hidden charges.",
        image: "https://clareservices.com/wp-content/uploads/2020/07/air-conditioning-repair-service-hyderabad.jpg", serviceKey: "ac"
    }
};

// ===== STATE for merged page =====
let activeServiceKey = "";
let selectedDay      = "";
let currentSort      = "score";

// ===== LEFT PANEL — Service item click =====
function selectService(el) {
    // Highlight active item
    document.querySelectorAll(".svc-item").forEach(i => i.classList.remove("active"));
    el.classList.add("active");

    const key  = el.dataset.key;
    activeServiceKey = key;
    const data = serviceData[key];

    // Update service detail banner
    const banner = document.getElementById("svcBanner");
    document.getElementById("bannerImg").src         = data.image;
    document.getElementById("bannerTitle").innerText = data.title;
    document.getElementById("bannerDesc").innerText  = data.workerInfo;
    document.getElementById("bannerPrice").innerText = data.price;
    document.getElementById("bannerBookBtn").onclick = () => openBookingModal(key);
    banner.classList.add("show");

    // Show filter and sort controls
    document.getElementById("filterBar").style.display = "flex";
    document.getElementById("sortRow").style.display   = "flex";

    // Hide placeholder, show grid
    document.getElementById("placeholder").style.display  = "none";
    document.getElementById("providerGrid").style.display = "grid";

    // Reset day pill, sort, filters
    selectedDay  = "";
    currentSort  = "score";
    document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".sort-pill").forEach(b => {
        b.classList.toggle("active", b.dataset.sort === "score");
    });
    document.getElementById("locationSelect").value = "";
    document.getElementById("ratingSelect").value   = "0";

    runAlgorithm();
}

// ===== PROVIDER FILTER LISTENERS =====
document.getElementById("locationSelect").addEventListener("change", runAlgorithm);
document.getElementById("ratingSelect").addEventListener("change", runAlgorithm);

document.querySelectorAll(".day-pill").forEach(pill => {
    pill.addEventListener("click", () => {
        const day = pill.dataset.day;
        if (selectedDay === day) {
            selectedDay = "";
            pill.classList.remove("active");
        } else {
            selectedDay = day;
            document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
        }
        runAlgorithm();
    });
});

document.querySelectorAll(".sort-pill").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".sort-pill").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentSort = btn.dataset.sort;
        runAlgorithm();
    });
});

// ===== PRIMARY + SECONDARY ALGORITHM RUNNER =====
function runAlgorithm() {
    if (!activeServiceKey) return;

    const location  = document.getElementById("locationSelect").value;
    const minRating = parseFloat(document.getElementById("ratingSelect").value) || 0;

    // PRIMARY: match
    let matched = matchProviders({
        serviceKey : activeServiceKey,
        location,
        dayName    : selectedDay,
        minRating
    });

    // SECONDARY: rank
    let ranked = rankProviders(matched, location);

    // Apply sort override
    if      (currentSort === "rating")     ranked.sort((a,b) => b.rating - a.rating);
    else if (currentSort === "jobs")       ranked.sort((a,b) => b.completedJobs - a.completedJobs);
    else if (currentSort === "experience") ranked.sort((a,b) => b.experience - a.experience);
    else if (currentSort === "response")   ranked.sort((a,b) => a.responseTimeHours - b.responseTimeHours);

    renderProviders(ranked, location);
}

// ===== RENDER PROVIDER CARDS =====
function renderProviders(list, preferredLocation) {
    const grid    = document.getElementById("providerGrid");
    const countEl = document.getElementById("resultCount");
    const maxScore = list.length > 0 ? (list[0]._score || 1) : 1;

    countEl.textContent = list.length === 0
        ? ""
        : `${list.length} provider${list.length > 1 ? "s" : ""} found`;

    grid.innerHTML = "";

    if (list.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-icon">🔍</div>
                <p>No providers found for your filters.</p>
                <p style="margin-top:6px;font-size:12px;color:#64748b;">Try removing the day filter or changing location.</p>
            </div>`;
        return;
    }

    list.forEach((p, idx) => {
        const barPct    = Math.min(100, Math.round(((p._score || 0) / maxScore) * 100));
        const cancelPct = Math.round(p.cancellationRate * 100);
        const isTop     = idx === 0 && currentSort === "score";

        const card = document.createElement("div");
        card.className = "pro-card-new";
        card.innerHTML = `
            ${isTop ? '<div class="top-match-ribbon">🏆 Top Match</div>' : ''}
            <img src="${p.image}" alt="${p.name}" style="margin-top:${isTop ? '20px' : '0'}">
            ${p.isVerified ? `
            <div class="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
            </div>` : '<div style="height:20px;"></div>'}
            <h4>${p.name}</h4>
            <p class="pro-loc">📍 ${p.location}</p>
            <div class="pro-stats-row">
                <div class="ps"><span class="ps-num">⭐ ${p.rating}</span><span class="ps-lbl">Rating</span></div>
                <div class="ps"><span class="ps-num">${p.experience}yr</span><span class="ps-lbl">Exp.</span></div>
                <div class="ps"><span class="ps-num">${p.completedJobs}</span><span class="ps-lbl">Jobs</span></div>
                <div class="ps"><span class="ps-num">${cancelPct}%</span><span class="ps-lbl">Cancel</span></div>
            </div>
            <div class="score-bar-wrap">
                <div class="score-bar-bg">
                    <div class="score-bar-fill" style="width:${barPct}%"></div>
                </div>
                <span class="score-lbl">Match ${barPct}%</span>
            </div>
            <p class="pro-response">⚡ ~${p.responseTimeHours}h response · ${p.reviewCount} reviews</p>
            <button class="book-now-btn" onclick="openBookingModal('${activeServiceKey}')">Book Now</button>
        `;
        grid.appendChild(card);
    });
}

// ===== OPEN BOOKING MODAL (replaces showDetails from serv.js) =====
function openBookingModal(serviceKey) {
    currentServiceType = serviceKey;
    const data  = serviceData[serviceKey];
    const modal = document.getElementById("bookingModal");

    // Original serv.js detail section (kept)
    const titleEl = document.getElementById("title");
    const descEl  = document.getElementById("desc");
    if (titleEl) titleEl.innerText = data.title;
    if (descEl)  descEl.innerText  = data.workerInfo;

    document.getElementById("modalServiceTitle").innerText = data.title;
    document.getElementById("priceDisplay").innerText      = data.price;
    document.getElementById("priceDescription").innerText  = data.priceDesc;
    document.getElementById("workerInfo").innerText        = data.workerInfo;
    document.getElementById("serviceImage").src            = data.image;

    buildCalendar();

    selectedTime = '8AM - 9AM';
    document.querySelectorAll(".time-slot").forEach(el => el.classList.remove("active-time"));
    const firstSlot = document.querySelector(".time-slot");
    if (firstSlot) firstSlot.classList.add("active-time");

    modal.classList.add("show");
}

// Keep original showDetails name working (called from anywhere)
function showDetails(service) { openBookingModal(service); }

// ===== MODAL CONTROLS (original from serv.js) =====
function closeModal() {
    document.getElementById("bookingModal").classList.remove("show");
}

function selectDate(element, label) {
    document.querySelectorAll(".date-day").forEach(el => el.classList.remove("selected"));
    element.classList.add("selected");
    selectedDate = label;
    document.getElementById("selectedDate").innerText = selectedDate;
}

function selectTime(element, time) {
    document.querySelectorAll(".time-slot").forEach(el => el.classList.remove("active-time"));
    element.classList.add("active-time");
    selectedTime = time;
}

function previousImage() { alert("Previous image"); }
function nextImage()     { alert("Next image"); }

function proceedToBook() {
    const data = serviceData[currentServiceType];

    document.getElementById("confirmBadge").innerText      = data.title;
    document.getElementById("confirmTimingText").innerText = `${selectedTime}, ${selectedDate}`;
    document.getElementById("summaryService").innerText    = data.title;
    document.getElementById("summaryDateTime").innerText   = `${selectedDate} · ${selectedTime}`;
    document.getElementById("summaryPrice").innerText      = data.price;

    ["cf-name","cf-address","cf-phone","cf-landmark","cf-email","cf-note"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    closeModal();
    document.getElementById("confirmModal").classList.add("show");
}

function closeConfirmModal() {
    document.getElementById("confirmModal").classList.remove("show");
}

function confirmBooking() {
    const name  = document.getElementById("cf-name").value.trim();
    const addr  = document.getElementById("cf-address").value.trim();
    const phone = document.getElementById("cf-phone").value.trim();
    let valid   = true;

    ["cf-name","cf-address","cf-phone"].forEach(clearError);

    if (!name)  { showError("cf-name",    "Full name is required"); valid = false; }
    if (!addr)  { showError("cf-address", "Address is required");   valid = false; }
    if (!phone) {
        showError("cf-phone", "Phone number is required"); valid = false;
    } else if (!/^[9][0-9]{9}$/.test(phone)) {
        showError("cf-phone", "Enter valid Nepal number"); valid = false;
    }

    if (!valid) return;

    const formEl = document.querySelector(".confirm-form");
    const headEl = document.querySelector(".confirm-header");
    headEl.style.display = "none";
    formEl.innerHTML = `
        <div class="booking-success">
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </div>
            <h3>Booking Confirmed!</h3>
            <p>
                Thank you, <strong>${name}</strong>!<br>
                Your booking is set for<br>
                <strong>${selectedDate}</strong> at <strong>${selectedTime}</strong>.<br><br>
                We will contact you at <strong>${phone}</strong>.
            </p>
            <button class="confirm-book-btn" style="margin-top:24px;width:100%;"
                    onclick="closeConfirmModal(); location.reload();">Done</button>
        </div>
    `;
}

// Close modals on outside click (original)
window.onclick = function(event) {
    const modal        = document.getElementById("bookingModal");
    const confirmModal = document.getElementById("confirmModal");
    if (event.target === modal)        closeModal();
    if (event.target === confirmModal) closeConfirmModal();
};
