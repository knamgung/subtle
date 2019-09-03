/*!
 * Copyright 2013 Joseph Spencer.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var Task          = require('./Task');
var childProcess = require('child_process');
var spawn         = childProcess.spawn;
var fork          = childProcess.fork;

module.exports = Process;
Process.prototype=new Task();
Process.prototype.constructor=Process;
Process.prototype.pid=null;
Process.prototype.stdin=null;
Process.prototype.stdout=null;
Process.prototype.stderr=null;

function Process(config){
  this.initialize();
  var task = this;
  //the spawned command
  var spawned=null;
  var exitCode=null;

  //these are essentially passed to child_process.spawn
  var command;
  var args;
  var options;

  Object.defineProperty(task, 'exitCode', {
      get:function(){return exitCode;},
      enumerable:true
    });

  Object.defineProperty(task, 'pid', {
      get:function(){return spawned && spawned.pid;},
      enumerable:true
    });

  Object.defineProperty(task, 'stdin', {
      get:function(){return spawned && spawned.stdin;},
      enumerable:true
    });

  Object.defineProperty(task, 'stdout', {
      get:function(){return spawned && spawned.stdout;},
      enumerable:true
    });

  Object.defineProperty(task, 'stderr', {
      get:function(){return spawned && spawned.stderr;},
      enumerable:true
    });

  if(!arguments.length){
    throw new Error('One argument must be given');
  }

  if(arguments.length > 1){
    throw new Error('Only one argument may be given');
  }

  if(!(config instanceof Object)){
    throw new Error('config must be an Object');
  }

  if('command' in config){
    if(
      !config.command
      || typeof config.command !== 'string'
    ){
      throw new Error('The command to run must be a string.');
    }
    command = config.command;
  } else {
    throw new Error('Each Task requires a command option I.E. `ls`');
  }

  if('args' in config){
    if(!Array.isArray(config.args)){
      throw new Error('The args must be an array');
    }
    args = config.args;
  }

  if('options' in config){
    if(!config.options || typeof config.options !== 'object'){
      throw new Error('The args must be an object');
    }
    options = config.options;
  }

  task.on('running', function(){
    var spawnArgs=[command];
    if(spawned === null){
      if(args){
        spawnArgs.push(args);
      }
      if(options){
        spawnArgs.push(options);
      }

      if(~command.indexOf('node ')){
        spawnArgs[0] = spawnArgs[0].replace('node ', '');
        spawned=fork.apply(fork, spawnArgs);
      } else {
        spawned=spawn.apply(spawn, spawnArgs);
      }

      spawned.on('exit', function(code){
        exitCode = code;
        spawned.pid=null;
        task.emit('complete', task);
      });
    }
  });
}
