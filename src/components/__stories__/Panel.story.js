import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import Panel from '../Panel';

storiesOf('Panel', module)
  .add('One', () => {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <Panel
          gutter={boolean('Gutter', true)}
        >
          <div
            style={{
              backgroundColor: '#4a90e2',
              padding: 10,
            }}
          >
            {'I can also go full-bleed with no gutter'}
          </div>
        </Panel>
      </div>
    );
  })
  .add('Many', () => {
    return (
      <div
        style={{
          padding: 20,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Panel>
                {'A panel'}
              </Panel>
            </div>
            <div className="col-sm-4">
              <Panel>
                {'Another'}
              </Panel>
            </div>
            <div className="col-sm-4">
              <Panel>
                {'Me 3'}
              </Panel>
            </div>
          </div>
        </div>
      </div>
    );
  });
