import React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Dropdown, { Status } from '../Dropdown';

storiesOf('Dropdown', module)
  .add('default', () => {
    return (
      <div style={{padding: 20}}>
        <Dropdown
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
        <Dropdown
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
