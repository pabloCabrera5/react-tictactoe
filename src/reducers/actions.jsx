import { API, URISAVE, APILIST } from "../constants/constants";

export function playPosition(x, y, turn, movements) {
    console.log('playPosition')
    return {
        type: 'PLAY_POSITION',
        x: x,
        y: y,
        turn: turn,
        movements: movements
    }
};
export function resetGame() {
    console.log('resetGameeeee')
    return {
        type: 'RESET',
    }
};

export function newPlayer(player_name) {
    return {
        type: 'NEW_PLAYER',
        player_name: player_name
    }
}

export function fetchState(uri = API.uri) {
    console.log(uri)
    return dispatch => {
        dispatch(fetchStateBegin());
        return fetch(uri)
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                return dispatch(fetchStateSucess(json));
            })
            .catch(error => {
                console.log(error);
                return dispatch(fetchStateFailure(error));
            })
    }
};
export function fetchStateBegin() {
    return {
        type: 'FETCH_STATE_BEGIN'
    }
};
export function fetchStateSucess(json) {
    return {
        type: 'FETCH_STATE_SUCESS',
        state: json
    }
};
export function fetchStateFailure(error) {
    return {
        type: 'FETCH_STATE_FAILURE',
        error: error
    }
};

export async function saveGame(value) {
    return await fetch(URISAVE, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(value), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response));
            return response;
        })
        .catch(error => {
            console.error('Error:', error);
            throw new Error('Couldnt save the game');
        });
};

// function to get the uri of the saved game given a name
export function getUri(name) {
    let uri;
    APILIST.every((element, index) => {
        if (element.name === name) {
            uri = element.uri;
            return false;
        }
        return true;
    })
    return uri;
}
// function to check if the name we want to save already exists
export function existName(name) {
    let exist = false;
    APILIST.every((element, index) => {
        if (element.name === name) {
            exist = true;
            return false;
        }
        return true;
    })
    return exist;
}

//function to simulate the retrieve of list game in a server
// TODO , reorganize the fetch call dependen on how's the structure of the apilist
export async function getListGame() {
    return await APILIST.forEach(element => {
        return fetch(element)
            .then((res) => {
                res.json();
            })
            .then((response) => {
                console.log('Success:', JSON.stringify(response));
                return response;
            });
    })
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(`ERROR: ${response.statusText}`);
        throw Error(response.statusText);
    }
    return response;
}