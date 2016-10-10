import React, { Component } from 'react';
import './Example.css';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';

const SomeStep = (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.displayNumber}</h1>
    <p>This is a step</p>
    <p>Last step? {String(props.isLast)}</p>
  </div>;

const AnotherStep = (props) =>
  <div>
    <h1>Step {props.displayNumber}</h1>
    <p>This is another step</p>
    <button onClick={props.navActions.first}>Restart</button>
  </div>;

class Example extends Component {
  render() {
    return (
      <div className="Example">
        <h1>WhateverWizard</h1>
        <WhateverWizard>
          <Step componentClass={SomeStep} componentProps={{color: 'slateblue'}}>
            <StepButton
              preRole={() => alert('welcome to help')}
              role={(actions, post) => alert('404')}
              postRole={() => alert('???')}
            >Help Me</StepButton>
            <StepButton role="next">Next</StepButton>
          </Step>
          <Step componentClass={AnotherStep}>
            <StepButton role="back">Back</StepButton>
            <StepButton role="next" preRole={() => confirm('go')}>Proceed</StepButton>
          </Step>
          <Step componentClass={SomeStep}>
            <StepButton role="first" componentClass="a" componentProps={{title: 'Restart', href: '#'}}>Back to 1</StepButton>
            <StepButton role="back">Back</StepButton>
          </Step>
        </WhateverWizard>
      </div>
    );
  }
}

export default Example;
