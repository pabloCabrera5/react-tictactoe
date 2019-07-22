export const PLAYERX = "Player 1 - Xs ";
export const PLAYER0 = "Player 2 - 0s ";
export const VALUES = [
    ["-", "-", "-"],
    ["-", "-", "-"],
    ["-", "-", "-"]
];
export const FETCH = {
    fetching: false,
    finished: false,
    error: null
};
export const URISAVE = 'http://api.myjson.com/bins';

export let API = { name: 'default', uri: 'https://api.myjson.com/bins/e8cdl' }//'http://api.myjson.com/bins/i216a';
export function setApi(api, name) {
    API = { name: name, uri: api }
    //API = api;
}
export function getApi() {
    return API;
}

export let APILIST = [
    { name: 'default', uri: 'https://api.myjson.com/bins/s7ikp' },
    { name: 'grillo', uri: 'https://api.myjson.com/bins/81s15' }
];
let counter = 0;
export function setApiList(api, name) {
    if (!name) name = counter;
    let element = { name: name, uri: api }
    //APILIST[counter++] = element
    APILIST.push(element);
    counter++;
}
export function getApiList() {
    return APILIST;
}