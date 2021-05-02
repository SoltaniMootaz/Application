import axios from 'axios'
import env from "react-dotenv";

const loadUserStock = async () => {
    const result = await axios.get(env.API_URL + "afficherStock/" + localStorage.getItem("userID"));     
    return result;
}

const ajouterProduit = async (libelle, codeBarre, prix_achat, prix_vente, categorie) => {
    const result = await axios.post(env.API_URL + "ajouterProduit/" + localStorage.getItem("userID"), {
        libelle: libelle,
        codeBarre : codeBarre, 
        prix_achat : prix_achat, 
        prix_vente : prix_vente,
        categorie : categorie
    });
    
    return result;
}

const loadAllStock = async () => {
    const result = await axios.get(env.API_URL + "allStock");
    return result;
}

const recommend = async () => {
    try {
        const result = await axios.get(env.API_URL + "recommend/" + localStorage.getItem("userID"));
        return result.data;
    }catch(err){
        return err.response.data
    }
}

export {
    loadUserStock,
    ajouterProduit,
    loadAllStock,
    recommend
}