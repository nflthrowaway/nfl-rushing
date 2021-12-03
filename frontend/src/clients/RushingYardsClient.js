import HttpClient from "./HttpClient";

class RushingYardsClient {
    constructor() {
        this.client = HttpClient;
    }

    async getRushingData(limit, skip, sort, sortDirection, filter) {
        const response = await this.client.get('', { params: { limit, skip, sort, sortDirection, filter }});
        return { results: response.data.results, total: response.data.total };
    }
}

export default RushingYardsClient;