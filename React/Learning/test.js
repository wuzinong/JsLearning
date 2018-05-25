import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './app';
import reducers from './reducers';

const store = createStore(todoApp,reducers);

render(
    <Provider store={store}>
       <App>
    </Provider>
)



//-----CONTAINER/TODOLIST.JS


import {connect} from 'react-redux';
import TodoList from './TodoList.jsx';

class TodoListContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todos:null,
            filter:null
        }
    }

    handleClick(){
        this.props.update(todo);
    }
    componentDidMount(){
        const {todos,filter,actions} = this.props;
        if(todos.length === 0){
            this.props.fetchTodoList(filter);
        }
    }
    render(){
        const {todos,filter} = this.props;
        return (
            <TodoList 
            todos={todos}
            filter={filter}
            handleClick = {this.handleClick}>

            </TodoList>
        )
    }
}

const mapStateToProps= state=>{
    return {
        todos:state.todos,
        filter:state.filter
    }
}

cosnt mapDispatchToProps = dispatch=>{
    return {
        update:(todo)=>dispatch({
            type:'UPDATE_TODO',
            payload:todo
        }),
        fetchTodoList:(filter)=>dispatch({
            type:'FETCH_TODOS',
            payload:filters
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList)


//COMPONENTS/TODO.JS
import React from 'react';
import PropTypes from 'prop-types';
class Todo extends React.Component{
    constructor(...args){
        super(..args);
        this.state={
            editable:false,
            todo:this.props.todo
        }
    }
    handleClick(e){
        this.setState({
            editable: !this.state.editable
          })
    }
    update(){
        this.setState({
            ...this.state.todo,
            text:this.refs.content.innerText
        })
    }
    render(){
        return (
            <li 
               onClick={this.handleClick}
               style={{
                    contentEditable:editable?'true':'false'
                }}>
               <p ref="content">{text}</p>
               <button onClick = {this.update}>Save</button>
            </li>
        )
    }
}

Todo.protoTypes = {
    handleUpdateClick:PropTypes.func.isRequired,
    text:PropTypes.string.isRequired
}
export default Todo



//connect
connectHOC = connectAdvanced;
mergePrposFactories = defaultMergePropsFactories;
selectorFactory = defaultSelectorFactory;
function connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    {
        pure=true,
        areStateEqual=strictEqual,
        areOwnPropsEqual=shallowEqual,
        areStatePropsEqual=shallowEqual,
        areMergedPropsEqual=shallowEqual,
        renderCountProp,
        storeKey='store',
        ...extraOptions
    } = {}
){
    const initMapStateToProps=match(mapStateToProps,mapStateToPropsFactories,'mapStateToProps')
    const initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps')
    const initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps')
    connectHOC(selectorFactory,{
        shouldHandleStateChanges:Boolean(mapStateToProps),
        initMapStateToProps,
        initMapDispatchToProps,
        initMergeProps,
        pure,
        areStatesEqual,
        areOwnPropsEqual,
    
    })

 
}


//shallowEqual
const hasOwn = Object.prototype.hasOwnProperty;
function is(x,y){
    if(x===y){
        return x!==0 || y!==0 || 1/x === 1/y
    }else{
        return x !==x && y !== y
    }
}

export default function shallowEqual(objA, objB) {
    if (is(objA, objB)) return true
  
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
      return false
    }
  
    const keysA = Object.keys(objA)
    const keysB = Object.keys(objB)
  
    if (keysA.length !== keysB.length) return false
  
    for (let i = 0; i < keysA.length; i++) {
      if (!hasOwn.call(objB, keysA[i]) ||
          !is(objA[keysA[i]], objB[keysA[i]])) {
        return false
      }
    }
  
    return true
  }

  shallowEqual({x:{}},{x:{}}) // false
shallowEqual({x:1},{x:1}) // true