(() => {
    const form = document.getElementById("form-login");
    const username = document.getElementById("demo-user");
    const password = document.getElementById("demo-password");
    const feedback = document.getElementById("login-feedback");
    const submit = form?.querySelector('button[type="submit"]');

    if (!form || !username || !password || !feedback || !submit) return;

    const demoUser = "banana";
    const demoPassword = "123";
    let redirectTimer;

    const clearFeedback = () => {
        feedback.textContent = "";
        feedback.removeAttribute("data-state");
        username.removeAttribute("aria-invalid");
        password.removeAttribute("aria-invalid");
    };

    form.addEventListener("input", clearFeedback);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (submit.disabled) return;

        const valid = username.value === demoUser && password.value === demoPassword;
        if (!valid) {
            feedback.textContent = "Dados incorretos. Use as credenciais fictícias exibidas acima.";
            username.setAttribute("aria-invalid", String(username.value !== demoUser));
            password.setAttribute("aria-invalid", String(password.value !== demoPassword));
            (username.value !== demoUser ? username : password).focus();
            return;
        }

        feedback.textContent = "Acesso de demonstração confirmado. Abrindo o painel…";
        feedback.dataset.state = "success";
        submit.disabled = true;
        submit.classList.add("is-loading");
        submit.querySelector(".button-label").textContent = "Abrindo painel";
        submit.setAttribute("aria-busy", "true");

        redirectTimer = window.setTimeout(() => {
            window.location.assign("./pages/dashboard.html");
        }, 550);
    });

    window.addEventListener("pagehide", () => {
        if (redirectTimer) window.clearTimeout(redirectTimer);
    }, { once: true });
})();
