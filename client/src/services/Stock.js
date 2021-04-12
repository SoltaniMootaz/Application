import axios from 'axios'
import env from "react-dotenv";

const loadUserStock = async () => {
    const result = await axios.get(env.API_URL + "afficherStock/" + localStorage.getItem("userID"));
    return result;
}
export default loadUserStock