import { configure } from '@storybook/react';

function loadStories() {
  require('../src/pages/SignIn');

}

configure(loadStories, module);
