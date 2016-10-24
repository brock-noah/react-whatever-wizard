import React from 'react';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';


const ExStep = (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.ww.number} / {props.ww.total}</h1>
    <p>This is a step</p>
    <p>Last step? {String(props.ww.isLast)}</p>
    <button onClick={props.ww.actions.first}>Restart</button>
  </div>;

class Example extends React.Component {
  render() {
    return (
      <div className="Example">
        <h1>WhateverWizard</h1>
        <WhateverWizard scopeKey="ww">
          <Step componentClass={ExStep} componentProps={{color: 'dodgerblue'}}>
            <StepButton role="next">Next</StepButton>
            <StepButton role="last">Last</StepButton>
          </Step>
          <Step componentClass={ExStep} componentProps={{color: 'crimson'}}>
            <StepButton role="back">Back</StepButton>
          </Step>
        </WhateverWizard>
      </div>
    );
  }
}

export default Example;
