import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import longhand from '@team-griffin/css-longhand';
import { palette } from '../constants/css';
import { srOnly } from '../helpers/css';
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
        // not a fan of calc but flexboxing and needing to keep multiple
        // aligned items the same height when dynamic
        height: 'calc(100% - 20px)',
        marginBottom: 20,
      },
      gradient: {
        display: 'flex',
        width: '100%',
        ...longhand('border', {
          ...longhand('left', {
            width: borderOffset,
            style: 'solid',
            color: palette.clearBlue,
          }),
          ...longhand('right', {
            width: borderOffset,
            style: 'solid',
            color: palette.sapphire,
          }),
        }),
        backgroundImage: `
          linear-gradient(to right, ${palette.clearBlue} 0%, ${palette.sapphire} 100%)
        `,
        transition: 'opacity 0.3s ease-in-out',
      },
      inner: {
        ...longhand('margin', {
          top: borderOffset,
          left: -borderOffset,
          right: -borderOffset,
        }),
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
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
        height: 200,
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
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        borderStyle: 'solid',
        borderColor: '#eae8f5',
        transition: `
          padding 0.1s ease-in-out,
          border 0.1s ease-in-out,
          margin 0.1s ease-in-out
        `,
      },
      title: {
        color: palette.clearBlue,
        fontSize: 18,
        lineHeight: 1.6,
        fontWeight: 500,
        minHeight: 40,
        marginBottom: 20,
        textTransform: 'capitalize',
        flexGrow: 1,
      },
      date: {
        color: '#555555',
        fontSize: 12,
        fontWeight: 500,
      },
      // the form part
      input: {
        ...srOnly,
      },
      selectionCircle: {
        ...longhand('border', {
          width: 2,
          style: 'solid',
          color: palette.clearBlue,
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
        color: palette.clearBlue,
        fontSize: 16,
        lineHeight: '26px',
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
        ...longhand('margin', {
          bottom: -borderOffset,
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
              {'\u2714'}
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
