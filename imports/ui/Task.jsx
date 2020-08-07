import React from 'react';

export const Task = ({ task, onCheckboxClick, onDeleteClick, onTogglePrivateClick }) => {
  return (
    <li>
      <button onClick={ () => onDeleteClick(task) }>&times;</button>
      <button onClick={ () => onTogglePrivateClick(task) }>{ task.isPrivate ? 'Private' : 'Public' }</button>
      <label>
        <input
          type="checkbox"
          checked={ Boolean(task.isChecked) }
          onClick={ () => onCheckboxClick(task) }
          readOnly
        />
        <span>{ task.text }</span>
      </label>
    </li>
  );
};