import { configure } from '@storybook/react';
import '../src/index.css';

function loadStories() {
  require('../src/pages/SignIn');

}

configure(loadStories, module);
