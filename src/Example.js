import React, { Component } from 'react';
import './Example.css';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';

const SomeStep = (props) =>
  <div style={{color: props.color}}>
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
            <StepButton role="back" componentProps={{title: 'Go Back'}}>Back</StepButton>
          </Step>
        </WhateverWizard>
      </div>
    );
  }
}

export default Example;
