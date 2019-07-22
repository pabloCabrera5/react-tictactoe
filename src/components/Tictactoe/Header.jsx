import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <h3>{this.props.welcome_text}<br/>
                    {this.props.textt}
                </h3>
            </header>
        );
    }
}