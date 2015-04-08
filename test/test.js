'use strict';

var fs = require('fs');
var parser = require('../parser.js');

var taskFile = fs.readFileSync('./todo.s', {encoding: 'utf8'});

var taskList = parser.parseInput(taskFile);

console.log(taskList);

var taskString = parser.tasksToString(taskList.tasks);

console.log(taskString);
