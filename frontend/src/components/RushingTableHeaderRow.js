import React from 'react';

import { columns, columnToMetricMap, metricToColumnMap } from '../common/constants';

const RushingTableHeaderRow = ({ setSort }) => {
    return (
        <tbody>
            <tr className={'RushingTableHeader'}>
                {columns.reduce((result, column, index) => {
                    if (column !== metricToColumnMap.LongestRushTD) {
                        result.push((
                            <th key={index} onClick={() => setSort(columnToMetricMap[column])}>
                                {column}
                            </th>
                        ));
                    }
                    return result;
                }, [])}
            </tr>
        </tbody>
    )
}

export default RushingTableHeaderRow;
