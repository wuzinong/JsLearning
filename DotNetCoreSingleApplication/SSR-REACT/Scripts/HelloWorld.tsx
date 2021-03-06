import * as React from 'react';
import { connect } from 'react-redux';
import { retrieveData } from './async-thunks';
import { IHelloWorldData } from './redux-actions';

interface Props_redux extends IHelloWorldData {
    dispatch: <T>(action: any) => T
}
interface IState { }

class Comp extends React.Component<Props_redux, IState> {
    props: any;
    constructor(props:Props_redux){
        super(props);
    }
    componentDidMount() {
        //if (!this.props.status) this.props.dispatch(retrieveData()); // only get data when it's not available
    }
    componentWillMount() {
        
    }

    render() {
        if (!this.props.status) this.props.dispatch(retrieveData()); 
        const { status, count } = this.props;

        var content = null;
        if (status) {
            content =
                [
                    <div>Data obtained from server:</div>,
                    <div>Status: {status}</div>,
                    <div>Count: {count}</div>
                ];
        }
        return <div>Hello world!{content}</div>;
    }
}
export var HelloWorld: React.ComponentClass<{}> = connect(state => { return { ...state }; })(Comp);