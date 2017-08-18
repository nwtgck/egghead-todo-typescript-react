import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import {createStore}   from "redux";
import {Provider}      from "react-redux";

import {todoAppReducer} from "./reducers";
import {AddTodo} from "./containers/AddTodo";
import {VisibleTodoList} from "./containers/VisibleTodoList";
import {Footer} from "./components/Footer";

const TodoApp = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer/>
    </div>
);

ReactDOM.render(
    <Provider store={createStore(todoAppReducer)}>
        <TodoApp/>
    </Provider>, document.getElementById('root')
);


