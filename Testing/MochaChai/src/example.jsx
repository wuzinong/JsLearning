import React from 'react';
import Sub from './sub';

const Example = (props)=>{
    return (
        <div>
            <button>{props.text}</button>
            <Sub text={props.text}/>
        </div>
    )
}
export default Example;