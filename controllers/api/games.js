const fetch = require('node-fetch');
const apiKey = process.env.APIKey
const rootURL = 'https://api.rawg.io/api'

module.exports = {
    index,
    random,
    show
}

async function index(req,res) {
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page_size=50`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results
    res.json(data);
}

async function random(req, res) {
    let pageNum = Math.ceil(Math.random()*10);
    let randIdx = Math.ceil(Math.random()*50);
    const fetchResults = await fetch(`${rootURL}/games?key=${apiKey}&page=${pageNum}&page_size=50`);
    const jsonData = await fetchResults.json();
    const randomGame = jsonData.results[randIdx];
    res.json(randomGame);
}

async function show(req, res) {
    const fetchResults = await fetch(`${rootURL}/games/${req.params.id}?key=${apiKey}`);
    const jsonData = await fetchResults.json();
    const data = jsonData.results
    res.json(data);    
}