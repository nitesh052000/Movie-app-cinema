import React from "react";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className="pagination" style={{ marginTop: 10 }}>
      <Stack spacing={2}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numOfPages}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
