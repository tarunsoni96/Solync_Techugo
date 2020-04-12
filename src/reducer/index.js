import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
const allReducers = combineReducers({
    loginData: loginReducer
})
export default allReducers;