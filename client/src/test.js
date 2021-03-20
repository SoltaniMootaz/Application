import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Load} from './actions'

function Test() {
    const dispatch = useDispatch();
    const loadStock = useSelector((state) => state.loadStock);

    useEffect(()=>{ 
        dispatch(Load())
    },[dispatch])

    return (
        <>
        <p>loadstock :</p>
        <button onClick={()=>console.log(loadStock)}>+</button>
        </>
    )
}

export default Test;