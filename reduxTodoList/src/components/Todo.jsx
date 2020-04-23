import React from 'react';


let Todo = ({onClick,completed,text})=>{
    return <>
        <li
           onClick={onClick}
           style={{
               textDecoration:completed?'line-through':'none'
           }}
        >
         {text}
    </li>
    </>
}

export default Todo;