# react-whatever-wizard
Declarative component based wizard

#### Example
```
<WhateverWizard>
  <Step componentClass={Step1} componentProps={{color: 'slateblue'}}>
    <StepButton role="next">Next</StepButton>
  </Step>
  <Step componentClass={Step2}>
    <StepButton role="back" componentProps={{title: 'Go Back'}}>Back</StepButton>
  </Step>
</WhateverWizard>
```
