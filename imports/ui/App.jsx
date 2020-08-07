import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import { Tasks } from '/imports/api/tasks';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const notCheckedQuery = { isChecked: { $ne: true } }

  const filter = {
    ...hideCompleted && notCheckedQuery
  }

  // use  { sort: { createdAt: -1 } } to get newest entries first
  const { tasks, incompleteTasksCount, user } = useTracker(() => ({
    tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: Tasks.find(notCheckedQuery).count(),
    user: Meteor.user()
  }));

  const toggleChecked = ({ _id, isChecked }) =>
    Meteor.call('tasks.setChecked', {
      taskId: _id,
      isChecked: !isChecked
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // Success!
      }
    });

  const deleteTask = ({ _id }) =>
    Meteor.call('tasks.remove', _id, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // Success!
      }
    });

  if (!user) {
    return (
      <div className="simple-todos-react">
        <LoginForm/>
      </div>
    );
  }

  return (
    <div className="simple-todos-react">
      <h1>Tasks! ({incompleteTasksCount} remain)</h1>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            readOnly
            checked={ Boolean(hideCompleted) }
            onClick={() => setHideCompleted(!hideCompleted)}
          />
          Hide Completed
        </label>
      </div>
      <ul className="tasks">
        {tasks.map(task => <Task
          key={ task._id }
          task={ task }
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />)}
      </ul>
      <TaskForm />
    </div>
  );
};