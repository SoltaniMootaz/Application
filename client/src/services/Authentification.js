import axios from 'axios'
import env from "react-dotenv";

const signup = async (email,nom,prenom,adr,tel,mdp,commerce) => {
    const result = await axios.post(env.API_URL + "signup", {
        email: email,
        nom: nom,
        prenom: prenom,
        adr: adr,
        tel: tel,
        mdp: mdp,
        commerce: commerce,
        })

    return result;
}

const login = async (email,password) => {
    const result = await axios.post(env.API_URL + "login", {
        email: email,
        mdp: password,
      })
    
    return result;
}

export {signup , login}
