/* =========================================
   AVOCRYPTO — VISUAL / ANIMATIONS
========================================= */

/* ---- reveal on scroll ---- */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 60}ms`;
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => element.classList.add("visible"));
}

/* ---- persisted color theme ---- */

const themeButton = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("avocrypto-theme");
const initialTheme = savedTheme === "light" ? "light" : "dark";

function setTheme(theme) {
    const isLight = theme === "light";
    document.documentElement.dataset.theme = theme;

    if (themeButton) {
        themeButton.setAttribute("aria-pressed", String(isLight));
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Ativar tema escuro" : "Ativar tema claro"
        );
        themeButton.innerHTML = `
            <i class="bi ${isLight ? "bi-moon-stars" : "bi-sun"}" aria-hidden="true"></i>
            <span>Tema ${isLight ? "escuro" : "claro"}</span>
        `;
    }
}

setTheme(initialTheme);

themeButton?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("avocrypto-theme", nextTheme);
    setTheme(nextTheme);
});

/* ---- favorite toggle ---- */

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest(".star-button");
    if (!button) return;

    const icon = button.querySelector("i");
    if (!icon) return;

    const isFavorite = icon.classList.toggle("bi-star-fill");
    icon.classList.toggle("bi-star", !isFavorite);
    button.style.color = isFavorite ? "var(--accent)" : "";
    button.setAttribute("aria-pressed", String(isFavorite));
    button.setAttribute(
        "aria-label",
        button.getAttribute("aria-label").replace(
            isFavorite ? "Adicionar" : "Remover",
            isFavorite ? "Remover" : "Adicionar"
        )
    );

    if (isFavorite && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        button.animate(
            [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
            { duration: 250 }
        );
    }
});

/* ---- refresh button ---- */

const refreshButton = document.querySelector(".refresh-button");

if (refreshButton) {
    refreshButton.addEventListener("click", () => {
        const icon = refreshButton.querySelector("i");
        if (!icon || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        icon.animate(
            [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
            { duration: 500 }
        );
    });
}

/* ---- period selector ---- */

const periodButtons = document.querySelectorAll(".period-selector button");

periodButtons.forEach((button) => {
    button.addEventListener("click", () => {
        periodButtons.forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
    });
});

/* ---- "/" focuses search ---- */

const searchInput = document.querySelector("#cryptoSearch");

document.addEventListener("keydown", (event) => {
    if (event.key === "/" && document.activeElement !== searchInput && searchInput) {
        event.preventDefault();
        searchInput.focus();
    }

    if (event.key === "Escape" && searchInput) {
        searchInput.blur();
    }
});
