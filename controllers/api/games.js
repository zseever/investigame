const fetch = require('node-fetch');
const apiKey = process.env.APIKey
const rootURL = 'https://api.rawg.io/api'
const Game = require('../../models/game');

module.exports = {
    index,
    random,
    show,
    featuredGames,
}

async function index(req,res) {
    let queryStr = '';
    let queryData = req.body.queryValues
    for (prop in queryData) {
        if (!(queryData[prop] === 'All' || queryData[prop] === "" || queryData[prop] === 0)) {
            if (prop === 'metacritic') {
                queryStr += `&${prop}=${queryData[prop]},100`
            } else if (prop === 'genres') {
                queryStr += `&${prop}=${queryData[prop].toLowerCase()}`
            } else {
                queryStr += `&${prop}=${queryData[prop]}`
            }
        }
    }
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}${queryStr}&page_size=50`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results
    res.json(data);
}

async function random(req, res) {
    let pageNum = Math.ceil(Math.random()*10);
    let randIdx = Math.floor(Math.random()*39);
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page=${pageNum}&page_size=50`);
    const jsonData = await fetchResults.json();
    const randomGame = jsonData.results[randIdx];
    res.json(randomGame);
}

async function featuredGames(req, res) {
    let pageNum = Math.ceil(Math.random()*10);
    let randIdx = Math.floor(Math.random()*34);
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page=${pageNum}&page_size=50`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results.slice(randIdx,randIdx+5)
    res.json(data);    
}

async function show(req, res) {
    const game = await Game.findOne({ id: req.params.id });
    const fetchTrailers = await fetch(`${rootURL}/games/${req.params.id}/movies?key=${apiKey}`);
    let trailers = await fetchTrailers.json();
    trailers = trailers.results;
    if (game) {
        res.json({game, trailers});
    } else {
        const fetchGame = await storeGame(req.params.id);
        res.json({'game':fetchGame, trailers});
    }
}

async function storeGame(gameId) {
    const fetchResults = await fetch(`${rootURL}/games/${gameId}?key=${apiKey}`);
    const fetchData = await fetchResults.json();
    const newGameData = {
        id: fetchData.id,
        slug: fetchData.slug,
        name: fetchData.name,
        description_raw: fetchData.description_raw,
        released: fetchData.released,
        background_image: fetchData.background_image,
        website: fetchData.website,
        rating: fetchData.rating,
        ratings: fetchData.ratings,
        reddit_url: fetchData.reddit_url,
        reddit_name: fetchData.reddit_name,
        reddit_description: fetchData.reddit_description,
        reddit_logo: fetchData.reddit_logo,
        platforms: fetchData.platforms,
        genres: fetchData.genres,
        tags: fetchData.tags,
        esrb_rating: fetchData.esrb_rating
    }
    const newGame = new Game(newGameData)
    return await newGame.save();
}