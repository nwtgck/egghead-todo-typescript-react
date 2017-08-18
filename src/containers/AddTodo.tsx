import * as React from "react";
import {Dispatch} from "redux";
import {connect}  from "react-redux";

import {List}              from "immutable";
import {TodoItem}          from "../datatypes";
import * as actionCreators from "../actionCreators";
import {Filter}            from "../actionCreators";

let nextTodId=0;
class _AddTodo extends React.Component<{dispatch: Dispatch<{todos: List<TodoItem>, visibilityFilter: Filter}>}, {}> {
    input = null;

    render(){
        return (
            <div>
                <input ref={node => this.input = node}/>
                <button onClick={() => {
                    this.props.dispatch(actionCreators.addTodo({
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
export const AddTodo = connect(
    null,
    (dispatch) => ({
        dispatch: dispatch
    })
)(_AddTodo);