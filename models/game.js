const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const game = new Schema ({
    id: Number,
    slug: String,
    name: String,
    description_raw: String,
    released: String,
    background_image: String,
    website: String,
    rating: Number,
    ratings: Array,
    reddit_url: String,
    reddit_name: String,
    reddit_description: String,
    reddit_logo: String,
    platforms: Array,
    genres: Array,
    tags: Array,
    esrb_rating: Object
    }, {timestamps:true})

module.exports = mongoose.model('Game', game);