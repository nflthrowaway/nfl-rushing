import React, { useEffect, useState } from 'react';

import RushingYardsClient from '../clients/RushingYardsClient';
import { columns, columnToMetricMap, metrics, metricToColumnMap } from '../common/constants';
import RushingTableHeaderRow from './RushingTableHeaderRow';
import RushingTablePagination from './RushingTablePagination';
import RushingTableRow from './RushingTableRow';
import RushingTableToolbar from './RushingTableToolbar';

const RushingTable = () => {
    const [loading, setLoading] = useState(true);
    const [rushingData, setRushingData] = useState([]);
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [sortBy, setSortBy] = useState(columnToMetricMap['Player']);
    const [sortDirection, setSortDirection] = useState(1);
    const [filter, setFilter] = useState('');

    const paginationLimit = 20;
    const exportCsvPaginationLimit = 100;
    const itemDelimiter = ',';
    const rowDelimiter = '\n';

    const client = new RushingYardsClient();

    // Load data at start and when table changes occur (page, sort)
    useEffect(() => {
        client.getRushingData(paginationLimit, paginationLimit*page, sortBy, sortDirection, filter).then((data) => {
        setRushingData(data.results);
        setMaxPage(calculateMaxPage(data.total));
        setLoading(false);
        }).catch(err => console.log(err));
    }, [page, sortBy, sortDirection]);

    // Fetch data and reset page info when filtering
    const filterButtonOnClick = () => {
        client.getRushingData(paginationLimit, paginationLimit*page,  sortBy, sortDirection, filter).then((data) => {
        setRushingData(data.results);
        setPage(0);
        setMaxPage(calculateMaxPage(data.total));
        }).catch(err => console.log(err));
    };

    const convertRushingDataToCsvData = (rushingData, csvData) => {
        rushingData.forEach((item) => {
            // Reduce so we can combine LongestRush and LongestRushTD columns
            const reducedData = columns.reduce((result, column) => {
                if (column === metricToColumnMap.LongestRushTD) {
                    return result;
                }

                let itemData = item[columnToMetricMap[column]];
                if (column === metricToColumnMap.LongestRush && item['LongestRushTD']) {
                    itemData += 'T';
                }
                result.push(itemData);
                return result;
            }, []);
            csvData += reducedData.join(itemDelimiter) + rowDelimiter;
        });
        return csvData;
    }

    const downloadButtonOnClick = () => {
        let csvData = columns.filter(column => column !== metricToColumnMap.LongestRushTD).join(itemDelimiter) + rowDelimiter;
        let skip = 0;
        let rushingData;
        let total = 0;
        const promises = [];

        // First fetch to get total results at same time
        client.getRushingData(exportCsvPaginationLimit, skip, sortBy, sortDirection, filter).then((data) => {
            rushingData = data.results;
            total = data.total;
            csvData = convertRushingDataToCsvData(rushingData, csvData);
            skip += exportCsvPaginationLimit;
        
            // Get rest of pages by building promise array then executing
            while (skip < total) {
                promises.push(client.getRushingData(exportCsvPaginationLimit, skip, sortBy, sortDirection, filter).then((data) => {
                rushingData = data.results;
                csvData = convertRushingDataToCsvData(rushingData, csvData);
                }).catch(err => console.log(err)));
                skip += exportCsvPaginationLimit;
            }
        
            Promise.all(promises).then(() => {
                csvData = encodeURIComponent(csvData);
                csvData = 'data:text/csv;charset=utf-8,'+ csvData;
                const fileName = 'rushingData.csv';

                const downloadLink = document.createElement('a');
                downloadLink.setAttribute('href', csvData);
                downloadLink.setAttribute('download', fileName);
                downloadLink.click();
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    };

    const calculateMaxPage = (totalResults) => {
        return Math.ceil(totalResults/paginationLimit);
    };

    const setSortByOnColumnClick = (metric) => {
        if (metrics.includes(metric)) {
            if (sortBy ===  metric) {
                setSortDirection(sortDirection*-1);
            }
            setSortBy(metric);
        }
    }

    return (
        <div className="TotalContainer">
            {loading ? 'Loading...' : (
                <div>
                    <RushingTableToolbar filterButtonOnClick={filterButtonOnClick} downloadButtonOnClick={downloadButtonOnClick} setFilter={setFilter}/>
                    <div className="TableContainer" data-testid={'table'}>
                        <div className='RushingTable'>
                            <table>
                                <colgroup>
                                    {columns.reduce((result, column, index) => {
                                        if (column !== metricToColumnMap.LongestRushTD) {
                                            result.push((
                                                <col key={index} className={`RushingTableColumn_${column}`}/>
                                            ));
                                        }
                                        return result;
                                    }, [])}
                                </colgroup>
                                <RushingTableHeaderRow setSort={setSortByOnColumnClick}/>
                                {rushingData.map((row, index) => (
                                    <RushingTableRow row={row} key={index}/>
                                ))}
                            </table>
                        </div>
                        <RushingTablePagination page={page} maxPage={maxPage} setPage={setPage}/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RushingTable;
