import * as assert     from 'power-assert';
import {List}          from "immutable"
import {todosReducer}  from '../src/reducers'
import {TodoAppAction} from "../src/actions";
import {TodoItem}      from "../src/datatypes";

describe('TODO list reducers', () => {
    it('ADD_TODO', () => {
        const stateBefore: List<TodoItem> = List([]);
        const action     : TodoAppAction = {
            type: "ADD_TODO",
            id  : 0,
            text: "Learn Redux"
        };
        const stateAfter : List<TodoItem>  = List([
            new TodoItem(0, 'Learn Redux', false)
        ]);

        assert.deepEqual(
            todosReducer(stateBefore, action).toJS(),
            stateAfter.toJS()
        );
    });

    it('TOGGOLE_TODO', () => {
        const stateBefore: List<TodoItem>  = List([
            new TodoItem(0, 'Learn Redux', false),
            new TodoItem(1, 'Go shopping', false)
        ]);
        const action     : TodoAppAction = {
            type: "TOGGLE_TODO",
            id  : 1,
        };
        const stateAfter: List<TodoItem>  =List([
            new TodoItem(0, 'Learn Redux', false),
            new TodoItem(1, 'Go shopping', true)
        ]);

        assert.deepEqual(
            todosReducer(stateBefore, action).toJS(),
            stateAfter.toJS()
        );
    });

});