import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { PLAYERX, VALUES, PLAYER0 } from '../constants/constants';
import { globalState } from "../reducers/reducers";
import { resetGame } from '../reducers/actions';
import { connectRouter, ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from 'history';
import Header from './Header';
import Main from './Main';
import thunk from 'redux-thunk';

const history = createBrowserHistory();

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = { values: VALUES, turn: PLAYERX, movements: 0 }
        this.store = createStore(
            connectRouter(history)(globalState),
            this.initialState,
            compose(applyMiddleware(routerMiddleware(history), thunk))
        );
        this.store.subscribe(() => {
            let state = this.store.getState();
            this.checkWinner(state.values, state.turn);
        });
        console.log('REDUX PROVIDER')
    }

    checkWinner(board, turn) {
        let wincolum = this.checkColumn(board);
        let winRow = this.checkRow(board);
        let winDiagonal = this.checkDiagonal(board);
        let isFinish = this.isFinish(board);
        //if we have a winner if row or column or diagonal we finish
        if (wincolum || winRow || winDiagonal) {
            alert(`${turn === PLAYERX ? PLAYER0 : PLAYERX} won.`)
            setTimeout(() => {
                this.store.dispatch(resetGame());
            }, 2000);
            return;
        }
        //if the match is finish we restar it 
        if (isFinish) {
            alert(`Equals, restarting the game...`)
            setTimeout(() => {
                this.store.dispatch(resetGame());
            }, 2000);
        }
    }
    //method to check the columns
    checkColumn(board) {
        let win = false;
        for (let i = 0; i < board[i].length; i++) {
            if (this.getCol(board, i)) {
                win = true;
            }
            if (!board[i + 1]) break;
        }
        return win;
    }
    //method to check the rows
    checkRow(board) {
        let win = false;
        board.forEach(element => {
            if (this.checkArray(element)) {
                win = true;
            }
        });
        return win;
    }
    //method to get the diagonals and check if winner
    checkDiagonal(board) {
        return this.getDiagonal(board);
    }
    //method to get the column and check if winner
    getCol(board, col) {
        let column = [];
        for (let i = 0; i < board.length; i++) {
            column.push(board[i][col]);
        }
        return this.checkArray(column);
    }
    //method to get the two diagonals and check if winner
    getDiagonal(board) {
        let diagonal1 = [];
        let diagonal2 = [];
        let diagonals = [];
        let win = false;
        for (let i = 0, j = 0; i < board[i].length; i++ , j++) {
            diagonal1.push(board[i][j]);
            if (!board[i + 1]) break;
        }
        for (let i = 0, j = board[0].length; j > 0; i++ , j--) {
            diagonal2.push(board[i][j - 1]);
        }
        diagonals.push(diagonal1, diagonal2);
        diagonals.forEach(element => {
            if (this.checkArray(element)) {
                win = true;
            }
        });
        return win;
    }
    //method to check if the array has all sames values
    checkArray(row) {
        let winner = true;
        for (let i = 0; i < row.length - 1; i++) {
            if (row[i] === '-' || row[i] !== row[i + 1]) {
                winner = false;
            }
        }
        return winner;
    }
    //method to check if the math is finish
    isFinish(board) {
        let finish = true;
        board.forEach(element => {
            element.forEach((value) => {
                if (value === '-') {
                    finish = false;
                }
            })
        });
        return finish;
    }


    render() {
        return (
            <Provider store={this.store}>
                <ConnectedRouter history={history} >
                    <div style={{ height: '100%', textAlign: 'center' }}>
                        <Header />
                        <Main />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}