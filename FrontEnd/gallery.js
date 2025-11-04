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