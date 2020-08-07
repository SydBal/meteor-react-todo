import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Task } from './Task';
import { TaskForm } from './TaskForm';
import Tasks from '/imports/api/tasks';

export const App = () => {
  // use  { sort: { createdAt: -1 } } to get newest entries first
  const tasks = useTracker(() => Tasks.find({}, { sort: { createdAt: -1 } }).fetch());

  const toggleChecked = ({ _id, isChecked }) => {
    Tasks.update(_id, {
      $set: {
        isChecked: !isChecked
      }
    })
  };

  return (
    <>
      <h1>Welcome to Meteor!</h1>

      <ul>
        { tasks.map(task => <Task key={ task._id } task={ task } onCheckboxClick={toggleChecked} />) }
      </ul>
      <TaskForm />
    </>
  );
};