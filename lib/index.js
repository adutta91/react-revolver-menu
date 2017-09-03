module.exports = require('./react-revolver-menu.jsx');

import ReactRevolverMenu from './react-revolver-menu.jsx';
import ReactDOM from 'react-dom';

import { exampleData } from './example/data';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('revolver-main');
  ReactDOM.render(<ReactRevolverMenu />, root)
});
