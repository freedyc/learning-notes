import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TestCollection } from './collection';

export async function create(data) {
  return TestCollection.insertAsync({ ...data });
}

export async function update(_id, data) {
  check(_id, String);
  return TestCollection.updateAsync(_id, { ...data });
}

export async function remove(_id) {
  check(_id, String);
  return TestCollection.removeAsync(_id);
}

export async function findById(_id) {
  check(_id, String);
  return TestCollection.findOneAsync(_id);
}

Meteor.methods({
  'Test.create': create,
  'Test.update': update,
  'Test.remove': remove,
  'Test.find': findById
});
