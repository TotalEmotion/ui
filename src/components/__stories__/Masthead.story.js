import React from 'react';
import { storiesOf } from '@storybook/react';
import Masthead from '../Masthead';
import CompanyLogo from '../CompanyLogo';

storiesOf('Masthead', module)
  .add('default', () => {
    return (
      <Masthead>
        Fill me with anything
      </Masthead>
    );
  })
  .add('with content', () => {
    return (
      <Masthead>
        <div style={{
          marginLeft: 20,
          marginRight: 20,
          paddingTop: 20,
          paddingBottom: 20,
        }}
        >
          <CompanyLogo
            fill="#ffffff"
            height={30}
          />
        </div>
      </Masthead>
    );
  });
