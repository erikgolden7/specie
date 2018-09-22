import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();

// componentWillMount() {} // is run before mounting. setState won't trigger re-render. avoid side-effects or subscriptions
// componentDidMount() {} // is run after mounting. target DOM nodes here. load async data here.
// componentWillReceiveProps(nextProps) {} // is run before props changed or parent triggers rerender. use to setState. may run when new props aren't received.
// shouldComponentUpdate(nextProps, nextState) {} // is run before props or state change triggers rerender. return false to stop component rerender
// componentWillUpdate(nextProps, nextState) {} // is run after new props or state are received and comp will rerender. can't call setState
// componentDidUpdate() {} // is run after initial rerender. operate on DOM. make network requests if state or props changed
// componentWillUnmount() {} // is run after component unmounts. cancel timers, event listeners, network requests, destroy manually created DOM elements, etc...
