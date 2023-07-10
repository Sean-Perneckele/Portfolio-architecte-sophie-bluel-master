
async function donner() {

    const reponse = await fetch ("http://localhost:5678/api/works")
const tableau = await reponse.json();

console.log(tableau);
}

donner ();