Concurrency
============
This package provides dependency mangement for child procecesses and callbacks.  It also allows you to create custom
tasks that may then be added as a dependency elsewhere.

Installing
============
`npm install concurrency`

Example Usage
===========

````javascript
var concurrency = require('concurrency');
var Callback    = concurrency.Callback;
var Process     = concurrency.Process;

var find = new Process({
   command:"find",
   args:["/bin"]
});
var find2 = new Process({
   command:"find",
   args:["/usr/bin"]
});

var callback = new Callback(function(done, find, find2){
    var i = setInterval(function(){
        console.log('waiting...');
    }, 500);
    //let's write them to stdout for fun...
    find.stdout.pipe(process.stdout);
    find2.stdout.pipe(process.stdout);

    //we better give the pipes enough time to drain ;)
    setTimeout(function(){
        clearInterval(i);
        console.log('callback finished!');
        done("'I feel like yielding now :)'");
    }, 10000);
}).follows(find).follows(find2);

var ls = new Process({
   command:"ls"
}).follows(callback);

find.on('running', function(){
    console.log('find running');
});
find.on('complete', function(){
    console.log('find complete');
});
find2.on('running', function(){
    console.log('find2 running');
});
find2.on('complete', function(){
    console.log('find2 complete');
});

ls.on('complete', function(ls){
    console.log('ls complete');
    ls.stdout.pipe(process.stdout);
});

ls.on('running', function(callback){
    console.log("The yield of the callback was: "+callback.yield);
    console.log('ls running');
});

ls.run();

````

Custom Tasks
=============
The source for Callback says it best:
````javascript
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

````

License
==============
````
 Copyright 2013 Joseph Spencer.
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
       http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 ````


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jsdevel/concurrency/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

