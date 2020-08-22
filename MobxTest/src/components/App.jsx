import React, { Component } from 'react';
import TodoListStore from "./todolist/store/TodoListStore";
import TodoListView from "./todolist/index";
import { Provider } from 'mobx-react';
export default class App extends Component {

  render() {
    return (
      <Provider TodoListStore={TodoListStore}>
        <TodoListView/>
      </Provider>
    )
  }
}