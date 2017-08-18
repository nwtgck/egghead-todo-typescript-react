import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import {createStore, Dispatch} from "redux";
import {Provider, connect} from "react-redux";
import {List}          from "immutable"
import {TodoItem}      from "./datatypes"

import {todoAppReducer} from "./reducers";
import * as actionCreator from './actionCreators';
import {Filter} from "./actionCreators";
import {ReactNode} from "react";

// (component)
const Link = ({active, onClick, children} : {active: boolean, onClick: () => void, children?: ReactNode}) => { // (ReactNode from: https://github.com/Microsoft/TypeScript/issues/6471)
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


const FilterLink = connect<{active: boolean}, {onClick: () => void}, {filter: Filter}>(
    (state, ownProps) => ({
        active: ownProps.filter == state.visibilityFilter
    }),
    (dispatch, ownProps) => ({
        onClick: () => {
            dispatch(actionCreator.setVisibilityFilter({
                filter: ownProps.filter
            }))
        }
    })
)(Link);


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

const VisibleTodoList = connect(
    (state) => ({
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }),
    (dispatch) => ({
        onTodoClick: (id => {
            dispatch(actionCreator.toggleTodo({
                id: id
            }))
        })
    })
)(TodoList);


class _AddTodo extends React.Component<{dispatch: Dispatch<{todos: List<TodoItem>, visibilityFilter: Filter}>}, {}> {

    input = null;

    render(){
        return (
            <div>
                <input ref={node => this.input = node}/>
                <button onClick={() => {
                    this.props.dispatch(actionCreator.addTodo({
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
const AddTodo = connect(
    null,
    (dispatch) => ({
        dispatch: dispatch
    })
)(_AddTodo);

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
const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer/>
    </div>
);


ReactDOM.render(
    <Provider store={createStore(todoAppReducer)}>
        <TodoApp/>
    </Provider>, document.getElementById('root')
);


