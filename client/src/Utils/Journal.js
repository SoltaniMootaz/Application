const getTotale = (data) => {
    var somme = 0;
    
    if(localStorage.getItem('openingTime'))
        data.map(val => {
            if (new Date(val.date).getTime() > localStorage.getItem('openingTime'))
                somme += val.somme;
        })

    return somme;
}

export {
    getTotale
}