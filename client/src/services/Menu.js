import axios from 'axios'
import env from "react-dotenv";

const loadArticles = async () => {
    const result = await axios.get(env.API_URL + "afficherArticles/" + localStorage.getItem('userID'))
    return result;
}

const loadCategories = async () => {
    const result = await axios.get(env.API_URL + "afficherCategorie/" + localStorage.getItem('userID'))
    return result;
}

const deleteArticle = async (id) => {
    const result = await axios.delete(env.API_URL + "deletearticle/" + id);
    return result;
}

const ajouterArticle = async (nom, categorie, prix, unite) => {
    const result = await axios.post(env.API_URL + "ajouterArticle", {
        nom: nom,
        categorie: categorie,
        prix: prix,
        unite: unite,
        id_utilisateur: localStorage.getItem('userID')
      })
    
    return result;
}

const ajouterIngredient = async (idIngr, quantite, idArticle) => {
    const result = await axios.post(env.API_URL + "ajouterIngredient", {
        idIngr: idIngr,
        quantite: quantite,
        id_article: idArticle,
        id_utilisateur: localStorage.getItem('userID')
      })

    return result;
}

const ajouterCategorie = async (categorie) => {
    const result = await axios.post(env.API_URL + "ajouterCateg", {
        categorie: categorie,
        id_utilisateur: localStorage.getItem('userID')
    })

    return result;
}

export {
    loadArticles, 
    loadCategories, 
    deleteArticle, 
    ajouterArticle,
    ajouterIngredient,
    ajouterCategorie
}
