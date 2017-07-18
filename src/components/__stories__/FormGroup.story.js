import React from 'react';
import { storiesOf } from '@storybook/react';
import FormGroup from '../FormGroup';

storiesOf('Form Group', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <FormGroup
          label="Video path"
          id="videoPath"
        />
      </div>
    );
  })
  .add('multiple', () => {
    return (
      <div style={{padding: 20}}>
        <FormGroup
          label="Video path"
          id="videoPath"
        />
        <FormGroup
          label="Video title"
          id="videoTitle"
        />
      </div>
    );
  });
