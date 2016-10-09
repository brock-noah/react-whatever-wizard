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

    first = () => {
      this._jumpTo(0);
    }

    _jumpTo = (idx) => {
      this.setState({ active: idx });
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
  postRole: PT.func,
  preRole: PT.func,
};

StepButton.defaultProps = {
  componentClass: 'button',
  componentProps: {},
  isFirst: false,
  isLast: false,
  navActions: {},
  number: 0,
  role: () => {},
};

export function StepButton({
  componentClass: Cmp,
  componentProps,
  navActions,
  postRole,
  preRole,
  role,
  ...props
}) {
  const onClick = () => {
    preRole && preRole();
    (typeof role === 'string') ? navActions[role]() : role(navActions);
    postRole && postRole();
  }

  return (
    <Cmp {...{
      ...componentProps,
      ...props,
      onClick
    }}>{props.children}</Cmp>
  );
}



export class Step extends React.Component {

  static propTypes = {
    componentClass: PT.oneOfType([PT.func, PT.string]),
    componentProps: PT.object,
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

    const active = (number === activeStepNumber);

    const className = cx(
      `ww-step ww-step--${displayNumber}`,
      {'ww-step--last': isLast, 'ww-step--first': isFirst, 'ww-step--active': active}
    );

    const style = !active ? {display: 'none'} : {};

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
        <div {...{className: 'ww-button-bar'}}>
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

  make = (elements, props, counterCb = this.makeNumber) =>
    elements.reduce((acc, curr, i, all) => {
      const elem = {
        ...curr,
        props: {
          ...curr.props,
          ...props,
          ...counterCb(i, all.length - 1),
      }};
      return ([...acc, elem]);
    }, []);


  render() {
    const {
      activeStepNumber,
      children,
      navActions
    } = this.props;
    const propsToChildren = {activeStepNumber, navActions};

    const className = cx('whatever-wizard', {
      'ww-first-is-active':
        0 === activeStepNumber,
      'ww-last-is-active':
        (arrayAssure(children).length - 1) === activeStepNumber
    });

    return (
      <div {...{className}}>
        {this.make(arrayAssure(children), propsToChildren)}
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
