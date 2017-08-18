import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const addTodo             = actionCreator<{id: number, text: string}>('ADD_TODO');
export const toggleTodo          = actionCreator<{id: number}>('TOGGLE_TODO');

export type Filter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';
export const setVisibilityFilter = actionCreator<{filter: Filter}>("SET_VISIBILITY_FILTER");