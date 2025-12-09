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
};


const stopPropagation = function (e) {
    e.stopPropagation()
};

document.querySelectorAll(".bouton-modif").forEach(a => {
    a.addEventListener('click', ouvrirModale)
});

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        fermerModale(e);
    }
});

const retour = document.getElementById("retour");

retour.addEventListener("click", () => {

    const modaleSupression = document.getElementById("imgModaleEdit");
    const modaleAjout = document.getElementById("imgModaleAjout");
    const btnAjout = document.getElementById("btnAjouter");
    const btnValider = document.getElementById("btnValider");
    const titre = document.querySelector(".edition-modale h3");

    retour.style.visibility = "hidden";
    btnAjout.style.display = "block";
    btnValider.style.display = "none";

    modaleSupression.style.display = "grid";
    modaleAjout.style.display = "none";

    titre.innerText = "Galerie photo";
});

async function refreshGallery() {
    const galleryDiv = document.getElementById("gallery");
    const modaleDiv = document.getElementById("imgModaleEdit");
    galleryDiv.innerHTML = "";
    modaleDiv.innerHTML = "";

    const reponse = await fetch(API + "works");
    const works = await reponse.json();

    works.forEach(work => {

        const figure = document.createElement("figure");
        const imgModale = document.createElement("img");
        const figureModale = document.createElement("figure");
        const btnSuppression = document.createElement("button");

        figure.dataset.categoryId = work.categoryId;
        figure.dataset.id = work.id;

        imgModale.src = work.imageUrl;
        btnSuppression.className = "fa-solid fa-trash-can img-modale";
        btnSuppression.setAttribute("id", "btnSuprr");
        btnSuppression.setAttribute("type", "button");
        imgModale.dataset.id = work.id;

        const imgGallery = document.createElement("img");
        imgGallery.src = work.imageUrl;
        const titleGallery = document.createElement("h3");
        titleGallery.textContent = work.title;

        figure.appendChild(imgGallery);
        figure.appendChild(titleGallery);
        figureModale.appendChild(imgModale);
        figureModale.appendChild(btnSuppression);
        modaleDiv.appendChild(figureModale);

        galleryDiv.appendChild(figure);


    });
}


const btnAjout = document.getElementById("btnAjouter");
btnAjout.addEventListener('click', (e) => {

    const modaleSupression = document.getElementById("imgModaleEdit");
    const modaleAjout = document.getElementById("imgModaleAjout");
    const btnValider = document.getElementById("btnValider");
    const titre = document.querySelector(".edition-modale h3");
    const retour = document.getElementById("retour");

    retour.style.visibility = "visible";
    btnAjout.style.display = "none";
    btnValider.style.display = "block";
    modaleSupression.style.display = "none";
    modaleAjout.style.display = "flex";
    titre.innerText = "";
    titre.innerText = "Ajout photo";

    const imgPreview = document.getElementById("previewImage");
    const imgIcone = document.getElementById("ajoutIcone");
    const btnAjoutPlus = document.getElementById("btnAjoutPlus");
    const format = document.getElementById("format");
    const dropzone = document.getElementById("dropzone");

    if (imgPreview) {
        imgPreview.remove();
        imgIcone.style.display = "block";
        btnAjoutPlus.style.display = "flex";
        format.style.display = "block";
        dropzone.style.padding = "20px";

    }

});

async function catAjout() {
    const reponse =await fetch(API + "categories");
    const categories =await reponse.json();

    const listeCat = document.getElementById("menuCat");

    categories.forEach(categorie => {
        if (categorie === 0) return;
        
            const nomCat = categorie.name;
            const idCat = categorie.id;

            const elementCat = document.createElement("option")
            elementCat.innerText = nomCat;
            elementCat.classList = "Categorie-liste";
            elementCat.value = idCat;

            listeCat.appendChild(elementCat)

    })};

catAjout();

function previewImage(e) {
    const input = e.target;
    const image = document.getElementById("previewImage");

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
    console.log(input.files);
};

document.getElementById("fileInput").addEventListener('change', function(e) {

    const dropzone = document.getElementById("dropzone");
    const imgIcone = document.getElementById("ajoutIcone");
    const btnAjout = document.getElementById("btnAjoutPlus");
    const format = document.getElementById("format");

    imgIcone.style.display = "none";
    btnAjout.style.display = "none";
    format.style.display = "none";
    const imgPreview = document.createElement("img");

    imgPreview.setAttribute("id", "previewImage");
    imgPreview.setAttribute("alt", "image Preview");
    imgPreview.classList.add("image-preview");
    dropzone.style.padding = "0";

    dropzone.appendChild(imgPreview);


    previewImage(e);
});

const formAjout = document.getElementById("editionModale");

formAjout.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formAjout);
    const token = localStorage.getItem("token");
    const img = inputImg.files.length;
    const titre = inputTitre.value;
    const select = inputCat.value;
    console.log(token);

    if (img === 0 || titre === "" || select === "") 
        {
            console.log("if correct")
            afficherMessageErreur();

        } else {
        try {
            const reponse = await fetch(API + "works", {
                method: "POST",
                headers: {
                            Authorization: `Bearer ${token}`
                        },
                body: formData
                });
            
            const data = await reponse.json();

            if (reponse.ok) {

                afficherMessageValide();
                };

            formAjout.reset();
            refreshGallery();
            const preview = document.getElementById("previewImage");
            const iconeDropzone = document.getElementById("ajoutIcone");
            const btnAjoutPlus = document.getElementById("btnAjoutPlus");
            const format = document.getElementById("format");

            preview.src = "";
            preview.style.display = "none";
            iconeDropzone.style.display = "flex";
            iconeDropzone.style.marginTop = "30px";
            btnAjoutPlus.style.display = "flex";
            format.style.display = "flex";
            format.style.marginBottom = "30px";


            } catch (error) {
                console.error("Erreur :", error);
            }
        }
    });

    const formBtnAjout = document.getElementById("btnValider")
    const inputImg = document.getElementById("fileInput");
    const inputTitre = document.getElementById("titrePhoto");
    const inputCat = document.getElementById("menuCat");

    function checkForm() {
            const img = inputImg.files.length > 0;
            const titre = inputTitre.value !== "";
            const select = inputCat.value !== "";

            if (img && titre && select) {
                formBtnAjout.style.backgroundColor = "#1D6154"
            }
    }

    inputImg.addEventListener("change", checkForm);
    inputTitre.addEventListener("input", checkForm);
    inputCat.addEventListener("change", checkForm);

    function afficherMessageErreur() {

        const messageZone = document.getElementById("contenuModale");
        const messageErreur = document.createElement("p");
        messageErreur.id = "messageErreur";
        messageErreur.innerText = "Veuillez compléter tous les champs";
        messageErreur.style.color = "red";
        messageErreur.style.display ="flex";
        messageErreur.style.justifyContent = "center";
        messageErreur.style.marginTop = "20px";
        messageZone.appendChild(messageErreur);

        setTimeout(() => {
            messageErreur.style.display = "none";
        }, 2000);
    }

    function afficherMessageValide() {

        const messageZone = document.getElementById("contenuModale");
        const messageValide = document.createElement("p");
        messageValide.innerText = "Photo ajoutée";
        messageValide.style.color = "green";
        messageValide.style.display ="flex";
        messageValide.style.justifyContent = "center";
        messageValide.style.marginTop = "20px";
        messageZone.appendChild(messageValide);

        setTimeout(() => {
            messageValide.style.display = "none";
        }, 4000);
    }