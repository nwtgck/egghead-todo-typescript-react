import {List}          from "immutable";
import {TodoAppAction} from "./actions";

export const todosReducer = (state: List<TodoItem> = List(), action: TodoAppAction): List<TodoItem> => {
    switch (action.type){
        case "ADD_TODO":
            return state.push({
                id       : action.id,
                text     : action.text,
                completed: false
            });

        case "TOGGLE_TODO":
            return state
                .map((item) => {
                    if(item.id === action.id) {
                        return {...item, completed: !item.completed}
                    } else {
                        return item;
                    }
                })
                .toList();
        default:
            return state;
    }
};