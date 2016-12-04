# react-whatever-wizard
Declarative component based wizard

Provides:
- Wizard props in your view components
- Manages which page to show and roles to change the page
- Functions for before and after page change
- BEM like classes for CSS, scoped by `ww`
- Declare buttons inside steps like html
- Keeps elements on page, adds `display: none` style

Doesn't Provide:
- Does not manage saving form fields
- No configs or step arrays with complex objects

## Example
`RealWizardary.jsx`
```
import { WhateverWizard, Step, StepButton } from './WhateverWizard';
import MyStep from './';

<WhateverWizard>
  <Step componentClass={MyStep} componentProps={{color: 'goldenrod'}}>
    <StepButton role="next">Next</StepButton>
  </Step>
  <Step componentClass={MyStep}>
    <StepButton role="back" componentProps={{title: 'Go Back'}}>Back</StepButton>
    <StepButton
      preRole={() => confirm('Submit?')}
      role={() => alert('Thank you')}
    >Done</StepButton>
  </Step>
</WhateverWizard>
```

`MyStep.jsx`
```
const MyStep = (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.wizard.number} of {props.wizard.total}</h1>
    (props.wizard.isLast) &&
      <button onClick={props.wizard.actions.first}>Restart</button>
  </div>;
```


## Docs

#### Components
### WhateverWizard
##### Props
#### `scopekey`: string Default: wizard
Key to nest step props for component.

### Step
##### Props
#### `componentClass`: `class`, `React.createComponent`, `function`
#### `componentProps`: `object` of props for `componentClass`

### StepButton
Currently, there is no `onClick` for `StepButton`, not through the Component itself nor `componentProps`.
Instead you have `preRole`, `role`, and `postRole` functions.
Role is the default click function available.
To change the active step state, you will use the role prop.

##### Props
#### role
##### `next`, `back`, `first`: string
##### `function(actions: object, postRole: function)`
If role is a function, you have to call your `postRole` callback.

#### preRole
##### `function(): boolean`
Function fired before `role`. A conformation or validate function.
If return a falsey value besides `undefined`, `role` and `postRole` will not fire.

#### postRole
##### `function()`
A callback after the state (`React.Component.setState`) has upated.
If role is a function, you will have to call this function.
It is provided as the second argument to role.


Your Component
The component class for `Step` will receive the following extra props under the `WhateverWizard` prop `scopeKey`:
- `number` Type: number (1 based step number system)
- `total` Type: number
- `isFirst` Type: boolean
- `isLast` Type: boolean
- `actions.{first, back, next}` Type: object (how to change the page)
