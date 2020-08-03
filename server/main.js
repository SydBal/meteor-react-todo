import { Meteor } from 'meteor/meteor';
import Tasks from '/imports/api/tasks';

function insertTask({ text, createdAt = new Date()}) {
  Tasks.insert({ text, createdAt });
}

Meteor.startup(() => {
  if (Tasks.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(text => insertTask({ text }))
  }
});
