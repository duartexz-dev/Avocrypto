const themeToggle = document.getElementById("themeToggle");
const rootElement = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');

function updateThemeButton(theme) {
    const isLight = theme === "light";
    const icon = themeToggle.querySelector("i");
    const label = themeToggle.querySelector("span");

    icon.className = `bi ${isLight ? "bi-moon-stars" : "bi-sun"}`;
    label.textContent = `Tema ${isLight ? "escuro" : "claro"}`;
    themeToggle.setAttribute("aria-label", `Ativar tema ${isLight ? "escuro" : "claro"}`);
    themeToggle.setAttribute("aria-pressed", String(isLight));

    if (themeColor) {
        themeColor.content = isLight ? "#f4f6f0" : "#101410";
    }
}

updateThemeButton(rootElement.dataset.theme);

themeToggle.addEventListener("click", () => {
    const nextTheme = rootElement.dataset.theme === "light" ? "dark" : "light";
    rootElement.dataset.theme = nextTheme;
    updateThemeButton(nextTheme);

    try {
        localStorage.setItem("avocrypto-theme", nextTheme);
    } catch (error) {
        console.warn("A preferência de tema não pôde ser salva.", error);
    }
});
