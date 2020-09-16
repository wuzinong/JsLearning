//state.js

let state = null;
export const useState = (value:number) =>{
    state = state || value;
    function dispatch(newValue){
        state = newValue;
        render();
    }
    return [state,useState];
}


import React from 'react';
import {useState} from './state';
function Demo(){
    const [counter,usetCounter] = useState(0);
}