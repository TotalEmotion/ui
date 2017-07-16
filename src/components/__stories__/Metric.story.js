import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import Metric from '../Metric';

storiesOf('Metric', module)
  .add('One', () => {
    return (
      <div style={{padding: 20}}>
        <Metric
          name="Total views"
          result={1493}
        />
      </div>
    );
  })
  .add('Many', () => {
    return (
      <div style={{padding: 20}}>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <Metric
                name="Total views"
                result={1493}
              />
            </div>
            <div className="col-sm-4">
              <Metric
                name="Average attention"
                result={'56.12%'}
              />
            </div>
            <div className="col-sm-4">
              <Metric
                name="Valence"
                result={'31.95%'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  });
