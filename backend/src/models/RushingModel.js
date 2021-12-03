import mongoose from 'mongoose';

const rushingSchema = new mongoose.Schema({
    Player: {
        type: String,
        index: true
    },
    Team: {
        type: String
    },
    Position: {
        type: String
    },
    RushingAttempts: {
        type: Number
    },
    RushingAttemptsPerGame: {
        type: Number
    },
    TotalRushingYards: {
        type: Number,
        index: true
    },
    RushingAverageYardsPerAttempt: {
        type: Number
    },
    RushingYardsPerGame: {
        type: Number
    },
    TotalRushingTouchdowns: {
        type: Number,
        index: true
    },
    LongestRush: {
        type: Number,
        index: true
    },
    LongestRushTD: {
        type: Boolean
    },
    RushingFirstDowns: {
        type: Number
    },
    RushingFirstDownPercentage: {
        type: Number
    },
    Rushing20PlusYardsEach: {
        type: Number
    },
    Rushing40PlusYardsEach: {
        type: Number
    },
    RushingFumbles: {
        type: Number
    },
});

const Rushing = mongoose.model('Rushing', rushingSchema);

export default Rushing;