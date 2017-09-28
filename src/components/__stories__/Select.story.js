import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Select, { Status } from '../Select';

storiesOf('Select', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Select
          options={[
            {
              label: 'One',
              value: 1,
            },
            {
              label: 'Two',
              value: 2,
            },
          ]}
          status={select('Status', Status, Status.OK)}
        />
      </div>
    );
  })
  .add('with value', () => {
    return (
      <div style={{padding: 20}}>
        <Select
          id="foo"
          value={1}
          options={[
            {
              label: 'One',
              value: 1,
            },
            {
              label: 'Two',
              value: 2,
            },
          ]}
          status={select('Status', Status, Status.OK)}
        />
      </div>
    );
  });
