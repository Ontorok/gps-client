import Mock from '@fake-db/mock';
import { uniqueId } from 'lodash';
import { CLUB_API } from 'services/apiEndPoints';

const clubDB = {
  clubs: [
    {
      id: uniqueId(),
      clubName: 'Club 01',
      state: true
    },
    {
      id: uniqueId(),
      clubName: 'Club 02',
      state: false
    },
    {
      id: uniqueId(),
      clubName: 'Club 03',
      state: true
    }
  ]
};

Mock.onGet(CLUB_API.fetch_all).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const filtered = clubDB.clubs.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeed: true, totalRows: clubDB.clubs.length, result: filtered }];
});

Mock.onGet(CLUB_API.fetch_all_archive).reply(config => {
  const {
    params: { page, perPage }
  } = config;
  const archiveclubs = clubDB.clubs.filter(user => !user.isActive);
  const filtered = archiveclubs.slice((page - 1) * perPage, (page - 1 + 1) * perPage);
  return [200, { succeed: true, totalRows: archiveclubs.length, result: filtered }];
});
