const API = "http://localhost:5678/api/"

async function getworks() {
    const reponse = await fetch(API + "works");
    const works = await reponse.json();

    const galleryDiv=document.getElementById("gallery");
    
    works.forEach(work => {
        
        const imgGallery=document.createElement("img");
        const titleGallery=document.createElement("h3");

        imgGallery.src = work.imageUrl;
        titleGallery.textContent = work.title;


        const figure = document.createElement("figure")
        figure.dataset.categoryId = work.categoryId;

        figure.appendChild(imgGallery);
        figure.appendChild(titleGallery);

        galleryDiv.appendChild(figure)

        return works;

})}

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
    const logoutNav = document.getElementById("logout")
    const filtres = document.getElementById("filtres")

    const titreProjet = document.querySelector("#portfolio h2")
    const boutonModif = document.createElement("a")
    const iconeModif = document.createElement("i")

    if (token !== null) {
        loginNav.style.display = "none"
        logoutNav.style.display = "block"
        filtres.style.display = "none"
        titreProjet.style.marginBottom = "100px"
        iconeModif.className = "fa-solid fa-pen-to-square icone-modif"
        boutonModif.innerText = "modifier"
        boutonModif.className = "bouton-modif"
        titreProjet.appendChild(iconeModif)
        iconeModif.appendChild(boutonModif)            

    } else {
        loginNav.style.display = "block"
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
    console.log(boutonLogOff)





