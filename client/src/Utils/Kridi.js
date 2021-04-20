const search = async (data, value) => {
    if(data)
        if(data[0])
            if(data[0].telephone)
                return await data.filter(val=>val.nomPre.toLowerCase().indexOf(value) > -1 || val.telephone.indexOf(value) > -1)
            else
                return await data.filter(val=>val.nomPre.toLowerCase().indexOf(value) > -1)
}

export {
    search
}