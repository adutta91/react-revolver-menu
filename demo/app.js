'use strict';

import ReactRevolverMenu from '../src/react-revolver-menu.jsx';
import ReactDOM from 'react-dom';

import { exampleData } from './data';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('revolver-main');
  ReactDOM.render(<ReactRevolverMenu {...exampleData}/>, root)
});
