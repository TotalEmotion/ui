import React, { createElement } from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import Label from './Label';
import Input from './Input';
import Notice from './Notice';
import r from 'ramda';
import rA from 'ramda-adjunct';

const stylesheet = () => reactCSS({
  default: {
    root: {
      marginBottom: 25,
    },
    control: {
      marginTop: 10,
    },
  },
});

export const PureLabel = ({
  styles,
  label,
  id,
  control,
  notice,
  status,
  ...inputProps
}) => (
  <fieldset style={styles.root}>
    <Label htmlFor={id}>
      {label}
    </Label>
    <div style={styles.control}>
      {createElement(control, {
        id,
        ...inputProps,
      })}
      {}
    </div>
    {r.when(
      rA.isNotNil,
      r.always(
        <Notice
          status={status}
          text={notice}
        />
      )
    )(notice)}
  </fieldset>
);

export const enhance = compose(
  setDisplayName('FormGroup'),
  defaultProps({
    control: Input,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureLabel);
