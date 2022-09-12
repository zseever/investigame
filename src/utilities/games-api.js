import sendRequest from "./send-request";
const BASE_URL = '/api/games';

export function getGames(queryValues) {
    return sendRequest(BASE_URL, 'POST', { queryValues });
}

export function getRandomGame() {
    return sendRequest(`${BASE_URL}/random`)
}

export function getFeaturedGames() {
    return sendRequest(`${BASE_URL}/featured`)
}

export function getById(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

