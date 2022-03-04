import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import {createStore} from 'redux';
import parkingReducer from './reducers/parkingReducers';
import { Provider } from 'react-redux';

const store = createStore(parkingReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.querySelector('#root'),
);
