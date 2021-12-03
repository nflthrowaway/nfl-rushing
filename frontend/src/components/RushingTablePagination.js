import React from "react";

const RushingTablePagination = ({ page, maxPage, setPage }) => {
    return (
        <div className="PaginationButtons">
            <button disabled={page===0} onClick={() => setPage(page-1)}>
                Prev
            </button>
                {`Page ${page+1} of ${maxPage}`}
            <button disabled={page+1 === maxPage} onClick={() => setPage(page+1)}>
                Next
            </button>
        </div>
    );
};

export default RushingTablePagination;