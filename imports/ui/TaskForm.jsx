import React, { useState } from 'react';
import Tasks from '/imports/api/tasks';

export const TaskForm = ({ user }) => {
  const [text, setText] = useState("");

  const handleSubmit = event => {
    event.preventDefault()
    if (!text) return;

    Meteor.call('tasks.insert', text.trim(), (err, res) => {
      if (err) {
        alert(err);
      } else {
        setText("");
      }
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
};