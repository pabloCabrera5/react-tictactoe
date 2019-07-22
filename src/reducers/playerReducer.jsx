
function playerReducer(state = "", action) {
    console.log('playerReducer')
    switch (action.type) {
        case 'NEW_PLAYER':
            return action.player_name;
        case 'FETCH_STATE_SUCESS':
            return action.state.player_name ? action.state.player_name : "";
        default:
            return state;
    }
}
export default playerReducer;