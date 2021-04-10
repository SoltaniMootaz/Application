import MenuItem from "@material-ui/core/MenuItem";

const calculTotale = (data) => {
    var sm = 0;
    data.map((e) => {
      if (e) sm += +e.prix * +e.quantite;
    });

    return sm.toFixed(3);
}

const addCategorie = (categories) => {
    var result = [];

    categories.map((categorie) => {
        result.push(
          <MenuItem key={categorie.id} value={categorie.nom}>
            {categorie.nom}
          </MenuItem>
        );
    });

    return result;
}

const chercher = (data, value) => {
    return data.filter((art) => 
        art.nom.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
}

const getCategories = (data) => {
  var result = [];

  data.map(data =>
      result.push({nom: data.nom, id: data.id})
  )

  return result
}

const getArticleById = (data, id) => {
  return data.filter(val=>val.id_categorie == id)
}


export {
    calculTotale,
    addCategorie,
    chercher,
    getCategories,
    getArticleById
}