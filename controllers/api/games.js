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
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page_size=50`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results
    res.json(data);
}

async function random(req, res) {
    let pageNum = Math.ceil(Math.random()*10);
    let randIdx = Math.floor(Math.random()*50);
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page=${pageNum}&page_size=50`);
    const jsonData = await fetchResults.json();
    const randomGame = jsonData.results[randIdx];
    res.json(randomGame);
}

async function featuredGames(req, res) {
    let pageNum = Math.ceil(Math.random()*10);
    let randIdx = Math.floor(Math.random()*45);
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page=${pageNum}&page_size=50`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results.slice(randIdx,randIdx+5)
    res.json(data);    
}

async function show(req, res) {
    const game = await Game.findOne({ id: req.params.id });
    if (game) {
        console.log(game)
        console.log('stored game');
        res.json(game);
    } else {
        const fetchGame = await storeGame(req.params.id);
        console.log(fetchGame);
        console.log('fetched game');
        res.json(fetchGame);
    }
    // const fetchResults = await fetch(`${rootURL}/games/${req.params.id}?key=${apiKey}`);
    // const jsonData = await fetchResults.json();
    // res.json(jsonData);    
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