/* global require */
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { StyleRoot } from 'radium';
import css from '!raw-loader!sass-loader!../scss/main.scss';
import {
  HeadingRoot,
  HeadingSection,
} from '@team-griffin/react-heading-section';

addDecorator(withKnobs);

addDecorator(function(getStory) {
  const story = getStory();
  return (
    <StyleRoot>
      <style>
        {css}
      </style>
      <HeadingRoot>
        <HeadingSection>
          {story}
        </HeadingSection>
      </HeadingRoot>
    </StyleRoot>
  );
});

function loadStories() {
  require('../src/components/__stories__/Masthead.story.js');
  require('../src/components/__stories__/CompanyLogo.story.js');
  require('../src/components/__stories__/CompanyIcon.story.js');
  require('../src/components/__stories__/PrimaryNavigation.story.js');
  require('../src/components/__stories__/Header.story.js');
  require('../src/components/__stories__/SecondaryNavigationRibbon.story.js');
  require('../src/components/__stories__/Toggle.story.js');
  require('../src/components/__stories__/TextToggle.story.js');
  require('../src/components/__stories__/Progress.story.js');
  require('../src/components/__stories__/Input.story.js');
  require('../src/components/__stories__/Label.story.js');
  require('../src/components/__stories__/FormGroup.story.js');
  require('../src/components/__stories__/Metric.story.js');
  require('../src/components/__stories__/Panel.story.js');
  require('../src/components/__stories__/Button.story.js');
  require('../src/components/__stories__/VideoCard.story.js');
  require('../src/components/__stories__/Footer.story.js');
  require('../src/components/__stories__/ProcessingIcon.story.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
