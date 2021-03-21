
import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import Load from './actions'

function Test() {
    const dispatch = useDispatch();
    const loadStock = useSelector((state) => state.loadStock);
   const [Data, setData] = useState([])
    useEffect(()=>{ 
        dispatch(Load)
        
    },[dispatch])
function handler(){
dispatch(Load);
console.log(loadStock);
}
    return (
        <>
        <p>loadstock :</p>
        <button onClick={()=>handler()}>+</button>
        {Data}
        </>
    )
}

export default Test;