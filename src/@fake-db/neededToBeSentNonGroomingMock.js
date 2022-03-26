import { NeededToBeSentApi } from "../constants/apiEndPoints";
import mock from "./mock";

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
  {
    id: "104",
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
    id: "105",
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
    id: "106",
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
  {
    id: "107",
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
    id: "108",
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
    id: "109",
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
  {
    id: "110",
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
    id: "111",
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
    id: "112",
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
  {
    id: "113",
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
    id: "114",
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
    id: "115",
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
  {
    id: "116",
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
    id: "117",
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
    id: "118",
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
  {
    id: "119",
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
    id: "120",
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
    id: "121",
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
  {
    id: "122",
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
    id: "123",
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
    id: "124",
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
  {
    id: "125",
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
    id: "126",
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
    id: "127",
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
  {
    id: "128",
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
    id: "129",
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
    id: "130",
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
  {
    id: "131",
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
    id: "132",
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
    id: "133",
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
  {
    id: "134",
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
    id: "135",
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
    id: "136",
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
  {
    id: "137",
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
    id: "138",
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
    id: "139",
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
  {
    id: "140",
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
    id: "141",
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
    id: "142",
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
  {
    id: "143",
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
    id: "144",
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
    id: "145",
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
  {
    id: "146",
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
    id: "147",
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
    id: "148",
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

mock.onGet(NeededToBeSentApi.get).reply((config) => {
  const {
    params: { page, perPage },
  } = config;
  const filtered = data.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeeded: true, data: filtered, total: data.length }];
});