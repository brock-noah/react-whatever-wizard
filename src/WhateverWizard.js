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
  role: PT.oneOf(['next', 'back', 'first']),
  isFirst: PT.bool,
  isLast: PT.bool,
  navActions: PT.object,
  number: PT.number,
};

StepButton.defaultProps = {
  componentClass: 'button',
  componentProps: {},
  isFirst: false,
  isLast: false,
  navActions: {},
  number: 0,
};

export function StepButton({
  componentClass: Cmp,
  componentProps,
  navActions,
  role,
  ...props
}) {

  return (
    <Cmp {...{
      ...componentProps,
      ...props,
      onClick: navActions[role]
    }}>{props.children}</Cmp>
  );
}



export class Step extends React.Component {

  static propTypes = {
    componentClass: PT.oneOfType([PT.func, PT.string]),
    componentProps: PT.object,
    name: PT.string,
    displayNumber: PT.number,
    isFirst: PT.bool,
    isLast: PT.bool,
    navActions: PT.object,
    number: PT.number,
  };

  static defaultProps = {
    componentClass: 'div',
    componentProps: {},
    className: '',
    displayNumber: 0,
    isFirst: false,
    isLast: false,
    navActions: {},
    number: 0,
  };

  make = (elements, props) =>
    elements.reduce((acc, curr, i, all) => {
      const elem = {
        ...curr,
        props: {
          ...curr.props,
          ...props,
      }};
      return ([...acc, elem]);
    }, []);

  render() {
    const {
      activeStepNumber,
      componentClass: Cmp,
      componentProps,
      displayNumber,
      isFirst,
      isLast,
      navActions,
      number,
      ...props
    } = this.props;

    const className = cx(
      `ww-step ww-step--${displayNumber}`,
      {'ww-step--last': isLast, 'ww-step--first': isFirst}
    );

    const style = (number !== activeStepNumber) ? {display: 'none'} : {};

    const propsToChildren = {navActions, number, isFirst, isLast};

    return (
      <div {...{className, style}}>
        <Cmp {...{
          ...componentProps,
          ...props,
          displayNumber,
          isFirst,
          isLast,
          navActions,
          number
        }} />
        <div>
          {this.make(arrayAssure(props.children), propsToChildren)}
        </div>
      </div>
    );
  }
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

  make = (elements, props, makeNumberData = this.makeNumber) =>
    elements.reduce((acc, curr, i, all) => {
      const elem = {
        ...curr,
        props: {
          ...curr.props,
          ...props,
          ...makeNumberData(i, all.length - 1),
      }};
      return ([...acc, elem ]);
    }, []);


  render() {
    const {
      activeStepNumber,
      navActions
    } = this.props;
    const propsToChildren = {activeStepNumber, navActions};

    return (
      <div className="whatever-wizard">
        {this.make(arrayAssure(this.props.children), propsToChildren)}
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
