import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  defaultProps,
  withProps,
} from 'recompose';
import { Style } from 'radium';
import ReactSelect from 'react-select';
import { InlineSVG } from '@team-griffin/react-inline-svg';
import longhand from '@team-griffin/css-longhand';
import cssSides, { Side } from '@team-griffin/css-sides';
import r from 'ramda';
import { palette } from '../constants/css';
import color from 'color';
import arrow from '!svg-inline-loader!../assets/arrow.svg';

export const Status = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  OK: 'OK',
};

const stylesheet = (props) => reactCSS({
  default: {
    select: {
      position: 'relative',
      ...longhand('font', {
        weight: 400,
      }),
    },

    control: {
      ...longhand('border', {
        width: 1,
        style: 'solid',
        spacing: 0,
        collapse: 'separate',
      }),
      backgroundColor: '#fff',
      borderColor: '#d6d6d6',
      color: '#333',
      cursor: 'default',
      display: 'table',
      outline: 'none',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',

    },

    controlFocusedNotOpen: {
      borderColor: 'grey',
      boxShadow: '0 0 6px rgba(0,0,0,0.5)',
    },

    placeholder: {
      ...longhand('font', {
        weight: 400,
      }),
      ...cssSides('padding', Side.A, 8),
      color: '#aaa',
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    input: {
      ...longhand('font', {
        weight: 400,
      }),
      ...cssSides('padding', Side.A, 8),
      verticalAlign: 'middle',
    },

    inputElement: {
      width: '100%',
      background: 'none transparent',
      ...longhand('border', {
        width: 0,
        style: 'none',
      }),
      boxShadow: 'none',
      cursor: 'default',
      display: 'inline-block',
      ...longhand('font', {
        family: 'inherit',
        size: 'inherit',
      }),
      ...cssSides('margin', Side.A, 0),
      outline: 'none',
      lineHeight: '14px',
    },

    arrowZone: {
      height: '100%',
      cursor: 'pointer',
      display: 'table-cell',
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle',
      width: 25,
      paddingRight: 8,
      fill: palette.jadeGreen,
    },

    arrow: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 40,
      height: 40,
      ...longhand('margin', {
        top: -20,
        left: -30,
      }),
    },

    value: {
      ...longhand('font', {
        weight: 400,
      }),
      ...cssSides('padding', Side.X, 8),
      color: '#666',
      bottom: '0',
      left: '0',
      paddingTop: 8,
      position: 'absolute',
      right: '0',
      top: '0',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    menuOuter: {
      ...longhand('border', {
        width: 1,
        style: 'solid',
        radius: 0,
      }),
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.06)',
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderTopColor: '#e6e6e6',
      boxSizing: 'border-box',
      marginTop: '-1px',
      maxHeight: '200px',
      position: 'absolute',
      top: '100%',
      width: '100%',
      zIndex: '1',
      WebkitOverflowScrolling: 'touch',
    },

    option: {
      color: palette.gunmetal,
      ...longhand('font', {
        weight: 400,
      }),
      borderRadius: 0,
      ...cssSides('padding', Side.A, 8),
    },

    optionSelected: {
      backgroundColor: color(palette.clearBlue).alpha(0.08),
      fontWeight: 600,
    },

    optionFocused: {
      backgroundColor: color(palette.clearBlue).alpha(0.04),
    },

    optionDisabled: {
      backgroundColor: color(palette.clearBlue).alpha(0.03),
      opacity: 0.3,
    },

    noresults: {
      ...longhand('font', {
        weight: 400,
      }),
      ...cssSides('padding', Side.A, 8),
      color: palette.battleshipGrey,
      borderRadius: 0,
    },
  },

  disabled: {
    control: {
      backgroundColor: palette.gunmetal,
      opacity: 0.3,
      cursor: 'not-allowed',
    },
    input: {
      height: 38,
    },
  },
},
{
  disabled: r.equals(props.disabled, true),
}, props);

const Arrow = () => (<InlineSVG src={arrow}/>);

export const PureSelect = ({
  styles,
  ...selectProps
}) => (
  <div>
    <Style
      scopeSelector=".Select"
      rules={{
        ...styles.select,
        '.Select-control': styles.control,
        '.Select-placeholder': styles.placeholder,
        '.Select-input': styles.input,
        '.Select-input > input': styles.inputElement,
        // eslint-disable-next-line max-len
        '.is-focused:not(.is-open) > .Select-control': styles.controlFocusedNotOpen,
        '.Select-value': styles.value,
        '.Select-menu-outer': styles.menuOuter,
        '.Select-option': styles.option,
        '.Select-option.is-selected': styles.optionSelected,
        '.Select-option.is-focused': styles.optionFocused,
        '.Select-option.is-disabled': styles.optionDisabled,
        '.Select-noresults': styles.noresults,
        '.Select-arrow-zone': styles.arrowZone,
        '.Select-arrow-zone > i': styles.arrow,
      }}
    />
    <Style
      scopeSelector=".Select.is-open"
      rules={{
        '.Select-control': styles.controlOpen,
      }}
    />
    <Style
      scopeSelector=".Select.is-disabled"
      rules={{
        ...styles.select,
        '.Select-control': styles.control,
        '.Select-input': styles.input,
      }}
    />
    <ReactSelect
      arrowRenderer={Arrow}
      {...selectProps}
    />
  </div>
);


export const enhance = compose(
  setDisplayName('Select'),
  defaultProps({
    type: 'text',
    status: Status.OK,
    clearable: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    inputProps: r.omit([
      'active',
    ], ownerProps),
  })),
);

export default enhance(PureSelect);
