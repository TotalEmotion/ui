import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import cssSides, { Side } from '@team-griffin/css-sides';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import { Heading, H } from '@team-griffin/react-heading-section';
import r from 'ramda';

const stylesheet = ({
  selectable,
  selected,
}) => {
  const borderOffset = 3;

  return reactCSS({
    default: {
      root: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
      },
      gradient: {
        width: '100%',
        ...longhand('border', {
          ...longhand('left', {
            width: borderOffset,
            style: 'solid',
            color: palette.primary,
          }),
          ...longhand('right', {
            width: borderOffset,
            style: 'solid',
            color: palette.primaryGradient,
          }),
        }),
        backgroundImage: `
          linear-gradient(to right, ${palette.primary} 0%, ${palette.primaryGradient} 100%)
        `,
        transition: 'opacity 0.3s ease-in-out',
      },
      inner: {
        ...longhand('margin', {
          top: borderOffset,
          left: -borderOffset,
          right: -borderOffset,
        }),
        backgroundColor: '#ffffff',
        transition: `
          padding 0.1s ease-in-out,
          margin 0.1s ease-in-out
        `,
      },
      media: {
        overflow: 'hidden',
        position: 'relative',
        height: 200,
      },
      image: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
      },
      text: {
        ...longhand('border', {
          leftWidth: 1,
          rightWidth: 1,
          bottomWidth: 1,
          topWidth: 0,
        }),
        ...longhand('padding', {
          top: 20,
          bottom: 30,
          left: 18,
          right: 18,
        }),
        borderStyle: 'solid',
        borderColor: '#eae8f5',
        transition: `
          padding 0.1s ease-in-out,
          border 0.1s ease-in-out
        `,
      },
      title: {
        color: palette.primary,
        fontSize: 15,
        lineHeight: 1.6,
        height: 60,
        maxHeight: 60,
        overflow: 'hidden',
        textOverflow: 'ellipses',
      },
      date: {
        color: '#555555',
        fontSize: 10,
        fontWeight: 600,
      },
      // the form part
      input: {
        // basically equivalent to .sr-only
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        border: 0,
      },
      selectionCircle: {
        ...longhand('border', {
          width: 2,
          style: 'solid',
          color: palette.primary,
        }),
        position: 'absolute',
        top: 20,
        right: 20,
        width: 28,
        height: 28,
        backgroundColor: '#fff',
        borderRadius: 15,
        textAlign: 'center',
      },
      selectionCircleIcon: {
        color: palette.primary,
        fontSize: 20,
        lineHeight: '24px',
      },
    },
    selectable: {
      root: {
        cursor: 'pointer',
      },
      gradient: {
        opacity: 0.5,
      },
    },
    selected: {
      inner: {
        ...longhand('margin', {
          right: 0,
          left: 0,
          bottom: borderOffset,
        }),
      },
      text: {
        ...longhand('padding', {
          left: (18 - borderOffset),
          right: (18 - borderOffset),
        }),
        // remove inner grey border
        borderColor: 'transparent',
      },
    },
  }, {
    selectable: r.equals(selectable, true),
    selected: r.equals(selected, true),
  });
};

const VideoCardCheckbox = r.ifElse(
  r.propEq('selectable', true),
  ({
    styles,
    selected,
    inputProps,
  }) => (
    <div>
      <span style={styles.selectionCircle}>
        {r.when(
          r.equals(true),
          r.always(
            <span style={styles.selectionCircleIcon}>
              {/* ✓ */}
              {'\u2713'}
            </span>
          )
        )(selected)}
      </span>
      <input
        type="checkbox"
        style={styles.input}
        checked={selected}
        {...inputProps}
      />
    </div>
  ),
  r.always(null)
);

export const PureVideoCard = ({
  styles,
  selectable,
  selected,
  mediaSrc,
  title,
  date,
  inputProps,
}) => (
  <div style={styles.root}>
    <div style={styles.gradient}>
      <div style={styles.inner}>
        <div style={styles.media}>
          <img
            src={mediaSrc}
            alt={title}
            style={styles.image}
          />
        </div>
        <div style={styles.text}>
          <Heading
            component={(
              <H style={styles.title}>
                {title}
              </H>
            )}
          />
          <span style={styles.date}>{date}</span>
        </div>
      </div>
    </div>
    <VideoCardCheckbox
      styles={styles}
      selectable={selectable}
      selected={selected}
      {...inputProps}
    />
  </div>
);

export const enhance = compose(
  setDisplayName('VideoCard'),
  defaultProps({
    selectable: false,
    selected: false,
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
    inputProps: {
      ...ownerProps.input,
      meta: ownerProps.meta,
    },
  })),
);

export default enhance(PureVideoCard);
