const senhaSalva = localStorage.getItem("senhaUser");
const emailSalvo = localStorage.getItem("emailUser");
if (senhaSalva && emailSalvo) {


    loading.style.display = "flex"

    setTimeout(() => {

        loading.style.display = "none"

        alertGood.style.display = "flex"

    }, 4000);

    setTimeout(() => {

        alertGood.style.display = "flex"

        setTimeout(() => {
            window.location.href = "./Home/home.html";
        }, 1000);
    }, 6000)
}


function criarConta() {

    let senha = document.getElementById("password").value

    let email = document.getElementById("email").value

    let alertBad = document.getElementById("alertBad")

    let alertGood = document.getElementById("alertGood")

    let aviso = document.getElementById("avisoRuim")

    let loading = document.getElementById("loading")

    if (!email || !senha) {

        aviso.innerHTML = `Preencha todas as informações por favor.`

        alertBad.style.display = "flex"

    } else if (senha.length < 8) {

        aviso.innerHTML = `A senha precisa ter mais de 8 caractéres.`

        alertBad.style.display = "flex"

        return;

    } else if (!email.endsWith("@gmail.com")) {

        aviso.innerHTML = `Coloque no final do email , @gmail.com.`

        alertBad.style.display = "flex"

        return;

    } else {

        loading.style.display = "flex"

        setTimeout(() => {

            loading.style.display = "none"

            alertGood.style.display = "flex"

        }, 4000);

        setTimeout(() => {

            alertGood.style.display = "flex"

            setTimeout(() => {
                window.location.href = "./Home/home.html";
            }, 1000);
        }, 6000)

        localStorage.setItem("senhaUser", senha)

        localStorage.setItem("emailUser", email)
    }


}