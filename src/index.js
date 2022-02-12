import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';

import './styles/index.scss';
import App from './App';
import store from './store/store';
import './icons';

const touchBackendOptions = {
  enableMouseEvents: true,
  delayTouchStart: 100
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={TouchBackend} options={touchBackendOptions}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
