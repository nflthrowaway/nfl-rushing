import RushingModel from '../models/RushingModel';

export default class RushingController {
    constructor() {
        this.model = RushingModel;
    }

    async getAll(limit, skip, sort, sortDirection, playerFilter) {
        let filterObj = {};
        if (playerFilter) {
            const filterRegex = new RegExp(playerFilter);
            filterObj = { Player: filterRegex };
        }
        const sortObject = {};
        sortObject[sort] = sortDirection;
        const results = await this.model.find(filterObj)
            .limit(limit)
            .skip(skip)
            .sort(sortObject)
            .exec();

        const total = await this.getCount(filterObj);
        return { results, total };
    }

    async add(rushingRows) {
        await this.model.create(rushingRows);
    }

    async getCount(filter) {
        return await this.model.countDocuments(filter);
    }

}