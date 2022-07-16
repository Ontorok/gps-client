export const USERS_API = {
  create: '/auth/register',
  fetch_all: '/auth/fetch-all',
  fetch_all_archive: '/auth/fetch-all-archive'
};

export const ENTRIES_API = {
  fetch_knack: `/entries/fetch-knack`,
  fetch_all_funded: '/entries/fetch-all-funded-entries',
  fetch_all_non_funded: '/entries/fetch-all-non-funded-entries',
  fetch_all_invalid_entries: '/entries/fetch-all-invalid-entries',
  create: '/entries/save-entries-by-user'
};

export const CLUB_API = {
  fetch_all: '/club/fetch-all',
  fetch_all_archive: '/club/fetch-all-archive',
  fetch_all_active: '/club/fetch-all-active',
  create: '/club/create',
  update: '/club/update',
  delete: '/club/delete',
  reStore: '/club/re-store'
};

export const GROOMER_API = {
  fetch_all: '/groomer/fetch-all',
  fetch_all_archive: '/groomer/fetch-all-archive',
  create: '/groomer/create',
  update: '/groomer/update',
  delete: '/groomer/delete',
  reStore: '/groomer/re-store'
};

export const AUTH_API = {
  login: '/auth/login',
  logout: '/auth/logout',
  get_me: '/auth/get-me',
  refresh: '/auth/refresh'
};
