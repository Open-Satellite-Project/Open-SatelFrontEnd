import { combineReducers, createStore } from 'redux';
import hospitalReducer from './hospitalReducer';

const rootReducer = combineReducers({
    Hospital: hospitalReducer,
})

const store = createStore(rootReducer);
export default store;