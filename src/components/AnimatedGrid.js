import React from 'react';
import reactCSS from 'reactcss';
import {
  compose,
  setDisplayName,
  withProps,
  defaultProps,
} from 'recompose';
import Transition from 'react-inline-transition-group';
import r from 'ramda';

const mapIndexed = r.addIndex(r.map);

const stylesheet = () => reactCSS({
  default: {
    root: {
    },
    transitionBase: {
      // to remain full height with grid siblings
      flex: 1,
      height: '100%',
      width: '100%',
      opacity: 0,
    },
    transitionAppear: {
      opacity: 1,
      transition: 'opacity 0.5s ease-in-out',
    },
    transitionLeave: {
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out',
    },
  },
});

export const PureAnimatedGrid = ({
  styles,
  items,
  colClass,
}) => (
  <div style={styles.root}>
    <div className="row">
      {mapIndexed((item, i) => (
        <Transition
          className={colClass}
          component="div"
          childrenStyles={{
            base: styles.transitionBase,
            appear: {
              ...styles.transitionAppear,
              transitionDelay: `${0.15 * i}s`,
            },
            enter: styles.transitionAppear,
            leave: styles.transitionLeave,
          }}
        >
          <div key={item.key}>
            {item}
          </div>
        </Transition>
      ), items)}
    </div>
  </div>
);

export const enhance = compose(
  setDisplayName('AnimatedGrid'),
  defaultProps({
    colClass: 'col-sm-6 col-md-4',
  }),
  withProps((ownerProps) => ({
    styles: stylesheet(ownerProps),
  })),
);

export default enhance(PureAnimatedGrid);
