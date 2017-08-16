import {TodoAppAction} from "./actions";

export const todosReducer = (state: TodoItem[] = [], action: TodoAppAction): TodoItem[] => {
    switch (action.type){
        case "ADD_TODO":
            return [
                ...state,
                {
                    id       : action.id,
                    text     : action.text,
                    completed: false
                }
            ];

        case "TOGGLE_TODO":
            return state.map(item => {
                if(item.id === action.id) {
                    return {...item, completed: !item.completed}
                } else {
                    return item;
                }
            });
        default:
            return state;
    }
};