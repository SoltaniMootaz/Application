const setSelectValues = (data) => {
    const result = []

    data.map(val=> {
        result.push({ value: val, label: val, isFixed: true})
    })

    return result
}

const search = async (data, value) => {
    return await data.filter(
        val=>val.libelle.toLowerCase().indexOf(value.toLowerCase()) > -1 || val.code_a_barre.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
}

const getScannedProduit = async (data, value) => {
    return await data.filter(
        val=> val.code_a_barre.toLowerCase() === value.toLowerCase()
    )
}

const loopStock = (data, length) => {
    const arr = [];

    for(var i=0; i<length; i++) {
        if(data[i])
            arr.push(data[i])
    }

    return arr;
}

const sort = async (arr) => {
    const tmpArr = [];
    const sortedArr = [];
    
    arr.forEach(value=>{
        tmpArr.push(value.quantite_vendu)
    })

    tmpArr.sort(function(a, b){return b-a});

    for(var i=0; i<10 ; i++)
        sortedArr.push(tmpArr[i])

    arr.forEach(async value=>{
        for(var i=0; i<sortedArr.length; i++){
            if(sortedArr[i])
                if(!sortedArr[i].id && sortedArr[i] === value.quantite_vendu) {
                    sortedArr[i] = value;
                    break;
                }
        }
    })

    return sortedArr
}

export {
    setSelectValues,
    search,
    getScannedProduit,
    loopStock,
    sort
}