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
const filterChartDataDate= async (data)=>{
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const last30DaysDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    const last30DaysDateTime = last30DaysDate.getTime();
    console.log(last30DaysDate);
    return await data.filter(date=>{
        const elementDate = new Date(date.date).getTime();
        if (elementDate <= currentDateTime && elementDate > last30DaysDateTime) {
            return true;
          }
            return false
        }).sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
}
const filtercChartDataAchat= async(data,dates)=>{
    let achats=[];
    dates.forEach(date => {
        data.forEach(element => {
        if(element.date==date.date&& element.type=="achat")
         achats.push(element)
    
        });
        
    });
    return await achats
    
}
export {
    setSelectValues,
    search,
    getScannedProduit,
    filterChartDataDate,
    filtercChartDataAchat
}