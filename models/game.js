const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const game = new Schema({
//id, slug, name, description_raw, released, background_image, website, rating, ratings, reddit_url, reddit_name, reddit_description,
//reddit_logo, platforms, genres, tags, esrb_rating
}, {timestamps:true})

module.exports = mongoose.model('Game', game);