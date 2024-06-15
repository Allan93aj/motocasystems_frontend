// src/redux/actions/searchActions.js
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    payload: query
  });
  

