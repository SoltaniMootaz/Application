import axios from 'axios'
import env from "react-dotenv";

const afficherVente = async () => {
    const result = await axios.get(env.API_URL + "afficherVente/" + localStorage.getItem("userID"))
    return result
}

const afficherActivite = async () => {
    const result = await axios.get(env.API_URL + "afficherActivite/" + localStorage.getItem("userID"))
    return result
}

export {
    afficherVente,
    afficherActivite
}