import axios from 'axios'
import env from "react-dotenv";

const ajouterActivite = async (operation, detail) => {
    var current=new Date();

    const result = await axios.post(env.API_URL + "ajouterActivite", {
        operation: operation,
        id_utilisateur:localStorage.getItem('userID'),
        date: current.toLocaleString(),
        detail: detail 
    })

    return result;
}

const afficherRecu = async () => {
    const userId = localStorage.getItem("userID");
    const commerce = localStorage.getItem("commerce");

    const result = await axios.get(env.API_URL + "afficherRecu/" + commerce + "/" + userId)
    return result;
}

export {
    ajouterActivite,
    afficherRecu
}   