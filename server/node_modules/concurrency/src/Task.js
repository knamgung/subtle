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

var EventEmitter  = require('events').EventEmitter;

module.exports = Task;
Task.prototype.emit=function(eventName, args){};
Task.prototype.follows=function(task){};
Task.prototype.isComplete=false;
Task.prototype.isInitialized=false;
Task.prototype.isRunning=false;
Task.prototype.initialize=initialize;
Task.prototype.on=function(eventName, listener){};
Task.prototype.toString=function(){return this.id;};
Task.prototype.valueOf=function(){return this.timestamp;};

/**
 * This serves as the prototype for all Tasks.  You may create custom tasks in
 * the following ways:
 * <pre>
 * function MyTask(){
 *     this.initialize();
 * }
 * MyTask.prototype=new Task;
 *
 * function MyOtherTask(){
 *     this.initialize();
 * }
 * MyTask.prototype={
 *     __proto__:Task.prototype
 * };
 * </pre>
 * Do not do the following:
 * <pre>
 * function MyTask(){}
 * MyTask.prototype=Task.prototype;
 * </pre>
 *
 * @constructor
 * @returns {Task}
 */
function Task(){}

function initialize(){
    var task           = this;
    var isComplete     = false;
    var isInitialized  = true;
    var isRunning      = false;
    var timestamp      = Date.now();
    var id             = "[Task "+Math.random(timestamp)+"]";
    var tasksFollowing = {};
    var followees      = [];
    var queue          = [];
    var emitter        = new EventEmitter;

    emitter.on('complete', function(){
        isRunning=false;
        isComplete=true;
    });

    //properties
    Object.defineProperty(this, 'id', {
        get:function(){return id;},
        enumerable:true
    });

    Object.defineProperty(this, 'isComplete', {
        get:function(){return isComplete;},
        enumerable:true
    });

    Object.defineProperty(this, 'isInitialized', {
        get:function(){return isInitialized;},
        enumerable:true
    });

    Object.defineProperty(this, 'isRunning', {
        get:function(){return isRunning;},
        enumerable:true
    });

    Object.defineProperty(this, 'timestamp', {
        get:function(){return timestamp;},
        enumerable:true
    });

    //methods
    Object.defineProperty(this, 'emit', {
        get:function(){
            return function(){
                emitter.emit.apply(emitter, [].slice.apply(arguments));
            };
        },
        enumerable:true
    });

    Object.defineProperty(this, 'follows', {
        get:function(){return follows;},
        enumerable:true
    });

    Object.defineProperty(this, 'isFollowing', {
        get:function(){return isFollowing;},
        enumerable:true
    });

    Object.defineProperty(this, 'on', {
        get:function(){
            return function(event, handler){
                var oldHandler=handler;
                if(event === 'running'){
                    if(isRunning){
                        handler.apply(task, followees);
                        return;
                    }
                    handler=function(){
                        oldHandler.apply(task, followees);
                    };
                }
                emitter.on(event, handler.bind(task));
            };
        },
        enumerable:true
    });

    Object.defineProperty(this, 'run', {
        get:function(){return run;},
        enumerable:true
    });

    function follows(){
        [].slice.call(arguments).forEach(function(task){
          var index;
          if(!(task instanceof Task)){
            throw new Error("task must be an isntance of Task");
          }
          if(!task.isInitialized){
            throw new Error("tasks must be initialized to follow them");
          }
          if(task in tasksFollowing){
            throw new Error("tasks may only be followed once by this task");
          };
          if(task.isComplete)return;
          if(isRunning){
            throw new Error("Can't add dependencies.  The task is running.");
          }
          if(isComplete){
            throw new Error("Can't add dependencies.  The task is complete.");
          }
          tasksFollowing[task] = task;
          index = queue.push(task.id) - 1;
          followees.push(task);
          task.on('complete', function(){
            queue[index] = "";
            attemptToRun();
          });
        });
        return this;
    }

    function isFollowing(task){
        return task in tasksFollowing;
    }

    function run(){
        runFollowees();
        attemptToRun();
    }

    function attemptToRun(){
        if(noRunningFollowees()){
            if(isRunning){
                throw new Error("Task is currently running.  This is unexpected");
            }
            if(isComplete){
                throw new Error("Task is complete.  It can't be run again");
            }
            isRunning = true;
            emitter.emit('running');
        }
    }

    function runFollowees(){
        var taskId;
        var task;
        if(isRunning || isComplete)return;
        for(taskId in tasksFollowing){
            task = tasksFollowing[taskId];
            if(!task.isRunning && !task.isComplete){
                task.run();
            }
        }
    }

    function noRunningFollowees(){
        return !queue.join('');
    }
}
