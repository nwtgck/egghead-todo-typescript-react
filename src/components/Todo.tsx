import * as React from "react";

export class Todo extends React.Component<{onClick: () => void, completed: boolean, text: string}, {}>{
    render(){
        return (
            <li onClick={this.props.onClick}
                style={{
                    textDecoration: this.props.completed ?
                        'line-through': 'none'
                }}
            >
                {this.props.text}
            </li>
        );
    }
}