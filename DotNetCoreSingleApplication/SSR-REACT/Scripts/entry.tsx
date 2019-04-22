import * as React from 'react';
import { render,hydrate } from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {helloWorld_reducers} from './redux-reducers'
import { HelloWorld } from './HelloWorld';
 

// var Store = createStore(helloWorld_reducers,applyMiddleware(thunk));
var Store = createStore(helloWorld_reducers,(window as any).ReduxInitialState,applyMiddleware(thunk));
// render(<Provider store={Store}><HelloWorld /></Provider>, document.querySelector('#content'));
hydrate(<Provider store={Store}><HelloWorld /></Provider>, document.querySelector('#content'));