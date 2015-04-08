'use strict';

var TAG_REGEX = /(#\S+)\s*/g;
var ITEM_REGEX = /^\s*>\s*(.*)/;
// COMPLETED_REGEX = Leading strikethroughs + ITEM_REGEX
var COMPLETED_REGEX = /^\s*--\s*>\s*(.*)/;

function parseInput(input) {
  var tasks = input.split('\n')
    .map(parseLine)
    .filter(function(x) { return x != null; });

  var tags = tasks.reduce(function(_tags, task) {
    if (task.tags.length > 0) {
      _tags.concat(task.tags);
    }

    return _tags;
  }, []);

  return {
    tasks: tasks,
    tags: tags
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
    completed= true;
  } else if (match = line.match(ITEM_REGEX)) {
    // Match on regular item; no pre-processing necessary.
  } else {
    return null;
  }

  // match[1] refers to the item without leading '>' (and extraneous
  // whitespace, if any).
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

module.exports = parseInput;
