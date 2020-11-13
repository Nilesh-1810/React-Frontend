import {createStore} from 'redux';
import formReducer from './form/formReducer';

const store = createStore(formReducer);
export default store;