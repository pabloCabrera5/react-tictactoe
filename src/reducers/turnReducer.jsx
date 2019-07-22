import { VALUES, PLAYERX, PLAYER0 } from "../constants/constants";

function turnReducer(state = VALUES, action) {
    console.log('turnReducer')
    switch (action.type) {
        case 'PLAY_POSITION':
            return action.turn === PLAYERX ? PLAYER0 : PLAYERX;
        case 'RESET':
            return PLAYERX;
        case 'FETCH_STATE_SUCESS':
            return action.state.turn;
        default:
            return state;
    }
}
export default turnReducer;