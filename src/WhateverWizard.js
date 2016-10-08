import React, { PropTypes as PT } from 'react';
import cx from 'classnames';

/* Util */
function arrayAssure(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

function StateManager(Component) {
  return class WizardState extends React.Component {
    state = {
      active: 0
    };

    back = () => {
      this.setState({ active: this.state.active - 1 });
    }

    next = () => {
      this.setState({ active: this.state.active + 1 });
    }

    jumpTo = (idx) => {
      this.setState({ active: idx });
    }

    first = () => {
      this.jumpTo(0);
    }

    // TODO
    // last = (last) => {
    //   this.jumpTo(last);
    // }

    generate = () => {
      return ({
        back: this.back,
        next: this.next,
        first: this.first
      });
    }

    render() {
      return (
        <Component {...{
          ...this.props,
          navActions: this.generate(),
          activeStepNumber: this.state.active
        }} />
      );
    }
  }
}

StepButton.propTypes = {
  componentClass: PT.oneOfType([PT.func, PT.string]),
  componentProps: PT.object,
  role: PT.oneOf(['next', 'back', 'first'])
};

StepButton.defaultProps = {
  componentClass: 'button',
  componentProps: {},
};

export function StepButton({
  componentClass: Cmp,
  componentProps,
  navActions,
  ...props
}) {
  debugger;
  return (
    <Cmp {...{
      ...componentProps,
      ...props,
      onClick: props.navActions.next
    }}>{props.children}</Cmp>
  );
}

Step.propTypes = {
  componentClass: PT.oneOfType([PT.func, PT.string]),
  componentProps: PT.object,
  name: PT.string,
  displayNumber: PT.number,
  isFirst: PT.bool,
  isLast: PT.bool,
  number: PT.number,
};

Step.defaultProps = {
  componentClass: 'div',
  componentProps: {},
  className: '',
  displayNumber: 0,
  isFirst: false,
  isLast: false,
  number: 0,
};

export function Step({
  componentClass: Cmp,
  componentProps,
  displayNumber,
  isFirst,
  isLast,
  number,
  ...props
}) {

  const className = cx(
    `ww-step ww-step--${displayNumber}`,
    {'ww-step--last': isLast, 'ww-step--first': isFirst}
  );

  return (
    <div {...{className}}>
      <Cmp {...{
        ...componentProps,
        ...props,
      }}>{props.children}</Cmp>
    </div>
  );
}


export class Wizard extends React.Component {
  static propTypes = {
    activeStepNumber: PT.number,
    navActions: PT.object,
  };

  static defaultProps = {
    activeStepNumber: 0,
    navActions: {},
  };

  makeNumber = (i, total) => ({
    number: i,
    displayNumber: i + 1,
    isFirst: i === 0,
    isLast: i === total,
  });

  make = (elements, navActions, makeNumberData = this.makeNumber) =>
    elements.reduce((acc, curr, i, all) => {
      const elem = {
        ...curr,
        props: {
          ...curr.props,
          ...makeNumberData(i, all.length - 1),
          navActions
      }};
      return ([...acc, elem ]);
    }, []);

  render() {
    const {
      navActions
    } = this.props;

    return (
      <div className="whatever-wizard">
        {this.make(arrayAssure(this.props.children), navActions)}
      </div>
    );
  }
}

export const WhateverWizard = StateManager(Wizard);

export default {
  WhateverWizard,
  Step,
  StepButton,
};
