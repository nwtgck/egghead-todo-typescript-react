import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import {createStore}   from "redux";
import {List}          from "immutable"
import {TodoItem}      from "./datatypes"

import {todoAppReducer} from "./reducers";
import * as actionCreator from './actionCreators';
import {Filter} from "./actionCreators";
import {ReactNode} from "react";

const store = createStore(todoAppReducer);

class FilterLink extends React.Component<{filter: Filter, currentFilter: Filter, children: ReactNode}, {}> { // (ReactNode from: https://github.com/Microsoft/TypeScript/issues/6471)
    render (){
        if(this.props.filter === this.props.currentFilter){
            return <span>{this.props.children}</span>
        } else {
            return (
                <a href="#" onClick={e => {
                    e.preventDefault();
                    store.dispatch(actionCreator.setVisibilityFilter({filter: this.props.filter}))
                }}>{this.props.children}</a>
            );
        }

    }
}

class Todo extends React.Component<{onClick: () => void, completed: boolean, text: string}, {}>{
    render(){
        return (
            <li onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ?
                        'line-through': 'none'
                }}
            >
            {this.props.text}
            </li>
        );
    }
}

class TodoList extends React.Component<{todos: List<TodoItem>, onTodoClick: (id: number) => any}, {}> {
    render(){
        return (
            <ul>
                {this.props.todos.map(todo =>
                    <Todo
                        key      ={todo.id}
                        onClick  ={() => this.props.onTodoClick(todo.id)}
                        completed={todo.completed}
                        text     ={todo.text}
                    />
                )}
            </ul>
        );
    }
}

const getVisibleTodos = (todos: List<TodoItem>, filter: Filter): List<TodoItem> => {
    switch (filter){
        case 'SHOW_ALL':
            return todos;
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.completed).toList();
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.completed).toList();
    }
};
let nextTodId = 0;
class TodoApp extends React.Component<{todos: List<TodoItem>, visibilityFilter: Filter}, {}> {

  input = null;

  render () {
    const {todos, visibilityFilter} = this.props;
    const visibleTodos = getVisibleTodos(
        todos,
        visibilityFilter
    );
    return (
      <div>
        <input ref={node => this.input = node}/>
        <button onClick={() => {
            store.dispatch(actionCreator.addTodo({
                id: nextTodId++,
                text: this.input.value
            }));
            this.input.value = '';
          }}>
            Add Todo
        </button>

        <TodoList
            todos      ={visibleTodos}
            onTodoClick={id => {
                store.dispatch(actionCreator.toggleTodo({
                    id: id
                }));
            }}
        />

        <p>
          Show:
          {' '}
          <FilterLink
            filter       ={'SHOW_ALL'}
            currentFilter={visibilityFilter}
          >All</FilterLink>
          {' '}
          <FilterLink
              filter       ={'SHOW_ACTIVE'}
              currentFilter={visibilityFilter}
          >Active</FilterLink>
          {' '}
          <FilterLink
              filter       ={'SHOW_COMPLETED'}
              currentFilter={visibilityFilter}
          >Completed</FilterLink>
          {' '}
        </p>
      </div>
    );
  }
}

const render = () => {
    ReactDOM.render(<TodoApp
        todos={store.getState().todos}
        visibilityFilter={store.getState().visibilityFilter}
    />, document.getElementById('root'));
};

store.subscribe(render);
render();


