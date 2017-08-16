import * as assert     from 'power-assert';
import {todosReducer}  from '../src/reducers'
import {TodoAppAction} from "../src/actions";

describe('TODO list reducers', () => {
    it('ADD_TODO', () => {
        const stateBefore: TodoItem[] = [];
        const action     : TodoAppAction = {
            type: "ADD_TODO",
            id  : 0,
            text: "Learn Redux"
        };
        const stateAfter : TodoItem[]  = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            }
        ];

        assert.deepEqual(
            todosReducer(stateBefore, action),
            stateAfter
        );
    });

    it('TOGGOLE_TODO', () => {
        const stateBefore: TodoItem[]  = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            },
            {
                id: 1,
                text: 'Go shopping',
                completed: false
            }
        ];
        const action     : TodoAppAction = {
            type: "TOGGLE_TODO",
            id  : 1,
        };
        const stateAfter: TodoItem[]  = [
            {
                id: 0,
                text: 'Learn Redux',
                completed: false
            },
            {
                id: 1,
                text: 'Go shopping',
                completed: true
            }
        ];

        assert.deepEqual(
            todosReducer(stateBefore, action),
            stateAfter
        );
    });

});