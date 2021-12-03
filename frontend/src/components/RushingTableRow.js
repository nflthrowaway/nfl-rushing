import React from "react";

import { columns, columnToMetricMap, metricToColumnMap } from '../common/constants';

const RushingTableRow = ({ row, index }) => {
    return (
        <tbody>
            <tr key={index} className={'RushingTableRow'} data-testid={'table-row'}>
                {columns.reduce((result, column, index) => {
                    if (column === metricToColumnMap.LongestRushTD) {
                        return result;
                    }

                    let cellData = row[columnToMetricMap[column]];
                    if (column === metricToColumnMap.LongestRush && row['LongestRushTD']) {
                        cellData += 'T';
                    }
                    result.push((
                        <td className={'RushingTableCell'} key={index}>
                            {cellData}
                        </td>
                    ));
                    return result;
                }, [])}
            </tr>
        </tbody>
    )
}

export default RushingTableRow;
