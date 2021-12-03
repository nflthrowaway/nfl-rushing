import jsonData from './rushing.json';

export default class DataLoader {
    constructor() {
        this.data = [];
    }
    loadData() {
        this.data = jsonData.map((entry) => {
            // Deal with Longest, adding boolean for touchdown
            let longestRush = 0;
            let longestRushTD = false;
            if (typeof entry.Lng === 'string' && entry.Lng.endsWith('T')) {
                longestRush = parseInt(entry.Lng.slice(0, -1));
                longestRushTD = true;
            } else {
                longestRush = parseInt(entry.Lng);
            }

            return {
                Player: entry.Player,
                Team: entry.Team,
                Position: entry.Pos,
                RushingAttempts: parseInt(entry.Att),
                RushingAttemptsPerGame: parseFloat(entry['Att/G']),
                TotalRushingYards: parseInt((''+entry.Yds).replace(/,/g, '')),
                RushingAverageYardsPerAttempt: parseFloat(entry.Avg),
                RushingYardsPerGame: parseFloat(entry['Yds/G']),
                TotalRushingTouchdowns: parseInt(entry.TD),
                LongestRush: longestRush,
                LongestRushTD: longestRushTD,
                RushingFirstDowns: parseFloat(entry['1st']),
                RushingFirstDownPercentage: parseFloat(entry['1st%']),
                Rushing20PlusYardsEach: parseFloat(entry['20+']),
                Rushing40PlusYardsEach: parseFloat(entry['40+']),
                RushingFumbles: parseFloat(entry.FUM)
            };
        });
    }
}