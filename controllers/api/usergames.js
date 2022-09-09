const Usergame = require('../../models/usergame');

module.exports = {
    list,
    addToList,
}

async function list(req, res) {
    const list = await Usergame.getList(req.user._id);
    res.json(list);
}

async function addToList(req, res) {
    const list = await Usergame.getList(req.user._id);
    await list.addGameToList(req.params.id);
    console.log(list);
    res.json(list);
}