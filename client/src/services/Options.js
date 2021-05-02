import axios from 'axios'
import env from "react-dotenv";

const changePassword = async (pass) => {
    const result = await axios.post(env.API_URL + "changePassword", {
        id : localStorage.getItem('userID'),
        mdp: pass
    })

    return result;
}

const changeCle = async (cle) => {
    const result = await axios.post(env.API_URL + "changeCle", {
        id : localStorage.getItem('userID'),
        mdp: cle
    })

    return result;
}

export {
    changePassword,
    changeCle
}