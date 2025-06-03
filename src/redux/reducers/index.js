import { combineReducers } from 'redux';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    product: productReducer,
});
console.log('Root reducer initialized:', rootReducer);
export default rootReducer;
