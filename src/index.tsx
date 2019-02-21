import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';

/**
 * Start point for the React application.
 * Renders the App component as a root node for the application.
 */
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);