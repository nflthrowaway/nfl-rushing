import { render } from '@testing-library/react';
import RushingTableRow from '../RushingTableRow';

test('renders row', async () => {
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

    const { findByText, getByTestId } = render(<RushingTableRow row={testData} />);
    await findByText('Name');
    const table = getByTestId('table-row');
    expect(table).toMatchSnapshot();
});