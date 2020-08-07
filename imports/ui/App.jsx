import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import Tasks from '/imports/api/tasks';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const notCheckedQuery = { isChecked: { $ne: true } }

  const filter = {
    ...hideCompleted && notCheckedQuery
  }

  // use  { sort: { createdAt: -1 } } to get newest entries first
  const { tasks, incompleteTasksCount } = useTracker(() => ({
    tasks: Tasks.find(filter, { sort: { createdAt: -1 } }).fetch(),
    incompleteTasksCount: Tasks.find(notCheckedQuery).count()
  }));

  const toggleChecked = ({ _id, isChecked }) => {
    Tasks.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  const deleteTask = ({ _id }) => Tasks.remove(_id);

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
        { tasks.map(task => <Task
          key={ task._id }
          task={ task }
          onCheckboxClick={toggleChecked}
          onDeleteClick={deleteTask}
        />) }
      </ul>
      <TaskForm />
    </div>
  );
};