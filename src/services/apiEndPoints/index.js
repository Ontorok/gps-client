export const USERS_API = {
  fetch_all: '/api/users/fetch-all',
  fetch_all_archive: '/api/users/fetch-all-archive'
};

export const ENTRIES_API = {
  fetch_all_grooming_entries: '/api/users/fetch_all_grooming_entries',
  fetch_all_non_grooming_entries: '/api/users/fetch_all_non_grooming_entries',
  fetch_all_invalid_entries: '/api/users/fetch_all_invalid_entries'
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
  delete: '/groomer/delete'
};

export const AUTH_API = {
  login: '/auth/login',
  logout: '/auth/logout',
  get_me: '/auth/get-me',
  refresh: '/auth/refresh'
};
