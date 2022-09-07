const Schema = require ('mongoose').Schema;

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

module.exports = usergame;