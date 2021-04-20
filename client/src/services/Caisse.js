import axios from 'axios'
import env from "react-dotenv";

const loadStock = async () => {
    const result = await axios.get(env.API_URL + "stock/" + localStorage.getItem("userID"));
    return result;
}

const testCle = async (cle) => {
    const result = await axios.post(env.API_URL + "testCle/" + localStorage.getItem("userID"), {
        cle : cle
    })

    return result;
}

const saveTicket = async (somme, operation, methodes, idClient, loadTicket) => {
    var result;
    var current = new Date();

    if(localStorage.getItem('ticket' + localStorage.getItem('tableIndex'))) {
        const tmp = JSON.parse(localStorage.getItem('ticket' + localStorage.getItem('tableIndex')));

        result = await axios.post(env.API_URL + "ticket/" + localStorage.getItem('userID'), {
            data: tmp.data,
            quantite: tmp.quantite,
            table: tmp.table,
            somme: somme,
            date: current.toLocaleString(),
            operation: operation,
            methodes: methodes,
            id_client: idClient,
            typeCommerce: localStorage.getItem('commerce')
        })
    }else {
        const tmp = loadTicket;

        result = await axios.post(env.API_URL + "ticket/" + localStorage.getItem('userID'), {
            data: tmp.data,
            quantite: tmp.quantite,
            table: localStorage.getItem('tableIndex'),
            somme: somme,
            date: current.toLocaleString(),
            operation: operation,
            methodes: methodes,
            id_client: idClient,
            typeCommerce: localStorage.getItem('commerce')
        })

        localStorage.setItem('numTicket',result.data)
    }

    return result
}

const afficherTicket = async (id) => {
    const result = await axios.get(env.API_URL + "detailsTicket/" + id);
    return result;
}

export {
    loadStock,
    testCle,
    saveTicket,
    afficherTicket
}
