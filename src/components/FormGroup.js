import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  setPropTypes,
  defaultProps,
  withProps,
} from 'recompose';
import Label from './Label';
import Input from './Input';
import Notice from './Notice';
import r from 'ramda';
import rA from 'ramda-adjunct';

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      marginBottom: 25,
    },
    control: {
      marginTop: 10,
    },
  },
  flush: {
    root: {
      marginBottom: 0,
    },
  },
}, {
  flush: props.flush,
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
  setPropTypes({
    label: PropTypes.node,
    control: PropTypes.element,
    flush: PropTypes.bool,
    status: PropTypes.string,
    notice: PropTypes.string,
  }),
  defaultProps({
    control: Input,
    flush: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureLabel);
