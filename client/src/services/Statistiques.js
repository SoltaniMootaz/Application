import axios from 'axios'
import env from "react-dotenv";

    const loadTop5= async () => {
        const result = await axios.get(env.API_URL + "Top5/" + localStorage.getItem("userID") );
    
        return result;
    }
    const loadFournisseur= async () => {
        const result = await axios.get(env.API_URL + "Fournisseur/" + localStorage.getItem("userID"));
    
        return result;
    }
    const loadNombreVente= async () => {
        const result = await axios.get(env.API_URL + "nombreVente/" + localStorage.getItem("userID") );
        
        return result;
    }
    const LoadNombreAchat= async () => {
        const result = await axios.get(env.API_URL + "nombreAchat/" + localStorage.getItem("userID") );
        
        return result;
    }
    const loadQteVente= async () => {
        const result = await axios.get(env.API_URL + "getVenteMouvement/" + localStorage.getItem("userID") );
        
        return result;
    }
    const loadQteAchat= async () => {
        const result = await axios.get(env.API_URL + "getAchatMouvement/" + localStorage.getItem("userID") );
        
        return result;
    }
    const loadProfitVente= async () => {
        const result = await axios.get(env.API_URL + "profitVente/" + localStorage.getItem("userID") );
        
        return result;
    }
    const loadSortieAchat= async () => {
        const result = await axios.get(env.API_URL + "sortieAchat/" + localStorage.getItem("userID") );
        
        return result;
    }


export{
    loadTop5,
    loadFournisseur,
    loadNombreVente,
    LoadNombreAchat,
    loadQteVente,
    loadQteAchat,
    loadProfitVente,
    loadSortieAchat
}