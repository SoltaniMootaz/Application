const search = async (data, value) => {
    if(data)
        if(data[0])
            if(data[0].telephone)
                return await data.filter(val=>val.nomPre.toLowerCase().indexOf(value) > -1 || val.telephone.indexOf(value) > -1)
            else
                return await data.filter(val=>val.nomPre.toLowerCase().indexOf(value) > -1 || val.operation.toLowerCase().indexOf(value) > -1)
}

const getTotale = (data) => {
    var tot = 0;

    data.map(val=>{
      tot += val.montant;
    })

    return tot;
}

export {
    search,
    getTotale
}