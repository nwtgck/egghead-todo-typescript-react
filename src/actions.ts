interface AddTodoAction{
    type : "ADD_TODO";
    id   : number;
    text : string;
}

export type TodoAppAction = AddTodoAction