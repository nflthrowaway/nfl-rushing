const metrics = [
    'Player',
    'Team',
    'Position',
    'RushingAttempts',
    'RushingAttemptsPerGame',
    'TotalRushingYards',
    'RushingAverageYardsPerAttempt',
    'RushingYardsPerGame',
    'TotalRushingTouchdowns',
    'LongestRush',
    'LongestRushTD',
    'RushingFirstDowns',
    'RushingFirstDownPercentage',
    'Rushing20PlusYardsEach',
    'Rushing40PlusYardsEach',
    'RushingFumbles'
];

const columns = [
    "Player",
    "Team",
    "Pos",
    "Att",
    "Att/G",
    "Yds",
    "Avg",
    "Yds/G",
    "TD",
    "Lng",
    "LngTD",
    "1st",
    "1st%",
    "20+",
    "40+",
    "FUM"
];

const metricToColumnMap = {
    Player: "Player",
    Team: "Team",
    Position: "Pos",
    RushingAttempts: "Att",
    RushingAttemptsPerGame: "Att/G",
    TotalRushingYards: "Yds",
    RushingAverageYardsPerAttempt: "Avg",
    RushingYardsPerGame: "Yds/G",
    TotalRushingTouchdowns: "TD",
    LongestRush: "Lng",
    LongestRushTD: "LngTD",
    RushingFirstDowns: "1st",
    RushingFirstDownPercentage: "1st%",
    Rushing20PlusYardsEach: "20+",
    Rushing40PlusYardsEach: "40+",
    RushingFumbles: "FUM"
};

const columnToMetricMap = {
    "Player": 'Player',
    "Team": 'Team',
    "Pos": 'Position',
    "Att": 'RushingAttempts',
    "Att/G": 'RushingAttemptsPerGame',
    "Yds": 'TotalRushingYards',
    "Avg": 'RushingAverageYardsPerAttempt',
    "Yds/G": 'RushingYardsPerGame',
    "TD": 'TotalRushingTouchdowns',
    "Lng": 'LongestRush',
    "LngTD": 'LongestRushTD',
    "1st": 'RushingFirstDowns',
    "1st%": 'RushingFirstDownPercentage',
    "20+": 'Rushing20PlusYardsEach',
    "40+": 'Rushing40PlusYardsEach',
    "FUM": 'RushingFumbles'
};

module.exports = { columns, metrics, metricToColumnMap, columnToMetricMap };