import {combineReducers, Reducer} from "redux";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {List}                    from "immutable";

import {TodoItem}           from "./datatypes";
import * as actionCreators from "./actionCreators";
import {Filter} from "./actionCreators";
import {typeSafeCombineReducers} from "./type_safe_util";


export const todosReducer = reducerWithInitialState<List<TodoItem>>(List<TodoItem>())
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

export const visibilityFilterReducer = reducerWithInitialState<Filter>("SHOW_ALL")
    .case(actionCreators.setVisibilityFilter, (state, payload) => {
        return payload.filter;
    });

export const todoAppReducer = typeSafeCombineReducers({
    todos           : todosReducer,
    visibilityFilter: visibilityFilterReducer
});