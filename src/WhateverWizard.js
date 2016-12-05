import React, { Children, PropTypes as PT } from 'react';
import cx from 'classnames';

/* Util */
const _e = () => {};

function StateManager(Component) {
  return class WizardState extends React.Component {
    state = {
      active: 1
    };

    back = (cb = _e) => {
      if (this.state.active > 1) {
        this.setState({ active: this.state.active - 1 }, cb);
      }
    }

    next = (cb = _e) => {
      if (this.state.active < Children.count(this.props.children)) {
        this.setState({ active: this.state.active + 1 }, cb);
      }
    }

    first = (cb = _e) => {
      this._jumpTo(1, cb);
    }

    last = (cb = _e) => {
      this._jumpTo(Children.count(this.props.children), cb);
    }

    _jumpTo = (idx, cb) => {
      if (idx >= 1 && idx <= Children.count(this.props.children)) {
        this.setState({ active: idx }, cb);
      }
    }

    generate = () => {
      return ({
        back: this.back,
        next: this.next,
        first: this.first,
        last: this.last,
      });
    }

    render() {
      return (
        <Component {...{
          ...this.props,
          wizardStateManager: {
            actions: this.generate(),
            active: this.state.active,
            total: Children.count(this.props.children),
          }
        }} />
      );
    }
  }
}

StepButton.propTypes = {
  componentClass: PT.oneOfType([PT.func, PT.string]),
  componentProps: PT.object,
  role: PT.oneOf(['next', 'back', 'first', 'last']),
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
  postRole: _e,
  preRole: () => true,
  role: _e,
};

export function StepButton({
  componentClass: Cmp,
  componentProps,
  actions,
  postRole,
  preRole,
  role,
  ...props
}) {
  const onClick = () => {
    if ( preRole() ) {
      if ( typeof role === 'string' ) {
        actions[role](postRole);
      } else {
        role(actions, postRole);
      }
    }
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
    wizardStateManager: PT.shape({
      active: PT.number,
      actions: PT.shape({}),
      total: PT.number,
    }),
    stepDetails: PT.shape({
      isFirst: PT.bool,
      isLast: PT.bool,
      number: PT.number,
    }),
  };

  static defaultProps = {
    className: '',
    componentClass: 'div',
    componentProps: {},
    wizardStateManager: {
      active: 0,
      actions: {},
      total: 0,
    },
    stepDetails: {
      isFirst: false,
      isLast: false,
      number: 0,
    },
  };

  render() {
    const {
      children,
      componentClass: Cmp,
      componentProps,
      scopeKey,
      stepDetails,
      stepDetails: {
        isFirst,
        isLast,
        number,
      },
      wizardStateManager,
      wizardStateManager: {
        actions,
        active,
        total,
      },
    } = this.props;

    const stepActive = (number === active);

    const className = cx(
      `ww-step ww-step--${number}`,
      {'ww-step--first': isFirst,
      'ww-step--last': isLast,
      'ww-step--active': stepActive}
    );

    const style = !stepActive ? {display: 'none'} : {};

    const propsToChildren = {actions, number, isFirst, isLast, total};
    const propsToComponent = { ...stepDetails, ...wizardStateManager };

    return (
      <div {...{className, style}}>
        <Cmp {...{
          ...componentProps,
          [scopeKey]: propsToComponent,
        }} />
        <hr/>
        <div {...{className: 'ww-button-bar'}}>
          {
            Children.map(children, (kid, i) => ({
              ...kid,
              props: {
                ...kid.props,
                ...propsToChildren,
              }
            }))
          }
        </div>
      </div>
    );
  }
}


export class Wizard extends React.Component {
  static propTypes = {
    scopeKey: PT.string,
    wizardStateManager: PT.shape({
      active: PT.number,
      actions: PT.shape({}),
      total: PT.number
    }),
  };

  static defaultProps = {
    scopeKey: 'wizard',
    wizardStateManager: {
      active: 0,
      actions: {},
      total: 0,
    },
  };

  makeNumber = (i, total) => ({
    number: i + 1,
    isFirst: i === 0,
    isLast: i === (total - 1),
  });

  render() {
    const {
      children,
      scopeKey,
      wizardStateManager,
    } = this.props;

    const className = cx('whatever-wizard', {
      'ww-first-is-active':
        0 === wizardStateManager.active,
      'ww-last-is-active':
        (wizardStateManager.total - 1) === wizardStateManager.active
    });

    return (
      <div {...{className}}>
        {
          Children.map(children, (kid, i) => ({
            ...kid,
            props: {
              ...kid.props,
              wizardStateManager,
              scopeKey,
              stepDetails: this.makeNumber(i, wizardStateManager.total),
            }
          }))
        }
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
