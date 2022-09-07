import sendRequest from "./send-request";
const BASE_URL = '/api/games';

export function getGames() {
    return sendRequest(BASE_URL);
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