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
#### `scopeKey`: string Default: wizard
Key to nest step props for component. Used by `layoutComponent` and `componentClass`.

#### `layoutComponent`: `class`, `React.createComponent`, `function`
The layout that renders with each step. Where buttons should be placed, progress bar, step number, etc.
Is effected by `scopeKey`.

### Step
##### Props
#### `componentClass`: `class`, `React.createComponent`, `function`
The component to render for that step. This component will receive wizard props under the `scopeKey`.

#### `componentProps`: `object` of props for `componentClass`
The props for the component.

### StepButton
Currently, there is no `onClick` for `StepButton`, not through the Component itself nor `componentProps`.
Instead you have `preRole`, `role`, and `postRole` functions.
Role is the default click function available.
To change the active step state, you will use the role prop.

##### Props
#### role
##### `next`, `back`, `first`, `last`: string
##### `function(actions: object, postRole: function)`
Either a string for predefined navagation, or a function.
If role is a function, you have to call your `postRole` callback. Actions are the predefined navagation options.

#### preRole
##### `function(): boolean`
Function fired before `role`. A conformation or validate function.
If return a falsey value besides `undefined`, `role` and `postRole` will not fire.

#### postRole
##### `function()`
A callback after the state (`React.Component.setState`) has upated.
If role is a function, you will have to call this function.
It is provided as the second argument to role.



The component class for `Step` will receive the following extra props under the `WhateverWizard` prop `scopeKey`:
- `number` Type: number (1 based step number system)
- `total` Type: number
- `isFirst` Type: boolean
- `isLast` Type: boolean
- `actions.{first, back, next, last}` Type: object (how to change the page)
