import * as React      from 'react';
import * as ReactDOM   from 'react-dom';

// Typed Props
interface Props {
    content: string;
}

// Typed State
interface State {
  inputName: string;
  inputAge : number;
}

class App extends React.Component<Props, State> {
  constructor(props){
    super(props);
    this.state = {
      inputName: 'Jack',
      inputAge : 10
    }
  }

  render () {
    return (
      <div>
        <h1>Name: {this.state.inputName}, InputAge: {this.state.inputAge}</h1>
        <h2>this.props.content: '{this.props.content}'</h2>
        <input
          defaultValue={this.state.inputName}
          onChange={(e) => this.setState({inputName: e.target.value})}
        />

        <input
          defaultValue={this.state.inputAge + ""}
          type="number"
          onChange={(e) => this.setState({inputAge: Number(e.target.value)})}
        />
      </div>
    );
  }
}

ReactDOM.render(<App content="this is a content"/>, document.getElementById('root'));
