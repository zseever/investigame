const Usergame = require('../../models/usergame');
const Game = require('../../models/game');
const apiKey = process.env.APIKey
const rootURL = 'https://api.rawg.io/api'

module.exports = {
    list,
    addToList,
    updateGame,
    deleteGame,
    gameCheck,
}

async function list(req, res) {
    const list = await Usergame.getList(req.user._id).lean();
    const gameList = list.gameList;
    const gameData = await Promise.all(gameList.map(async function(x) {
        const game = await Game.findOne({id: x.gameId});
        x.gameData = game;
        return x
    }));
    res.json(gameData);
}

async function addToList(req, res) {
    const list = await Usergame.getList(req.user._id);
    await list.addGameToList(req.params.id);
    const game = await Game.findOne({ id: req.params.id });
    if (game) {
    } else {
        await storeGame(req.params.id);
    }
    res.json(list);
}

async function updateGame(req, res) {
    const list = await Usergame.getList(req.user._id);
    const game = list.gameList.find(x => x.gameId === req.body.userGameData.gameId)
    game.interest = req.body.userGameData.interest;
    game.progress = req.body.userGameData.progress;
    list.save();
}

async function deleteGame(req, res) {
    const list = await Usergame.getList(req.user._id);
    const gameIdx = list.gameList.findIndex(x => x.gameId == req.params.id);
    if (gameIdx === -1) return;
    list.gameList.splice(gameIdx,1);
    list.save();
    res.json('deleted');
}

async function gameCheck(req, res) {
    if (!req.user) {
        res.json(false);
    } else {
        const list = await Usergame.getList(req.user._id);
        const check = list.gameList.some(x => x.gameId == req.params.id);
        res.json(check);
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
    newGame.save();
}