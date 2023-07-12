
// récupération des donner

// fonction permettant la laison avec l'API

async function donner() {

    const reponse = await fetch ("http://localhost:5678/api/works")
const tableau = await reponse.json();

console.log(tableau);

return tableau;

}
donner();

const index = 0

async function travaux() {

    //récupération des donner

    const tableau= await donner();

    for(let slide of tableau){
  
    const image = slide.imageUrl;
    const title = slide.title;

    console.log(image, title);

    // création des ellemnt du DOM et de leur contenu

    const gallery = document.querySelector(".gallery");
    const contenant= document.createElement("figure"); 

    const img = document.createElement("img");
    img.src= image;
    img.alt = title;

    const texte = document.createElement("figcaption");
    texte.innerText= title;

    // Mise en place des éllément crée dans le DOM 

    contenant.appendChild(img);
    contenant.appendChild(texte);
    gallery.appendChild(contenant); 
}
 
}
travaux()

// mise en place du filtrage

