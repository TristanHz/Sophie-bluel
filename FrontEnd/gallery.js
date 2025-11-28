const API = "http://localhost:5678/api/"

async function getworks() {
    const reponse = await fetch(API + "works");
    const works = await reponse.json();

    const galleryDiv = document.getElementById("gallery");
    const modaleDiv = document.getElementById("imgModaleEdit")
    galleryDiv.innerHTML=""
    
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
        figure.dataset.id = work.id;
        imgModale.dataset.id = work.id;

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
                
                }});

    
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
let modaleAjout = null;

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
        btn.addEventListener('click', async (e) => {
            const btnClic = e.currentTarget;
            console.log(btnClic)

            const token = localStorage.getItem("token");
            const parent = btnClic.closest("figure");
            const imgParent = parent.querySelector("img");
            const imgParentId = imgParent.dataset.id;
            console.log(imgParentId);

            try {
                const response = await fetch(`http://localhost:5678/api/works/${imgParentId}`, {
                    method: "DELETE",
                    headers: {
                                "Authorization": `Bearer ${token}`                                
                    }
                });

                if (!response.ok) {
                    throw new Error("Echec de la suppression sur l'API");
                }

                console.log("Suppr sur l'API");

                parent.remove();

                refreshGallery();

            } catch (error) {
            alert("Un problème est survenu lors de la suppression");
            }
        
    });

})};

const fermerModale = function (e) {
    if (modale === null) return;
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-modal");
    modale.removeEventListener('click', fermerModale);
    modale.querySelector("#fermerModale").removeEventListener('click', fermerModale);
    modale.querySelector(".modale-stop").removeEventListener('click', stopPropagation);
    modale = null;
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

async function refreshGallery() {
    const galleryDiv = document.getElementById("gallery");
    galleryDiv.innerHTML = "";

    const reponse = await fetch(API + "works");
    const works = await reponse.json();

    works.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.categoryId = work.categoryId;
        figure.dataset.id = work.id;

        const imgGallery = document.createElement("img");
        imgGallery.src = work.imageUrl;
        const titleGallery = document.createElement("h3");
        titleGallery.textContent = work.title;

        figure.appendChild(imgGallery);
        figure.appendChild(titleGallery);

        galleryDiv.appendChild(figure);
    });
}


const btnAjout = document.getElementById("btnAjouter");
btnAjout.addEventListener('click', (e) => {

    const modaleSupression = document.getElementById("imgModaleEdit");
    const modaleAjout = document.getElementById("imgModaleAjout");
    const btnValider = document.getElementById("btnValider")
    const titre = document.querySelector(".edition-modale h3");
    const retour = document.getElementById("retour")
        retour.style.visibility = "visible"
        btnAjout.style.display = "none"
        btnValider.style.display = "block"
        modaleSupression.style.display = "none";
        modaleAjout.style.display = "flex";
        titre.innerText = ""
        titre.innerText = "Ajout photo"

});

async function catAjout() {
    const reponse =await fetch(API + "categories");
    const categories =await reponse.json();

    const listeCat = document.getElementById("menuCat");

    categories.forEach(categorie => {
        if (categorie === 0) return;
        
            const nomCat = categorie.name;
            const idCat = categorie.id;

            const elementCat = document.createElement("li")
            elementCat.innerText = nomCat;
            elementCat.classList = "Categorie-liste";
            elementCat.id = idCat;

            listeCat.appendChild(elementCat)

    })};

catAjout();

