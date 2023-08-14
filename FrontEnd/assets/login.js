//  page login récupération des formulaires.

let formulaire = document.querySelector(".login");

formulaire.addEventListener("submit", (event) => {
    event.preventDefault();

    // Récupération des données

    let email = formulaire.querySelector("#email").value;
    let password = formulaire.querySelector("#password").value;

    console.log(email, password);

    // validation du mail


    let regex = new RegExp("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+");

    if (regex.test(email) && password.trim() !== "  ") {
        console.log("le mail et mots de passe son bon")
    } else {
        console.log("il y a une erreur dans le mail ou mot de passe. ")
    }

    // envoit des donnés
    const json = {
        email: email,
        password: password
    };

    //création charge utile 
    const chargeUtile = JSON.stringify(json)

    //Appelle de la fonction fetch
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (data.token) {
                // stocke le token dans une variable
                const token = data.token;
                const userId= data.userId
                // stocker le token dans le local storage
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId)
                console.log("Authentification réussie !");

                window.location.href = 'index.html';
            } else {
                window.alert("Il y a une erreur dans le mot de passe ou l'adresse émail. ");
            }
        });
})