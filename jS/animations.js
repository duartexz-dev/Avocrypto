/* =========================================
   AV0CRYPTO
   VISUAL / ANIMATIONS
========================================= */


/* =========================================
   REVEAL AO ENTRAR NA TELA
========================================= */

const revealElements = document.querySelectorAll(".reveal");


const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element, index) => {

    element.style.animationDelay = `${index * 80}ms`;

    revealObserver.observe(element);

});


/* =========================================
   EFEITO PARALLAX DO MOUSE
========================================= */

const glowOne = document.querySelector(".glow-1");
const glowTwo = document.querySelector(".glow-2");


document.addEventListener("mousemove", (event) => {

    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;


    if (glowOne) {

        glowOne.style.transform =
            `translate(${x * 35}px, ${y * 35}px)`;

    }


    if (glowTwo) {

        glowTwo.style.transform =
            `translate(${x * -25}px, ${y * -25}px)`;

    }

});


/* =========================================
   HOVER 3D DOS CARDS
========================================= */

const cards = document.querySelectorAll(".crypto-card");


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        const centerX = rect.width / 2;
        const centerY = rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -3;


        const rotateY =
            ((x - centerX) / centerX) * 3;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-7px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) translateY(0)";

    });

});


/* =========================================
   BOTÃO DE FAVORITO
========================================= */

const stars = document.querySelectorAll(".star-button");


stars.forEach((button) => {

    button.addEventListener("click", () => {

        const icon = button.querySelector("i");

        icon.classList.toggle("bi-star");

        icon.classList.toggle("bi-star-fill");


        if (icon.classList.contains("bi-star-fill")) {

            button.style.color = "#8ddd32";

            button.animate(
                [
                    {
                        transform: "scale(1)"
                    },

                    {
                        transform: "scale(1.4)"
                    },

                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 350
                }
            );

        } else {

            button.style.color = "";

        }

    });

});


/* =========================================
   BOTÃO ATUALIZAR
========================================= */

const refreshButton =
    document.querySelector(".refresh-button");


if (refreshButton) {

    refreshButton.addEventListener("click", () => {

        const icon =
            refreshButton.querySelector("i");


        icon.animate(
            [
                {
                    transform: "rotate(0deg)"
                },

                {
                    transform: "rotate(360deg)"
                }
            ],
            {
                duration: 650
            }
        );

    });

}


/* =========================================
   SELETOR DE PERÍODO
========================================= */

const periodButtons =
    document.querySelectorAll(".period-selector button");


periodButtons.forEach((button) => {

    button.addEventListener("click", () => {

        periodButtons.forEach((item) => {

            item.classList.remove("selected");

        });


        button.classList.add("selected");

    });

});


/* =========================================
   ATALHO "/" PARA BUSCA
========================================= */

const searchInput =
    document.querySelector("#cryptoSearch");


document.addEventListener("keydown", (event) => {

    if (
        event.key === "/" &&
        document.activeElement !== searchInput
    ) {

        event.preventDefault();

        searchInput.focus();

    }


    if (event.key === "Escape") {

        searchInput.blur();

    }

});


/* =========================================
   EFEITO DE DIGITAÇÃO NA BUSCA
========================================= */

if (searchInput) {

    searchInput.addEventListener("focus", () => {

        searchInput.parentElement.animate(
            [
                {
                    transform: "scale(1)"
                },

                {
                    transform: "scale(1.01)"
                },

                {
                    transform: "scale(1)"
                }
            ],
            {
                duration: 350
            }
        );

    });

}


/* =========================================
   PULSO DO STATUS DO MERCADO
========================================= */

const statusDot =
    document.querySelector(".status-dot");


if (statusDot) {

    setInterval(() => {

        statusDot.animate(
            [
                {
                    opacity: 1,
                    transform: "scale(1)"
                },

                {
                    opacity: .45,
                    transform: "scale(1.5)"
                },

                {
                    opacity: 1,
                    transform: "scale(1)"
                }
            ],
            {
                duration: 1500
            }
        );

    }, 2000);

}