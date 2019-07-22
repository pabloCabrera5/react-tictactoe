import { combineReducers } from "redux";
import gameRecuder from './gameReducer';
import turnReducer from "./turnReducer";
import move from "./moveReducer";
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import fetchReducer from "./fetchReducer";
import playerReducer from "./playerReducer";

const history = createBrowserHistory();

export const globalState = combineReducers({
    turn: turnReducer,
    values: gameRecuder,
    movements: move,
    fetch: fetchReducer,
    player_name: playerReducer,
    router : connectRouter(history)
});

