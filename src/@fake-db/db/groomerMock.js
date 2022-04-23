import Mock from '@fake-db/mock';
import { uniqueId } from 'lodash';
import { GROOMER_API } from 'services/apiEndPoints';

const grommerDB = {
  groomers: [
    {
      id: uniqueId(),
      clubName: 'Club 01',
      groomerName: 'Grommer 01',
      groomerGPSId: 'Gps Id 01',
      rate: 250
    },
    {
      id: uniqueId(),
      clubName: 'Club 02',
      groomerName: 'Grommer 02',
      groomerGPSId: 'Gps Id 02',
      rate: 250
    },
    {
      id: uniqueId(),
      clubName: 'Club 01',
      groomerName: 'Grommer 03',
      groomerGPSId: 'Gps Id 03',
      rate: 250
    }
  ]
};

Mock.onGet(GROOMER_API.fetch_all).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const filtered = grommerDB.groomers.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeed: true, totalRows: grommerDB.groomers.length, result: filtered }];
});

Mock.onGet(GROOMER_API.fetch_all_archive).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const archivegroomer = grommerDB.groomers.filter(grom => !grom.isActive);
  const filtered = archivegroomer.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeed: true, totalRows: archivegroomer.length, result: filtered }];
});
