import {combineReducers, Reducer} from "redux";

export type ReducersMapObject<S> = {
    [K in keyof S]: Reducer<S[K]>;
}

// Type-safe combineReducers
// This feature is merged in `next` branch (https://github.com/reactjs/redux/tree/next)
// Issue: https://github.com/reactjs/redux/issues/2238
export function typeSafeCombineReducers<S>(reducers: ReducersMapObject<S>): Reducer<S>{
    return combineReducers(reducers as any);
}