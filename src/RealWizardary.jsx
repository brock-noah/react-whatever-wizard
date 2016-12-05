import React from 'react';
import { WhateverWizard, Step, StepButton } from './WhateverWizard';
import MyStep from './MyStep';

export default (props) =>
  <WhateverWizard>
    <Step componentClass={MyStep} componentProps={{color: 'goldenrod'}}>
      <a href="/">Cancel</a>
      <StepButton role="next">Next</StepButton>
    </Step>
    <Step componentClass={MyStep}>
      <StepButton role="back" componentProps={{title: 'Go Back'}}>Back</StepButton>
      <StepButton
        preRole={() => confirm('Submit?')}
        role={() => alert('Thank you')}
      >Done</StepButton>
    </Step>
  </WhateverWizard>;
