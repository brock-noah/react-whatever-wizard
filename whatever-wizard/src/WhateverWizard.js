import React from 'react';

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

    /* config = [{
        componentClass,
        props,
        buttons: [{
          componentClass,
          props,
          onClick,
          role,
        }]
      }]
    */

    createStepConfig = (elements) => {
      return arrayAssure(elements).reduce((acc, step, i) => {
        return acc.concat([{
          name: step.props.name || i.toString(),
          number: i,
          isFirst: i === 0,
          isLast: i === arrayAssure(elements).length + 1,
          props: step.props,
          componentClass: step.props.componentClass,
          buttons: arrayAssure(step.props.children).reduce((inAcc, button, j) => {
            return inAcc.concat([{
              props: button.props,
              componentClass: button.props.componentClass || 'button',
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
  role: React.PropTypes.oneOf(['next', 'back', 'finish', 'restart']),
};

export function StepButton(props) {
  return props;
}

export function Step(props) {
  return props;
}

/* Wizard render of active step */
export function Wizard({step}) {
  let wizClass = `whatever-wizard ww-step--${step.number}`;
  if (step.isFirst) { wizClass += ' ww-step--first'; }
  if (step.isLast)  { wizClass += ' ww-step--last'; }

  return (
    <div className={wizClass}>
      <main className='ww-step'>
        <step.componentClass {...{...step.props }} />
      </main>
      <nav className='ww-nav'>
        {step.buttons.map(sb =>
          <sb.componentClass {...{...sb.props, onClick: sb.onClick }} />
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
