import RushingController from '../RushingController';
import RushingModel from '../../models/RushingModel';

describe('RushingController', () => {
    let findSpy;
    let countSpy;

    beforeAll(() => {
        findSpy = jest.spyOn(RushingModel, 'find').mockReturnValue({ limit: () => ({ skip: () => ({ sort: () => ({ exec: () => ['data1', 'data2', 'data3'] })})})});
        countSpy = jest.spyOn(RushingModel, 'countDocuments').mockReturnValue(3);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('calls correct model functions for getAll', async () => {
        const controller = new RushingController();
        const result = await controller.getAll(10, 0, 'Player', 1, undefined);

        expect(findSpy).toHaveBeenCalled();
        expect(countSpy).toHaveBeenCalled();
        expect(result.results.length).toEqual(3);
        expect(result.total).toEqual(3);
    });

    it('calls correct model function for getCount', async () => {
        const controller = new RushingController();
        const result = await controller.getCount();

        expect(countSpy).toHaveBeenCalled();
        expect(result).toEqual(3);
    });
});