const express = require('express');
const router = express.Router();
const userGamesCtrl = require('../../controllers/api/userGames');

router.get('/list', userGamesCtrl.list);
router.post('/list/games/:id', userGamesCtrl.addToList);

module.exports = router;