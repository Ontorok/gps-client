import Mock from '@fake-db/mock';
import { ENTRIES_API } from 'services/apiEndPoints';

const entriesDB = {
  entries: [
    {
      id: '101',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '102',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '103',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '104',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '105',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '106',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '107',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '108',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '109',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '110',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '111',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '112',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '113',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '114',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '115',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '116',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '117',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '118',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '119',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '120',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '121',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '122',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '123',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '124',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '125',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '126',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '127',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '128',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '129',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '130',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '131',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '132',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '133',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '134',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '135',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '136',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '137',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '138',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '139',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '140',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '141',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '142',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '143',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '144',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '145',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '146',
      date: '2022-03-25',
      trail: 'Trail1',
      operator: 'operator101',
      laborHours: 4,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 10,
      total: 20,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '147',
      date: '2022-03-25',
      trail: 'Trail2',
      operator: 'operator102',
      laborHours: 8,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 20,
      total: 40,
      selected: false,
      fundStatus: 'Funded'
    },
    {
      id: '148',
      date: '2022-03-25',
      trail: 'Trail3',
      operator: 'operator103',
      laborHours: 12,
      equiment1: 'equipment1',
      equiment2: 'equipment2',
      equiment3: 'equipment3',
      equiment4: 'equipment4',
      subTotal: 60,
      total: 120,
      selected: false,
      fundStatus: 'Funded'
    }
  ]
};

// For Grooming Entries
Mock.onGet(ENTRIES_API.fetch_all_non_funded).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const grooming = entriesDB.entries.filter(groom => parseInt(groom.id) >= 101 && parseInt(groom.id) <= 125);
  const filtered = grooming.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeeded: true, data: filtered, total: grooming.length }];
});

// For Non Grooming Entries
Mock.onGet(ENTRIES_API.fetch_all_non_funded).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const nongrooming = entriesDB.entries.filter(groom => parseInt(groom.id) >= 126 && parseInt(groom.id) <= 140);
  const filtered = nongrooming.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeeded: true, data: filtered, total: nongrooming.length }];
});

// For Invalid Entries
Mock.onGet(ENTRIES_API.fetch_all_invalid_entries).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const invalid = entriesDB.entries.filter(groom => parseInt(groom.id) >= 141);
  const filtered = invalid.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeeded: true, data: filtered, total: invalid.length }];
});
