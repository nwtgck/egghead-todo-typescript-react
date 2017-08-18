import * as React      from 'react';
import * as ReactDOM   from 'react-dom';

// Typed Props
interface Props {
}

// Typed State
interface State {
}

class App extends React.Component<Props, State> {
  render () {
    return (
      <h1>
        hello, world
      </h1>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
