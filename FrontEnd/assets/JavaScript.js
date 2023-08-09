
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
  //Récupération des données
  tableau = await donnée()
  construction(tableau)
}
travaux()

// Mise en place du filtrage
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

// on va géré le connextion

const login = document.querySelector(".login");

login.addEventListener("click", (event) => {
  localStorage.removeItem("token");
})

//  l'aparition des token a la connexion et gestion de l'aparition des bouton filtre

const modification = document.querySelectorAll(".token")
const boutonContainer = document.querySelector("#portfolio .bouton");

if (localStorage.getItem("token")) {
  modification.forEach((element) => {
    element.classList.remove("token-none");
  });
  login.innerText = "logout"
  boutonContainer.style.display = 'none';

} else {
  modification.forEach((element) => {
    element.classList.add("token-none");
  });
  login.innerText = "login"
  boutonContainer.style.display = 'flex';
}

//gestion popup

async function popup() {
  let dialog = document.getElementById('dialog');
  document.getElementById('show').onclick = function () {
    dialog.style.display = "flex"; // Afficher la popup 1
    teste();
  };
  document.getElementById('hide').onclick = function () {
    effacement();
    dialog.style.display = "none"; // Masquer la popup 1
  };
  fermeturePopup(dialog)
} popup();

// ouvre la seconde pop up en fermant la première.

function popup2() {
  let dialog = document.getElementById('dialog2');
  document.getElementById('show2').onclick = function () {

    dialog.style.display = "flex"; // Afficher la popup 2
    effacement();

    let dialog2 = document.getElementById('dialog');
    dialog2.style.display = "none"; // Masque la popup 1

  };
  document.getElementById('hide2').onclick = function () {
    dialog.style.display = "none"; // Masque la popup 2
  };

  // bouton perméttant de retourner a la popup 1

  document.getElementById('return').onclick = function () {
    dialog.style.display = "none"; // Masque la popup 2

    // fait apparaitre la popup 1
    let dialog2 = document.getElementById('dialog');
    dialog2.style.display = "flex"; // Afficher la popup
    teste();
  }
  fermeturePopup(dialog)
} popup2();

// Fermer la popup lorsque l'utilisateur clique en dehors du contenu de la popup

function fermeturePopup(dialog) {
  dialog.onclick = function (event) {
    // Si l'élément cliqué est la popup elle-même (background transparent),
    // on ferme la popup
    if (event.target === dialog) {
      effacement()
      dialog.style.display = "none";
    }
  };
}

// On gère les évènement dans la popup 1
// on efface les photo de la popup 1

function effacement() {
  const effacement = document.querySelector(".dialogContent")
  effacement.innerHTML = " "
}

// on contruis les images de la popup 1

async function teste() {

  const dialog = document.querySelector(".dialog")
  const data = await donnée();

  for (let slide of data) {

    const image = slide.imageUrl;
    const id = slide.id;

    // Console.log(image, id); Console pour vérification. 
    // Création des éléments du DOM et de leur contenu

    const dialogContent = document.querySelector(".dialogContent");
    const contenant = document.createElement("figure");

    const img = document.createElement("img");
    img.src = image;

    const bouton = document.createElement("button");
    bouton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    bouton.setAttribute("data-id", slide.id);
    const texte = document.createElement("figcaption");
    texte.innerText = "éditer";

    // Mise en place des éléments crée dans le DOM 

    contenant.appendChild(bouton);
    contenant.appendChild(img);
    contenant.appendChild(texte);
    dialogContent.appendChild(contenant);
  }
  let clickableButtons = document.querySelectorAll('.dialogContent figure button')
  console.log("Nombre de boutons sélectionnés :", clickableButtons.length)

  // Ajouter un gestionnaire d'événements à chaque bouton de suppression
  clickableButtons.forEach(button => {
    console.log("Gestionnaire d'événements attaché à un bouton");
    button.addEventListener("click", () => {
      // Récupérer l'ID de l'image à partir de l'attribut "data-id"
      let imageId = button.dataset.id;
      console.log(imageId);
      deleteImage(imageId);
      effacement();
      teste()
    });
  });
}

// on gère l'effacement des Photos de la popup 1
// Récupérer tous les boutons de suppression
// Fonction de suppression

function deleteImage(id) {
  // Appel de la fonction fetch pour supprimer l'image
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (response.ok) {
        // Image supprimée avec succès, vous pouvez mettre à jour votre interface ici si nécessaire
        console.log("Image supprimée avec succès !");
      } else {
        // Gérer les erreurs de suppression
        console.log("Erreur lors de la suppression de l'image.");
      }
    })
    .catch(error => {
      console.error("Une erreur s'est produite :", error);
    });
}
// on gère l'affichage de la photo dans la popup 2

const inputPhoto = document.getElementById('photo');
const imagePreview = document.getElementById('imagePreview');
const sélection = document.querySelector('.selection--image')

inputPhoto.addEventListener('change', (event) => {
  const selectedFile = event.target.files[0];
  let imageURL //image URL récupère l'élément a renvoyer dans le formulaire

  if (selectedFile) {
    // récupère l'URL et fait aparaitre l'image

    imageURL = URL.createObjectURL(selectedFile);
    imagePreview.src = imageURL;
    imagePreview.style.display = 'block';

    // fait disparaitre la sélection
    sélection.style.display = 'none';
  } else {
    //fait disparaitre l'élément img et révoque l'URL pour éviter les fuite de mémoire
    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    if (imageURL) {
      URL.revokeObjectURL(imageURL);
    }
    //    fait réaparaite la sélection
    sélection.style.display = 'block';
  }
})

// gestion des formulaire 

const token = localStorage.getItem('token'); // Récupérez le token depuis le local storage
const formulaire = document.querySelector('.popup2');
//const inputPhoto a été déclarer trouve plustôt pour la gestion de l'image dans la popup 2 
const titleElement = document.getElementById('title');
const categoriesElement = document.getElementById('category');

formulaire.addEventListener("click", (event) => {

  // on récupère les donner de l'image a envoyer 
  const selectedFile = inputPhoto.files[0];
  let title = titleElement.value

  let categories = categoriesElement.value;
  let category = parseInt(categories)

  // Console.log(selectedFile, title, category); console pour vérification 

  // Envoi des donner 

  const formData = new FormData();
  formData.append('image', selectedFile);
  formData.append('title', title);
  formData.append('category', category);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  })
})

// Sélectionnez l'élément input pour lequel vous souhaitez ajouter l'événement


inputPhoto.addEventListener("change", () => {
  updateButtonStyle();
});
titleElement.addEventListener("input", () => {
  updateButtonStyle();
});
categoriesElement.addEventListener("change", () => {
  updateButtonStyle();
});

function updateButtonStyle() {
  const selectedFile = inputPhoto.files[0];
  const title = titleElement.value;
  const categories = categoriesElement.value;

  // le bouton popup2 a été récupéré plustôt dans la constant formulaire pour l'envois a l'API

  if (selectedFile && title && categories) {
    formulaire.style.backgroundColor = '#1D6154';
  } else {
    formulaire.style.backgroundColor = ' #a7a7a7';
  }
}