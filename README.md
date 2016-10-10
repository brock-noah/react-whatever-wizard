# react-whatever-wizard
Declarative component based wizard

Provides:
- wizard props in your view components
- manages which page to show and roles to change the page
- functions for before and after page change
- BEM like classes for CSS, scoped by `ww`
- declare buttons inside steps like html
- keeps elements on page, adds `display: none` style

Doesn't Provide:
- does not manage saving form fields
- no configs or step arrays with complex objects

## Example
`wizard.jsx`
```
<WhateverWizard>
  <Step componentClass={Step} componentProps={{color: 'goldenrod'}}>
    <StepButton role="next">Next</StepButton>
  </Step>
  <Step componentClass={Step}>
    <StepButton role="back" componentProps={{title: 'Go Back'}}>Back</StepButton>
    <StepButton preRole={() => confirm('Submit?')} role={submit}>Done</StepButton>
  </Step>
</WhateverWizard>
```

`Step.jsx`
```
const Step = (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.displayNumber}</h1>
    (props.isLast) &&
      <button onClick={props.navActions.first}>Restart</button>
  </div>;
```


## Docs

### Step
Props `componentClass` is a `class`, `React.createComponent`, or function. As props, it will receive
`displayNumber`, `number`, `isFirst`, `isLast`, and `navActions`.

### `StepButton`
There is no `onClick` for `StepButton`, not through the Component itself nor `componentProps`.
Instead you have `preRole`, `role`, and `postRole` functions.
Role is the default click function available.
To change the active step state, you will use the role prop.

#### `preRole`
##### `function(): boolean`
Function fired before `role`.
If you return a falsey value besides `undefined`, `role` and `postRole` will not fire.

#### `role`
##### `next`, `back`, `first`
##### `function(actions: object, postRole: function)`
If role is a function, you have to call your `postRole` callback.

#### `postRole`
##### `function()`
A callback after the state (`React.setState`) has upated.
If role is a function, you will have to call this function.
It is provided as the second argument to role.


### `navActions: object`
#### `action` function(callback)`
actions:  `back`, `first`, `next`

