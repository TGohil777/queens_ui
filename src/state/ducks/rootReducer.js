import { combineReducers } from 'redux';
import authReducer from './auth';
import menuReducer from './menu';
import practiceReducer from './practice'
import logoReducer from './logo'

export default combineReducers({
    auth: authReducer,
    menu: menuReducer,
    practice: practiceReducer,
    logo: logoReducer
});