import React, { PropTypes as PT } from 'react';

/* Util */
function arrayAssure(thing) {
  return Array.isArray(thing) ? thing : [thing];
}

/* Creates Step Config and manages step state */
function StepState(Component) {
  return class StepConfig extends React.Component {
    state = {
      active: 0,
    };

    // needs work
    createStepConfig = (elements) => {
      return arrayAssure(elements).reduce((acc, step, i) => {
        return acc.concat([{
          name: step.props.name || i.toString(),
          number: i + 1,
          isFirst: i === 0,
          isLast: i === arrayAssure(elements).length + 1,
          componentClass: step.props.componentClass,
          componentProps: step.props.componentProps,
          buttons: arrayAssure(step.props.children).reduce((inAcc, button, j) => {
            return inAcc.concat([{
              children: button.props.children,
              componentClass: button.props.componentClass || 'button',
              componentProps: button.props.componentProps,
              role: button.props.role,
              onClick: e => {
                this.getRole(button.props.role)();
                button.props.onClick && button.props.onClick(e);
              }
            }])
          }, []),
        }]);
      }, []);
    }

    getRole = (role) => {
      switch (role) {
        case typeof role === 'function':
          return role;
        case 'next':
          return () => this.setState({active: this.state.active + 1});
        case 'back':
          return () => this.setState({active: this.state.active - 1});
        case 'restart':
          return () => this.setState({active: 0});
        default:
          return () => {};
      }
    }

    render() {
      const stepConfig = this.createStepConfig(this.props.children);

      return (
        <Component {...{
          ...this.props,
          stepConfig,
          step: stepConfig[this.state.active],
        }} />
      );
    }
  }
}

StepButton.propTypes = {
  componentClass: PT.oneOfType([PT.func, PT.string]),
  componentProps: PT.object,
  role: PT.oneOf(['next', 'back', 'finish', 'restart'])
};

StepButton.defaultProps = {
}

export function StepButton(props) {
  return props;
}

Step.propTypes = {
  componentClass: PT.oneOfType([PT.func, PT.string]),
  componentProps: PT.object,
  name: PT.string,
  stepNumber: PT.number
};

Step.defaultProps = {
  componentClass: 'div'
}

export function Step(props) {
  return props;
}

Wizard.propTypes = {};
Wizard.defaultProps = {};

/* Wizard render of active step */
export function Wizard({step}) {
  let wizClass = `whatever-wizard ww-step--${step.number}`;
  if (step.isFirst) { wizClass += ' ww-step--first'; }
  if (step.isLast)  { wizClass += ' ww-step--last'; }

  return (
    <div className={wizClass}>
      <main className='ww-step'>
        <step.componentClass {...{...step, ...step.componentProps, stepNumber: step.number }} />
      </main>
      <nav className='ww-nav'>
        {step.buttons.map((sb, i) =>
          <sb.componentClass {...{...sb.componentProps, children: sb.children, key: i, onClick: sb.onClick }} />
        )}
      </nav>
    </div>
  );
}

export const WhateverWizard = StepState(Wizard);

export default {
  WhateverWizard,
  Step,
  StepButton,
};
