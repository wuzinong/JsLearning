const React = {
    index:0,
    state:[],
    useState:defaultProp=>{
        const cachedIndex = React.index;
        if(!React.state[cachedIndex]){
            React.state[cachedIndex] = defaultProp;
        }
        const currentState = React.state[cachedIndex];
        const currentStateSetter = newValue =>{
            React.state[cachedIndex] = newValue;
        };
        React.index++;
        return [currentState,currentStateSetter]
    },
    useEffect:(callback,dependencies)=>{
        const cachedIndex = React.index;
        const hasChanged = dependencies !== React.state[cachedIndex];
        if(dependencies === undefined || hasChanged){
            callback();
            React.state[cachedIndex] = dependencies;
        }
        React.index++;
        return ()=> console.log("unsubscribed effect")
    },
    render:Component=>{
        const exampleProps = {
            unit:'likes'
        };
        const compo = Component(exampleProps);
        compo.render();
        React.index = 0;
        return compo;
    }
}

const Component = props =>{
    const [count,setCount] = React.useState(0);
    const [name,setName] = React.useState('test');
    const existThis = React.useEffect(()=>{
        console.log("Effect ran")
    },name)
    return {
        click:()=>setCount(count+1),
        personArrived:person=>setName(person),
        render:()=>{
            console.log("render",{
                type:"div",
                inner:`${count} ${props.unit} for ${name}`
            })
        }
    }
}


