import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const addTodo    = actionCreator<{id: number, text: string}>('ADD_TODO');
export const toggleTodo = actionCreator<{id: number}>('TOGGLE_TODO');
