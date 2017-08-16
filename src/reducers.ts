import {List}          from "immutable";
import {TodoAppAction} from "./actions";
import {TodoItem}      from "./datatypes"

export const todosReducer = (state: List<TodoItem> = List(), action: TodoAppAction): List<TodoItem> => {
    switch (action.type){
        case "ADD_TODO":
            return state.push(new TodoItem(
                action.id,
                action.text,
                false
            ));

        case "TOGGLE_TODO":
            return state
                .map((item) => {
                    if(item.id === action.id) {
                        return item.mapCopy({completed: prev => !prev})
                    } else {
                        return item;
                    }
                })
                .toList();
        default:
            return state;
    }
};