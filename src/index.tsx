import * as React      from 'react';
import * as ReactDOM   from 'react-dom';
import {createStore}   from "redux";
import {List}          from "immutable"
import {TodoItem}      from "./datatypes"

import {todoAppReducer} from "./reducers";
import * as actionCreator from './actionCreators';

const store = createStore(todoAppReducer);

// Typed Props
interface Props {
  todos: List<TodoItem>
}

// Typed State
interface State {
}

let nextTodId = 0;
class App extends React.Component<Props, State> {

  input = null;

  render () {
    return (
      <div>
        <input ref={node => this.input = node}/>
        <button onClick={() => {
            store.dispatch(actionCreator.addTodo({
                id: nextTodId++,
                text: this.input.value
            }));
            this.input.value = '';
          }}>Add Todo</button>
        <ul>
            {this.props.todos.map(todo =>
                <li key={todo.id}
                    onClick={() => {
                        store.dispatch(actionCreator.toggleTodo({
                            id: todo.id
                        }));
                    }}
                    style={{
                        textDecoration: todo.completed ?
                            'line-through': 'none'
                    }}
                >
                    {todo.text}
                </li>
            )}
        </ul>
      </div>
    );
  }
}

const render = () => {
    ReactDOM.render(<App todos={store.getState().todos}/>, document.getElementById('root'));
};

store.subscribe(render);
render();


