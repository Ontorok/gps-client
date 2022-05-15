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
  create: '/club/create',
  update: '/club/update',
  delete: '/club/delete'
};

export const GROOMER_API = {
  fetch_all: '/api/grommer/fetch-all',
  fetch_all_archive: '/api/grommer/fetch-all-archive'
};

export const AUTH_API = {
  login: '/auth/login',
  logout: '/auth/logout',
  get_me: '/auth/get-me',
  refresh: '/auth/refresh'
};
