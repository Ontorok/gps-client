export const USERS_API = {
  fetch_all_active: '/users/fetch-active-users',
  fetch_all_archive: '/users/fetch-archive-users',
  delete_user: id => `/users/delete-user/${id}`,
  reStore_user: id => `/users/restore-user/${id}`,
  resetPassword: () => `/users/reset-password`
};

export const ENTRIES_API = {
  fetch_knack: `/entries/fetch-knack`,
  fetch_all_funded: '/entries/fetch-all-funded-entries',
  fetch_all_non_funded: '/entries/fetch-all-non-funded-entries',
  fetch_all_invalid_entries: '/entries/fetch-all-invalid-entries',
  create: '/entries/save-entries-by-user',
  change_validity: '/entries/change-validity'
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
  create: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
  get_me: '/auth/get-me',
  refresh: '/auth/refresh',
  change_password: '/auth/change-password'
};
