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
        default:
            return state;
    }
};