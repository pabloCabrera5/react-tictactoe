import { VALUES } from "../constants/constants";

function p(state = VALUES, action) {
    let moves;
    console.log()
    switch (action.type) {
        case 'PLAY_POSITION':
            moves = action.movements + 1;
            return moves;
        case 'RESET':
            moves = 0;
            return moves;
        default:
            return state;
    }
}
export default p;