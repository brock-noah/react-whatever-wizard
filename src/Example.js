import React, { Component } from 'react';
import './Example.css';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';

const Step1 = (props) => 
  <div>
    <h1>Step 1</h1>
    <p>This is step one</p>
  </div>;
const Step2 = (props) =>
  <div>
    <h1>Step 2</h1>
    <p>This is step two</p>
  </div>;

class Example extends Component {
  render() {
    return (
      <div className="Example">
        WhateverWizard
        <WhateverWizard>
          <Step componentClass={Step1}>
            <StepButton role="next">Next</StepButton>
          </Step>
          <Step componentClass={Step2}>
            <StepButton role="back">Back</StepButton>
          </Step>
        </WhateverWizard>
      </div>
    );
  }
}

export default Example;
