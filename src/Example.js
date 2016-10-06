import React, { Component } from 'react';
import './Example.css';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';

const SomeStep = (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.stepNumber}</h1>
    <p>This is a step</p>
  </div>;

const AnotherStep = (props) =>
  <div>
    <h1>Step {props.stepNumber}</h1>
    <p>This is another step</p>
  </div>;

class Example extends Component {
  render() {
    return (
      <div className="Example">
        WhateverWizard
        <WhateverWizard>
          <Step componentClass={SomeStep} componentProps={{color: 'slateblue'}}>
            <StepButton role="next">Next</StepButton>
          </Step>
          <Step componentClass={AnotherStep}>
            <StepButton role="back">Back</StepButton>
            <StepButton role="next">Proceed</StepButton>
          </Step>
          <Step componentClass={SomeStep}>
            <StepButton role="first" componentProps={{title: 'Restart'}}>Back to 1</StepButton>
            <StepButton role="back">Back</StepButton>
          </Step>
        </WhateverWizard>
      </div>
    );
  }
}

export default Example;
