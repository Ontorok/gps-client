import { TableCell, TableRow } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import ActionButtonGroup from "../../components/ActionButtonGroup";
import CustomTable from "../../components/CustomTable";
import { NeededToBeSentApi } from "../../constants/apiEndPoints";
import withSortBy from "../../hoc/withSortedBy";
import { axiosInstance } from "../../services/config";
import { columns } from "./utils";

const NeededToBeSentNonGrooming = ({ sortedColumn, sortedBy, onSort }) => {
  const [state, setstate] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(NeededToBeSentApi.get, {
          params: { page, perPage },
        });
        setstate(res.data.data);
        setTotalRows(res.data.total);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [page, perPage]);

  const onPageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setCheckedAll(false);
    setCheckedItems([]);
  };

  const onPerPageChange = (e) => {
    setPerPage(e.target.value);
    setPage(1);
    setCheckedAll(false);
    setCheckedItems([]);
  };

  const onRowSelectionChange = (e, rowIndex) => {
    const { checked } = e.target;
    const _state = _.cloneDeep(state);
    let _checkedItems = [...checkedItems];
    const targetedObj = _state[rowIndex];
    targetedObj.selected = checked;
    if (checked) {
      _checkedItems.push(targetedObj);
    } else {
      _checkedItems = checkedItems.filter((item) => item.id !== targetedObj.id);
    }
    _state[rowIndex] = targetedObj;
    setCheckedAll(_state.every((item) => item.selected));
    setCheckedItems(_checkedItems);
    setstate(_state);
  };

  const onCheckedAllChange = (e) => {
    const { checked } = e.target;
    if (checked) {
      const _checkedItems = [...state];
      _checkedItems.forEach((item) => (item.selected = true));
      setCheckedItems(_checkedItems);
    } else {
      const _checkedItems = [...state];
      _checkedItems.forEach((item) => (item.selected = false));
      setCheckedItems([]);
    }
    setCheckedAll(checked);
  };

  return (
    <div>
      <CustomTable
        data={state}
        columns={columns}
        count={Math.ceil(totalRows / perPage)}
        onPageChange={onPageChange}
        perPage={perPage}
        onPerPageChange={onPerPageChange}
        sortedColumn={sortedColumn}
        sortedBy={sortedBy}
        onSort={onSort}
        checkedItems={checkedItems}
        checkedAll={checkedAll}
        onCheckedAllChange={onCheckedAllChange}
      >
        {state.map((row, index) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={row.selected}
                onChange={(e) => onRowSelectionChange(e, index)}
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="left">{row.date}</TableCell>
            <TableCell align="left">{row.trail}</TableCell>
            <TableCell align="left">{row.operator}</TableCell>
            <TableCell align="center">{row.laborHours}</TableCell>
            <TableCell align="left">{row.equiment1}</TableCell>
            <TableCell align="left">{row.equiment2}</TableCell>
            <TableCell align="left">{row.equiment3}</TableCell>
            <TableCell align="left">{row.equiment4}</TableCell>
            <TableCell align="center">{row.subTotal}</TableCell>
            <TableCell align="center">{row.total}</TableCell>
            <TableCell align="center">
              <ActionButtonGroup
                appearedViewButton
                appearedDeleteButton
                appearedEditButton
                onView={() => console.log(row)}
                onEdit={() => console.log(row)}
                onDelete={() => console.log(row)}
              />
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </div>
  );
};

export default withSortBy(NeededToBeSentNonGrooming, "id");
