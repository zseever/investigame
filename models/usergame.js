const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usergame = new Schema ({
    user: {type:Schema.Types.ObjectId, ref: 'User'},
    gameList: [{
        gameId: Number,
        interest: Number,
        progress: String,
        dateAdded: {type: Date, default: new Date()}
    }]
    }, {
        timestamps: true
    }
)

usergame.statics.getList = function(userId) {
    return this.findOneAndUpdate(
        { user: userId },
        { user: userId },
        { upsert: true, new: true }
    )
}

usergame.methods.addGameToList = function(gameId) {
    const userList = this;
    const gameList = userList.gameList.find(game => game.gameId.equals(gameId))
    if (!gameList) {
        userList.gameList.push({
            gameId: gameId,
            interest: 1,
            progress: 'Not Started',
            dateAdded: new Date(),
        })
    }
    return userList.save();
}



module.exports = mongoose.model('Usergame', usergame);