import sendRequest from "./send-request";
const BASE_URL = '/api/usergames'


export function getList() {
    return sendRequest(`${BASE_URL}/list`);
}

export function addGameToList(gameId) {
    return sendRequest(`${BASE_URL}/list/games/${gameId}`, 'POST');
}

export function updateGame(userGameData) {
    return sendRequest(`${BASE_URL}/list/games`, 'PUT', {userGameData});
}

export function deleteGame(gameId) {
    return sendRequest(`${BASE_URL}/list/games/${gameId}`, 'DELETE');
}