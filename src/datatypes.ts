import Copyable from "ts-copyable";

export class TodoItem extends Copyable<TodoItem>{
    constructor(
        readonly id       : number,
        readonly text     : string,
        readonly completed: boolean
    ){
        super(TodoItem);
    }
}