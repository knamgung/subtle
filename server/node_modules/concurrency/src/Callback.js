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

var Task          = require('./Task');

module.exports = Callback;
Callback.prototype=new Task;
Callback.prototype.constructor=Callback;
Callback.prototype.yield=null;

/**
 * @constructor
 * @param {function(function(value), ...[Task])} fn Receives a callback and the
 * followed [Task[s]].  The value given to the callback becomes the yield on the
 * Callback and when called signals the 'complete' event on the Callback.
 * @returns {Callback}
 */
function Callback(fn){
    this.initialize();
    var task = this;
    var _yield=null;
    var notRun=true;

    if(typeof fn !== 'function'){
        throw new Error("fn must be a function");
    }

    Object.defineProperty(this, 'yield', {
        get:function(){return _yield;},
        enumberable:true
    });

    task.on('running', function(){
        var yielder;
        if(notRun){
            notRun=false;
            yielder=function(value){
                _yield=value;
                task.emit('complete');
            };
            fn.apply(task, [yielder].concat([].slice.apply(arguments)));
        }
    });
}
