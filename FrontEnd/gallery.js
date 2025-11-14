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

