const API = "http://localhost:5678/api/"

document.getElementById("box-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const log = {
        email,
        password
    };

    const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(log)
        });

        const data = await reponse.json();

        if (reponse.ok) {
            console.log("Connexion réussie !");
            console.log("Token :", data.token);
            window.localStorage.setItem("token", data.token);
            window.location.href = "index.html";
            return;
        }

        if (!reponse.ok) {
            afficherErreur(data.message || "E-mail ou mot de passe incorrect");
            return;
        }
});

function afficherErreur(message) {    
    const ErrMessage = document.getElementById("error-message");
        ErrMessage.textContent = "";
        ErrMessage.textContent = message;
        ErrMessage.style.color = "red"
}





    
