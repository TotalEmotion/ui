import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import SecondaryNavigationRibbon from '../SecondaryNavigationRibbon';

storiesOf('Secondary Navigation Ribbon', module)
  .add('default', () => {
    const active = select('Active Link', {
      statistics: 'statistics',
      logistics: 'logistics',
      recorder: 'recorder',
    }, 'statistics');

    return (
      <SecondaryNavigationRibbon
        links={[
          {
            href: '/statistics',
            text: 'statistics',
            active: active === 'statistics',
          },
          {
            href: '/logistics',
            text: 'Logistics',
            active: active === 'logistics',
          },
          {
            href: '/recorder',
            text: 'Recorder',
            active: active === 'recorder',
          },
        ]}
      />
    );
  });
