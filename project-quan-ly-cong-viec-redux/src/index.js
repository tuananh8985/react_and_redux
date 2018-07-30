import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


// Tao tạm store trong file index.
import { createStore } from 'redux';
import myReducer from './reducers/index';
import { Provider } from 'react-redux';
const store = createStore(myReducer);
// Kết nối từ react qua redux sử dụng Provider (Store <=>Provider <=>View)
ReactDOM.render(
	// Thực hiện kết nối
	<Provider store = {store}>
		<App />
	</Provider>
	, 
	document.getElementById('root'));
registerServiceWorker();
