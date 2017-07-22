import React from 'react';
import { storiesOf } from '@storybook/react';
import EmptyPrompt from '../EmptyPrompt';

storiesOf('Empty Prompt', module)
  .add('default', () => {
    return (
      <EmptyPrompt
        title="Hey, you don't have any videos yet."
        text="Get started and upload one now!"
        buttonText="Upload a video"
        onButtonClick={() => console.log('clicked')}
      />
    );
  });
