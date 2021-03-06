import axios from 'axios'
import env from "react-dotenv";

const ajouterClient = async (nomPre, tel) => {
    const result = await axios.post(env.API_URL + "ajouterClient",{
        nomPre: nomPre,
        tel: tel,
        id_utilisateur: localStorage.getItem('userID')
      })

    return result
}

const afficherClients = async () => {
    const result = await axios.get(env.API_URL + "afficherClients/" + localStorage.getItem('userID'))

    return result
}

const afficherLogKridi = async () => {
    const result = await axios.get(env.API_URL + "afficherLogKridi/" + localStorage.getItem('userID'))

    return result
}

const updateClient = async (id, montant) => {
    const result = await axios.put(env.API_URL + "ModifierMontant/" + id,{
        montant: montant, 
        date: new Date().toLocaleString()
    })

    return result
}

export {
    ajouterClient,
    afficherClients,
    afficherLogKridi,
    updateClient
}