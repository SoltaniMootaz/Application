import { Table } from "@material-ui/core"

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
const filterChartDataDate= async ()=>{
    const currentDate = new Date();
    var last30DaysDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
   
    var DateArray=[]
  
    for(var i=0;i<30;i++){
        var day = new Date(last30DaysDate.getTime()+ i*24 * 60 * 60 * 1000);
        
        DateArray.push(day)
        
    }   
    
    return await DateArray;
}
function filtercChartDataVente(data,dates)
{
    var array=[];
  
    if(data && dates){
   
   for(var i=0;i<dates.length;i++){
       var qte=0;
       for(var j=0;j<data.length;j++){
           
        
           
           var dateTmp=new Date(data[j].date)
           dateTmp.setHours(0,0,0,0)
           if(dateTmp.toISOString().split('T')[0]==dates[i].toISOString().split('T')[0]){
               qte += data[j].quantite;
              
           }
       }
       array.push(qte)
   }}
   
   return  array;  
}
export {
    setSelectValues,
    search,
    getScannedProduit,
    loopStock,    
    filterChartDataDate,
    filtercChartDataVente
}