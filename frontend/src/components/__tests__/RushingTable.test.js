import { act, render } from '@testing-library/react';
import RushingTable from '../RushingTable';
import RushingYardsClient from '../../clients/RushingYardsClient';

jest.mock('../../clients/RushingYardsClient');

beforeEach(() => {
    RushingYardsClient.prototype.getRushingData = jest.fn().mockReturnValue(Promise.resolve({ results: [], total: 0 })); 
})

afterAll(() => {
    jest.restoreAllMocks();
});

test('renders loading text initially', () => {
    const { getByText } = render(<RushingTable />);
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
});

test('renders empty table', async () => {
    const { findByTestId } = render(<RushingTable />);
    const table = await findByTestId('table');
    expect(table).toMatchSnapshot();
});

test('renders data in table', async () => {
    const testData = {
        Player: 'Name',
        Team: 'Team',
        Position: 'Position',
        RushingAttempts: 2,
        RushingAttemptsPerGame: 1,
        TotalRushingYards: 20,
        RushingAverageYardsPerAttempt: 10,
        RushingYardsPerGame: 20,
        TotalRushingTouchdowns: 0,
        LongestRush: 10,
        LongestRushTD: false,
        RushingFirstDowns: 0,
        RushingFirstDownPercentage: 0,
        Rushing20PlusYardsEach: 0,
        Rushing40PlusYardsEach: 0,
        RushingFumbles: 0
    };
    RushingYardsClient.prototype.getRushingData = jest.fn().mockReturnValue(Promise.resolve({ results: [testData], total: 0 })); 

    const { findByText, getByTestId } = render(<RushingTable />);
    await findByText('Name');
    const table = getByTestId('table');
    expect(table).toMatchSnapshot();
});
