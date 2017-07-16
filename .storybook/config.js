import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

function loadStories() {
  require('../src/components/__stories__/Toggle.story.js');
  require('../src/components/__stories__/Progress.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
