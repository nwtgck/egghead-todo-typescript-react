interface AddTodoAction{
    type : "ADD_TODO";
    id   : number;
    text : string;
}

interface ToggleTodoAction{
    type: "TOGGLE_TODO";
    id  : number;
}

export type TodoAppAction = AddTodoAction | ToggleTodoAction;