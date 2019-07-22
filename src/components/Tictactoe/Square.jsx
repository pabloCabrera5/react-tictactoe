import React from 'react';

const squareStyle = {
    height: "100px",
    width: "100px"
}

export default class Square extends React.Component {
    constructor(props) {
        super(props);
        this.squareClick = this.squareClick.bind(this)
    }
    squareClick(rowIndex, columIndex, value, board) {
        if (value === '-') {
            this.props.boardClick(rowIndex, columIndex)
        }
    }
    render() {
        let myclassName = "mybutton ";
        myclassName += this.props.value === '-' ? "clickable" : "no_clickable";
        return (
            <button className={myclassName} onClick={() => this.squareClick(this.props.rowIndex, this.props.columnIndex, this.props.value, this.props.board)}
                style={squareStyle}>{this.props.value}</button>
        );
    }
}