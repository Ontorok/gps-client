import { SORT_TYPES } from 'constants/SortTypes';
import React, { useState } from 'react';

const withSort = (OriginalComponent, initialSortedColumn, initialSortBy = SORT_TYPES.Asc) => {
  const ModifiedComponent = () => {
    const [sortedBy, setSortedBy] = useState(initialSortBy);
    const [sortedColumn, setSortedColumn] = useState(initialSortedColumn);

    const onSort = cellName => {
      const isAsc = sortedColumn === cellName && sortedBy === SORT_TYPES.Asc;
      setSortedBy(isAsc ? SORT_TYPES.Desc : SORT_TYPES.Asc);
      setSortedColumn(cellName);
    };

    return <OriginalComponent sortedBy={sortedBy} sortedColumn={sortedColumn} onSort={onSort} />;
  };
  return ModifiedComponent;
};

export default withSort;
