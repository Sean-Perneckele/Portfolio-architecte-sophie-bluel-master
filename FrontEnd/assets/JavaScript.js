
// récupération des donnée

// fonction permettant la laison avec l'API

async function donnée() {

    const reponse = await fetch("http://localhost:5678/api/works")
    const tableau = await reponse.json();

    console.log(tableau);

    return tableau;

}


let tableau


async function travaux() {

    //récupération des données

    tableau = await donnée()

    construction(tableau)

}

// mise en place du filtrage

// activation des bouton et récupéréation de leur "data-catégory"

const buttons = document.querySelectorAll("#portfolio button ");
console.log(buttons);

let Id


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        Id = button.dataset.category;
        console.log(Id);
        filtre(Id);
    })
})

//  misse en place du filtre 

async function filtre(Id) {

    const data = await donnée();

    let filtre

    if (Id === "0") {
        filtre = data;
    } else {
        filtre = data.filter((slide) => slide.categoryId == Id)
    }

    console.log(filtre)

    construction(filtre)

}

// création de la fonction construcion 

function construction(data) {

    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = " "

    for (let slide of data) {

        const image = slide.imageUrl;
        const title = slide.title;

        console.log(image, title);

        // création des ellemnt du DOM et de leur contenu

        const gallery = document.querySelector(".gallery");
        const contenant = document.createElement("figure");

        const img = document.createElement("img");
        img.src = image;
        img.alt = title;

        const texte = document.createElement("figcaption");
        texte.innerText = title;

        // Mise en place des éllément crée dans le DOM 

        contenant.appendChild(img);
        contenant.appendChild(texte);
        gallery.appendChild(contenant);
    }
}


travaux()