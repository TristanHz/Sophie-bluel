const API = "http://localhost:5678/api/"

async function getworks() {
    const reponse = await fetch(API + "works");
    const works = await reponse.json();

    const galleryDiv = document.getElementById("gallery");
    const modaleDiv = document.getElementById("imgModaleEdit")
    
    works.forEach(work => {
        
        const imgModale = document.createElement("img");
        const imgGallery = document.createElement("img");
        const titleGallery = document.createElement("h3");
        const figureModale = document.createElement("figure")
        const btnSuppression = document.createElement("button")

        imgGallery.src = work.imageUrl;
        titleGallery.textContent = work.title;

        imgModale.src = work.imageUrl;
        btnSuppression.className = "fa-solid fa-trash-can img-modale"
        btnSuppression.setAttribute("id", "btnSuprr")
        btnSuppression.setAttribute("type", "button")


        const figure = document.createElement("figure")
        figure.dataset.categoryId = work.categoryId;
        imgModale.dataset.categoryId = work.categoryId;

        figure.appendChild(imgGallery);
        figure.appendChild(titleGallery);

        galleryDiv.appendChild(figure)
        figureModale.appendChild(imgModale)
        figureModale.appendChild(btnSuppression)
        modaleDiv.appendChild(figureModale)


})};

getworks();


async function getCat(event) {
    const reponse =await fetch(API + "categories");
    const categories =await reponse.json();
    categories.unshift({"id":0, "name":"Tous"});

    const boutonFiltrer = document.getElementById("filtres")

    categories.forEach(categorie => {

        const boutons = document.createElement("button");

        boutons.innerText = categorie.name;
        boutons.id = categorie.id;
        boutons.className = "boutonfiltre";
        boutonFiltrer.appendChild(boutons);

        const works = document.querySelectorAll("figure")

        boutons.addEventListener("click", (event) => {
            const id = event.target.id;
            works.forEach(work => {
                                
                if (id === "0") {
                    work.style.display = "";
                } else if (id === work.dataset.categoryId) {
                    work.style.display = "";
                } else {
                    work.style.display = "none"
                
                }})

        

    })      
    })}

getCat();

function logOn() {
    let token = window.localStorage.getItem("token");

    const loginNav = document.getElementById("login");
    const logoutNav = document.getElementById("logout");
    const filtres = document.getElementById("filtres");
    const body = document.querySelector("body");
    const titreProjet = document.querySelector("#portfolio h2");
    const edit = document.getElementById("edit")

    const boutonModif = document.createElement("a");
    const iconeModif = document.createElement("i");

    if (token !== null) {
        edit.style.display = "flex";
        loginNav.style.display = "none";
        logoutNav.style.display = "block";
        filtres.style.display = "none";
        titreProjet.style.marginBottom = "100px";
        iconeModif.className = "fa-solid fa-pen-to-square icone-modif";
        boutonModif.innerText = "modifier";
        boutonModif.className = "bouton-modif";
        boutonModif.setAttribute("href", "#modale")
        titreProjet.appendChild(iconeModif);
        iconeModif.appendChild(boutonModif);
        body.style.marginTop = "90px";

    } else {
        loginNav.style.display = "block";
        logoutNav.style.display = "none"
    }
}

logOn();

const boutonLogOff = document.getElementById("logout")
boutonLogOff.addEventListener('click', function logOut() {
    const token = window.localStorage.getItem("token")
    console.log(token)
        window.localStorage.removeItem("token");
        location.reload();
    })

let modale = null;

const ouvrirModale = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modale = target;
    modale.addEventListener('click', fermerModale);
    modale.querySelector("#fermerModale").addEventListener('click', fermerModale);
    modale.querySelector(".modale-stop").addEventListener('click', stopPropagation);

    const btnSupr = document.querySelectorAll("button.img-modale")
        
    btnSupr.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const btnClic = e.currentTarget;
            console.log(btnClic)

            const parent = btnClic.closest("figure")
            console.log(parent)
        })
    })

}

const fermerModale = function (e) {
    if (modale === null) return;
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-modal");
    modale.removeEventListener('click', fermerModale);
    modale.querySelector("#fermerModale").removeEventListener('click', fermerModale);
    modale.querySelector(".modale-stop").removeEventListener('click', stopPropagation);
    modale = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll(".bouton-modif").forEach(a => {
    a.addEventListener('click', ouvrirModale)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        fermerModale(e);
    }
})




