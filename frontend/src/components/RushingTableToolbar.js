import React from "react";

const RushingTableToolbar = ({ filterButtonOnClick, downloadButtonOnClick, setFilter }) => {
    return (
        <div className="Toolbar">
            <div className="FilterContainer">
                <input type="text" id="filtername" name="filtername" placeholder="Filter By Name" onChange={(e) => setFilter(e.target.value)} />
                <button type="button" onClick={filterButtonOnClick}>Filter</button>
            </div>
            <div className="DownloadContainer">
                <button type="button" onClick={downloadButtonOnClick}>Download CSV</button>
            </div>
        </div>
    );
};

export default RushingTableToolbar;