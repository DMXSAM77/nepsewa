// ===== THEME SWITCHING =====
const toggle = document.getElementById("darkToggle");

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
}

// Toggle theme
toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// ===== REAL-TIME CALENDAR GENERATION =====
const DAY_NAMES   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Build an array of the next `count` days starting from today.
 * Each entry: { dayName, date (number), month, year, label }
 */
function getUpcomingDays(count = 6) {
    const days = [];
    const now = new Date();
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

/**
 * Inject real-time date buttons into .date-picker and update #selectedDate.
 */
function buildCalendar() {
    const picker = document.querySelector(".date-picker");
    if (!picker) return;

    const days = getUpcomingDays(6);
    picker.innerHTML = ""; // clear hardcoded buttons

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

    // Set default selected date display to today
    selectedDate = days[0].label;
    const selectedDateEl = document.getElementById("selectedDate");
    if (selectedDateEl) selectedDateEl.innerText = selectedDate;
}

// ===== SERVICE BOOKING FUNCTIONALITY =====
let currentServiceType = '';
let selectedDate = '';
let selectedTime = '8AM - 9AM';

const serviceData = {
    maid: {
        title: "Maid Service",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Rs. 2,500 for full day (8 hrs)",
        workerInfo: "Our maids handle daily household work including sweeping, mopping, washing dishes, and basic cooking. All maids are background-checked and trained. Perfect for busy families who need reliable help at home every day.",
        image: "https://homeworknepal.com/wp-content/uploads/2024/05/Housemaid.jpg"
    },
    technician: {
        title: "Technician Service",
        price: "Rs. 300 / Hour",
        priceDesc: "Rs. 300 for 1 hour · Rs. 800 for 3 hours · Parts & replacements charged separately",
        workerInfo: "Our technicians repair home appliances like TVs, washing machines, refrigerators, and microwaves. They carry basic tools and spare parts for common repairs. Most jobs are done in a single visit with a 30-day service warranty.",
        image: "https://homeworknepal.com/wp-content/uploads/2022/09/electrician-electric-electricity-2755683-1024x681.jpg"
    },
    plumber: {
        title: "Plumber Service",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Emergency call: Rs. 800 flat visit charge",
        workerInfo: "Our plumbers fix leaking taps, blocked drains, broken pipes, and bathroom fittings. They are available for both regular bookings and urgent repairs. All plumbers carry standard tools and pipe fittings for quick on-site fixes.",
        image: "https://nnps.com.np/wp-content/uploads/2023/06/imgs-1.jpg"
    },
    electrician: {
        title: "Electrician Service",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Wiring jobs quoted separately",
        workerInfo: "Our electricians handle switch repairs, fan and light installations, power socket fitting, and circuit troubleshooting. All work is done safely following standard wiring practices. A safety check is included with every service visit.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXwC_BznDpwyR2eeQpC7mAQTTisL33B2Mt3g&s"
    },
    haircutting: {
        title: "Hair Cutting",
        price: "Rs. 200 / Person",
        priceDesc: "Rs. 200 per person · Rs. 500 for a family of 3 · Home visit included in price",
        workerInfo: "Get a clean, professional haircut at your home without going to a salon. Our barbers bring all their own tools and equipment. Suitable for men and kids. Simple styles and trims — just tell them how you want it before they start.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBOJdrtttgPWstF4HcMoxCwE8pU2dNwZEYQg&s"
    },
    gardener: {
        title: "Gardener Service",
        price: "Rs. 1,000 / Day",
        priceDesc: "Rs. 1,000 for a full day (6–8 hrs) · Rs. 600 for half day · Tools brought by gardener",
        workerInfo: "Our gardeners do lawn mowing, plant trimming, weeding, watering, and basic garden maintenance. They bring their own basic tools. Ideal for homes, offices, and apartments with outdoor spaces. You can also book them on a weekly or monthly schedule.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC99OjYEYoOEna34FkVD741eZRu7AUVtSO3w&s"
    },
    makeup: {
        title: "Makeup Artist",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for basic look (1 hr) · Rs. 1,200 for bridal/party makeup · Products used by artist",
        workerInfo: "Our makeup artists come to your home for all occasions — weddings, parties, photoshoots, and daily events. They bring their own professional makeup kit with quality products. Just tell them the occasion and your preferred style when booking.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaaYzEvMXuqWZ5Hp5Q14B9vqRFu5fQvlfBEA&s"
    },
    photographer: {
        title: "Photographer",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,200 for 3 hours · Edited photos delivered within 2 days",
        workerInfo: "Our photographers cover family events, product shoots, birthdays, and small ceremonies. They bring their own camera and lighting equipment. After the shoot, edited photos are delivered digitally within 2 working days. Great for personal and small business needs.",
        image: "https://img.freepik.com/free-photo/young-stylish-photographer-holds-professional-camera-taking-photos_8353-6506.jpg"
    },
    cleaning: {
        title: "Home Cleaning",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for 1 hour · Rs. 1,500 for 3 hours · Rs. 2,500 for full home deep clean",
        workerInfo: "Our cleaning team cleans kitchens, bathrooms, bedrooms, and living rooms thoroughly. They bring their own cleaning supplies and equipment. A full home deep clean typically takes 3–5 hours depending on size. Regular bookings available on weekly or monthly basis.",
        image: "https://sunflowermaids.com/wp-content/uploads/2021/08/Signs-of-a-Bad-Cleaning-Lady.jpg"
    },
    ac: {
        title: "AC Repair & Service",
        price: "Rs. 500 / Hour",
        priceDesc: "Rs. 500 for general service · Rs. 800 for repair visit · Gas refill charged separately",
        workerInfo: "Our AC technicians do regular servicing, filter cleaning, gas refilling, and fault repairs for all major brands. A standard service takes about 1 hour. If parts need to be replaced, the cost is discussed before any work begins — no hidden charges.",
        image: "https://clareservices.com/wp-content/uploads/2020/07/air-conditioning-repair-service-hyderabad.jpg"
    }
};

function showDetails(service) {
    currentServiceType = service;
    const title = document.getElementById("title");
    const desc  = document.getElementById("desc");
    const modal = document.getElementById("bookingModal");

    const data = serviceData[service];

    // Update original details section
    title.innerText = data.title;
    desc.innerText  = data.workerInfo;

    // Update modal content
    document.getElementById("modalServiceTitle").innerText = data.title;
    document.getElementById("priceDisplay").innerText      = data.price;
    document.getElementById("priceDescription").innerText  = data.priceDesc;
    document.getElementById("workerInfo").innerText        = data.workerInfo;
    document.getElementById("serviceImage").src            = data.image;

    // Rebuild calendar with today's real dates
    buildCalendar();

    // Reset time selection
    selectedTime = '8AM - 9AM';
    document.querySelectorAll(".time-slot").forEach(el => el.classList.remove("active-time"));
    const firstSlot = document.querySelector(".time-slot");
    if (firstSlot) firstSlot.classList.add("active-time");

    // Show modal
    modal.classList.add("show");
}

function closeModal() {
    document.getElementById("bookingModal").classList.remove("show");
}

/**
 * Called when user clicks a date button.
 * @param {HTMLElement} element - the clicked .date-day div
 * @param {string}      label   - human-readable label e.g. "Thu, Apr 3"
 */
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

function previousImage() {
    alert("Previous image");
}

function nextImage() {
    alert("Next image");
}

function proceedToBook() {
    const data = serviceData[currentServiceType];

    // Populate confirmation modal header
    document.getElementById("confirmBadge").innerText      = data.title;
    document.getElementById("confirmTimingText").innerText = `${selectedTime}, ${selectedDate}`;

    // Populate summary
    document.getElementById("summaryService").innerText  = data.title;
    document.getElementById("summaryDateTime").innerText = `${selectedDate} · ${selectedTime}`;
    document.getElementById("summaryPrice").innerText    = data.price;

    // Clear form fields
    ["cf-name","cf-address","cf-phone","cf-landmark","cf-email","cf-note"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    // Close booking modal, open confirm modal
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

    if (!name) {
        alert("Please enter your full name.");
        document.getElementById("cf-name").focus();
        return;
    }
    if (!addr) {
        alert("Please enter your address.");
        document.getElementById("cf-address").focus();
        return;
    }
    if (!phone) {
        alert("Please enter your phone number.");
        document.getElementById("cf-phone").focus();
        return;
    }
    if (!/^[9][0-9]{9}$/.test(phone)) {
        alert("Please enter a valid 10-digit Nepal phone number starting with 9.");
        document.getElementById("cf-phone").focus();
        return;
    }

    // Show success state inside modal
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
                Your <strong>${serviceData[currentServiceType].title}</strong> has been booked for<br>
                <strong>${selectedDate}</strong> at <strong>${selectedTime}</strong>.<br><br>
                We will contact you at <strong>${phone}</strong> shortly.
            </p>
            <button class="confirm-book-btn" style="margin-top:24px;width:100%;" onclick="closeConfirmModal(); location.reload();">
                Done
            </button>
        </div>
    `;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modal        = document.getElementById("bookingModal");
    const confirmModal = document.getElementById("confirmModal");
    if (event.target === modal)        closeModal();
    if (event.target === confirmModal) closeConfirmModal();
};