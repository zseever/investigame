const express = require('express');
const router = express.Router();
const userGamesCtrl = require('../../controllers/api/usergames');

router.get('/list', userGamesCtrl.list);
router.post('/list/games/:id', userGamesCtrl.addToList);
router.put('/list/games', userGamesCtrl.updateGame);
router.delete('/list/games/:id', userGamesCtrl.deleteGame);

module.exports = router;