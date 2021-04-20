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

export {
    setSelectValues,
    search,
    getScannedProduit
}