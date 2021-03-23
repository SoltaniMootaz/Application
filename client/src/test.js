
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Load} from './actions'
import tableButton from './Components/CaisseComponents/tableButton'

function Test() {
    const dispatch = useDispatch();
    const loadStock = useSelector((state) => state.loadStock);
   const [Data, setData] = useState([])
    useEffect(()=>{ 
        dispatch(Load())
    },[dispatch])
function handler(){
dispatch(Load);
console.log(loadStock);
}
const n=10 ;
const tables=()=>{
    for(var i=0;i<n;i++){
        return(
            <>
            <tableButton index={i}></tableButton>
            </>
        )
    }
}
    return (
        <>
        <p>loadstock :</p>
        <button onClick={()=>console.log(loadStock)}>+</button>
        </>
    )
}

export default Test;