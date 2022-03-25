import { TableCell, TableRow } from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import CustomTable from "../../components/CustomTable";
import withSortBy from "../../hoc/withSortedBy";

const data = [
  {
    id: "101",
    date: "2022-03-25",
    trail: "Trail1",
    operator: "operator101",
    laborHours: 4,
    equiment1: "equipment1",
    equiment2: "equipment2",
    equiment3: "equipment3",
    equiment4: "equipment4",
    subTotal: 10,
    total: 20,
    selected: false,
  },
  {
    id: "102",
    date: "2022-03-25",
    trail: "Trail2",
    operator: "operator102",
    laborHours: 8,
    equiment1: "equipment1",
    equiment2: "equipment2",
    equiment3: "equipment3",
    equiment4: "equipment4",
    subTotal: 20,
    total: 40,
    selected: false,
  },
  {
    id: "103",
    date: "2022-03-25",
    trail: "Trail3",
    operator: "operator103",
    laborHours: 12,
    equiment1: "equipment1",
    equiment2: "equipment2",
    equiment3: "equipment3",
    equiment4: "equipment4",
    subTotal: 60,
    total: 120,
    selected: false,
  },
];

const columns = [
  {
    name: "id",
    sortName: "id",
    label: "ID",
    align: "left",
    minWidth: 80,
    isDisableSorting: false,
  },
  {
    name: "date",
    sortName: "date",
    label: "Date",
    align: "left",
    minWidth: 115,
    isDisableSorting: false,
  },
  {
    name: "trail",
    sortName: "trail",
    label: "Trail",
    align: "left",
    isDisableSorting: false,
  },
  {
    name: "operator",
    sortName: "operator",
    label: "Operator",
    align: "left",
    minWidth: 100,
    isDisableSorting: false,
  },
  {
    name: "laborHours",
    sortName: "laborHours",
    label: "Labour Hours",
    align: "center",
    minWidth: 160,
    isDisableSorting: false,
  },
  {
    name: "equiment1",
    sortName: "equiment1",
    label: "Equipment #1",
    align: "left",
    minWidth: 170,
    isDisableSorting: false,
  },
  {
    name: "equiment2",
    sortName: "equiment2",
    label: "Equipment #2",
    align: "left",
    minWidth: 170,
    isDisableSorting: false,
  },
  {
    name: "equiment3",
    sortName: "equiment3",
    label: "Equipment #3",
    align: "left",
    minWidth: 170,
    isDisableSorting: false,
  },
  {
    name: "equiment4",
    sortName: "equiment4",
    label: "Equipment #4",
    align: "left",
    minWidth: 170,
    isDisableSorting: false,
  },
  {
    name: "subTotal",
    sortName: "subTotal",
    label: "Sub Total",
    align: "center",
    minWidth: 130,
    isDisableSorting: false,
  },
  {
    name: "total",
    sortName: "total",
    label: "Total",
    align: "center",
    minWidth: 100,
    isDisableSorting: false,
  },
];
const NeededToBeSentNonGrooming = ({ sortedColumn, sortedBy, onSort }) => {
  const [state, setstate] = useState(data);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const onRowSelectionChange = (e, rowIndex) => {
    const { checked } = e.target;
    const _state = _.cloneDeep(state);
    let _checkedItems = [...checkedItems];
    const targetedObj = _state[rowIndex];
    targetedObj.selected = checked;
    if (checked) {
      _checkedItems.push(targetedObj);
    } else {
      _checkedItems = checkedItems.filter(
        (item) => item.name !== targetedObj.name
      );
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
    <>
      <CustomTable
        data={data}
        columns={columns}
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
          </TableRow>
        ))}
      </CustomTable>
    </>
  );
};

export default withSortBy(NeededToBeSentNonGrooming, "name");
