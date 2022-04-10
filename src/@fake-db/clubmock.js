import { ClubApi, UsersApi } from "../constants/apiEndPoints";
import mock from "./mock";

const data = [
  {
    editMode: false,
    id: 1,
    name: "Club 1",
    selected: false,
  },
  {
    editMode: false,
    id: 2,
    name: "Club 2",
    selected: false,
  },
  {
    editMode: false,
    id: 3,
    name: "Club 3",
    selected: false,
  },
  {
    editMode: false,
    id: 4,
    name: "Club 4",
    selected: false,
  },
  {
    editMode: false,
    id: 5,
    name: "Club 5",
    selected: false,
  },
];

mock.onGet(ClubApi.get).reply((config) => {
  const {
    params: { page, perPage },
  } = config;
  const filtered = data.slice((page - 1) * perPage, (page - 1 + 1) * perPage);

  return [200, { succeeded: true, data: filtered, total: data.length }];
});

mock.onDelete(UsersApi.delete_range).reply((config) => {
  const {
    params: { selectedRows },
  } = config;

  const rowIds = selectedRows.map((row) => row.id);
  const filteredData = data.filter((item) => !rowIds.includes(item.id));

  return [
    200,
    { succeeded: true, data: filteredData, total: filteredData.length },
  ];
});
