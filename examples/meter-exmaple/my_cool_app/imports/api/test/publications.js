import { Meteor } from 'meteor/meteor';
import { TestCollection } from './collection';

Meteor.publish('allTests', function publishTests() {
  return TestCollection.find({});
});
