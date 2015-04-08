'use strict';

var TAG_REGEX = /(#\S+)\s*/g;
var TASK_REGEX = /^\s*>\s*(.*)/;
// COMPLETED_REGEX = Leading strikethroughs + TASK_REGEX
var COMPLETED_REGEX = /^\s*--\s*>\s*(.*)/;

function parseInput(input) {
  var tasks = input.split('\n')
    .map(parseLine)
    .filter(function(x) { return x != null; });

  var tags = tasks.reduce(function(_tags, task) {
    return task.tags.length > 0 ? _tags.concat(task.tags) : _tags;
  }, []);

  return {
    tasks: tasks,
    tags: tags,
  };
}

function parseLine(line) {
  // Fast-fail on /\s*/ lines.
  if (line == false) {
    return null;
  }

  var tags = [];
  var completed = false;
  var match = null;

  if (match = line.match(COMPLETED_REGEX)) {
    completed = true;
  } else if (match = line.match(TASK_REGEX)) {
    // Match on regular task; no pre-processing necessary.
  } else {
    return null;
  }

  // match[1] refers to just the task contents.
  var task = match[1].replace(TAG_REGEX, function(_, tag) {
      tags.push(tag);
      return '';
  });

  return {
    completed: completed,
    tags: tags,
    task: task,
  };
}

function taskToString(task) {
  return (task.completed ? '-- ' : '') + '> ' + task.task + task.tags.join(' ');
}

function tasksToString(tasks) {
  return tasks.map(taskToString).join('\n');
}

module.exports = exports = {
  parseInput: parseInput,
  parseLine: parseLine,
  taskToString: taskToString,
  tasksToString: tasksToString,
};
