import { VALUES, PLAYERX } from "../constants/constants";

function gameReducer(state = VALUES, action) {
    console.log('gameReducer')
    switch (action.type) {
        case 'PLAY_POSITION':
            let newState = JSON.parse(JSON.stringify(state));
            let newValue = action.turn === PLAYERX ? 'X' : '0';
            newState[action.x][action.y] = newValue;
            return newState;
        case 'RESET':
            let resetState = [
                ["-", "-", "-"],
                ["-", "-", "-"],
                ["-", "-", "-"]
            ];
            return resetState;
        case 'FETCH_STATE_SUCESS':
            return action.state.values;
        default:
            return state;
    }
}
export default gameReducer;