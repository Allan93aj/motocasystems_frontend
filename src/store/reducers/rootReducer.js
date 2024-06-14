import { combineReducers } from 'redux';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  search: searchReducer
  // outros reducers aqui
});

export default rootReducer;
