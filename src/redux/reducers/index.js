// reducers.js
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import Auth from './Auth';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: Auth

})
export default createRootReducer