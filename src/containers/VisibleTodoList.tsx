import {connect}           from "react-redux";
import {TodoList}          from "../components/TodoList"
import * as actionCreators from "../actionCreators"
import {TodoItem}          from "../datatypes";
import {Filter}            from "../actionCreators";
import {List}              from "immutable";

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
export const VisibleTodoList = connect(
    (state) => ({
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }),
    (dispatch) => ({
        onTodoClick: (id => {
            dispatch(actionCreators.toggleTodo({
                id: id
            }))
        })
    })
)(TodoList);