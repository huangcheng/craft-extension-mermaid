import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app'

import './style.css'

const container = document.querySelector('#react-root');

if (container !== null) {
  const root = createRoot(container);

  root.render(<App />);
}
