import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from './store';


ReactDOM.render(
  <Provider   store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

 {/*<div className="home__conatiner">
<div className="banner_content_conatiner">
<h3>Welcome to Ecommmerece</h3>
<h1>Find Amaing Product below</h1>
<a href="">
  scroll
  <button>
    <CgMouse className="mouse__icon" />
  </button>
</a>
</div>
</div> */}