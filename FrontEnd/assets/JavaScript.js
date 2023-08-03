
// Récupération des données

// Fonction permettant la liaison avec l'API

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

// Récupération des données

async function récupération() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  const categories = await reponse.json();
  return categories;
}

// Création des boutons

function Bouton(category) {
  const boutonContainer = document.querySelector("#portfolio .bouton");

  const button = document.createElement("button");
  button.setAttribute("data-category", category.id);
  button.textContent = category.name;
  boutonContainer.appendChild(button);
}

// Construction du bouton "Tous"

function boutonTous() {
  const boutonContainer = document.querySelector("#portfolio .bouton");

  const button = document.createElement("button");
  button.setAttribute("data-category", "0");
  button.textContent = "Tous";
  boutonContainer.insertBefore(button, boutonContainer.firstChild);
  button.classList.add('button--selected');
}

// Construction des boutons 

let Id

async function construireBoutons() {
  const categories = await récupération();

  categories.forEach((category) => {
    Bouton(category);
  });
  boutonTous();

  const buttons = document.querySelectorAll("#portfolio button ");
  console.log(buttons);

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      Id = button.dataset.category;
      console.log(Id);
      filtre(Id);

      // class bouton actif
      buttons.forEach((btn, idx) => {
        if (idx === index) {
          btn.classList.add('button--selected');
        } else {
          btn.classList.remove('button--selected');
        }
      });
    })
  })
}

construireBoutons();

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

// création de la fonction construction 

function construction(data) {

  const gallery = document.querySelector(".gallery")
  gallery.innerHTML = " "

  for (let slide of data) {

    const image = slide.imageUrl;
    const title = slide.title;

    console.log(image, title);

    // Création des éléments du DOM et de leur contenu

    const gallery = document.querySelector(".gallery");
    const contenant = document.createElement("figure");

    const img = document.createElement("img");
    img.src = image;
    img.alt = title;

    const texte = document.createElement("figcaption");
    texte.innerText = title;

    // Mise en place des éléments crée dans le DOM 

    contenant.appendChild(img);
    contenant.appendChild(texte);
    gallery.appendChild(contenant);
  }
}

travaux()

// on va géré le connextion

const login = document.querySelector(".login");



login.addEventListener("click", (event) => {

  localStorage.removeItem("token");


})


//  ùùùùùùùùùùùùùùùùùù

const modification = document.querySelectorAll(".token")

if (localStorage.getItem("token")) {
  modification.forEach((element) => {
    element.classList.remove("token-none");
  });
  login.innerText = "logout"


} else {
  modification.forEach((element) => {
    element.classList.add("token-none");
  });
  login.innerText = "login"

}


//gestion popup

async function popup() {
  let dialog = document.getElementById('dialog');
  document.getElementById('show').onclick = function () {
    dialog.style.display = "flex"; // Afficher la popup
    teste() ;
  };
  document.getElementById('hide').onclick = function () {
    effacement()
    dialog.style.display = "none"; // Masquer la popup
  };

  // Fermer la popup lorsque l'utilisateur clique en dehors du contenu de la popup
  dialog.onclick = function (event) {
    // Si l'élément cliqué est la popup elle-même (background transparent),
    // on ferme la popup
    if (event.target === dialog) {
      effacement()
      dialog.style.display = "none";
    }
  };
} popup();

function effacement() {
  const truc = document.querySelector(".dialogContent")

  truc.innerHTML=" "
}

async function teste() {

  

  const dialog = document.querySelector(".dialog")
  

  const data = await donnée();

  for (let slide of data) {

    const image = slide.imageUrl;

    console.log(image,);

    // Création des éléments du DOM et de leur contenu

    const dialogContent = document.querySelector(".dialogContent");
    const contenant = document.createElement("figure");

    const img = document.createElement("img");
    img.src = image;
    
    const bonton = document.createElement("button");
    bonton.innerHTML=`<i class="fa-solid fa-trash-can"></i>`
    const texte = document.createElement("figcaption");
    texte.innerText = "éditer";

    // Mise en place des éléments crée dans le DOM 

    contenant.appendChild(bonton);
    contenant.appendChild(img);
    contenant.appendChild(texte);
    dialogContent.appendChild(contenant);

    
  }
}

