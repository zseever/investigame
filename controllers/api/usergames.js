const Usergame = require('../../models/usergame');
const Game = require('../../models/game');
const apiKey = process.env.APIKey
const rootURL = 'https://api.rawg.io/api'

module.exports = {
    list,
    addToList,
}

async function list(req, res) {
    const list = await Usergame.getList(req.user._id);
    const gameList = list.gameList;
    console.log(gameList)
    const gameData = await gameList.map(async function(x) {
        let game = await Game.findOne({id: x.gameId});
        console.log({...x, 'gameData': game})
        return {...x, 'gameData': game}
    })
    // console.log(gameData);
    res.json(gameData);
}

async function addToList(req, res) {
    const list = await Usergame.getList(req.user._id);
    await list.addGameToList(req.params.id);
    const game = await Game.findOne({ id: req.params.id });
    if (game) {
        console.log('stored game');
    } else {
        await storeGame(req.params.id);
        console.log('fetched game');
    }
    res.json(list);
}

async function gameList(req, res) {
    const list = await Usergame.getList(req.user._id);
    const gameIds = list.gameList.map(x => x.gameId)
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
    newGame.save();
}