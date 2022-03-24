import { createStore, applyMiddleware, compose } from 'redux';
import Reducer from './reducer/reducer';
import thunk from "redux-thunk";

const Store =  createStore(Reducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default Store