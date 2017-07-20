import React from 'react';
import { storiesOf } from '@storybook/react';
import MediaHero from '../MediaHero';

storiesOf('Media Hero', module)
  .add('Default', () => {
    return (
      <div>
        <MediaHero
          mediaSrc="//placebeyonce.com/1200-350"
          title="Maui By Air The Best Way Around The Island"
          date="08 Jun 2017"
        />
      </div>
    );
  });
