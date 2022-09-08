const express = require('express');
const router = express.Router();
const gamesCtrl = require('../../controllers/api/games');

router.get('/random', gamesCtrl.random);
router.get('/featured', gamesCtrl.featuredGames);
router.get('/:id', gamesCtrl.show);
router.get('/', gamesCtrl.index);

module.exports = router;