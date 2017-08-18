import {reducerWithInitialState} from "typescript-fsa-reducers";

import {List}               from "immutable";
import {TodoItem}           from "./datatypes";
import * as actionCreators from "./actionCreators";


export const todosReducer = reducerWithInitialState(List<TodoItem>())
    .case(actionCreators.addTodo, (state, payload) => {
        return state.push(new TodoItem(
            payload.id,
            payload.text,
            false
        ))
    })
    .case(actionCreators.toggleTodo, (state, payload) => {
        return state
            .map((item) => {
                if(item.id === payload.id) {
                    return item.mapCopy({completed: prev => !prev})
                } else {
                    return item;
                }
            })
            .toList();
    });