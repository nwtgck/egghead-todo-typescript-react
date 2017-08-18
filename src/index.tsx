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

// (component)
const Link = ({active, onClick, children} : {active: boolean, onClick: () => void, children: ReactNode}) => { // (ReactNode from: https://github.com/Microsoft/TypeScript/issues/6471)
    if (active) {
        return <span>{children}</span>
    } else {
        return (
            <a href="#" onClick={e => {
                e.preventDefault();
                onClick();
            }}>{children}</a>
        );
    }
};

// (container)
class FilterLink extends React.Component<{filter: Filter, children: ReactNode}, {}> {

    unsubscribe = null;

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const state = store.getState();
        return (
            <Link
                active={this.props.filter == state.visibilityFilter}
                onClick={() =>
                    store.dispatch(actionCreator.setVisibilityFilter({
                        filter: this.props.filter
                    }))
                }
            >
            {this.props.children}
            </Link>
        );
    }
}


class Footer extends React.Component<{}, {}> {
    render(){
        return (
            <p>
                Show:
                {' '}
                <FilterLink
                    filter={'SHOW_ALL'}
                >All</FilterLink>
                {' '}
                <FilterLink
                    filter={'SHOW_ACTIVE'}
                >Active</FilterLink>
                {' '}
                <FilterLink
                    filter={'SHOW_COMPLETED'}
                >Completed</FilterLink>
                {' '}
            </p>
        );
    }
}

// (container)
class VisibleTodoList extends React.Component<{}, {}> {

    unsubscribe = null;

    componentDidMount(){
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render(){
        const state = store.getState();

        return (
            <TodoList
                todos={getVisibleTodos(
                    state.todos,
                    state.visibilityFilter
                )}
                onTodoClick={id => {
                    store.dispatch(actionCreator.toggleTodo({
                        id: id
                    }));
                }}
            />
        );
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

class AddTodo extends React.Component<{}, {}> {

    input = null;

    render(){
        return (
            <div>
                <input ref={node => this.input = node}/>
                <button onClick={() => {
                    store.dispatch(actionCreator.addTodo({
                        id  : nextTodId++,
                        text: this.input.value
                    }));
                    this.input.value = '';
                }}>
                    Add Todo
                </button>
            </div>
        )
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
const TodoApp = ({todos, visibilityFilter}: {todos: List<TodoItem>, visibilityFilter: Filter}) => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer/>
    </div>
);


ReactDOM.render(<TodoApp
    todos={store.getState().todos}
    visibilityFilter={store.getState().visibilityFilter}
/>, document.getElementById('root'));


