import * as React from "react";
import {List}     from "immutable";
import {TodoItem} from "../datatypes";
import {Todo}     from "./Todo";

export class TodoList extends React.Component<{todos: List<TodoItem>, onTodoClick: (id: number) => any}, {}> {
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