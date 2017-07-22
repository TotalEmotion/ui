import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, color } from '@storybook/addon-knobs';
import CompanyLogo from '../CompanyLogo';

storiesOf('Company Logo', module)
  .add('default', () => {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <CompanyLogo
          height={number('Height', 50)}
        />
      </div>
    );
  })
  .add('with fill', () => {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <CompanyLogo
          height={number('Height', 50)}
          fill={color('Color', '#2979ff')}
        />
      </div>
    );
  });
