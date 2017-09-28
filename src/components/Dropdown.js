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
      borderWidth: 0,
      backgroundColor: '#fff',
      color: '#333',
      cursor: 'default',
      display: 'table',
      outline: 'none',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
      ...longhand('borderBottom', {
        width: 2,
        style: 'solid',
        color: palette.jadeGreen,
      }),
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
      ...cssSides('padding', Side.Y, 8),
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
      width: 40,
      fill: palette.jadeGreen,
    },

    arrow: {
      position: 'absolute',
      top: '50%',
      right: 0,
      width: 40,
      height: 40,
      ...longhand('margin', {
        top: -20,
        right: -10,
      }),
      transition: 'transform 0.2s ease-in-out',
    },

    arrowOpen: {
      transform: 'rotate(180deg)',
    },

    value: {
      ...longhand('font', {
        weight: 600,
      }),
      ...cssSides('padding', Side.Y, 8),
      color: palette.jadeGreen,
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
      ...cssSides('padding', Side.A, 10),
      boxShadow: '0 1px 5px rgba(0, 0, 0, 0.06)',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
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
      color: palette.clearBlue,
      fontWeight: 600,
    },

    optionFocused: {
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

export const PureDropdown = ({
  styles,
  ...selectProps
}) => (
  <div>
    <Style
      scopeSelector=".Dropdown"
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
        '.Select-arrow-zone > i': styles.arrowOpen,
      }}
    />
    <Style
      scopeSelector=".Select.is-disabled"
      rules={{
        ...styles.select,
        '.Dropdown-control': styles.control,
        '.Dropdown-input': styles.input,
      }}
    />
    <ReactSelect
      className="Dropdown"
      arrowRenderer={Arrow}
      {...selectProps}
    />
  </div>
);


export const enhance = compose(
  setDisplayName('Dropdown'),
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

export default enhance(PureDropdown);
