import React from 'react';

export default (props) =>
  <div style={{color: props.color || 'black'}}>
    <h1>Step {props.wizard.number} of {props.wizard.total}</h1>
    Component
    {(props.wizard.isLast) &&
      <button onClick={props.wizard.actions.first}>Restart</button>}
  </div>;
