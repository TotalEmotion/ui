import React from 'react';
import { storiesOf } from '@storybook/react';
import FormGroup from '../FormGroup';
import { Status } from '../Notice';

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
  .add('with notice', () => {
    return (
      <div style={{padding: 20}}>
        <FormGroup
          label="Video path"
          id="videoPath"
          notice="Looks like something went wrong"
          status={Status.ERROR}
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
