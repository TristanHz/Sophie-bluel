const API = "http://localhost:5678/api/"

document.getElementById("logButton").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const log = {
        email: email,
        password: password
    };
    const idLog = JSON.stringify(log);

    const reponse = await fetch(API+"login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: idLog
            });
            
    if (reponse.ok) {
        console.log("connexion ok");
        console.log("token :", data.token);
    } else {
        console.log("nope")
    }
});

    
