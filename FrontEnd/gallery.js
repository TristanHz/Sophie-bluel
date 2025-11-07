async function getworks() {
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    const galleryDiv=document.getElementById("gallery");
    
works.forEach(work => {
    
    const imgGallery=document.createElement("img");
    const titleGallery=document.createElement("h3");

    imgGallery.src = work.imageUrl;
    titleGallery.textContent = work.title;

    const figure = document.createElement("figure")

    figure.appendChild(imgGallery);
    figure.appendChild(titleGallery);

    galleryDiv.appendChild(figure)

})}

getworks();

async function getCat() {
    const reponse =await fetch("http://localhost:5678/api/categories");
    const categories =await reponse.json();
    categories.unshift({"id":0, "name":"Tous"});

    const boutonFiltrer = document.getElementById("filtres")

    categories.forEach(categorie => {

        const boutons = document.createElement("button");

        boutons.innerText = categorie.name;
        boutons.id = categorie.id;
        boutons.className = "boutonfiltre";
        boutonFiltrer.appendChild(boutons);

        const button = document.querySelector('button')
        const works = document.querySelectorAll("figure")
        const id = button.id
        const workId = works.id

        boutons.addEventListener("click", () => {

            works.forEach(work => {
                if (workId === 0) {
                    work.style.display = "";
                } else if (workId != id) {
                    work.style.display = "none";
                } else {
                    work.style.display = "";
                }})

        

    })      
    })}

getCat();


