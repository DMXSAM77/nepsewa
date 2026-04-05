// ===== SELECT ELEMENTS =====
const toggleBtn = document.getElementById("toggleForm");
const form      = document.getElementById("authForm");
const title     = document.getElementById("formTitle");
const subtitle  = document.querySelector(".subtitle");

// ===== TOGGLE LOGIN / SIGNUP =====
toggleBtn.addEventListener("click", () => {
    if (title.innerText.includes("Welcome")) {
        title.innerText    = "Create Account 🚀";
        subtitle.innerText = "Join NepSewa and book services easily";
        form.innerHTML = `
            <input type="text"     placeholder="Full Name"       required>
            <input type="email"    placeholder="Email Address"   required>
            <input type="password" placeholder="Password"        required>
            <input type="password" placeholder="Confirm Password" required>
            <button class="auth-btn">Sign Up</button>
        `;
        toggleBtn.innerText = "Login";
    } else {
        title.innerText    = "Welcome Back 👋";
        subtitle.innerText = "Login to continue booking services";
        form.innerHTML = `
            <input type="email"    placeholder="Email Address" required>
            <input type="password" placeholder="Password"      required>
            <button class="auth-btn">Login</button>
        `;
        toggleBtn.innerText = "Sign Up";
    }
});

// ===== DARK MODE =====
const darkToggle = document.getElementById("darkToggle");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    darkToggle.checked = true;
} else {
    document.body.classList.remove("light-mode");
    darkToggle.checked = false;
}

darkToggle.addEventListener("change", () => {
    if (darkToggle.checked) {
        document.body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    }
});
