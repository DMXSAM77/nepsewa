// ===== DARK MODE TOGGLE =====
const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.checked = true;
}

toggle.addEventListener("change", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// ===== AUTH MODAL LOGIC (kept from original) =====
const authModal      = document.getElementById('authModal');
const loginButtons   = document.querySelectorAll('.btn-login');
const closeModal     = document.querySelector('.modal .close');
const toggleFormBtn  = document.getElementById('toggleForm');
const formTitle      = document.getElementById('formTitle');
const authForm       = document.getElementById('authForm');
const toggleText     = document.getElementById('toggleText');

if (loginButtons.length) {
    loginButtons.forEach(btn => {
        btn.addEventListener('click', () => { authModal.style.display = 'block'; });
    });
}
if (closeModal) {
    closeModal.addEventListener('click', () => { authModal.style.display = 'none'; });
}
window.addEventListener('click', (e) => {
    if (authModal && e.target === authModal) authModal.style.display = 'none';
});
if (toggleFormBtn) {
    toggleFormBtn.addEventListener('click', () => {
        if (formTitle.innerText.includes('Login')) {
            formTitle.innerText = "Sign Up for NepSewa";
            authForm.innerHTML = `
                <input type="text"     placeholder="Full Name"         required>
                <input type="email"    placeholder="Email"             required>
                <input type="password" placeholder="Password"          required>
                <input type="password" placeholder="Confirm Password"  required>
                <button type="submit" class="btn">Sign Up</button>
            `;
            toggleText.innerHTML = 'Already have an account? <span id="toggleForm" style="cursor:pointer;color:var(--primary);">Login</span>';
        } else {
            formTitle.innerText = "Login to NepSewa";
            authForm.innerHTML = `
                <input type="email"    placeholder="Email"    required>
                <input type="password" placeholder="Password" required>
                <button type="submit" class="btn">Login</button>
            `;
            toggleText.innerHTML = 'Don\'t have an account? <span id="toggleForm" style="cursor:pointer;color:var(--primary);">Sign Up</span>';
        }
        document.getElementById('toggleForm').addEventListener('click', toggleFormBtn.click);
    });
}

// ===== HOME PAGE — TOP PROVIDERS via Ranking Algorithm =====
const homeGrid = document.getElementById("homeProviderGrid");

if (homeGrid && typeof PROVIDERS !== 'undefined') {
    // Use ranking algorithm — top 3 across all services
    const top3 = rankProviders(PROVIDERS).slice(0, 3);

    top3.forEach(p => {
        const maxScore = 15; // rough max for bar normalisation
        const barPct   = Math.min(100, Math.round((p._score / maxScore) * 100));

        const card = document.createElement('div');
        card.className = 'pro-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            ${p.isVerified ? `
            <div class="verified-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
            </div>` : ''}
            <h3>${p.name}</h3>
            <p>${p.service}</p>
            <div class="pro-stats">
                <div class="stat-item">
                    <span class="stat-num">⭐ ${p.rating}</span>
                    <span class="stat-lbl">Rating</span>
                </div>
                <div class="stat-item">
                    <span class="stat-num">${p.experience} yrs</span>
                    <span class="stat-lbl">Experience</span>
                </div>
                <div class="stat-item">
                    <span class="stat-num">${p.completedJobs}</span>
                    <span class="stat-lbl">Jobs Done</span>
                </div>
            </div>
            <div class="score-bar-wrap">
                <div class="score-bar-bg">
                    <div class="score-bar-fill" style="width:${barPct}%"></div>
                </div>
                <span class="score-label">Match score</span>
            </div>
            <p class="response-time">⚡ Responds in ~${p.responseTimeHours}h</p>
            <button onclick="window.location.href='services.html'">Book Now</button>
        `;
        homeGrid.appendChild(card);
    });
}
